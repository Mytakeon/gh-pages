---
title: 'Quick PR helper for Azure DevOps'
date: '17/03/2022'
tags:
  - 'powershell'
  - 'git'
---

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