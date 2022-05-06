---
title: 'An NPM package to quickly create PRs'
date: '2022-03-17'
tags:
  - 'powershell'
  - 'git'
---

## Edit: published as an NPM package

This article was originally titled "_Quick PR helper for Azure DevOps_" (see following section), but I was inspired by [a podcast episode](https://changelog.com/jsparty/189) to publish it as an NPM package: https://www.npmjs.com/package/quickgitpr.

Not that NodeJS or JavaScript are particularly well suited for automation scripts - but NodeJS is cross-platform, and nowadays any developer has Node + NPM on their machine, I can't think of anything with a lower barrier of entry than to just running:

`npm install -g quickgitpr`

I am pretty happy with it, given the how simple it is, yet how many things it does for you (figure out the origin name, the default branch name, creates a new branch name, etc.).
I am looking forward to showing it off to some people to see if they find it useful as well.

---

## Quick PR helper for Azure DevOps

I often create small aliases or utilities to use Git in the CLI.
I use the following (super simple) function to speed-up the process of opening a pull request in Azure DevOps (ADO):

```powershell
Function quickpr($branchName, $message) {
    git checkout -b $branchName
    git add .
    git commit -m "$message"
    git push --set-upstream origin $branchName
    $remoteUrl = git remote get-url origin
    $createPRUrl = "$remoteUrl/pullrequestcreate?sourceRef=$branchName&targetRef=main"
    Start-Process $createPRUrl
}
```

_(note the hardcoded bits you might want to modify: the remote name - "origin" - and the target branch - "main", and of course the PR API that will vary depending on the Git service you're using)_

It will add and commit all your local changes, create then push a new branch, and finally open your default browser at the PR creation page, where you can update the title, description, add reviewers, etc.

I use it specifically when the PR is fairly small and making the changes takes 20/30 minutes at most.
I find it appropriate for example for configuration changes, nitpicks, dependency version bumps, etc., nothing that would require several commits and/or adding only some of the changed files.
It must save me about one minute per PR, and since it took me 5 minutes to write it, I'd say [it was worth the time](https://xkcd.com/1205/).
