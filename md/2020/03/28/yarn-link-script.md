---
layout: post
title:  A simple `yarn link` status script to keep you from going crazy
date:   2020-03-28
published: true
tags:
- react
- yarn
- yarn link
- development 
---

As a library developer, managing your `yarn link`ed libraries can be tough. I often have my front-end library yarn-linked into one or more of my company's FE apps locally to test out changes, but there's no simple utility to tell you what libraries are currently yarn-linked, much less to tell you whether there are any yarn-linked packages in use in your current app. If something is broken, it could be difficult to tell if it's broken _in the deployed version_ of the library or _in the local version I've yarn linked_. Did I yarn link the library into this project last week and forget to remove the link?

Even though [peer dependencies work with `yarn link` as of yarn v2](https://dev.to/arcanis/introducing-yarn-2-4eh1#improved-peer-dependency-links), I used to go through a lot of annoying trouble to answer the simle question, _what is currently yarn linked, and what yarn links are currently used in this project?_

So I created this bash script. I have this function defined in my dotfiles; I can run `yarnlinks` in any directory on my mac and see (1) what libraries are currently being linked (and where they're linked from) and (2) what libraries, if any, are currently being used as yarn links in the current yarn project.

The yarnlinks script:

<script src="https://gist.github.com/chadlavi/6b74e9ccbbf600c3bd1ee4f081039d95.js"></script>