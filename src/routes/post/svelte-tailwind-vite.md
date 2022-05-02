---
title: Setting up a Svelte project with Vite and Tailwind
date: '2022-05-02'
tags:
  - 'svelte'
  - 'tailwind'
---

<script>
 import Prism from "$lib/components/Prism.svelte"
 const templateRepoPath = "https://raw.githubusercontent.com/Mytakeon/vite-svelte-tailwind/main";
</script>

Here is a quick overview of how to create a Svelte project with [Vite](https://vitejs.dev/), Typescript and [Tailwind](https://tailwindcss.com/). You can view the template on [Github](https://github.com/Mytakeon/vite-svelte-tailwind), but if you want to do the conversion from scratch, or convert an existing app, here are the steps:

1. Run `npx create vite myproject` to scaffold a project using Vite. Select `svelte`, then `svelte-ts`.
1. Install the dependencies: `cd myproject && pnpm install` (or `npm` or `yarn`).
1. Install tailwind and its required dependencies:

   `pnpm add -D postcss tailwindcss autoprefixer`.

   [Postcss](https://postcss.org/) is an NPM package used to transform CSS, for example to transpile to future CSS syntax or for linting. Postcss supports plugins, and Tailwind is a Postcss plugin. [Autoprefixer](https://autoprefixer.github.io/) is another plugin that Tailwind depends on (it parses your CSS to add [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) (e.g. `-webkit-` for Chrome) to it).

1. Create the postcss configuration file:

   <Prism link={`${templateRepoPath}/postcss.config.js`}/>

1. Create the tailwind configuration file:

   <Prism link={`${templateRepoPath}/tailwind.config.cjs`}/>

1. Update the vite config to include `postcss`:

   <Prism link={`${templateRepoPath}/vite.config.js`}/>

1. Create `src/index.css` to contain the tailwind directives:

   <Prism link={`${templateRepoPath}/src/index.css`}/>

1. Import the css file in `main.ts` (or in `App.svelte`):

   <Prism link={`${templateRepoPath}/src/main.ts`}/>

1. Run the app with `pnpm dev` and start editing the `class`es elements in your Svelte components.
