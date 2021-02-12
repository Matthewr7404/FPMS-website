var firebaseConfig = {
  apiKey: "AIzaSyBGdsbWdlqV5Oy5GZGPGixQzqPMrzYWgF8",
  authDomain: "personal-chat-9558f.firebaseapp.com",
  databaseURL: "https://personal-chat-9558f-default-rtdb.firebaseio.com",
  projectId: "personal-chat-9558f",
  storageBucket: "personal-chat-9558f.appspot.com",
  messagingSenderId: "114678540139",
  appId: "1:114678540139:web:a2b9203ed1ae434d64ce2e"
};

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
var todaykey = CryptoJS.AES.encrypt(today, "gofalcons123");

var limit = 0
if (localStorage.getItem("var") === null) {
  localStorage.setItem("var", "")
}

if (localStorage.getItem("number") === null) {
  localStorage.setItem("number", 0)
}

if (localStorage.getItem("passwd") === null) {
  localStorage.setItem("passwd", null)
}

function formsubmit() {
  var key = localStorage.getItem("var")
  var tries = localStorage.getItem("number")
  var username = document.getElementById("emailinput").value
  var password = document.getElementById("passwordinput").value
  firebase.initializeApp(firebaseConfig);
  var testu = firebase.database().ref('users/' + username);
    testu.on('value', (snapshot) => {
      const data = snapshot.val();
  });
  var passwordu = firebase.database().ref('users/' + username);
  passwordu.on('value', (snapshot) => {
    const data = snapshot.val();
    localStorage.setItem("passwd", data)
  });
  passworddb = localStorage.getItem("passwd")
  localStorage.setItem("passwd", null)
  if (password == passworddb) {
    if (key == "locked" && Number(tries) <= 5) {
      alert("Usage limit exceeded. Try again tomorrow.")
    } else if (Number(tries) <= 5) {
      localStorage.setItem("var", todaykey)
       localStorage.setItem("number", 0)
       alert("logged in!")
       window.location.replace("/main.html");
    } else if (tries >= 5) {
      localStorage.setItem("var", "locked")
      alert("Usage limit exceeded. Try again tomorrow.")
    }
  } else if (tries >= 5) {
    alert("Usage limit exceeded. Try again tomorrow.")
  } else {
    alert("WRONG USERNAME/PASSWORD")
    localStorage.setItem("number", Number(tries) + 1)
  }

}
