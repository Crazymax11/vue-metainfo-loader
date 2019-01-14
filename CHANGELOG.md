# [2.0.0](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.5.0...v2.0.0) (2019-01-14)


### Bug Fixes

* **CI:** Fix prepush hook declaration ([1b42565](https://github.com/Crazymax11/vue-metainfo-loader/commit/1b42565))
* **Parser:** Dont try to parse any props declaration in file ([dba9035](https://github.com/Crazymax11/vue-metainfo-loader/commit/dba9035))


### Features

* **ExtractMeta:** Convert customTypes to array ([bd7d374](https://github.com/Crazymax11/vue-metainfo-loader/commit/bd7d374))
* **ExtractMeta:** Extract several customTypes from single JSDoc ([3b8e270](https://github.com/Crazymax11/vue-metainfo-loader/commit/3b8e270))
* **ExtractMeta:** Merge few one line comments into one ([872d38e](https://github.com/Crazymax11/vue-metainfo-loader/commit/872d38e))
* **ExtractMeta:** Remove comments and tags, convert props and events to arrays ([2076dc9](https://github.com/Crazymax11/vue-metainfo-loader/commit/2076dc9))
* **ExtractMeta:** Remove unnecessary dash before event description ([32423d8](https://github.com/Crazymax11/vue-metainfo-loader/commit/32423d8))
* **Loader:** Extracts component meta to component definition instead of separate import statement ([dbbbfea](https://github.com/Crazymax11/vue-metainfo-loader/commit/dbbbfea))
* **Parser:** Add description of typedef to customTypes ([28ad734](https://github.com/Crazymax11/vue-metainfo-loader/commit/28ad734))
* **Parser:** Extract JSDoc comment before validator and default ([3be8a47](https://github.com/Crazymax11/vue-metainfo-loader/commit/3be8a47))
* **Parser:** Parse JSDoc events definition and stores it to meta.events and parse some AST ([09a85e8](https://github.com/Crazymax11/vue-metainfo-loader/commit/09a85e8)), closes [#6](https://github.com/Crazymax11/vue-metainfo-loader/issues/6) [#8](https://github.com/Crazymax11/vue-metainfo-loader/issues/8)
* **Parser:** Renames hasValidator to validator ([8e77572](https://github.com/Crazymax11/vue-metainfo-loader/commit/8e77572))
* **Parser:** Store component events in object instead of array ([1d93049](https://github.com/Crazymax11/vue-metainfo-loader/commit/1d93049)), closes [#5](https://github.com/Crazymax11/vue-metainfo-loader/issues/5)
* **Parser:** Store default as source code ([9f4f0a5](https://github.com/Crazymax11/vue-metainfo-loader/commit/9f4f0a5))
* **Parser:** Store typedefs to customTypes ([adb4efa](https://github.com/Crazymax11/vue-metainfo-loader/commit/adb4efa)), closes [#7](https://github.com/Crazymax11/vue-metainfo-loader/issues/7)
* **Parser:** Store validator code to validator property of component metainfo ([9a1ba93](https://github.com/Crazymax11/vue-metainfo-loader/commit/9a1ba93))
* **props:** Get props types from jsdoc ([bcc70be](https://github.com/Crazymax11/vue-metainfo-loader/commit/bcc70be))
* **Storybook:** Add skeleton for future storybook components ([ccb3cbd](https://github.com/Crazymax11/vue-metainfo-loader/commit/ccb3cbd))
* **Storybook:** WIP Add storybook infrastructure to the project ([e748e52](https://github.com/Crazymax11/vue-metainfo-loader/commit/e748e52))
* **Storybook:** WIP: Add storybook infrastructure ([5d91b07](https://github.com/Crazymax11/vue-metainfo-loader/commit/5d91b07))
* **Tests:** Add test for fixed bug ([c56854d](https://github.com/Crazymax11/vue-metainfo-loader/commit/c56854d))


### BREAKING CHANGES

* **ExtractMeta:** Tags and comments are removed, props and events are arrays now
* **props:** Types of props will be get from jsdoc too
* **Loader:** Loader can't be used inline
* **Parser:** Validator and default are objects now
* **Parser:** Default now stored as source code instead of boolean
* **Parser:** Validator property now contain validator source code, if it's defined
* **Parser:** Renames meta property hasValidator to validator
* **Parser:** Doctrine AST moved out from several cases
* **Parser:** Events were stored as array before, now it's an object



# [1.5.0](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.3.2...v1.5.0) (2018-12-26)



## [1.3.2](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.3.1...v1.3.2) (2018-11-30)


### Bug Fixes

* 🐛 supports a default prop value provided as function ([7e205f5](https://github.com/Crazymax11/vue-metainfo-loader/commit/7e205f5))



## [1.3.1](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.3.0...v1.3.1) (2018-09-04)



# [1.3.0](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.2.0...v1.3.0) (2018-09-02)



# [1.2.0](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.1.2...v1.2.0) (2018-09-02)



## [1.1.2](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.1.1...v1.1.2) (2018-08-27)



## [1.1.1](https://github.com/Crazymax11/vue-metainfo-loader/compare/v1.1.0...v1.1.1) (2018-08-27)



# 1.1.0 (2018-08-27)



