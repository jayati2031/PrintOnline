const auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
    if (user) {
      //window.alert(user.email);
      window.location.href="dashboard.html";
    } else {
      // document.getElementById("login_div").style.display = "block";
      // document.getElementById("loggedin").style.display = "none";
    }
  });

function checkadmin(){
  var email = document.getElementById('email_field');
  
  if(!(email.value == 'printonline@gmail.com')){
    document.getElementsByClassName('p-error')[0].style.display = "block";
  } else {
    document.getElementById('password_field').focus;
    $('#loginbtn').prop("disabled", false);
  }
}

function login(){
  var email = document.getElementById('email_field');
  var password = document.getElementById('password_field');

  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => window.alert(e.message));
  //window.alert("Signed in successfully!!");
}