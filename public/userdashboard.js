function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getAssignmentsForUser } from "./Data.js";
var greeting = document.getElementById("greeting");
var username;
var btnLogout = document.getElementById("btnLogout");
var assignmentTable = document.querySelector("#tablebody");
btnLogout.addEventListener("click", function (e) {
  firebase.auth().signOut().then(function () {
    window.location = "index.html";
  }).catch(function (error) {
    console.log(error);
  });
});
firebase.auth().onAuthStateChanged( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var authId, assignmentsArray;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!user) {
              _context.next = 11;
              break;
            }

            username = user.email.split("@")[0];
            greeting.innerHTML = "Welcome, " + username + "!";
            authId = user.uid; //TODO: If user.uid is not the primary key for the user table, query user table to get
            //primary key. Otherwise, save autId into sessionStorage

            sessionStorage.setItem('uid', authId); //Get all assignments for the current user

            _context.next = 7;
            return getAssignmentsForUser(authId);

          case 7:
            assignmentsArray = _context.sent;
            //console.log(assignmentsArray.dataArray);
            //For each assignment fetched, add the corresponding row
            assignmentsArray.dataArray.forEach(function (assignment) {
              var tr = document.createElement('tr');
              tr.innerHtml = "<tr>";
              tr.innerHTML += "<td>" + assignment.data.assignmentLabel + "</td>";
              tr.innerHTML += "<td>" + assignment.data.parameters.bpm + "</td>";
              tr.innerHTML += "<td>" + assignment.data.parameters.soundOnTime + "</td>";
              tr.innerHTML += "<td>" + assignment.data.parameters.soundOffTime + "</td>";

              if (assignment.data.parameters.feedback) {
                tr.innerHTML += "<td>On</td>";
              } else {
                tr.innerHTML += "<td>Off</td>";
              }

              tr.innerHTML += "<td>" + assignment.data.parameters.cycles + "</td>";
              tr.innerHTML += "</tr>"; //Set the parameter attribute to the values within the table

              tr.setAttribute('data-parameters', assignment.data.assignmentLabel + "," + assignment.data.parameters.bpm + "," + assignment.data.parameters.soundOnTime + "," + assignment.data.parameters.soundOffTime + "," + assignment.data.parameters.feedback + "," + assignment.data.parameters.cycles); //Append the row to the table

              assignmentTable.appendChild(tr);
            });
            _context.next = 13;
            break;

          case 11:
            // No user is signed in.
            console.log("No user is signed in");
            window.location = "index.html";

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
$("#tablebody").on("click", "tr", function () {
  //console.log($(this).data('parameters'));
  //Get the parameters in the form of an array
  var params = $(this).data('parameters').split(",");
  var assignment = params[0];
  var bpm = params[1];
  var timeWSound = params[2];
  var timeWOSound = params[3];
  var cycles = params[5];
  var feedback = params[4]; //Set all the parameters in sessionStorage

  sessionStorage.clear();
  sessionStorage.setItem('aid', assignment);
  sessionStorage.setItem("bpm", bpm);
  sessionStorage.setItem("timeWSound", timeWSound);
  sessionStorage.setItem("cycles", cycles);
  sessionStorage.setItem("timeWOSound", timeWOSound);
  sessionStorage.setItem("feedback", feedback); //Jump to start page

  window.location = "start.html";
});
$("td > a").on("click", function (e) {
  e.stopPropagation();
});