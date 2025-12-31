---
title: Hello submodules!
date: 2025-04-30
draft: false
---
I've put all my website content into its own private repo and am loading it as a Git submodule now, thanks to help from some [helpful](https://www.taniarascia.com/git-submodules-private-content/) [guides](https://dbushell.com/2024/07/19/github-private-submodules/)!

The plan is to start using Obsidian to create and edit content, then push it to GitHub with the [Obsidian Git](https://github.com/Vinzent03/obsidian-git) plugin and hopefully everything just updates. I'm not quite sure whether changes to the submodule will trigger the "parent" repo's GitHub Action to redeploy the site, which is partly why I'm writing this note; I want to check what happens and whether I need to manually redeploy something. If so, I need to find a way to have this trigger ✨ automagically ✨.

**Edit:** The repo seems tied to a specific version of the submodule, and didn't automatically pull the latest when I made changes. I think the easiest thing would be to setup some kind of cron job in GitHub Actions that runs the `git submodule update` command every 30 minutes or so (it could be longer; I don't publish very frequently) and redeploys if there are any changes. Hopefully that doesn't eat through my free tier usage limits.
