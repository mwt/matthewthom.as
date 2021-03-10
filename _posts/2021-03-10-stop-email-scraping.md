---
title: "How to Prevent Email Scraping"
author: "Matthew Wildrick Thomas"
layout: "post"
tag: ["tech", "webdev"]
date: "2021-03-10"
use_math: false
---

If put your email in plaintext on your website, you will get spam from people trying to sell you SEO, development services, ghostwriting, etc. Emails get on spam lists through website scraping. The way that this works is simple. Scrapers typically look for strings like `user@host.tld` or `mailto:user@host.tld` in your HTML.

I used to use the Scrape Shield provided by Cloudflare. However, when I switched away from using Cloudflare a few months ago, I started to receive a lot of spam that could not be easily blocked. There are many solutions that you can find on the internet to stop people from scraping your email. The most common is to write your email as:

~~~
user [at] host [dot] tld
~~~

This is not ideal for three reasons:

1. People usually have to edit your email before using it (though GMail does this automatically 🧪).
2. This string is just as easy to scrape as `user@host.tld`. It's just a little less common.
3. It's not feasible for use in a mailto link.

This third issue is the most difficult to fix as there are many solutions that work for displaying an email if you don't care about functional `mailto:` links. For example

~~~ html
<span>user@</span>
<span style="display:none;">HIDDEN JUNK</span>
<span>host.tld</span>
~~~

or the equivalent with CSS.

There are two solutions that I know of that fix the problem and allow `mailto:` links to work. The first is common and easy for scrapers to circumvent while the other is harder to circumvent, but requires javascript.

### Solution 1: HTML entities

One simple and very common solution is to replace all characters in the `mailto:` links with HTML entities. For example `user@host.tld` becomes `&#x75;&#x73;&#x65;&#x72;&#x40;&#x68;&#x6F;&#x73;&#x74;&#x2E;&#x74;&#x6C;&#x64;`. You can then make an email link like so

~~~ html
<a href="mailto:&#x75;&#x73;&#x65;&#x72;&#x40;&#x68;&#x6F;&#x73;&#x74;&#x2E;&#x74;&#x6C;&#x64;">email me</a>
~~~

which renders as <a href="mailto:&#x75;&#x73;&#x65;&#x72;&#x40;&#x68;&#x6F;&#x73;&#x74;&#x2E;&#x74;&#x6C;&#x64;">email me</a>. As you can see, the browser translates these HTML entities completely for the end user. So this obfuscation does not create any issues for human visitors. However, it is very easy to transform all HTML entities before scraping. So, this offers only minimal protection.

### Solution 2: Trivial javascript replace

I have tested a very simple method in javascript for the last few months. The idea is to replace your email with the correct string using javascript. A simplified version of my implementation follows.

~~~ html
<script>
/* 1. define variables */
var me = "name";
var place = "host.tld";

/* 2. find email link to replace */
var elink = document.getElementById("mlink");

/* 3. replace link href with variables  */
elink.href = `mailto:${me}@${place}`;
</script>

<a id="mlink" href="#">email me</a>
~~~

So, we define the email in two parts, `name` and `host.tld`. We then combine these parts and put them into the email link. This solution is simple and resistant to scraping. The easiest way to scrape this document would be to execute the above javascript. However, scrapers do not execute javascript on arbitrary pages for several reasons. First, it is not performant to execute javascript on the thousands of websites that you scrape. Second, it opens scrapers up to various types of attacks and tracking that they would prefer to avoid.

At some point, scrapers may evolve to the point that such a simple method is not effective. However, I have found that I no longer receive spam after making this change. While I am generally against adding unnecessary javascript to pages, as it slows them down, I feel this snippet is both necessary and highly performant.

This javascript method is similar to the one used by CloudFlare's builtin Scrape Shield, but is simpler. Cloudflare uses a hash that is decoded in javascript by using the last few characters as a "key" to unlock the hashed email.

### Does it work?

I use the second method on my site and can confirm that it works. A few months ago, I ran an experiment to see if the spammers were really getting my email from my website. In the test, I replaced the email in the HTML of my site with a dummy address, `6adegxtzp@relay.firefox.com`, which I still receive. However, I sort these into a special folder. When, the page loads, my script replaces this email with my main address. Human visitors with javascript enabled do not encounter this address.

Since making this change, I no longer receive spam on my main email. However, I receive a significant amount of spam though my Firefox relay address. This is despite the fact that I have never used this address anywhere else. This change took a few months though. So don't expect results right away.
