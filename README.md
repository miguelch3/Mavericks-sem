# Mavericks 🚀

[![forthebadge made-with-typescript](https://img.shields.io/badge/made_with-typescript-3078c6?labelColor=fff&style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![forthebadge made-with-typescript](https://img.shields.io/badge/made_with-javascript-%23F7DF1E?labelColor=000&style=for-the-badge&logo=javascript)](https://www.javascript.com)
[![forthebadge react-framework](https://img.shields.io/badge/made_with-React-61dafb?labelColor=32363e&style=for-the-badge&logo=react&logoColor=%2361DAFB&logoWidth=30)](https://reactjs.org/)
![Next JS](https://img.shields.io/badge/made_with-Next-black?style=for-the-badge&logo=next.js&logoColor=white)
[![forthebadge uses-husky](https://img.shields.io/badge/uses-Husky-ececec?labelColor=32363e&style=for-the-badge&logo=)](https://typicode.github.io/husky/)
[![forthebadge commitizen-friendly](https://img.shields.io/badge/commitizen-friendly-green?labelColor=32363e&style=for-the-badge&logo=git)](https://www.npmjs.com/package/commitizen)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

**Mavericks** is a **merchant onboarding web application** that provides a
streamlined and efficient process for businesses to onboard new merchants.

---

## 📌 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Version Control](#-version-control)
  - [Gitflow Workflow](#-gitflow-workflow)
  - [Commit Formatting](#-commit-formatting)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
  - [Workspaces](#-workspaces)
- [Project Scripts](#-project-scripts)
- [E2E Testing](#-e2e-testing)
- [Additional Notes](#-additional-notes)

---

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org/)** - React framework for server-side rendering
- **[Ant Design](https://ant.design/)** - UI component library
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[next-translate](https://github.com/aralroca/next-translate)** -
  Internationalization
- **[React Query](https://tanstack.com/query/latest)** - Data fetching and
  caching library for React

---

## 🔗 Prerequisites

- **Node.js** `>= 20.x`
- **Yarn (Classic)** `>= 1.x` (Optional, but recommended)

---

## 🔖 Version Control

### 🛤️ Gitflow Workflow

This project follows the **Gitflow branching model** to maintain a clean commit
history and streamline development.

**References:**

- [Gitflow Documentation](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Gitflow CLI Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

### 🎨 Commit Formatting

We follow **Conventional Commits** along with **Gitmoji** to ensure clear and
structured commit messages.

**References:**

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Gitmoji](https://gitmoji.dev/)

---

## 🚀 Getting Started

1. **Check Node.js version**:
   ```sh
   node -v
   ```
2. **Install Yarn globally** (if not installed):
   ```sh
   npm install -g yarn
   ```
3. **Install project dependencies**:
   ```sh
   yarn install
   ```
4. **Set up environment variables**:
   - Copy `.env.example` to `.env` and configure it.
5. **Start the development server**:
   ```sh
   yarn dev
   ```

---

## 📂 Project Structure

This project uses a **monorepo** structure with **Yarn Workspaces** to organize
code efficiently.

### 🏗️ Workspaces

#### 📦 `ui`

A library of **custom reusable components** designed for the web application.

#### 📦 `types`

A shared **TypeScript types and Zod schemas** package to ensure type safety
across the monorepo.

#### 📦 `store`

Handles **state management** for the application using **Zustand**.

#### 📦 `shared`

A utility package with **common helpers, utilities, and reusable functions**.

#### 📦 `api-hooks`

Contains **React Query hooks** for API interactions, making data fetching
easier.

#### 📦 `web`

The **Next.js web application**, which consumes all other packages.

---

## 🗂️ Project Scripts

### 🔧 Development

```sh
yarn dev              # Run all packages in development mode
yarn dev --filter=web # Run only the web app
```

### 📦 Build

```sh
yarn build              # Build all packages
yarn build --filter=web # Build only the web app
```

### ✅ Testing

```sh
yarn test           # Run unit tests
yarn cypress:open   # Run E2E tests with Cypress
```

### ⚙️ Utilities

```sh
 yarn type-check                # Run TypeScript type checking
 yarn format                    # Format files using Prettier
 yarn lint                      # Run ESLint to check for code style issues
 yarn ls-lint                   # Verify directory and file naming conventions
 yarn syncpack list-mismatches  # Check if packages used across the monorepo have version mismatches
 yarn syncpack fix-mismatches   # Fix version mismatches in dependencies
```

_Note: To run a command in a specific package, use:_

```sh
yarn workspace @mavericks/<workspace> <command>
```

_or_

```sh
yarn <command> --filter=@mavericks/<workspace>
```

---

## 🧪 E2E Testing

We use **Cypress** for end-to-end testing.

- **Run Cypress GUI:** `yarn cypress:open`
- **Run Cypress in CLI:** `yarn cypress:run`

For running specific tests:

```sh
yarn cypress:run --spec 'cypress/e2e/{filename}.spec.js'
```

---

## 🎯 Additional Notes

- **Enable debugging:** Add `SENTRY_IGNORE_API_RESOLUTION_ERROR=1` in `.env`
  (development only).
- **For more details, check the official documentation of each package used.**
