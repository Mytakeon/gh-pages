---
title: Using a pre-commit hook to run Flake8 on staged files
date: '2022-09-29'
tags:
  - 'python'
  - 'git'
---

<script>
 import Prism from "$lib/components/Prism.svelte"
 const examplePath = "https://raw.githubusercontent.com/Mytakeon/example-pre-commit-hook/main";
</script>

Git hooks are "_a way to fire off custom scripts when certain important actions occur._" (from [git-scm.com](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)).
This is a very short post that shows how to use a pre-commit hook to analyse the changes within your code with [Flake8](https://flake8.pycqa.org/en/latest/index.html#) before committing them.

You can follow along in the [example repository](https://github.com/Mytakeon/example-pre-commit-hook).

1. By default, git will look for hook scripts in the `.git/hooks` folder, which is itself not tracked by git. To have hooks that are tracked and shared with the rest of the team, you can place them somewhere else in the repository and then use the [core.hooksPath](https://git-scm.com/docs/git-config#Documentation/git-config.txt-corehooksPath) configuration option to tell git where the hooks folder is located. We'll use the `hooks` folder in the root of the repository:

```bash
cd myproject
git config core.hooksPath hooks
```

<br />

2. In your repository, create a `hooks` folder and add a pre-commit file:

<Prism link={`${examplePath}/hooks/pre-commit`}/>

This script will run flake8 on all the files that are staged for commit. If there are any errors, the commit will be aborted. In practice, you may want to put the check logic in a separate file (e.g. `hooks/lint.py`).

3. Make the script executable:

```bash
chmod +x hooks/pre-commit
```

<br />

4. Modify and stage a python file, then try to commit it:

```cmd
> D:/repositories/pre-commit-lint> git commit -m "test"
Running pre-commit hook...
Running linter...
test.py:1:1: E266 too many leading '#' for block comment
test.py:3:8: E225 missing whitespace around operator
test.py:3:11: W292 no newline at end of file
```

Oftentimes, people will also use hook libraries, such as [pre-commit](https://pre-commit.com/) or [Husky](https://typicode.github.io/husky/#/), which can be convienent to setup, organize and share hooks. It is good to know, before jumping to using these, that hooks are easy to setup without any additional libraries.
