function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { getAllSessionsForUser } from "./Data.js";
import { getUser } from "./Data.js";
var accountRecoveryForm = document.querySelector(".admin-action");

function setHeader(_x) {
  return _setHeader.apply(this, arguments);
}

function _setHeader() {
  _setHeader = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userid) {
    var header, usercall, username;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            header = document.querySelector("#useridheader");
            _context.next = 3;
            return getUser(userid);

          case 3:
            usercall = _context.sent;
            username = usercall.data.userID;
            header.innerHTML = "User ID: " + username;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setHeader.apply(this, arguments);
}

function populateTable(_x2) {
  return _populateTable.apply(this, arguments);
}

function _populateTable() {
  _populateTable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userid) {
    var table, sessionsCall;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            table = document.querySelector("#tablebody");
            _context2.next = 3;
            return getAllSessionsForUser(userid);

          case 3:
            sessionsCall = _context2.sent;
            sessionData = sessionsCall.dataArray;
            sessionData.forEach(function (obj) {
              var tr = document.createElement('tr');
              var td_id = document.createElement('td');
              var sessionID = obj.data.assignmentID;
              td_id.innerHTML = sessionID;
              tr.appendChild(td_id);
              var td_time = document.createElement('td');
              var sessionTime = obj.data.sessionTime;
              sessionTime = sessionTime.seconds * 1000;
              sessionTime = new Date(sessionTime);
              td_time.innerHTML = sessionTime;
              tr.appendChild(td_time);
              var td_params = document.createElement('td');
              var parameters = obj.data.parameters;
              var fbt = "";

              if (parameters.feedback == "true") {
                fbt = "On";
              } else {
                fbt = "Off";
              }

              td_params.innerHTML = parameters.bpm + " BPM, " + parameters.soundOnTime + " On, " + parameters.soundOffTime + " Off, " + parameters.cycles + " Cycles, Feedback " + fbt;
              tr.appendChild(td_params);
              var td_checkbox = document.createElement('td');
              var label = document.createElement('label');
              var checkbox = document.createElement('input');
              var span = document.createElement('span');
              checkbox.type = "checkbox";
              label.appendChild(checkbox);
              label.appendChild(span);
              td_checkbox.appendChild(label);
              tr.appendChild(td_checkbox);
              table.appendChild(tr);
              var selectBtn = document.querySelector("#select");
              selectBtn.classList.remove("disabled");
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _populateTable.apply(this, arguments);
}

function download() {
  var checkboxes = $("#tablebody input:checked");

  if (checkboxes.length == 0) {
    alert("Please select at least one session to download");
  } else {
    var sessionsDL = [];
    var zip = new JSZip();
    checkboxes = $("#tablebody input");

    for (var i = 0; i < sessionData.length; i++) {
      if (checkboxes[i].checked) {
        sessionsDL.push({
          session: sessionData[i].data,
          id: i
        });
      }
    }

    if (sessionsDL.length == 1) {
      var session = sessionsDL[0];
      var csv = formatCSV(session.session);
      var csvContent = "data:text/csv;charset=utf-8," + csv;
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'session' + session.id + '.csv');
      link.click();
      return;
    } else {
      sessionsDL.forEach(function (session) {
        var csv = formatCSV(session.session);
        zip.file("session" + session.id + ".csv", csv);
      });
    }

    zip.generateAsync({
      type: "blob"
    }).then(function (blob) {
      window.saveAs(blob, "sessions.zip");
    }, function (err) {
      jQuery("#blob").text(err);
    });
  }
}

function formatCSV(session) {
  var parameters = session.parameters;
  var taps = session.taps;
  var data = [];
  data.push(["Tempo (BPM)", parameters.bpm]);
  data.push(["Time On (ms)", parameters.soundOnTime]);
  data.push(["Time Off (ms)", parameters.soundOffTime]);
  data.push(["Cycles", parameters.cycles]);
  data.push(["Feedback", parameters.feedback]);
  data.push([]);
  data.push(["Beat time (ms)", "Tap time (ms)", "Release time (ms)", "Tap intervals (ms)", "Asynchrony (ms)", "Key-press duration (ms)"]);
  taps.forEach(function (tap) {
    data.push([tap.beat, tap.pressTime, tap.releaseTime, tap.timeSinceLast, tap.delta, tap.duration]);
  });
  var csvContent = data.map(function (e) {
    return e.join(",");
  }).join("\n");
  return csvContent;
}

var sessionData;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    user.getIdTokenResult().then(function (idTokenResult) {
      user.admin = idTokenResult.claims.admin;

      if (user.admin) {
        var downloadButton = document.querySelector("#downloadbutton");
        downloadButton.onclick = download;
        var params = new URLSearchParams(location.search);
        var userid = params.get('id');
        setHeader(userid);
        populateTable(userid);
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
$(document).ready(function () {
  $("#select").click(function () {
    var checked = !$(this).data('checked');
    $('input:checkbox').prop('checked', checked);
    $(this).val(checked ? 'uncheck all' : 'check all');
    $(this).data('checked', checked);
  });
});
accountRecoveryForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var confirmPassword = document.getElementById("confirmPassword").value;
  var params = new URLSearchParams(location.search);
  var userid = params.get('id');
  var changeUserPassword = firebase.functions().httpsCallable('changeUserPassword');
  changeUserPassword({
    uid: userid,
    password: confirmPassword
  }).then(function (result) {
    console.log(result);
    alert(result.data.message);
  }).catch(function (error) {
    console.log(error);
    alert(error.message);
  });
});