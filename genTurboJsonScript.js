const fs = require('fs');
const {resolve} = require('path');

const prefix = "MICRO_APP_";
const envKeys = Object.keys(process.env).filter(key => key.startsWith(prefix));

const turboJson = {
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "serve": {
      "persistent": true,
      "dependsOn": [],
      "cache": false,
      "inputs": [".env.development"],
      "env": envKeys
    },
    "cleardist": {
      "cache": false
    },
    "build": {
      "cache": false,
      "dependsOn": ["cleardist"],
      "inputs": [".env.production"],
      "env": envKeys
    },
    "docker-build": {
      "cache": true,
      "dependsOn": ["build"],
      "inputs": [".env.production", "src/**/*", "scripts/docker/**/*"],
      "env": envKeys
    },
    "docker-push": {
      "cache": true,
      "dependsOn": ["docker-build"],
      "inputs": [".env.production", "src/**/*", "scripts/docker/**/*"],
      "env": envKeys
    },
    "k8s-genyaml": {
      "cache": true,
      "dependsOn": ["docker-push"],
      "inputs": [".env.production", "scripts/k8s/**/*"],
      "outputs": ["k8s-yaml/**/*"],
      "env": envKeys
    },
    "k8s-justgenyaml": {
      "cache": true,
      "inputs": [".env.production", "scripts/k8s/**/*"],
      "outputs": ["k8s-yaml/**/*"],
      "env": envKeys
    },
    "k8s-applyOrRolloutRestart": {
      "cache": false,
      "dependsOn": ["k8s-genyaml"],
      "inputs": [".env.production", "src/**/*", "scripts/k8s/**/*"],
      "outputs": ["k8s-yaml/**/*"],
      "env": envKeys
    }
  }
}

fs.writeFileSync(resolve(__dirname, 'turbo.json'), JSON.stringify(turboJson, null, 2));
