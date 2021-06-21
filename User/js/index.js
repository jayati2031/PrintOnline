const auth = firebase.auth();

var neCreated = 0;

auth.onAuthStateChanged(function(user) {
    if (user) {
      window.location.href="dashboard.html";
    } else {
      // document.getElementById("login_div").style.display = "block";
      // document.getElementById("loggedin").style.display = "none";
    }
  });

function checkpassword(){
  var password = document.getElementById('password_field');
  var passwordR = document.getElementById('RepeatPassword');
  if(!(password.value === passwordR.value)){
    document.getElementsByClassName('p-error')[0].style.display = "block";
  } else {
    document.getElementsByClassName('register')[0].focus;
  }
}

function signUp(){
  var email = document.getElementById('email_field');
  var password = document.getElementById('password_field');

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
    
  window.alert("Account created successfully!!");
}

function login(){
  var email = document.getElementById('email_field');
  var password = document.getElementById('password_field');

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => window.alert(e.message));
  //window.alert("Signed in successfully!!");
}