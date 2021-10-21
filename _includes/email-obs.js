/* trivial email obfuscation */
var eme = "matthew";
var eplace = "mwt.me";
var xme = "matthew";
var xplace = "mwt.me";

/* replace social link a with string s  */
function changesocial(a, s, pro) {
    a.href = `${pro}:${s}`;
    a.dataset['title'] = s;
};

/* find the email link */
var elink = document.getElementById("mlink");

/* replace email */
changesocial(elink, `${eme}@${eplace}`, 'mailto');
changesocial(xlink, `${xme}@${xplace}`, 'xmpp');
