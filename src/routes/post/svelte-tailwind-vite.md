---
title: Setting up Vite, Svelte and Tailwind
date: '2022-05-05'
tags:
  - 'svelte'
  - 'tailwind'
---

<script>
 import Prism from "$lib/components/Prism.svelte"
 const templateRepoPath = "https://raw.githubusercontent.com/Mytakeon/vite-svelte-tailwind/main";
</script>

You can view the template on [Github](https://github.com/Mytakeon/vite-svelte-tailwind). If you want to repeat the steps yourself or convert an existing app, here are the steps:

1. Run `npx create vite myproject` to scaffold a project using [vite](https://vitejs.dev/). Select `svelte`, then `svelte-ts`.
1. `cd myproject && pnpm install` (or `npm` or `yarn`)
1. Install tailwind and its required dependencies: `pnpm add -D postcss tailwindcss autoprefixer`. [Postcss](https://postcss.org/) is a tool used to transform CSS.
   [Autoprefixer](https://autoprefixer.github.io/) is a plugin that Tailwind depends on. It parses your CSS to add [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) (e.g. `-webkit-` for Chrome) to it.
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
