## [1.4.0](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.3.0...v1.4.0) (2022-05-02)


### :gift: Feature Changes

* add ability to instantiate the class using an optional config object in the constructor ([8dc230b](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/8dc230b164a2689b49d6a7f8b00f51348da8c3f8)), closes [#35](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/35)


### :dart: Test Changes

* add tests verifying the optional config object works as expected ([f7f7de6](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/f7f7de6681c4bb3ec1083f346d691d4d36795af3)), closes [#35](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/35)

## [1.3.0](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.2.0...v1.3.0) (2022-05-01)

### :gift: Feature Changes

-   add ability to use lower case letters in the dictionary ([a1b7066](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/a1b7066be92af91ed82cb2f9a1e37dbd19914659)), closes [#31](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/31)

### :building_construction: Build Changes

-   add @types/jest for type checking support in the testing suite ([56ff52d](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/56ff52d01e1ef018e68f89615f1e074c7a06248a))

## [1.2.0](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.1.1...v1.2.0) (2022-04-30)

### :lady_beetle: Bug Fixes

-   add error handling for excessively large integers ([bc725f1](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/bc725f17e423910a0d64a20e56f2fa4c5064bce9)), closes [#28](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/28)

### :building_construction: Build Changes

-   update dev-dependency subdependencies (routine update) ([d918311](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/d9183113ef2512895bfdf2a9c5d22fbcde5547d8)), closes [#28](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/28)

### :gift: Feature Changes

-   add the `resetDefaultDictionary` method ([9166bd8](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/9166bd87ae07874b5bef3b60764e93984c326e1d)), closes [#29](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/29)

### :dart: Test Changes

-   add applicable test for the `resetDefaultDictionary` method ([a67ef00](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/a67ef002b45d98fc9a6fb85b492f5e1eb0459517)), closes [#29](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/29)
-   add tests to verify errors thrown for excessively large integers ([a9f39d6](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/a9f39d64bb21c5a44a572eb6c449f3acd21a37c6)), closes [#28](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/28)

### [1.1.1](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.1.0...v1.1.1) (2022-04-28)

### :building_construction: Build Changes

-   add Commitizen and Husky support ([c96bb37](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/c96bb37621e06ccd86f027e46737738715a998c8)), closes [#25](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/25) [#26](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/26)
-   add commitizen support for developers ([cfa7276](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/cfa7276e43a9727f5f4bd1e09bab798a1ba908db)), closes [#25](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/25)
-   configure lint-staged and pre-commit hook ([00b362a](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/00b362ab60ead4588d99d141978679b615922fc0)), closes [#26](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/26)
-   remove 'build' as a patch trigger for semantic-release ([4624ddb](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/4624ddba36beca2156a51d7e6334fadaf0471ed8))
-   remove extra Github release files from semantic-release config ([fcc1942](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/fcc19426ef2766390721a962caf0717dc2c96917))

## [1.1.0](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.0.5...v1.1.0) (2022-04-26)

### :building_construction: Build Changes

-   add Airbnb style guide to the ESLint configuration ([c30eac9](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/c30eac9ce98e3f564343ac5a83a1969e14e82430)), closes [#20](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/20)
-   add Prettier for code formatting ([398dc54](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/398dc5416133df3b252fa429bf040293295955da)), closes [#21](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/21)

### :lady_beetle: Bug Fixes

-   remove unnecessary files from distribution ([a40e6be](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/a40e6beab4d9d2bb076acfa7b08e85d2d957ec0a)), closes [#22](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/22)

### :gift: Feature Changes

-   add engine support for Node v10.x ([a04bd74](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/a04bd747b5e54c5c392ee308f9ceeeb4bfe27cc8)), closes [#23](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/23)
-   add support for Node v18.x ([6056d72](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/6056d72a9d81c1db9bdaee6f4d06eda6af45e75b)), closes [#23](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/23)

### [1.0.5](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.0.4...v1.0.5) (2022-04-24)

### :building_construction: Build Changes

-   add a build script to the package ([51016bf](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/51016bf462f7e851635a38d7b2193b9bbfc0b0c2)), closes [#18](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/18)
-   update the CD scripts to run `build` ([15f8d48](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/15f8d483f29bf3b5afdd9810b6d03a7f70c98f02)), closes [#18](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/18)

### [1.0.4](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.0.3...v1.0.4) (2022-04-24)

### :building_construction: Build Changes

-   add conventionalcommits preset to release-notes-generator ([12e499d](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/12e499d1260c7d1d8a3d2f0c5388c71f70bba985)), closes [#4](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues/4)

### [1.0.3](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.0.2...v1.0.3) (2022-04-23)

### [1.0.2](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.0.1...v1.0.2) (2022-04-23)

### [1.0.1](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/compare/v1.0.0...v1.0.1) (2022-04-21)

### Bug Fixes

-   Add a `Test` Github badge to the README. Used fix to test CI/CD pipeline ([e31c8f7](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/commit/e31c8f768c407e62a15d85f89fdfb807f1fd1eb0))
