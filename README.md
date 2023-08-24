# Rick and Morty CRM

<div align="center">

React SPA that searches, filters and displays characters from the Rick and Morty API as contacts.

[![Build](https://img.shields.io/github/actions/workflow/status/chris-susantooo/rick-and-morty-crm/ci.yml)](https://github.com/chris-susantooo/rick-and-morty-crm/actions) [![Vite](https://github.com/aleen42/badges/raw/master/src/vitejs.svg)](https://vitejs.dev/) [![React](https://badges.aleen42.com/src/react.svg)](https://react.dev/) [![React Router](https://badges.aleen42.com/src/react-router.svg)](https://reactrouter.com/en/main) [![Tailwind CSS](https://badges.aleen42.com/src/tailwindcss.svg)](https://tailwindcss.com/) [![Renovate Enabled](https://camo.githubusercontent.com/360c8015d9ce49450a3af7d9782f7035ef677763b800bea727b90c37f873433e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656e6f766174652d656e61626c65642d2532333141314636433f6c6f676f3d72656e6f76617465626f74)](https://gitlab.huolala.cn/group-llm/renovate-force) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

</div>

## 🌲 Project structure

```bash
├── public
└── src
    ├── components
    │   ├── Toast
    │   └── Typography
    ├── hooks
    ├── routes
    │   └── Contact
    │       ├── Details
    │       │   └── Episodes
    │       ├── List
    │       └── __mocks__
    └── utils
```

### `/routes`

Container components connected to `react-router` are placed in `/routes` folder.

### `/hooks`

Reusable hooks and hooks that consume the `rickmortyapi` are placed in `/hooks` folder.

### `/components`

UI components are placed in `/components` folder. Some are generated from [shadcn/ui](https://ui.shadcn.com/).

### Unit tests

Unit tests are written to cover each route, they are collocated within the same directory, with file names ending with `.test.tsx`.

## 👩🏻‍💻 Local development

Node 18+ and yarn v1 is recommended. Install dependencies:

```bash
yarn
```

Serve locally:

```bash
yarn dev
```

## ✅ Linting

```bash
yarn lint
```

## 📝 Testing

Powered by [Vitest](https://vitest.dev/guide/). To run unit tests on updated files in watch mode:

```bash
yarn test
```

Run all tests and calculate coverage:

```bash
yarn coverage
```
