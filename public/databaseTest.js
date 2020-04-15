function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { createAssignment, createSession, getAllSessionsForUser, getAssignmentsForUser, getUsers } from "./Data.js";
var status = document.querySelector("#status");
var inputBox = document.querySelector("#myText");
var insertSession = document.querySelector("#insertSession");
var insertAssign = document.querySelector("#insertAssign");
var getSession = document.querySelector("#getSession");
var getAssign = document.querySelector("#getAssignment");
var getUser = document.querySelector("#getUser");
getSession.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var user, data;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = firebase.auth().currentUser;
          console.log(user);
          _context.next = 4;
          return getAllSessionsForUser("vkvd7hlKXEOJSxSnn0pe2CJ5OXE3");

        case 4:
          data = _context.sent;
          console.log("Client session data ", data); //something odd here where doesnt print out each element...due to size?

          data.dataArray.forEach(function (obj) {
            console.log("client session element " + obj);
          }); //You can still acess elements tho

          console.log("First element ", data.dataArray[0]);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
getAssign.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var data;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getAssignmentsForUser("vkvd7hlKXEOJSxSnn0pe2CJ5OXE3");

        case 2:
          data = _context2.sent;
          console.log("Client assignment data ", data);
          data.dataArray.forEach(function (obj) {
            console.log("client assignment element ", obj);
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
getUser.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var data;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getUsers();

        case 2:
          data = _context3.sent;
          console.log("Client user data ", data);
          data.dataArray.forEach(function (obj) {
            console.log("client user element ", obj);
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
insertAssign.addEventListener("click", function () {
  createAssignment("Assignment 3", "120", "10", "10", "1", "True", ["vkvd7hlKXEOJSxSnn0pe2CJ5OXE3", "user2"]);
  console.log("Created Assignment");
});
insertSession.addEventListener("click", function () {
  var tapData = [{
    beat: 0,
    delta: -26,
    duration: 0,
    nextBeat: 0,
    nextDelta: 4,
    pressTime: 500,
    prevBeat: 0,
    releaseTime: 0,
    side: 0,
    soundOn: true,
    timeSinceLast: 574
  }, {
    beat: 50,
    delta: -26,
    duration: 0,
    nextBeat: 0,
    nextDelta: 4,
    pressTime: 500,
    prevBeat: 0,
    releaseTime: 0,
    side: 0,
    soundOn: true,
    timeSinceLast: 574
  }, {
    beat: 100,
    delta: -26,
    duration: 0,
    nextBeat: 0,
    nextDelta: 4,
    pressTime: 500,
    prevBeat: 0,
    releaseTime: 0,
    side: 0,
    soundOn: true,
    timeSinceLast: 574
  }];
  var ret = createSession("-1", "120", "10", "10", "1", "True", "vkvd7hlKXEOJSxSnn0pe2CJ5OXE3", tapData);
});