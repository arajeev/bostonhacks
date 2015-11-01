function updateUsername() {
  var usernameString = document.getElementById("username").value;
  if (userKey === "") {
    // insert username
    var firebaseArray = new Array();
    firebaseArray["username"] = usernameString;
    var newPostRef = myFirebaseRef.push(firebaseArray);
    userKey = newPostRef.key();
  } else {
    // update username
    myFirebaseRef.child(userKey).child("username").set(usernameString);
  }
  var welcomeText = document.getElementById("welcome");
  welcomeText.innerHTML = "Welcome " + usernameString + "!";
  myFirebaseRef.once('value', function(dataSnapshot) {
    dataSnapshot.forEach(function(data){
      if(data.key() != userKey) {
        otherKey = data.key();
      }
    })
    if(otherKey != "") {
      myFirebaseRef.child(otherKey).on('value', function(snapshot) {
        var theirProgressBar = document.getElementById('otherprogress');
        theirProgressBar.style.width = snapshot.val().score + "%";
      })
    }
  })
}

var myFirebaseRef = new Firebase("https://codebattles.firebaseio.com/");
var userKey = "";
var otherKey = "";
var codeSubmission = "";
var codeFunction;
var fibonacci;
var score;
var yourProgress = 0;
var theirProgress = 0;
function assert(condition, message) {
  //if (!condition) {
  // message = message || "Assertion failed";
  // if (typeof Error !== "undefined") {
  //    throw new Error(message);
  // }
  // throw message; // Fallback
  //}
  return condition;
}

function onSubmit() {
  codeSubmission = ace.edit("editor").getValue();
  myFirebaseRef.child(userKey).child("code").set(codeSubmission);
  // this makes the function that was
  // stated in the question
  eval(codeSubmission);
  score = testFib();
  console.log(score);
  myFirebaseRef.child(userKey).child("score").set(score);
  yourProgress = score;
  var yourProgressBar = document.getElementById("selfprogress");
  yourProgressBar.style.width = yourProgress+"%";
  //other player joins after you -> the otherKey is empty
  if(otherKey === "") {
    myFirebaseRef.once('value', function(dataSnapshot) {
      dataSnapshot.forEach(function(data){
        if(data.key() != userKey) {
          otherKey = data.key();
        }
      });
      if(otherKey != "") {
        myFirebaseRef.child(otherKey).on('value', function(snapshot) {
          var theirProgressBar = document.getElementById('otherprogress');
          theirProgressBar.style.width = snapshot.val().score + "%";
        })
      }
    })
  }
}


function onReset() {
    codeSubmission = "";
    ace.edit("editor").setValue("// Write your solution here \n function fibonacci(N) { \n    \n }\n \n \n \n \n \n \n \n ");
}


 function onRedemo() {
    myFirebaseRef.remove();
}

var newPostRef = myFirebaseRef.push();
userKey = newPostRef.key();
