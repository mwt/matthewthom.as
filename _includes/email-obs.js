/* trivial email obfuscation */
var me = "matthew";
var place = "mwt.me";

/* replace social link a with string s  */
function changesocial(a, s) {
    a.href = `mailto:${s}`;
    a.dataset['title'] = s;
};

/* find the email link */
var elink = document.getElementById("mlink");

/* replace email */
changesocial(elink, `${me}@${place}`);
