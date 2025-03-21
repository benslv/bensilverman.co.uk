---
datePublished: 2024-09-17
title: Do your tests fail?
description: "Avoid false positives with this one quick trick!"
---

Posting this mainly as a reminder to myself.

It's probably not enough to write a unit test, check that it passes, and continue on with your day. You should also check that it can fail too. Make it expect something that's slightly different from what you _really_ want and see if it blows up in your face.

Otherwise, you might've just written the unit test equivalent of a [yes-man](https://www.merriam-webster.com/dictionary/yes-man) and it won't really provide any value for you or your meticulously-crafted test suite.
