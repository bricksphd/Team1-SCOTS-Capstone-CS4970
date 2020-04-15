function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getUsers } from "./Data.js";
var firestore = firebase.firestore(); // Button to set the assignment parameters

var btnSetAssignment = document.getElementById("btnSetAssignment"); // Button to assign assignments to users

var btnAssignToUsers = document.getElementById("btnAssignToUsers");
/*
    btnAssignToUsers:
    Event Listener on the button to get the array of checked users and
    set the userIDs field in the database for the assignment
*/

btnAssignToUsers.addEventListener("click", function (e) {
  // Get checkboxes
  var checkboxes = $("#tablebody input:checked"); // If nothing checked

  if (checkboxes.length == 0) {
    alert("Please select at least one user to assign");
  } else {
    // Get input of the checkboxes
    checkboxes = $("#tablebody input"); // Loop through userData array which corresponds to the checkboxes

    for (var i = 0; i < userData.length; i++) {
      // If a checkbox is checked
      if (checkboxes[i].checked) {
        // Grab the uid of the ith user in the userData array
        var assignTo = userData[i].id; // If not already assigned to, push the uid onto the assignedUIDs array

        if (!assignedUIDs.includes(assignTo)) {
          assignedUIDs.push(assignTo);
        }
      }
    } // Grab doc id of the current assignment


    var params = new URLSearchParams(location.search);
    var assignmentId = params.get('id'); // Assignment document reference

    var assignmentDoc = firestore.collection("assignments").doc(assignmentId); // Update the userIDs array field with assignedUIDs array

    assignmentDoc.update({
      userIDs: assignedUIDs
    }).then(function () {
      alert("Assigned users successfully updated.");
    }).catch(function (error) {
      console.error(error);
    });
  }
});
/*
    btnSetAssignment
    Event Listener on the button update the assignment
    parameters in the database
*/

btnSetAssignment.addEventListener("click", function (e) {
  // Get fields from the html document
  var assignmentLabel = document.getElementById("assignment_name").value;
  var bpm = document.getElementById("BPM").value;
  var timeWSound = document.getElementById("timeWSound").value;
  var cycles = document.getElementById("cycles").value;
  var timeWOSound = document.getElementById("timeWOSound").value;
  var feedback = document.getElementById("feedback").checked; // Get the assignment document id

  var params = new URLSearchParams(location.search);
  var assignmentId = params.get('id'); // Create parameters object

  var parameters = {
    bpm: bpm,
    cycles: cycles,
    feedback: feedback,
    soundOffTime: timeWOSound,
    soundOnTime: timeWSound
  }; // Assignment document reference

  var assignmentDoc = firestore.collection("assignments").doc(assignmentId); // Update the assignment label and the parameters

  assignmentDoc.update({
    assignmentLabel: assignmentLabel,
    parameters: parameters
  }).then(function () {
    alert("Assignment successfully updated.");
  }).catch(function (error) {
    console.error(error);
  });
});
/*
    setHeader
    parameter: assignmentId
    Set the header with the passed in assignmentId
*/

function setHeader(_x) {
  return _setHeader.apply(this, arguments);
}

function _setHeader() {
  _setHeader = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assignmentId) {
    var header;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            header = document.querySelector("#assignmentidheader");
            header.innerHTML = "Assignment: " + assignmentId;

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setHeader.apply(this, arguments);
}

var assignedUIDs = [];
/*
    populateParameters
    Parameter: assignmentId
    Repopulate the parameter fields based on the assignment that was clicked
    on from previous page
*/

function populateParameters(_x2) {
  return _populateParameters.apply(this, arguments);
}

function _populateParameters() {
  _populateParameters = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(assignmentId) {
    var assignmentDoc;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return firestore.collection("assignments").doc(assignmentId);

          case 2:
            assignmentDoc = _context2.sent;
            _context2.next = 5;
            return assignmentDoc.get().then(function (doc) {
              // If the document exists
              if (doc.exists) {
                // Get fields from the database
                var assignmentLabel = doc.data().assignmentLabel;
                var parameters = doc.data().parameters;
                assignedUIDs = doc.data().userIDs; // Set the values of the html document

                document.getElementById("assignment_name").value = assignmentLabel;
                document.getElementById("BPM").value = parameters.bpm;
                document.getElementById("timeWSound").value = parameters.soundOnTime;
                document.getElementById("timeWOSound").value = parameters.soundOffTime;
                document.getElementById("cycles").value = parameters.cycles;

                if (!parameters.feedback) {
                  document.getElementById("feedback").removeAttribute("checked");
                }
              }
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _populateParameters.apply(this, arguments);
}

var userData;
/*
    populateUserTable
    Fetch all users and populate the user table
*/

function populateUserTable() {
  return _populateUserTable.apply(this, arguments);
} // Observer for FirebaseAuth


function _populateUserTable() {
  _populateUserTable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var table, usersCall;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Get table from the html document
            table = document.querySelector("#tablebody"); // Get users

            _context3.next = 3;
            return getUsers();

          case 3:
            usersCall = _context3.sent;
            userData = usersCall.dataArray; // Loop through usersData

            userData.forEach(function (obj) {
              // Create a row entry for each user
              var tr = document.createElement('tr');
              var td_id = document.createElement('td');
              var td_ses = document.createElement('td');
              var latestSessionTime = obj.data.latestSessionTime;

              if (latestSessionTime) {
                latestSessionTime = latestSessionTime.seconds * 1000;
                latestSessionTime = new Date(latestSessionTime);
              } else {
                latestSessionTime = "N/A";
              }

              td_ses.innerHTML = latestSessionTime;
              td_id.innerHTML = obj.data.userID; // Append the user id and latest session time to the row

              tr.appendChild(td_id);
              tr.appendChild(td_ses); // Create checkbox

              var td_checkbox = document.createElement('td');
              var label = document.createElement('label');
              var checkbox = document.createElement('input');
              var span = document.createElement('span');
              checkbox.type = "checkbox";
              label.appendChild(checkbox);
              label.appendChild(span);
              td_checkbox.appendChild(label); // Append checkbox to the row

              tr.appendChild(td_checkbox); // Append row to the table

              table.appendChild(tr);
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _populateUserTable.apply(this, arguments);
}

firebase.auth().onAuthStateChanged(function (user) {
  // If user is logged in
  if (user) {
    // Get admin token result
    user.getIdTokenResult().then(function (idTokenResult) {
      user.admin = idTokenResult.claims.admin; // If user is an admin

      if (user.admin) {
        // Get assignmentId from url (selected from previous page)
        var params = new URLSearchParams(location.search);
        var assignmentId = params.get('id'); // Set the header with assignmentId

        setHeader(assignmentId); // Populate the parameters with the assignmentId

        populateParameters(assignmentId); // Populate the userTable

        populateUserTable();
      } else {
        // Alert that user is not admin and return to user dashboard
        alert("You are not an admin.");
        window.location = "userdashboard.html";
      }
    });
  } else {
    // Not signed in so redirect to login screen
    console.log("You are not signed in.");
    window.location = "index.html";
  }
});