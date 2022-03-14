---
layout: post
title: "Software Mirrors"
permalink: /mirrors/
nocomments: true
---

I maintain a few public repository mirrors for free software projects that I make frequent use of. These mirrors are hosted on server hardware with a 1Gb/s connection near New York City. Contact me if you have other projects that you'd like to see mirrored. Every mirror supports both IPv4 and IPv6 as well as http and https. You can also change the hostname from `mirror.mwt.me` to `mirror-cf.mwt.me` to use the mirror over Cloudflare.

The following software is hosted here:

- [TeX/CTAN](#texctan)
- [Termux](#termux)
- [Zotero](#zotero)
- [GitHub Desktop](#github-desktop)
- [RStudio](#rstudio)
- [Zoom](#zoom)

---

### TeX/CTAN
{: .anchor}

I have an official registered [CTAN](https://mirror.ctan.org) mirror for downloading LaTeX. The mirror is updated every 12 hours and can be accessed using [`mirror.mwt.me/ctan/`](https://mirror.mwt.me/ctan/) or [`mirror-cf.mwt.me/ctan/`](https://mirror-cf.mwt.me/ctan/) to use over Cloudflare. The mirror can be selected in TeXLive, MikTeX, MacTeX, and others.

### Termux
{: .anchor}

[Termux](https://termux.com/) is a terminal emulator and Linux environment for Android. I have an official registered repository which is updated every 6 hours and contains all Termux packages. The repository can be selected by running `termux-change-repo` in Termux and selecting "Mirrors by Mwt". More instructions can be found on the [Termux wiki](https://github.com/termux/termux-packages/wiki/Mirrors#mirrors-by-mwt). Repositories can be added manually using the following URLs:

|Repository|sources.list entry                                               |
|:---------|:----------------------------------------------------------------|
|[Main](https://mirror.mwt.me/termux/main)      |`deb https://mirror.mwt.me/termux/main stable main`|
|[Root](https://mirror.mwt.me/termux/root)      |`deb https://mirror.mwt.me/termux/root root stable`|
|[X11](https://mirror.mwt.me/termux/x11)        |`deb https://mirror.mwt.me/termux/x11 x11 main`|


### Zotero
{: .anchor}

I have a mirror of the Debian/Ubuntu repository for the [Zotero citation manager](https://www.zotero.org). My mirror uses the same original signature as the developer. The mirror url is <https://mirror.mwt.me/zotero/deb/>. You can change this in your sources manually, or by running the following commands:

~~~sh
sudo wget -O /usr/share/keyrings/zotero-archive-keyring.gpg "https://mirror.mwt.me/zotero/gpgkey"
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/zotero-archive-keyring.gpg by-hash=force] https://mirror.mwt.me/zotero/deb/ ./" > /etc/apt/sources.list.d/zotero.list'
sudo apt-get update
~~~


### GitHub Desktop
{: .anchor}

There is an [unofficial Linux version](https://github.com/shiftkey/desktop) of the [official GitHub Desktop client](https://desktop.github.com/). This is the primary official mirror for the project. The following commands can be used to install the repository.

**Debian/Ubuntu:**
The mirror url is <https://mirror.mwt.me/ghd/deb/>. You can change this in your sources manually, or by running the following commands:

~~~sh
wget -qO - https://mirror.mwt.me/ghd/gpgkey | sudo tee /etc/apt/trusted.gpg.d/shiftkey-desktop.asc > /dev/null
sudo sh -c 'echo "deb [arch=amd64] https://mirror.mwt.me/ghd/deb any main" > /etc/apt/sources.list.d/packagecloud-shiftkey-desktop.list'
sudo apt-get update
~~~

**Red Hat/CentOS/Fedora:**
The mirror url is <https://mirror.mwt.me/ghd/rpm/>. You can change this in your sources manually, or by running the following commands:

~~~sh
sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
sudo sh -c 'echo -e "[shiftkey]\nname=GitHub Desktop\nbaseurl=https://mirror.mwt.me/ghd/rpm\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=1\ngpgkey=https://mirror.mwt.me/ghd/gpgkey" > /etc/yum.repos.d/shiftkey-desktop.repo'
~~~

**OpenSUSE distribution:**
The mirror url is <https://mirror.mwt.me/ghd/rpm/>. You can change this in your sources manually, or by running the following commands:

~~~sh
sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
sudo sh -c 'echo -e "[shiftkey]\nname=GitHub Desktop\nbaseurl=https://mirror.mwt.me/ghd/rpm\nenabled=1\ngpgcheck=0\nrepo_gpgcheck=1\ngpgkey=https://mirror.mwt.me/ghd/gpgkey" > /etc/zypp/repos.d/shiftkey-desktop.repo'
~~~


### RStudio
{: .anchor}

RStudio does not provide an official repository for Debian/Ubuntu. [This repository](https://github.com/mwt/rstudio-deb/) serves the latest official `.deb` from RStudio. All files are checked against the RStudio GPG keys and updated twice per day. The mirror url is <https://mirror.mwt.me/my/deb>. You can install the repo by running the following commands:

~~~sh
sudo wget -O /usr/share/keyrings/mwt.asc "https://mirror.mwt.me/my/gpgkey"
sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/my/deb any rstudio" > /etc/apt/sources.list.d/rstudio.list'
~~~

This repository is the same as my Zoom repo (below). So, you can replace `any rstudio` in the string above with `any main` to get both.


### Zoom
{: .anchor}

Zoom does not provide an official repository for Debian/Ubuntu. [This repository](https://github.com/mwt/zoom-deb/) serves the latest official `.deb` from Zoom. All files are checked against the Zoom GPG keys and updated twice per day. The mirror url is <https://mirror.mwt.me/my/deb>. You can install the repo by running the following commands:

~~~sh
sudo wget -O /usr/share/keyrings/mwt.asc "https://mirror.mwt.me/my/gpgkey"
sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/my/deb any zoom" > /etc/apt/sources.list.d/zoom.list'
~~~

This repository is the same as my RStudio repo (above). So, you can replace `any zoom` in the string above with `any main` to get both.
