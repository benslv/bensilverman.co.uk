---
slug: browser-extension
title: Developing browser extensions seems...hard?
datePublished: 2024-11-14
---

I'm building myself a bookmarks/read-it-later website to replace Instapaper and one requirements is saving links to it via a browser extension. (I also need to write an iOS app but that's another kettle of fish).

I didn't think it would be too bad: it's just JavaScript right? The problem lies in that there doesn't seem to be any form of intellisense for the WebExtensions API, so I have to spend half my time flicking back and forth between VSCode and the MDN docs to figure out what methods are available. Additionally, the development loop of manually loading your unpacked extension and having to monitor the browser console (Cmd-Shift-J) for logs seems quite slow?

Maybe I just haven't been at it long enough but I really hope I find a nicer way to do this.
