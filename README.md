# Fork of Typescript

This fork contains a few modifications to Typescript to preview the try-expression-proposal syntax. It is not intended to be used in production.

## To play around with it for yourself

- Create a new npm project folder using `npm init`.
- `npm install` the built tgz file from the releases page of this repository.
  - https://github.com/Arlen22/TypeScript/releases/download/arlen22-dev-0.2/typescript-5.8.0-arlen22-0.2.tgz
- In VSCode, create a new typescript file and open it to enable the Typescript engine, then run the command "Typescript: Select Typescript Version" and select the version from your node_modules folder.
- Create a tsconfig.json file with `strictNullChecks` enabled.
- If you run `tsc` it will just pass the syntax through to the Javascript file.

## The following code should be valid

```ts
const [error, data]: TryResult<1> = try 1;
if (error) {
  const e: TryError = error;
  const r: undefined = data;
} else {
  const e: undefined = error;
  const r: 1 = data;
}
// try at the beginning of an arrow function body
const [error1, data1] = (() => try someExpression() ?? otherexpression() ? true : false)();
// regular assignment, terminated by comma, semicolon, or other statement.
const [error2, data2] = try someExpression() ?? otherexpression() ? true : false;
// used as an array value, terminated by comma or end of array
const [[error3, data3]] = [try someExpression() ?? otherexpression() ? true : false];
// used as an object value, terminated by comma or end of object
const { res: [error4, data4] } = { res: try someExpression() ?? otherexpression() ? true : false }
```

## Changelog

### 0.2

- Added the try-expression-proposal syntax to the parser basically copying the yield syntax.

### 0.1

- Failed attempt that only partly worked.

# TypeScript

[![GitHub Actions CI](https://github.com/microsoft/TypeScript/workflows/CI/badge.svg)](https://github.com/microsoft/TypeScript/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/typescript.svg)](https://www.npmjs.com/package/typescript)
[![Downloads](https://img.shields.io/npm/dm/typescript.svg)](https://www.npmjs.com/package/typescript)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/microsoft/TypeScript/badge)](https://securityscorecards.dev/viewer/?uri=github.com/microsoft/TypeScript)

[TypeScript](https://www.typescriptlang.org/) is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. Try it out at the [playground](https://www.typescriptlang.org/play/), and stay up to date via [our blog](https://blogs.msdn.microsoft.com/typescript) and [Twitter account](https://twitter.com/typescript).

Find others who are using TypeScript at [our community page](https://www.typescriptlang.org/community/).

## Installing

For the latest stable version:

```bash
npm install -D typescript
```

For our nightly builds:

```bash
npm install -D typescript@next
```

## Contribute

There are many ways to [contribute](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md) to TypeScript.

- [Submit bugs](https://github.com/microsoft/TypeScript/issues) and help us verify fixes as they are checked in.
- Review the [source code changes](https://github.com/microsoft/TypeScript/pulls).
- Engage with other TypeScript users and developers on [StackOverflow](https://stackoverflow.com/questions/tagged/typescript).
- Help each other in the [TypeScript Community Discord](https://discord.gg/typescript).
- Join the [#typescript](https://twitter.com/search?q=%23TypeScript) discussion on Twitter.
- [Contribute bug fixes](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see
the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com)
with any additional questions or comments.

## Documentation

- [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Programming handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Homepage](https://www.typescriptlang.org/)

## Roadmap

For details on our planned features and future direction, please refer to our [roadmap](https://github.com/microsoft/TypeScript/wiki/Roadmap).
