# Contributing Guide

<div align="center">

[![Linting: ESLint](https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white)](https://github.com/eslint/eslint)
[![Testing: Jest](https://img.shields.io/badge/jest-C21325?logo=jest&logoColor=white)](https://github.com/facebook/jest)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

</div>

Thank you for considering a contribution to `alphanumeric-encoder`! Before submitting your contribution, please take a moment to read through this document. This guide documents the standards, tooling, and process that goes into the CI/CD pipeline.

 


<details open="open">
    <summary><b>Table of Contents</b></summary>

<!-- toc -->

- [Continuous Integration/Continuous Deployment](#continuous-integrationcontinuous-deployment)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)
  * [Project Structure](#project-structure)
  * [Linting](#linting)
  * [Testing](#testing)
  * [Documentation](#documentation)
  * [Commits](#commits)
    + [Types](#types)
    + [Scopes](#scopes)
    + [Versioning Triggers](#versioning-triggers)

<!-- tocstop -->

</details>
 


## Continuous Integration/Continuous Deployment

`alphanumeric-encoder` uses [Semantic Versioning](https://semver.org/).

## Issue Reporting Guidelines


## Pull Request Guidelines


## Development Setup


### Project Structure


### Linting


### Testing


### Documentation


### Commits

Commits follow the [Angular Commit Message](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) standard. Refer to their documentation for further guidance. Differences that are specific to this project are detailed below:

    <type>(<scope>): <short summary>
    │       │             │
    │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
    │       │
    │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
    │                          elements|forms|http|language-service|localize|platform-browser|
    │                          platform-browser-dynamic|platform-server|router|service-worker|
    │                          upgrade|zone.js|packaging|changelog|docs-infra|migrations|ngcc|ve|
    │                          devtools
    │
    └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test

#### Types

Must be one of the following:

- `build`: Changes that affect the build system, package scripts, or external dependencies (i.e. adds/removes/modifies/updates any project, peer, or dev dependency)
- `ci`: Changes to CI configuration files and scripts (e.g. release configs, YAML scripts)
- `docs`: Documentation only changes
- `feat`: Adds a new feature
- `fix`: Fixes a bug in an existing feature
- `perf`: A code change that improves performance
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Add missing tests or correct existing tests

#### Scopes

If used, the scope must be one of the following supported scopes:

- `api`: Any documentation that helps developers or end users understand how to better employ a tool or feature
- `readme`: Contributions to the main [README.md](https://github.com/M-Scott-Lassiter/Alphanumeric-Encoder#alphanumeric-encoder)
- `contributing`: Contributions to this guidance
- `license`: Changes to terms or copyright status within the [license](/../../blob/main/LICENSE)
- `security`
- `package`

#### Versioning Triggers

Pushes to the main branch causes [`semantic-release`](https://github.com/semantic-release/semantic-release#commit-message-format) to check all commits since the last version for any triggers that would cause a new version:
- Patch
  - `build`
  - `fix`
  - `perf`
  - `(API)`
  - `(LICENSE)`
  - `(SECURITY)`
- Version
  - `feat`
- Major
  - `BREAKING CHANGE`