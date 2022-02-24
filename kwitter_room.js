
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyAGRSp0uzI4vSxBIZxEcmf_KRSgvP7GEpw",
      authDomain: "kwitter-be8f3.firebaseapp.com",
      databaseURL: "https://kwitter-be8f3-default-rtdb.firebaseio.com",
      projectId: "kwitter-be8f3",
      storageBucket: "kwitter-be8f3.appspot.com",
      messagingSenderId: "559132661436",
      appId: "1:559132661436:web:a842b74815d247b8ae22b9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " ! ";

function add_room(){
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose : "addingroom"
      });
      localStorage.setItem("room_name",room_name);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick = 'redirect(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;

                  //End code
            });
      });
}
getData();
function redirect(r_name){
      localStorage.setItem("room_name",r_name);
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}