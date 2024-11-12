# Fork of Typescript

This fork contains a few modifications to Typescript to preview the try-expression-proposal syntax. It is not intended to be used in production.

## To play around with it for yourself
- Create a new npm project folder using `npm init`.
- Install the built tgz file from the releases page of this repository.
- In VSCode, create a typescript file and open it, then run the command "Typescript: Select Typescript Version" and select the version from your node_modules folder.
- Create a tsconfig.json file with `strictNullChecks` enabled.


## The following code should be valid (it is not yet):

```ts
const [error, data]: TryResult<1> = try 1;
if(error){
  const e: TryError = error;
  const r: undefined = data;
} else {
  const e: undefined = error;
  const r: 1 = data;
}
// throws because undefined is the value returned. This is how Javascript is designed.
const [error,data] = (() => try someExpression() ?? otherexpression() ? true : false, undefined)();
// regular assignment, terminated by comma, semicolon, or other statement.
const [error, data] = try someExpression()  ?? otherexpression() ? true : false;
// used as an array value, terminated by comma or end of array
const [[error, data]] = [try someExpression() ?? otherexpression() ? true : false];
// used as an object value, terminated by comma or end of object
const {res: [error,data]} = {res: try someExpression() ?? otherexpression() ? true : false}
// technically valid use of try (note the required parentheses)
// I really hate this but it does work this way.
const amount = balance + (try getAmount())[1];
```

## Changelog

### 0.1

- Added the expression syntax and typing to the parser, mostly copying `yield` expression code, so it should behave the same. This is more greedy than `await`. 
- BUG: I didn't completely copy the yield code, as I was using `await` first. So here are some places it doesn't work yet where yield does.
  - As an arrow function body `() => try 1`
  - In an array `[try 1]`
  - As an argument `test(try 1)`

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
