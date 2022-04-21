---
title: Git cheat sheet
date: '2022-04-21'
tags:
  - 'git'
---

Over the years, I've curated a list of Git commands I often needed to look up, for instance, "_how to rename both local and remote branch_". It's not comprehensive or beginner friendly, as I am mainly just scratching my own itch - but you might find some quick answers.

## Re-writing history

- Apply staged changes to your last commit and edit its commit message: `git commit --amend`
- Rebasing: apply all the commits of the current branch to the master branch: `git rebase master`.
- Interactive rebase onto the previous 3rd-to-last commit: `git rebase -i HEAD~3`. Enables to edit/remove/rename etc. the last 3 commits - useful if you want to cleanup your commit history before opening your PR.
- Push, even though histories are different: `git push --force`

## Branches

- Create and checkout a new branch "feature" from the current branch: `git checkout -b feature`
- Checkout the previous branch: `git checkout -`
- Checkout _some_ files from master back into your local branch `git checkout master -- ./src/module1` (useful to revert part of a PR back to its original state)
- You can refer to last branch name in any command by using `@{-1}`
- View all local branches: `git branch `
- Remove a local branch: `git branch -d <branch_name>`.To force remove it: `git branch -D <branch_name>` (useful to remove a branch that has never been merged)
- Remove a remote branch: `git push --delete <remote_name> <branch_name>`
- Rename the current local branch: `git branch -m new-name`.
- Rename a remote branch: you'll have to remove the old remote branch, unset it from your local branch, and push a new one ([source](https://stackoverflow.com/a/30590238)).
- Remove old local branches: List branches by last commit date: `git branch --sort=committerdate | xargs echo`, then can copy/paste the older ones into `git branch -D b1 b2...` ([source](https://stackoverflow.com/a/49998249)).

## Stashes

- Stash: `git stash`
- Pop: `git stash pop`
- Stash including files just added and not tracked by git: `git stash -u|--include-untracked`
- Remove all stashes older than 40 days `git reflog expire --expire-unreachable=40.days refs/stash`
- Show your latest stash as a diff in the console: `git stash show -p 0`
- Use `--` to specify which files to stash, for example `git stash -- ./src/tests` to stash all the changes in your tests folder.

## Remotes

- Adding a remote: `git remote add remote_name remote_path`
- Removing a remote: `git remote rm remote_name`
- Show list of remotes: `git remote -v`
- Set the upstream remote for this branch: `git push --set-upstream`. To unset it: `git branch --unset-upstream`

## Miscellaneous

- Do a shallow clone (only last commit of the main branch): `git clone --depth 1`
- Init for servers: `git init --bare` (initializes only the `.git` folder, without a working tree)
- Create a new working tree: `git worktree add <path> <branch>`
- Set the current branch to be branch A: `git reset --hard A`
- Remove all ignored files from repository: `git clean -ffdx` (can be useful to get a "clean" state on your repository by removing everything not tracked by git: build, dependencies, temporary files, etc.)
- Rename a file: `git mv old_filename new_filename` - in case changes are seen as the old file being deleted and a new one being added.
- Remove all local changes: `git checkout .`
- View all the changes that haven't been pushed to master yet: `git log origin/master..HEAD `
- Reset local branch to its remote branch: `git reset --hard origin/branch_name`
- Remove a file you accidentally tracked, after adding it to .gitignore: `git rm --cached file1.txt`
- Use a new login: `git config credential.remote_name.username YourUserName`
