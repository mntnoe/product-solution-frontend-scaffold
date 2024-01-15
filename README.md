# Product/Solution Frontend Scaffold (WIP)

This repository is meant to serve as inspiration for product oriented
startups/scaleups who need to build/maintain multiple products and/or solutions.

**Tried and tested**

- The approaches are based on more than a decade of experience, and has been
  through multiple iterations.

**Balance velocity and quality**

- As a fully typed monorepo, you can make cross-cutting refactors without
  fearing regressions. As long as you remember to communicate on your team(s),
  of course.
- Use TypeScript composite projects to make sure the architectural layer bounds
  are respected.
- **TODO:** Describe feature flags and trunk based development.
- **TODO:** Describe feature slicing.

**Manage customer tailored behavior**

- If your customers are large, chances are they need a custom solution to
  satisfy their needs. The needs can also change over time, and can get out of
  hand. By storing all configuration in a central place, it is easy to get an
  overview of what settings are applied where at any given point.
- All tooling is run through a single entry point (run.js) to be sure the
  correct configuration profile is applied.

## Getting started

Note that you can use this as a scaffold for your codebase, or just take what
applies to your use case.

- Install the desired version of [node](https://nodejs.org/download/release/)
  and [pnpm](https://pnpm.io/installation#using-corepack) (see/update "engines"
  in `package.json`), and install dependencies using `pnpm install`.
- Explore the build script commands listed from `./run.js --help`.
- Explore the code. The documentation is placed as close to the relevant code as
  possible.

## Build Script as a First Class Citizen

There is a trend in delegating control to a framework or build system. For
small projects, frameworks like `Next.js` and `Vite` can quickly provide a dev
server, bundling etc. For large projects, build systems like `Nx` and `Lerna`
can help organizing the codebase into isolated packages.

No technology is perfect for every use case, however. Frameworks like `Next.js`
and `Vite` have limited support for configuration management, and does not
support multiple products/solutions. While build systems like `Nx` and `Lerna`
supports multiple products/solutions, they are still lacking for configuration
management, and the way packages are isolated makes it difficult to maintain
velocity in a startup/scaleup.

This can be addressed by treating the build script as a first class citizen. At
the cost of some boilerplate, we can set up configuration profiles before
delegating control to build systems or other tooling via their `Node.js` APIs.
