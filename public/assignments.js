function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getUsers } from "./Data.js";
import { getAllAssignments } from "./Data.js";
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    user.getIdTokenResult().then(function (idTokenResult) {
      user.admin = idTokenResult.claims.admin;

      if (user.admin) {
        populateTable();
      } else {
        alert("You are not an admin.");
        window.location = "userdashboard.html";
      }
    });
  } else {
    console.log("You are not signed in.");
    window.location = "index.html";
  }
});

function populateTable() {
  return _populateTable.apply(this, arguments);
}

function _populateTable() {
  _populateTable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var assignmentTable, assignmentCall, assignmentData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assignmentTable = document.querySelector("#assignmentTableBody");
            _context.next = 3;
            return getAllAssignments();

          case 3:
            assignmentCall = _context.sent;
            assignmentData = assignmentCall.dataArray;
            assignmentData.forEach(function (obj) {
              var aTr = document.createElement('tr');
              var td_assignName = document.createElement('td');
              td_assignName.innerHTML = obj.data.assignmentLabel;
              var url = './editAssignment.html?id=' + obj.id;
              aTr.setAttribute('data-href', url);
              var td_params = document.createElement('td');
              var parameters = obj.data.parameters;
              var fbt = "";

              if (parameters.feedback) {
                fbt = "On";
              } else {
                fbt = "Off";
              }

              td_params.innerHTML = parameters.bpm + " BPM, " + parameters.soundOnTime + " On, " + parameters.soundOffTime + " Off, " + parameters.cycles + " Cycles, Feedback: " + fbt;
              aTr.appendChild(td_assignName);
              aTr.appendChild(td_params);
              assignmentTable.appendChild(aTr);
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _populateTable.apply(this, arguments);
}

$(document).ready(function () {
  $(document.body).on("click", "tr[data-href]", function () {
    window.location.href = this.dataset.href;
  });
  $('#searchAssignment').on('keyup', function () {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchAssignment");
    filter = input.value.toUpperCase();
    table = document.getElementById("assignmentTableBody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];

      if (td) {
        txtValue = td.textContent || td.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  });
});