---
layout: post
title: "Software Mirrors"
permalink: /mirrors/
nocomments: true
---

I maintain a few public repository mirrors for free software projects that I make frequent use of. [Fastly CDN](https://fastly.com/) has generously donated their CDN network to serve and cache content from their [extensive edge network](https://www.fastly.com/network-map/) to serve the files. Each edge node connects to the closest of three distributed origins. There is one origin in Europe and two origins in the US, one on the East coast (near NYC) and another on the West coast. This ensures quick delivery of all files globally and extremely low latency for the most popular files in each region. The mirror supports both IPv4 and IPv6 as well as http and https.

Contact me if you have other projects that you'd like to see mirrored. You can help maintain the financial sustainability of the project by [sponsoring me](https://github.com/sponsors/mwt/) or [making a tax deductible donation to Think Tutor](https://github.com/sponsors/thinktutor/). Anything you can pitch in helps keep the service up and running. Contributors will get a shout out on this page.

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

I have an official registered [CTAN](https://mirror.ctan.org) mirror for downloading LaTeX. The mirror is updated every 12 hours and can be accessed using [`mirror.mwt.me/ctan/`](https://mirror.mwt.me/ctan/). The mirror can be selected in TeXLive, MikTeX, MacTeX, and others.

### Termux
{: .anchor}

[Termux](https://termux.com/) is a terminal emulator and Linux environment for Android. I have an official registered repository which is updated every 6 hours and contains all Termux packages. The repository can be selected by running `apt edit-sources` in Termux and adding one or more of the following lines to your configuration.

|Repository|sources.list entry                                               |
|:---------|:----------------------------------------------------------------|
|[Main](https://mirror.mwt.me/termux/main)      |`deb https://mirror.mwt.me/termux/main stable main`|
|[Root](https://mirror.mwt.me/termux/root)      |`deb https://mirror.mwt.me/termux/root root stable`|
|[X11](https://mirror.mwt.me/termux/x11)        |`deb https://mirror.mwt.me/termux/x11 x11 main`|

More instructions can be found on the [Termux wiki](https://github.com/termux/termux-packages/wiki/Mirrors#mirrors-by-mwt).


### Zotero
{: .anchor}

I have a mirror of the Debian/Ubuntu repository for the [Zotero citation manager](https://www.zotero.org) as well as [Juris-M](https://juris-m.github.io/). My mirror uses the same original signature as the developer. The mirror url is <https://mirror.mwt.me/zotero/deb/>. You can install this by running the following script:

~~~sh
curl -sL https://raw.githubusercontent.com/retorquere/zotero-deb/master/install.sh | sudo bash /dev/stdin "https://mirror.mwt.me/zotero/deb"
~~~

Alternatively, you can do the steps manually by first installing the GPG key:

~~~sh
sudo wget -O /usr/share/keyrings/zotero-archive-keyring.gpg "https://raw.githubusercontent.com/retorquere/zotero-deb/master/zotero-archive-keyring.gpg"
~~~

and then adding the necessary source file:

~~~sh
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/zotero-archive-keyring.gpg by-hash=force] https://mirror.mwt.me/zotero/deb/ ./" > /etc/apt/sources.list.d/zotero.list'
~~~

To install, run `sudo apt install zotero` or `sudo apt install jurism`.


### GitHub Desktop
{: .anchor}

There is an [unofficial Linux version](https://github.com/shiftkey/desktop) of the [official GitHub Desktop client](https://desktop.github.com/). This is the primary official mirror for the project. The following commands can be used to install the repository.

**Debian/Ubuntu:** First install our GPG certificate:

~~~sh
sudo wget -O /etc/apt/trusted.gpg.d/shiftkey-desktop.asc "https://mirror.mwt.me/ghd/gpgkey"
~~~

To setup the package repository, run:

~~~sh
echo "deb [arch=amd64] https://mirror.mwt.me/ghd/deb/ any main" | sudo tee /etc/apt/sources.list.d/packagecloud-shiftkey-desktop.list
~~~

Then install GitHub Desktop:

~~~sh
sudo apt update && sudo apt install github-desktop
~~~

**Red Hat/CentOS/Fedora distributions:** First install our GPG certificate:

~~~sh
$ sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
~~~

To setup the package repository:

~~~sh
cat << EOF | sudo tee /etc/yum.repos.d/shiftkey-desktop.repo
[shiftkey]
name=GitHub Desktop
baseurl=https://mirror.mwt.me/ghd/rpm
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/ghd/gpgkey
EOF
~~~

Then install GitHub Desktop:

~~~sh
# if yum is your package manager
$ sudo yum install github-desktop

# if dnf is your package manager
$ sudo dnf install github-desktop
~~~

**OpenSUSE distribution:** First install our GPG certificate:

~~~sh
$ sudo rpm --import https://mirror.mwt.me/ghd/gpgkey
~~~

To setup the package repository:

~~~sh
cat << EOF | sudo tee /etc/zypp/repos.d/shiftkey-desktop.repo
[shiftkey]
name=GitHub Desktop
baseurl=https://mirror.mwt.me/ghd/rpm
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/ghd/gpgkey
EOF
~~~

Then install GitHub Desktop:

~~~sh
$ sudo zypper ref && sudo zypper in github-desktop
~~~


### RStudio
{: .anchor}

RStudio does not provide an official repository for Debian/Ubuntu. [This repository](https://github.com/mwt/rstudio-deb/) serves the latest official `.deb` from RStudio. All files are checked against the RStudio GPG keys and updated twice per day. The mirror url is <https://mirror.mwt.me/my/deb>. You can install the repo by installing my GPG key:

~~~sh
sudo wget -O /usr/share/keyrings/mwt.asc "https://mirror.mwt.me/my/gpgkey"
~~~

and adding the repo to apt:

~~~sh
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/my/deb any rstudio" | sudo tee /etc/apt/sources.list.d/mwt.list
~~~

This repository is the same as my Zoom repo (below). So, you can replace `any rstudio` in the string above with `any main` to get both.


### Zoom
{: .anchor}

Zoom does not provide an official repository for Debian/Ubuntu. [This repository](https://github.com/mwt/zoom-deb/) serves the latest official `.deb` from Zoom. All files are checked against the Zoom GPG keys and updated twice per day. The mirror url is <https://mirror.mwt.me/my/deb>. You can install the repo by installing my GPG key:

~~~sh
sudo wget -O /usr/share/keyrings/mwt.asc "https://mirror.mwt.me/my/gpgkey"
~~~

and adding the repo to apt:

~~~sh
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/my/deb any zoom" | sudo tee /etc/apt/sources.list.d/mwt.list
~~~

This repository is the same as my RStudio repo (above). So, you can replace `any zoom` in the string above with `any main` to get both.
