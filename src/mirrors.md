---
layout: post
title: "Software Mirrors"
permalink: /mirrors/
nocomments: true
---

I maintain a few public repository mirrors for free software projects that I make frequent use of. This mirror was previously sponsored by Fastly CDN. However, due to its unanticipated popularity, the mirror is now hosted behind a Cloudflare pro plan. All of the files are hosted on a pair of servers near Newark. The mirror supports both IPv4 and IPv6 as well as http and https. Each of the four servers has a 10Gb/s connection.

Contact me if you have other projects that you'd like to see mirrored. You can help maintain the financial sustainability of the project by [making a tax deductible donation](https://hcb.hackclub.com/donations/start/econ). Anything you can pitch in helps keep the service up and running. Public contributors will get a shout out on this page.

The following software is hosted here:

- [TeX/CTAN](#texctan)
- [Termux](#termux)
- [Zotero](#zotero)
- [GitHub Desktop](#github-desktop)
- [Rclone](#rclone)
- [RStudio](#rstudio)
- [Zoom](#zoom)

---

### TeX/CTAN {id="texctan" .anchor}

I have an official registered [CTAN](https://mirror.ctan.org) mirror for downloading LaTeX. The mirror is updated every 12 hours and can be accessed using <https://mirror.mwt.me/ctan/>. The mirror can be selected in TeXLive, MikTeX, MacTeX, and others.

### Termux {id="termux" .anchor}

[Termux](https://termux.com/) is a terminal emulator and Linux environment for Android. I have an official registered repository which is updated every 6 hours and contains all Termux packages. The repository can be selected by running `apt edit-sources` in Termux and adding one or more of the following lines to your configuration.

| Repository                                | sources.list entry                                  |
| :---------------------------------------- | :-------------------------------------------------- |
| [Main](https://mirror.mwt.me/termux/main) | `deb https://mirror.mwt.me/termux/main stable main` |
| [Root](https://mirror.mwt.me/termux/root) | `deb https://mirror.mwt.me/termux/root root stable` |
| [X11](https://mirror.mwt.me/termux/x11)   | `deb https://mirror.mwt.me/termux/x11 x11 main`     |

More instructions can be found on the [Termux wiki](https://github.com/termux/termux-packages/wiki/Mirrors#mirrors-by-mwt).

### Zotero {id="zotero" .anchor}

I have a mirror of the Debian/Ubuntu repository for the [Zotero citation manager](https://www.zotero.org). My mirror uses the same original signature as the developer. The mirror url is <https://mirror.mwt.me/zotero/deb/>. You can install this by running the following script:

```sh
curl -sL https://raw.githubusercontent.com/retorquere/zotero-deb/master/install.sh | sudo bash /dev/stdin "https://mirror.mwt.me/zotero/deb"
```

Alternatively, you can do the steps manually by first installing the GPG key:

```sh
sudo wget -O /usr/share/keyrings/zotero-archive-keyring.gpg "https://raw.githubusercontent.com/retorquere/zotero-deb/master/zotero-archive-keyring.gpg"
```

and then adding the necessary source file:

```sh
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/zotero-archive-keyring.gpg by-hash=force] https://mirror.mwt.me/zotero/deb/ ./" > /etc/apt/sources.list.d/zotero.list'
```

To install, run `sudo apt install zotero`.

### GitHub Desktop {id="github-desktop" .anchor}

There is an [unofficial Linux version](https://github.com/shiftkey/desktop) of the [official GitHub Desktop client](https://desktop.github.com/). This is the primary official mirror for the project. You can use this script to quickly set up the repository:

```sh
wget -qO- "https://mirror.mwt.me/shiftkey-desktop/install.sh" | sudo -s
```

More detailed manual instructions are below.

**Debian/Ubuntu:** First install our GPG certificate:

```sh
sudo mkdir -p /etc/apt/keyrings && wget -qO - https://mirror.mwt.me/shiftkey-desktop/gpgkey | gpg --dearmor | sudo tee /etc/apt/keyrings/mwt-desktop.gpg > /dev/null
```

To setup the package repository, run:

```sh
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/mwt-desktop.gpg] https://mirror.mwt.me/shiftkey-desktop/deb/ any main" | sudo tee /etc/apt/sources.list.d/mwt-desktop.list
```

Then install GitHub Desktop:

```sh
sudo apt update && sudo apt install github-desktop
```

**Red Hat/CentOS/Fedora distributions:** First install our GPG certificate:

```sh
sudo rpm --import https://mirror.mwt.me/shiftkey-desktop/gpgkey
```

To setup the package repository:

```sh
cat << EOF | sudo tee /etc/yum.repos.d/mwt-packages.repo
[mwt-packages]
name=GitHub Desktop
baseurl=https://mirror.mwt.me/shiftkey-desktop/rpm
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/shiftkey-desktop/gpgkey
EOF
```

Then install GitHub Desktop:

```sh
# if yum is your package manager
sudo yum install github-desktop

# if dnf is your package manager
sudo dnf install github-desktop
```

**OpenSUSE distribution:** First install our GPG certificate:

```sh
sudo rpm --import https://mirror.mwt.me/shiftkey-desktop/gpgkey
```

To setup the package repository:

```sh
cat << EOF | sudo tee /etc/zypp/repos.d/mwt-packages.repo
[mwt-packages]
name=GitHub Desktop
baseurl=https://mirror.mwt.me/shiftkey-desktop/rpm
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/shiftkey-desktop/gpgkey
EOF
```

Then install GitHub Desktop:

```sh
sudo zypper ref && sudo zypper in github-desktop
```

### Rclone {id="rclone" .anchor}

Rclone does not yet have official repositories, [though official repositories have been attempted](https://github.com/rclone/rclone/pull/6188). We run [unofficial Rclone repos for apt, yum/dnf, and zypper](https://mirror.mwt.me/rclone/). These repos serve the latest official `.deb` and `.rpm` files from [the GitHub releases](https://github.com/rclone/rclone/releases). We check for updates every six hours. You can use this script to quickly set up the repository:

```sh
wget -qO- "https://mirror.mwt.me/rclone/install.sh" | sudo -s
```

More detailed manual instructions are below.

**Debian/Ubuntu:** First install our GPG certificate:

```sh
sudo mkdir -p /etc/apt/keyrings && wget -qO- https://mirror.mwt.me/rclone/gpgkey | sudo tee /etc/apt/keyrings/mwt.asc >/dev/null
```

To setup the package repository, run:

```sh
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/rclone/deb any main" | sudo tee /etc/apt/sources.list.d/rclone.list >/dev/null
```

Then install Rclone:

```sh
sudo apt update && sudo apt install rclone
```

**Red Hat/CentOS/Fedora distributions:** First install our GPG certificate:

```sh
sudo rpm --import https://mirror.mwt.me/rclone/gpgkey
```

To setup the package repository:

```sh
cat << EOF | sudo tee /etc/yum.repos.d/rclone.repo >/dev/null
[rclone]
name=rclone
baseurl=https://mirror.mwt.me/rclone/rpm/$basearch
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/rclone/gpgkey
EOF
```

Then install Rclone:

```sh
# if yum is your package manager
sudo yum install rclone

# if dnf is your package manager
sudo dnf install rclone
```

**OpenSUSE distribution:** First install our GPG certificate:

```sh
sudo rpm --import https://mirror.mwt.me/rclone/gpgkey
```

To setup the package repository:

```sh
cat << EOF | sudo tee /etc/zypp/repos.d/rclone.repo >/dev/null
[rclone]
name=rclone
baseurl=https://mirror.mwt.me/rclone/rpm/$basearch
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/rclone/gpgkey
EOF
```

Then install Rclone:

```sh
sudo zypper ref && sudo zypper in rclone
```

### RStudio {id="rstudio" .anchor}

Posit does not provide official repositories for RStudio Desktop. You can find [RStudio desktop repositories for apt and yum/dnf here](https://mirror.mwt.me/rstudio/). These repos serve the latest official `.deb` and `.rpm` files from [the official website](https://dailies.rstudio.com/links/#stable-builds). We check for updates every six hours. You can use this script to quickly set up the repository:

```sh
wget -qO- "https://mirror.mwt.me/rstudio/install.sh" | sudo -s
```

More detailed manual instructions are below.

**Debian/Ubuntu:** First install our GPG certificate:

```sh
sudo mkdir -p /etc/apt/keyrings && wget -qO- https://mirror.mwt.me/rstudio/gpgkey | sudo tee /etc/apt/keyrings/mwt.asc >/dev/null
```

To setup the package repository, run:

```sh
# for Ubuntu 20.04 (focal)
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/rstudio/deb/focal focal main" | sudo tee /etc/apt/sources.list.d/mwt.list >/dev/null

# for Ubuntu 22.04 (jammy) or 24.04 (noble)
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/rstudio/deb/jammy jammy main" | sudo tee /etc/apt/sources.list.d/mwt.list >/dev/null
```

This will overwrite our Zoom repository if you have it installed. If you want both, add an `-a` flag to the `tee` command so that it appends to the file instead of overwriting it.

Then install RStudio:

```sh
sudo apt update && sudo apt install rstudio
```

**Red Hat/CentOS/Fedora distributions:** First install our GPG certificate:

```sh
sudo rpm --import https://mirror.mwt.me/rstudio/gpgkey
```

To setup the package repository:

```sh
cat << EOF | sudo tee /etc/yum.repos.d/mwt-rstudio.repo >/dev/null
[rstudio]
name=rstudio
baseurl=https://mirror.mwt.me/rstudio/rpm/el9/x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/rstudio/gpgkey
EOF
```

The above uses `el9` in the base url. You can replace this with `el8` if you are using CentOS 8, RHEL 8, or another compatible release.

This will use our key to verify updates. All of the rpm packages are signed by Posit Software. In theory, you could set `gpgcheck=1` and `repo_gpgcheck=0`, and then set `gpgkey` to a local file obtained from <https://posit.co/code-signing/> to increase security (by not needing to trust me).

Then install RStudio:

```sh
# if yum is your package manager
sudo yum install rstudio

# if dnf is your package manager
sudo dnf install rstudio
```

### Zoom {id="zoom" .anchor}

Zoom does not provide official repositories. You can find [Zoom repositories for apt, yum/dnf, and zypper here](https://mirror.mwt.me/zoom/). These repos serve the latest official `.deb` and `.rpm` files from [the official website](https://zoom.us/download?os=linux). We check for updates every six hours. You can use this script to quickly set up the repository:

```sh
wget -qO- "https://mirror.mwt.me/zoom/install.sh" | sudo -s
```

More detailed manual instructions are below.

**Debian/Ubuntu:** First install our GPG certificate:

```sh
sudo mkdir -p /etc/apt/keyrings && wget -qO- https://mirror.mwt.me/zoom/gpgkey | sudo tee /etc/apt/keyrings/mwt.asc >/dev/null
```

To setup the package repository, run:

```sh
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/mwt.asc by-hash=force] https://mirror.mwt.me/zoom/deb any main" | sudo tee /etc/apt/sources.list.d/mwt.list >/dev/null
```

This will overwrite our RStudio repository if you have it installed. If you want both, add an `-a` flag to the `tee` command so that it appends to the file instead of overwriting it.

Then install zoom:

```sh
sudo apt update && sudo apt install zoom
```

**Red Hat/CentOS/Fedora distributions:** First install our GPG certificate:

```sh
sudo rpm --import https://mirror.mwt.me/zoom/gpgkey
```

To setup the package repository:

```sh
cat << EOF | sudo tee /etc/yum.repos.d/mwt-zoom.repo >/dev/null
[zoom]
name=zoom
baseurl=https://mirror.mwt.me/zoom/rpm/x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/zoom/gpgkey
EOF
```

This will use our key to verify updates. All of the rpm packages are signed by Zoom Video Communications, Inc. In theory, you could set `gpgcheck=1`, `repo_gpgcheck=0`, and `gpgkey=https://zoom.us/linux/download/pubkey` to increase security (by not needing to trust me).

Then install Zoom:

```sh
# if yum is your package manager
sudo yum install zoom

# if dnf is your package manager
sudo dnf install zoom
```

**OpenSUSE distribution:** First install our GPG certificate:

```sh
sudo rpm --import https://mirror.mwt.me/zoom/gpgkey
```

To setup the package repository:

```sh
cat << EOF | sudo tee /etc/zypp/repos.d/mwt-zoom.repo >/dev/null
[zoom]
name=zoom
baseurl=https://mirror.mwt.me/zoom/rpm/x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=1
gpgkey=https://mirror.mwt.me/zoom/gpgkey
EOF
```

This will use our key to verify updates. All of the rpm packages are signed by Zoom Video Communications, Inc. In theory, you could set `gpgcheck=1`, `repo_gpgcheck=0`, and `gpgkey=https://zoom.us/linux/download/pubkey` to increase security (by not needing to trust me).

Then install zoom:

```sh
sudo zypper ref && sudo zypper in zoom
```
