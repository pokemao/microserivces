```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    // 如果使用了其他的打包工具如webpack，是不需要配置这部分内容的，因为webpack会接管这些信息
    /* Projects */
    // 增量编译，上次编译的内容存储在.tsbuildinfo文件中这个文件会被输出到tsBuildInfoFile指定的文件夹下，如果没有设置tsBuildInfoFile就存储到outDir指定的文件夹下
    // 下一次编译的时候根据比较.tsbuildinfo进行增量编译
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // 在使用reference引入其他项目的时候，本项目的编译过程中不使用引入项目的源文件而是直接使用d.ts和js文件
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // 编译的时候只处理当前任务，不将引入的项目编译到当前项目的输出文件中
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // 开启这个之后，引入的项目在本项目中不会有类型提示，对开发体验不好，建议不开，除非大项目的类型提示太多已经占用内存太多了，影响电脑的正常运行
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    // 管理最后生成的js代码使用的是什么es规范，但是不指定这个代码使用的模块化是什么，模块化使用什么是由module规定的
    "target": "ESNext",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // lib会根据target的值自动指定，
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // 对jsx进行转换的方式
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // 允许ts代码中存在装饰器
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // 添加装饰器源信息
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // 
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // 禁用lib属性提供的d.ts，在开发嵌入式或者特殊环境中才会使用
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // 使用Object.defineProperty来定义class中的属性
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // tsc如何将一个文件视为模块，auto要求在文件中有import或者export才是模块，force会一直认为一个文件就是一个模块
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    // 管理最后生成的js代码使用的是什么模块化规范，是es的还是node的，是新的es规范还是旧的es规范
    // 如果moudule是node相关的，必须把allowImportingTsExtensions打开，因为tsc会根据会根据 .js 和 .ts 文件的扩展名，使用 CommonJS 或 ESM 模块系统。
    "module": "NodeNext",                                /* Specify what module code is generated. */
    // 配合outDir，使得outdir下的目录结构和rootDir下的目录结构相同
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // import或者require的解析方式，classic就不会去node_moudules中寻找包了，NodeNext支持最新的package.json中的exports和imports字段，bundler是在使用现代打包器的时候用的，该模式假定打包工具会负责解析和打包所有模块，因此 TypeScript 只需处理类型检查，而不负责模块解析的具体细节
    "moduleResolution": "NodeNext",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // 在tsc编译的文件中所有的非相对路径都会相对于这个baseUrl, 配合paths实现别名
    // baseUrl: "./src" + import ... from "utils/help" => import ... from "./src/utils/help"
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // 定义路径别名，就和webpack的alias相似，需要baseUrl配合使用
    // paths: { "@utils/*": "utils/*" }, baseUrl: "./src" + import ... from "@utils/help" => import ... from "./src/utils/help"
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // 应该叫做baseRoots而不是rootDirs
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // 定义types的寻找路径
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // 会把node_modules下的@types中的node类型定义加载到项目中，使得使用node的时候不会报错
    "types": [
      "node"
    ],                                      /* Specify type package names to be included without being referenced in a source file. */
    // umd相关
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // 在import路径myModule.ts的myModule之后和ts之前的部分添加“”中的内容
    //  "moduleSuffixes": ["ios"] 陪着 import ... from './myModule' => import ... from './myModule.ios.ts'
    "moduleSuffixes": [""],                             /* List of file name suffixes to search when resolving a module. */
    // 允许在引入路径中的文件末尾加上文件后缀，不开启这个的时候文件是不能写后缀的，这个后缀tsc会自动添加
    "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // 使用package.json的'exports'字段
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // 使用package.json的'imports'字段
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // 
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // 生成.js的同时生成.d.ts
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // 只生成.d.ts
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // 保证每个文件都可以独立编译，也就是不存在什么namespace的东西，不会有其他文件中定义这个文件直接使用的问题
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // 去除类型检查(允许从没有设置默认导出的模块中默认导入)
    // 不开启这个引用方式只能是import * as 。。。 from 。。。，开启这个之后引用方式变成了 import 。。。from 。。。，因为你告诉编译器你使用的cjs模块都适用了default导出
    "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    // 在编译生成的代码中为cjs的代码（比如node原生模块）添加default导出的代码
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true,                                 /* Skip type checking all .d.ts files. */
  }
}
```
