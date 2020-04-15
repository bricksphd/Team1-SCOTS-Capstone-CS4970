(function () {
  var usernameField = document.getElementById('Uname');
  var passwordField = document.getElementById('password');
  var btnLogin = document.getElementById('btnLogin');
  var firestore = firebase.firestore();
  btnLogin.addEventListener('click', function (e) {
    var username = usernameField.value;
    var password = passwordField.value;
    var auth = firebase.auth();
    var promise = auth.signInWithEmailAndPassword(username, password);
    promise.catch(function (e) {
      return alert(e.message);
    });
  });
  firebase.auth().onAuthStateChanged(function (firebaseUser) {
    if (firebaseUser) {
      firebaseUser.getIdTokenResult().then(function (idTokenResult) {
        firebaseUser.admin = idTokenResult.claims.admin;

        if (firebaseUser.admin) {
          window.location = "rPortal.html";
        } else {
          firestore.collection('users').doc(firebaseUser.uid).get().then(function (doc) {
            if (doc.exists) {
              if (!doc.data().changePassword) {
                alert("You have not changed your password since you were first registered. Please change your password before proceeding.");
                window.location = "edituser.html";
              } else {
                window.location = "userdashboard.html";
              }
            } else {
              alert("The user has not been registered in the database."); //window.location = "userdashboard.html";
            }
          });
        }
      });
    }
  });
})();