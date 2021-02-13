function checkCookie(){
var cookieEnabled = navigator.cookieEnabled;
if (!cookieEnabled){
document.cookie = "testcookie";
cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
}
return cookieEnabled || showCookieFail();
}

function showCookieFail(){
alert("ENABLE COOKIES TO LOGIN")
document.getElementByClassName("login100-form-bgbtn").style.visibility = "hidden";
}

checkCookie()

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}


var firebaseConfig = {
  apiKey: "AIzaSyBGdsbWdlqV5Oy5GZGPGixQzqPMrzYWgF8",
  authDomain: "personal-chat-9558f.firebaseapp.com",
  databaseURL: "https://personal-chat-9558f-default-rtdb.firebaseio.com",
  projectId: "personal-chat-9558f",
  storageBucket: "personal-chat-9558f.appspot.com",
  messagingSenderId: "114678540139",
  appId: "1:114678540139:web:a2b9203ed1ae434d64ce2e"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var initdata = firebase.database().ref('/');
initdata.on('value', (snapshot) => {
  const data = snapshot.val();
});

function writeip(user, ip, time) {
  database.ref('logins/').once('value', function(message_object) {
  var index = parseFloat(message_object.numChildren()) + 1;
  firebase.database().ref('logins/' + `${user}_${index}`).set({
    ip : ip,
    time: time
    });
  });
}

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
  var passwordu = firebase.database().ref('users/' + username);
  passwordu.on('value', (snapshot) => {
    const data = snapshot.val();
    localStorage.setItem("passwd", data)
  });
  passworddb = localStorage.getItem("passwd")
  localStorage.setItem("passwd", null)

  var client = new HttpClient();
  client.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    const myRegexp = /^(?:ip)=(.*)$/gm;
    let match;
    let resultString = "";
    match = myRegexp.exec(data);
    while (match != null) {
    resultString = resultString.concat(match[1] + "\n");
    match = myRegexp.exec(data);
    }
    writeip(username, resultString, today)
    })

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
