---
layout: post
title: "Open Software Mirrors"
permalink: /mirrors/
nocomments: true
---

I maintain a few public repository mirrors for free software projects that I make frequent use of. These mirrors are hosted on server hardware with a 1Gb/s connection near New York City. Contact me if you have other projects that you'd like to see mirrored. Every mirror supports both IPv4 and IPv6 as well as http and https. You can also change the hostname from `mirror.mwt.me` to `mirror-cf.mwt.me` to use the mirror over Cloudflare.


### LaTeX/CTAN

I have a complete registered [CTAN](https://mirror.ctan.org) mirror for downloading LaTeX. The mirror is updated every 12 hours and can be accessed using [`mirror.mwt.me/ctan/`](https://mirror.mwt.me/ctan/) or [`mirror-cf.mwt.me/ctan/`](https://mirror-cf.mwt.me/ctan/) to use over Cloudflare.

### Termux

[Termux](https://termux.com/) is a terminal emulator and Linux environment for Android. I have an official registered repository which is updated every 6 hours and contains all Termux packages. The repository can be selected by running `termux-change-repo` in Termux and selecting "Mirrors by Mwt". More instructions can be found on the [Termux wiki](https://github.com/termux/termux-packages/wiki/Mirrors#mirrors-by-mwt). Repositories can be added manually using the following URLs:

|Repository|sources.list entry                                               |
|:---------|:----------------------------------------------------------------|
|[Main](https://mirror.mwt.me/termux/main)      |`deb https://mirror.mwt.me/termux/main stable main`|
|[Root](https://mirror.mwt.me/termux/root)      |`deb https://mirror.mwt.me/termux/root root stable`|
|[X11](https://mirror.mwt.me/termux/x11)        |`deb https://mirror.mwt.me/termux/x11 x11 main`|


### GitHub Desktop

There is an [unofficial Linux version](https://github.com/shiftkey/desktop) of the [official GitHub Desktop client](https://desktop.github.com/). My mirror uses the same original signature as the developer. The following commands can be used to install the repository mirrors.

**Debian/Ubuntu**

The mirror url is <https://mirror.mwt.me/ghd/deb/>. You can change this in your sources manually, or by running the following command:

~~~sh
$ wget -qO - https://packagecloud.io/shiftkey/desktop/gpgkey | sudo tee /etc/apt/trusted.gpg.d/shiftkey-desktop.asc > /dev/null
$ sudo sh -c 'echo "deb [arch=amd64] https://mirror.mwt.me/ghd/deb any main" > /etc/apt/sources.list.d/packagecloud-shiftkey-desktop.list'
$ sudo apt-get update
~~~

**Red Hat/CentOS/Fedora**

The mirror url is <https://mirror.mwt.me/ghd/rpm/>. You can change this in your sources manually, or by running the following command:

~~~sh
$ sudo rpm --import https://packagecloud.io/shiftkey/desktop/gpgkey
$ sudo sh -c 'echo -e "[shiftkey]\nname=GitHub Desktop\nbaseurl=https://mirror.mwt.me/ghd/rpm\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=1\ngpgkey=https://packagecloud.io/shiftkey/desktop/gpgkey" > /etc/yum.repos.d/shiftkey-desktop.repo'
~~~

**OpenSUSE distribution**

The mirror url is <https://mirror.mwt.me/ghd/rpm/>. You can change this in your sources manually, or by running the following command:

~~~sh
$ sudo rpm --import https://packagecloud.io/shiftkey/desktop/gpgkey
$ sudo sh -c 'echo -e "[shiftkey]\nname=GitHub Desktop\nbaseurl=https://mirror.mwt.me/ghd/rpm\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=1\ngpgkey=https://packagecloud.io/shiftkey/desktop/gpgkey" > /etc/zypp/repos.d/shiftkey-desktop.repo'
~~~
