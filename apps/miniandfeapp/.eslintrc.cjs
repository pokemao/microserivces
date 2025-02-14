// ESLint 检查 .vue 文件需要单独配置编辑器：
// https://eslint.vuejs.org/user-guide/#editor-integrations
module.exports = {
  root: true,
  extends: [
    "@syz/microservices-eslint-config",
    "taro/vue3"
  ],
  rules: {
    "vue/multi-word-component-names": "off",
  },
  parser: "@typescript-eslint/parser",
}

