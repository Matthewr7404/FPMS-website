var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
var todaykey = CryptoJS.AES.encrypt(today, "gofalcons123");

if (localStorage.getItem("var") === null) {
  window.location.replace("/");
}

if (todaykey != key) {
  alert("please log in")
  window.location.replace("/");
}


