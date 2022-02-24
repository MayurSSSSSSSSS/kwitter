//YOUR FIREBASE LINKS

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

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function send(){
      input_message=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : input_message,
            like : 0
      });
      document.getElementById("msg").value="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data["name"];
message = message_data["message"];
like = message_data["like"];
name_tag="<h4>"+name + "<img class ='user_tick' src='tick.png'></h4>";
message_tag = "<h4 class='message_h4'>"+message +"</h4>";
like_button="<button class='btn btn-warning' id=" + firebase_message_id + " value =" + like + " onclick='updatelike(this.id)'>"
;
span_tag="<span class='glyphicon glyphicon-thumbs-up'>Like : " + like + "</span>";
row=name_tag+message_tag+like_button+span_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();
function updatelike(msg_id){
      likes=document.getElementById(msg_id).value;
      updatedlikes = Number(likes)+1;
      firebase.database().ref(room_name).child(msg_id).update({
            like : updatedlikes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
