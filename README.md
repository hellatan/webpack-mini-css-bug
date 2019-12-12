# 🚀 Mini CSS Extract Plugin bug 

Repo for https://github.com/webpack-contrib/mini-css-extract-plugin/issues/205.

When passing in `css-loader` as a string option to `mini-css-extract-plugin`, webpack builds successfully:

```
npm run build

> webpack-mini-css-bug@1.0.0 build /projects/webpack-mini-css-bug
> webpack

Hash: ebeaf1105dd10fc063a5
Version: webpack 4.41.2
Time: 531ms
Built at: 12/12/2019 11:32:17 AM
       Asset       Size  Chunks                   Chunk Names
    main.css   66 bytes    main  [emitted]        main
main.css.map  183 bytes    main  [emitted] [dev]  main
     main.js   4.17 KiB    main  [emitted]        main
 main.js.map   3.81 KiB    main  [emitted] [dev]  main
Entrypoint main = main.css main.js main.css.map main.js.map
[./src/index.js] 104 bytes {main} [built]
[./src/index.scss] 39 bytes {main} [built]
    + 1 hidden module
Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/postcss-loader/src/index.js??ref--4-2!node_modules/sass-loader/dist/cjs.js??ref--4-3!src/index.scss:
    Entrypoint mini-css-extract-plugin = *
    [./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/index.scss] ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??ref--4-2!./node_modules/sass-loader/dist/cjs.js??ref--4-3!./src/index.scss 169 bytes {mini-css-extract-plugin} [built]
        + 1 hidden module
```

When passing `options` in from `css-loader`, `mini-css-extract-plugin` throws the following error:

```
npm run build:options

> webpack-mini-css-bug@1.0.0 build:options /projects/webpack-mini-css-bug
> webpack --loaderType=object

/projects/webpack-mini-css-bug/node_modules/mini-css-extract-plugin/dist/index.js:86
const resource = this.\_identifier.split('!').pop();
^

TypeError: Cannot read property 'split' of undefined
at CssModule.nameForCondition (/projects/webpack-mini-css-bug/node_modules/mini-css-extract-plugin/dist/index.js:86:39)
at Function.checkTest (/projects/webpack-mini-css-bug/node_modules/webpack/lib/optimize/SplitChunksPlugin.js:330:52)
at Object.fn [as getCacheGroups](/projects/webpack-mini-css-bug/node_modules/webpack/lib/optimize/SplitChunksPlugin.js:268:35)
at compilation.hooks.optimizeChunksAdvanced.tap.chunks (/projects/webpack-mini-css-bug/node_modules/webpack/lib/optimize/SplitChunksPlugin.js:534:38)
at SyncBailHook.eval [as call] (eval at create (/projects/webpack-mini-css-bug/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:16)
at SyncBailHook.lazyCompileHook (/projects/webpack-mini-css-bug/node_modules/tapable/lib/Hook.js:154:20)
at Compilation.seal (/projects/webpack-mini-css-bug/node_modules/webpack/lib/Compilation.js:1336:38)
at compilation.finish.err (/projects/webpack-mini-css-bug/node_modules/webpack/lib/Compiler.js:675:18)
at hooks.finishModules.callAsync.err (/projects/webpack-mini-css-bug/node_modules/webpack/lib/Compilation.js:1261:4)
at AsyncSeriesHook.eval [as callAsync] (eval at create (/projects/webpack-mini-css-bug/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)
at AsyncSeriesHook.lazyCompileHook (/projects/webpack-mini-css-bug/node_modules/tapable/lib/Hook.js:154:20)
at Compilation.finish (/projects/webpack-mini-css-bug/node_modules/webpack/lib/Compilation.js:1253:28)
at hooks.make.callAsync.err (/projects/webpack-mini-css-bug/node_modules/webpack/lib/Compiler.js:672:17)
at \_err0 (eval at create (/projects/webpack-mini-css-bug/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:11:1)
at \_addModuleChain (/projects/webpack-mini-css-bug/node_modules/webpack/lib/Compilation.js:1185:12)
at processModuleDependencies.err (/projects/webpack-mini-css-bug/node_modules/webpack/lib/Compilation.js:1097:9)
at process.\_tickCallback (internal/process/next_tick.js:61:11)

```

To replicate:

```
npm install
// successful build
npm run build

// error build
npm run build:options
```
