var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

function hex2a(hexx) {
  var hex = hexx.toString();
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
  str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}


function checkCookie(){
var cookieEnabled = navigator.cookieEnabled;
if (!cookieEnabled){
document.cookie = "testcookie";
cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
}
return cookieEnabled || showCookieFail();
}

function showCookieFail(){
alert("ENABLE COOKIES")
window.location.replace("/");
}

checkCookie()


var key = localStorage.getItem("var");
var decrypted = CryptoJS.AES.decrypt(key, "gofalcons123");

if (localStorage.getItem("var") === null) {
  window.location.replace("/");
}


if (hex2a(decrypted) != today) {
  alert("please log in");
  window.location.replace("/");
}
