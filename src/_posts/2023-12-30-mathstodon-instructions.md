---
title: "Instructions for using Mathstodon fork of Mastodon"
author: "Matthew W. Thomas"
layout: "post"
override:tags: ["tech", "webdev", "mastodon"]
date: "2023-12-30"
use_math: false
description: "Unofficial documentation for getting TeX support in Mastodon"
---

This is a short guide to document my experience in enabling TeX support in Mastodon by installing Christian Lawson-Perfect's [Mathstodon fork](https://github.com/christianp/mastodon/tree/mathstodon-4.2). As of the time of writing, this fork is based on Mastodon 4.2.3 and there are no official installation instructions. This guide assumes that you already have a functional installation of Mastodon 4.2.3. If you do not, you should follow the [Mastodon installation instructions](https://docs.joinmastodon.org/admin/install/). The instructions can likely be adapted for a fresh install.

All steps of this guide should be run as the mastodon user. If you are not logged in as the mastodon user, you can switch with `sudo -su mastodon`.

## Set up MathJax assets

The fork expects a custom version of MathJax to be publicly accessible from `/MathJax` on the interface domain. To set this up, we need to download MathJax and place it in the correct location. First, we need to create a directory to store the assets:

```sh
mkdir -p ~/overrides/MathJax && cd ~/overrides
```

Then, download and extract the files:

```sh
wget -qO- https://www.matthewthom.as/gh/bin/mathjax-custom.tar.gz | tar xzC ./MathJax
```

Finally, to make the files accessible, add the following to the https server block in your nginx config:

```nginx
  location /MathJax/ {
    root /home/mastodon/overrides;
    add_header Cache-Control "public, max-age=14400, must-revalidate";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains";
    try_files $uri =404;
  }
```

## Install the fork

First, we want to add the fork as a git remote and switch to the correct branch:

```sh
# change to the mastodon directory
cd ~/live

# add the fork as a remote
git remote add mathstodon https://github.com/christianp/mastodon.git

# fetch the branches from the fork
git fetch mathstodon

# switch to the mathstodon-4.2 branch
git checkout mathstodon/mathstodon-4.2
```

The dependencies between the fork and main repo are the same at the time of writing, but I'd gave it a try anyway just to make sure.

```sh
# ruby dependencies
bundle install

# node dependencies
yarn install --frozen-lockfile
```

Then, we need to compile the assets:

```sh
RAILS_ENV=production bundle exec rails assets:precompile
```

The final step is to restart the Mastodon web service. For this, you need to exit the mastodon user and run the following command as root:

```sh
systemctl restart mastodon-web
```
