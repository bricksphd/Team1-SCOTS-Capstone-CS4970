function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getUsers } from "./Data.js";
var btnLogout = document.getElementById("btnLogout");
var adminForm = document.querySelector(".admin-action"); //const functions = firebase.functions();

btnLogout.addEventListener("click", function (e) {
  firebase.auth().signOut().then(function () {
    window.location = "index.html";
  }).catch(function (error) {
    console.log(error);
  });
});
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
adminForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var adminEmail = document.getElementById('admin-email').value;
  var addAdminRole = firebase.functions().httpsCallable('addAdminRole');
  addAdminRole({
    email: adminEmail
  }).then(function (result) {
    console.log(result);

    if (result.data.errorInfo == null) {
      alert(result.data.message);
    } else {
      alert(result.data.errorInfo.message);
    }
  });
});

function populateTable() {
  return _populateTable.apply(this, arguments);
}

function _populateTable() {
  _populateTable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var table, usersCall, userData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            table = document.querySelector("#tablebody");
            _context.next = 3;
            return getUsers();

          case 3:
            usersCall = _context.sent;
            userData = usersCall.dataArray;
            userData.forEach(function (obj) {
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
              var url = './userData.html?id=' + obj.id;
              tr.setAttribute('data-href', url);
              td_id.innerHTML = obj.data.userID;
              tr.appendChild(td_id);
              tr.appendChild(td_ses);
              table.appendChild(tr);
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
  $('#search').on('keyup', function () {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tablebody");
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
$(document).ready(function () {
  $(document.body).on("click", "tr[data-href]", function () {
    window.location.href = this.dataset.href;
  });
});