
<div align="center">

# Alphanumeric Encoder
Encodes a number to a letter representation, or decodes it back.


    
[![Tests](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/test.yml/badge.svg)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/test.yml)
[![Build](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/publish.yml/badge.svg)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/publish.yml)
[![codecov](https://codecov.io/github/M-Scott-Lassiter/Alphanumeric-Encoder/branch/main/graph/badge.svg?token=MLCXIHQJGA)](https://codecov.io/github/M-Scott-Lassiter/Alphanumeric-Encoder)
![Dependency status](https://img.shields.io/librariesio/release/npm/alphanumeric-encoder)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/alphanumeric-encoder)
 [![Open Issues](https://img.shields.io/github/issues/m-scott-lassiter/alphanumeric-encoder/bug)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/issues)
 

![Maintained](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg)
 [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/CONTRIBUTING.md)

____
[![NPM Version](https://img.shields.io/npm/v/alphanumeric-encoder)](https://www.npmjs.com/package/alphanumeric-encoder)
![NPM Package Size](https://img.shields.io/bundlephobia/min/alphanumeric-encoder)
[![License](https://img.shields.io/github/license/M-Scott-Lassiter/Alphanumeric-Encoder)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/blob/main/LICENSE)

</div>

<details open="open">
    <summary><b>Table of Contents</b></summary>

  - TOC here

</details>

***

## Getting Started

### Purpose

`alphanumeric-encoder` is a lightweight library with no dependencies.

### Install as an NPM Package

```javascript
npm install alphanumeric-encoder
```

### Use in Javascript

```javascript
const alphanumericEncoder = require("alphanumeric-encoder")

const encoder = new alphanumericEncoder

console.log(encoder.encode(5))      // ’E’
console.log(encoder.encode(48))     // ‘AV’
console.log(encoder.encode(733))    // ‘ABE’

console.log(encoder.decode('A'))    // 1
console.log(encoder.decode('AC'))   // 29
console.log(encoder.decode('ANE'))  // 1045
```

***

## :book: API Documentation


## Node and Operating System Support Policy

This project supports [Long-Term Support, Current, and Maintenance](https://github.com/nodejs/Release) versions of node. Once a version reaches end of life, the CI scripts will no longer support them. Odd Node versions will only receive support while in a current status.

The test suite has successfully run on all combinations of:

- Node versions `12.x`, `14.x`, `16.x`, and `17.x`
- ![Windows Supported](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge=flat&logo=windows&logoColor=white)
![Mac Supported](https://img.shields.io/badge/Mac-000000?style=for-the-badge=flat&logo=apple&logoColor=white)
![Linux Supported](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge=flat&logo=linux&logoColor=black)

Older or newer Node versions and operating systems might support the library, but the tests have not verified other combinations.

***

## :clipboard: License and Development

`alphanumeric-encoder` and all other files in this repository are distributed as free and open-source software under the [MIT License](/../../blob/main/LICENSE), © 2022.

Both [contributions](/../../blob/main/CONTRIBUTIONS.md) and [bug reports](link) welcome.

Leave a :star: if you find this project useful!

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![Testing: Jest](https://img.shields.io/badge/jest-C21325?logo=jest&logoColor=white)](https://github.com/facebook/jest)
[![Linting: ESLint](https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white)](https://github.com/eslint/eslint)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

</div>

## Contact

<div align="center">
M. Scott Lassiter

[![GitHub Badge Profile](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/M-Scott-Lassiter)
[![Twitter Badge Profile](https://img.shields.io/badge/Twitter-1DA1F2?style=plastic&logo=twitter&logoColor=white)](https://twitter.com/MScottLassiter)
[![LinkedIn Badge Profile](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)]( https://www.linkedin.com/in/mscottlassiter)
[![Stackoverflow Badge Profile](https://img.shields.io/badge/stackoverflow-orange.svg?longCache=true&style=plastic&logo=stackoverflow&logoColor=white)](https://stackoverflow.com/users/6186333/sandpiper)

</div>