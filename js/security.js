var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

var key = localStorage.getItem("var");
var decrypted = CryptoJS.AES.decrypt(key, "gofalcons123");

if (localStorage.getItem("var") === null) {
  window.location.replace("/");
}
console.log(today)
localStorage.setItem("today", today)

console.log(decrypted)
localStorage.setItem("decrypt", decrypted)

if (decrypted != today) {
  alert("please log in");
  window.location.replace("/");
}
