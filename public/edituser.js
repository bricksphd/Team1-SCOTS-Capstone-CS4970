var btnChangePassword = document.getElementById("btnChangePassword");
var confirmPasswordField = document.getElementById("confirmPassword");
btnChangePassword.addEventListener("click", function (e) {
  var firestore = firebase.firestore(); //var user = firebase.auth().currentUser;

  var confirmPassword = confirmPasswordField.value;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user.updatePassword(confirmPassword).then(function () {
        firestore.collection('users').doc(user.uid).update({
          changePassword: true
        }).then(function () {
          console.log("Document successfully updated");
          alert("Password changed successfully.");
        }).catch(function (error) {
          console.error("Error updating document: ", error);
        });
      }).catch(function (error) {
        alert("Error changing password.");
      });
    } else {
      alert("You are not signed in.");
    }
  });
});
firebase.auth().onAuthStateChanged(function (user) {
  if (!user) {
    console.log("You are not signed in.");
    window.location = "index.html";
  }
});

window.onbeforeunload = function () {
  return true;
};