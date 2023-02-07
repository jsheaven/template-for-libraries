<h1 align="center">template-name</h1>

> Explains what it does

<h2 align="center">User Stories</h2>

1. As a developer, I want to use TemplateName for X

2. As a developer, I don't want to do Y

<h2 align="center">Features</h2>

- ✅ Does X and Y
- ✅ Available as a simple API and simple to use CLI
- ✅ Just `136 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Example usage (CLI)</h2>

`npx template-name templateName --foo X`

> You need at least version 18 of [Node.js](https://www.nodejs.org) installed.

<h2 align="center">Example usage (API, as a library)</h2>

<h3 align="center">Setup</h2>

- yarn: `yarn add template-name`
- npm: `npm install template-name`

<h3 align="center">ESM</h2>

```ts
import { templateName } from 'template-name'

const result = await templateName({
  foo: 'X',
})
```

<h3 align="center">CommonJS</h2>

```ts
const { templateName } = require('template-name')

// same API like ESM variant
```
