var firebaseConfig = {
    apiKey: "AIzaSyDYMSjRFucF21r2HqtnaM1QkUQ5cjTZQjg",
    authDomain: "snakegame-101.firebaseapp.com",
    projectId: "snakegame-101",
    storageBucket: "snakegame-101.appspot.com",
    messagingSenderId: "628213128486",
    appId: "1:628213128486:web:f80f3d06eb6b451828b5e7",
    measurementId: "G-XK03QWTV82"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


var userName=document.getElementById("user");
var userImage=document.getElementById("userImage");
var userInfo;

function authChange(){
    userName.innerHTML=userInfo.user.displayName;
    userImage.setAttribute('src',userInfo.user.photoURL);
}


function userLoginHandler(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
            console.log(result);
            userInfo = result;
            authChange();
        }).catch((error) => {
            window.alert(error);
  });
  
}



var loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener('click',userLoginHandler);


