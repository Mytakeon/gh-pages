---
title: Using a pre-commit hook with flake8
date: '2022-09-29'
tags:
  - 'python'
  - 'git'
---

<script>
 import Prism from "$lib/components/Prism.svelte"
 const templateRepoPath = "https://raw.githubusercontent.com/Mytakeon/example-pre-commit-hook/main";
</script>

1. In your repository, create a `hooks` folder and add a pre-commit file (see [example repo](https://github.com/Mytakeon/example-pre-commit-hook)):

<Prism link={`${templateRepoPath}/hooks/pre-commit`}/>

2. Tell git where the hooks folder is located:

```bash
cd myproject
git config core.hooksPath hooks
```

3. Modify and stage a python file, then try to commit it:

```cmd
PS D:\repositories\pre-commit-lint> git commit -m "test"
Running pre-commit hook...
Running linter...
test.py:1:1: E266 too many leading '#' for block comment
test.py:3:8: E225 missing whitespace around operator
test.py:3:11: W292 no newline at end of file
```
