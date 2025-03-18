---
slug: browser-prefetching
title: Prefetching considered...harmful?
datePublished: 2025-03-17
---

I've been trying to get [prefetching](https://reactrouter.com/api/components/Link#prefetch) working in an app I'm building at the moment, but Firefox has been consistently ignoring my wishes and only fetching on click.

I looked in my `about:config` and, lo and behold, prefetching behaviour had been disabled. I didn't remember doing that? I turned it back on but it still didn't work. I checked `about:config` again, and it was disabled _again_. What??

To keep it short, [uBlock Origin](https://ublockorigin.com/) and [Decentraleyes](https://addons.mozilla.org/en-GB/firefox/addon/decentraleyes/)—I'm still not sure if I need both—each had a setting in them to disable prefetching behaviour. Apparently it's harmful, privacy-wise, because it allows the browser to connect to resources that would've otherwise been blocked.

What now, then? I probably want to keep prefetching disabled because I think I value my privacy that much, which means there's no point me implementing it. I'm going to look elsewhere for performance gains.
