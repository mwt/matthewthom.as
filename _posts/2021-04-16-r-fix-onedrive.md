---
title: "Fix the R Library Bug on Windows 10"
author: "Matthew Wildrick Thomas"
layout: "post"
tag: ["tech", "R"]
date: "2021-04-16"
use_math: false
description: "If you sync your Documents folder with OneDrive, R can have issues"
pdf: "/assets/pdfs/blog/r-fix-onedrive.pdf"
---

This is a quick post about how to fix an annoying R bug on Windows 10 caused by OneDrive. Many users use OneDrive to sync their Documents folder. Unfortunately, R stores libraries in the Documents folder, and OneDrive creates sync locks that interfere with the installation and updating of packages.

The solution is to set the `R_LIBS_USER` environment variable to a folder that is not synced by OneDrive. This can be done by running [this script](/gh/scripts/r_fix/r_fix.ps1) or by following these steps:

1. Open the Run window (<kbd>Win</kbd> + <kbd>R</kbd>)
2. Paste `rundll32 sysdm.cpl,EditEnvironmentVariables` and hit OK.
3. Click New... under "User variables" (the top panel)
4. Paste variable name `R_LIBS_USER`
5. You can use Browse Directory... to choose any folder that is not synced with OneDrive (eg. `C:\Users\username\R`)

Now that you changed your library directory, you'll need to reinstall your libraries. You could copy them from OneDrive, but some may be damaged. 

Steps 1 and 2 can be replaced by searching for some part of "Edit environment variables for the current user" in the start menu. This is easier to remember, but this guide provides the shortest path.
