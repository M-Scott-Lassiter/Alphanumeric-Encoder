<div align="center">

# Alphanumeric Encoder

[![Tests](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/test.yml/badge.svg)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/test.yml)
[![Build](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/publish.yml/badge.svg)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/actions/workflows/publish.yml)
[![codecov](https://codecov.io/github/M-Scott-Lassiter/Alphanumeric-Encoder/branch/main/graph/badge.svg?token=MLCXIHQJGA)](https://codecov.io/github/M-Scott-Lassiter/Alphanumeric-Encoder)
![Dependency status](https://img.shields.io/librariesio/release/npm/alphanumeric-encoder)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/alphanumeric-encoder)
[![Open Issues](https://img.shields.io/github/issues/m-scott-lassiter/alphanumeric-encoder/bug)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/labels/bug)
 

![Maintained](https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](/../../blob/main/CONTRIBUTING.md)

____
[![NPM Version](https://img.shields.io/npm/v/alphanumeric-encoder)](https://www.npmjs.com/package/alphanumeric-encoder)
![NPM Package Size](https://img.shields.io/bundlephobia/min/alphanumeric-encoder)
[![License](https://img.shields.io/github/license/M-Scott-Lassiter/Alphanumeric-Encoder)](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder/blob/main/LICENSE)

</div>

<details open="open">
    <summary><b>Table of Contents</b></summary>

<!-- Note: The toc tags mark autogenerated content. Do not manually modify the content here -->

<!-- toc -->

- [:book: Getting Started](#book-getting-started)
  * [Purpose](#purpose)
  * [Install as an NPM Package](#install-as-an-npm-package)
  * [Use in Javascript](#use-in-javascript)
- [:gear: API Documentation](#gear-api-documentation)
- [:hammer_and_wrench: Node and Operating System Support Policy](#hammer_and_wrench-node-and-operating-system-support-policy)
- [:clipboard: License and Development](#clipboard-license-and-development)
- [:envelope: Contact](#envelope-contact)

<!-- tocstop -->

</details>

***

## :book: Getting Started

### Purpose

`alphanumeric-encoder` is a lightweight library with no dependencies. It can encode an integer into a letter representation, and decode the letter back into a number.

This is useful for converting letter indexes (used by people) to numbers (used by computers). Examples include:
- Spreadsheet columns (e.g. Microsoft Excel's end column is "XFD" which corresponds to 16384)
- Chess boards use letters and numbers to identify the grid
- Geographic grid reference systems

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

## :gear: API Documentation


## :hammer_and_wrench: Node and Operating System Support Policy

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

Both [contributions](/../../blob/main/CONTRIBUTING.md) and [bug reports](link) welcome.

Leave a :star2: if you find this project useful!

</div>

## :envelope: Contact

Maintained by M. Scott Lassiter.

[![GitHub Badge Profile](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/M-Scott-Lassiter)
[![Twitter Badge Profile](https://img.shields.io/badge/Twitter-1DA1F2?style=plastic&logo=twitter&logoColor=white)](https://twitter.com/MScottLassiter)
[![LinkedIn Badge Profile](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)]( https://www.linkedin.com/in/mscottlassiter)
[![Stackoverflow Badge Profile](https://img.shields.io/badge/stackoverflow-orange.svg?longCache=true&style=plastic&logo=stackoverflow&logoColor=white)](https://stackoverflow.com/users/6186333/sandpiper)