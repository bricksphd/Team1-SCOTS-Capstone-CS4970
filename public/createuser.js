(function () {
  var createUserForm = document.querySelector(".admin-action");
  var createUserName = document.getElementById("createUname");
  var createPassword = document.getElementById("createPassword");
  createUserForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var createdUsername = createUserName.value;
    var createdPassword = createPassword.value;
    var createUser = firebase.functions().httpsCallable('createUser');
    createUser({
      email: createdUsername,
      password: createdPassword
    }).then(function (result) {
      console.log(result);
      alert(result.data.message);
    }).catch(function (error) {
      console.log(error);
      alert(error.message);
    });
  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      console.log("You are not signed in.");
      window.location = "index.html";
    }

    if (user) {
      user.getIdTokenResult().then(function (idTokenResult) {
        user.admin = idTokenResult.claims.admin;

        if (!user.admin) {
          alert("You are not an admin.");
          window.location = "userdashboard.html";
        }
      });
    }
  });
})();