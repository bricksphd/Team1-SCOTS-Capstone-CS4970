//File: Data.js
//Description: Contains all the functions that interact with cloud firestore.
//Includes functions for creating sessions and assignments, and reading users, sessions, and assignments.
//TODO: Research more robust methods of querying firebase(pagination). Develop standard error responses to 'client'
'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var firestore = firebase.firestore(); //Function: createSession
//Input: string assignmentID: the label of assignment that launched this session. Value is 'Custom Session' if not launched from assignment
//       int bpm: beats per minute
//       int soundOn: time in seconds of game phase where sound was on
//       int soundOff: int,time in seconds of game phase where sound was off
//       int cycles: the amount of times the game cycled. 1 cycle = soundOn + soundOff, 2 cycles = soundOn + soundOff + soundOn + soundOff, etc
//       boolean feedback: true if feedback was enabled, false if not
//       string userID: the userID of the user who completed the session
//       array of TapObjects tapData: the array containing each TapObject in the session
//Output: returns the promise object
//Description: Creates new session upon completion of game. Stores tap objects as an array of TapObjects.
//Also updates the user document with the latest session time

function createSession(assignmentID, bpm, soundOn, soundOff, cycles, feedback, userID, tapData) {
  // Create a batch
  var batch = firestore.batch(); // Build the new session document

  var sessions = firestore.collection('sessions');
  var newSessionRef = sessions.doc();
  var docData = {
    assignmentID: assignmentID,
    parameters: {
      bpm: bpm,
      soundOnTime: soundOn,
      soundOffTime: soundOff,
      cycles: cycles,
      feedback: feedback
    },
    userID: userID,
    sessionTime: firebase.firestore.Timestamp.now(),
    taps: tapData
  };
  batch.set(newSessionRef, docData); //Also update the latest session time in the users/<userID> document

  var userRef = firestore.collection("users").doc(userID);
  batch.update(userRef, {
    "latestSessionTime": docData.sessionTime
  }); //Commit the batch

  return batch.commit().then(function () {
    console.log("New Session successfully written! ", newSessionRef.id);
  }).catch(function (error) {
    console.error("Error when adding new session: ", error);
  });
} //Function: getSession
//Input: string sessionID, the id of the requested session document
//Output: returns sessionData, {id: the id of the session document, data: the contents of the session document}
//Description: Returns the requested session document


function getSession(_x) {
  return _getSession.apply(this, arguments);
} //Function: getAllSessionsForUser
//Input: string userID, the id of the user tied to the desired sessions
//Output: returns sessionsArray, {dataArray: [{id: the id of the session document, data: the contents of the session document}, {...}, {...}]}
//Description: Gets all sessions tied to passed userID, returns them in an object containing an array of sessions


function _getSession() {
  _getSession = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sessionID) {
    var sessionData, getSessionData, _getSessionData;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _getSessionData = function _ref2() {
              _getSessionData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sessionID) {
                var returnData, docRef, promise;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        returnData = {
                          id: null
                        };
                        docRef = firestore.collection("sessions").doc(sessionID);
                        _context.next = 4;
                        return docRef.get();

                      case 4:
                        promise = _context.sent;

                        if (!promise.exists) {
                          _context.next = 9;
                          break;
                        }

                        returnData = {
                          id: promise.id,
                          data: promise.data()
                        };
                        _context.next = 10;
                        break;

                      case 9:
                        throw error("Requested session does not exist!");

                      case 10:
                        return _context.abrupt("return", returnData);

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _getSessionData.apply(this, arguments);
            };

            getSessionData = function _ref(_x5) {
              return _getSessionData.apply(this, arguments);
            };

            sessionData = {}; //performs the actual firestore query

            _context2.prev = 3;
            _context2.next = 6;
            return getSessionData(sessionID);

          case 6:
            sessionsData = _context2.sent;
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);
            console.log("Error getting sessions ", _context2.t0);

          case 12:
            _context2.prev = 12;
            console.log("returning data to client...", sessionsData);
            return _context2.abrupt("return", sessionsData);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 9, 12, 16]]);
  }));
  return _getSession.apply(this, arguments);
}

function getAllSessionsForUser(_x2) {
  return _getAllSessionsForUser.apply(this, arguments);
} //Function: getUser
//Input: string userID, the id of the requested user
//Output: returns userData = {id: user doc id, data: user doc data}
//Description: Returns the user document of the requested user


function _getAllSessionsForUser() {
  _getAllSessionsForUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userID) {
    var sessionsArray, getSessionData, _getSessionData2;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _getSessionData2 = function _ref4() {
              _getSessionData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userID) {
                var returnData, sessions, query, promise, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, sess;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        //Return data as an array of maps, where each item contains the docID and session data
                        //We can change this to return a custom object later
                        returnData = {
                          dataArray: []
                        };
                        sessions = firestore.collection("sessions").orderBy("sessionTime"); //IMPORTANT
                        //we can implement pagination later on to perform batched reads
                        //I am implementing a limit so we don't run into pricing issues

                        query = sessions.where("userID", "==", userID).limit(20);
                        _context3.next = 5;
                        return query.get();

                      case 5:
                        promise = _context3.sent;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context3.prev = 9;

                        for (_iterator = promise.docs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                          sess = _step.value;
                          returnData.dataArray.push({
                            id: sess.id,
                            data: sess.data()
                          });
                        }

                        _context3.next = 17;
                        break;

                      case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3["catch"](9);
                        _didIteratorError = true;
                        _iteratorError = _context3.t0;

                      case 17:
                        _context3.prev = 17;
                        _context3.prev = 18;

                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                          _iterator.return();
                        }

                      case 20:
                        _context3.prev = 20;

                        if (!_didIteratorError) {
                          _context3.next = 23;
                          break;
                        }

                        throw _iteratorError;

                      case 23:
                        return _context3.finish(20);

                      case 24:
                        return _context3.finish(17);

                      case 25:
                        return _context3.abrupt("return", returnData);

                      case 26:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[9, 13, 17, 25], [18,, 20, 24]]);
              }));
              return _getSessionData2.apply(this, arguments);
            };

            getSessionData = function _ref3(_x6) {
              return _getSessionData2.apply(this, arguments);
            };

            sessionsArray = {
              dataArray: null
            };
            _context4.prev = 3;
            _context4.next = 6;
            return getSessionData(userID);

          case 6:
            sessionsArray = _context4.sent;
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](3);
            console.log("Error getting sessions ", _context4.t0);

          case 12:
            _context4.prev = 12;
            console.log("returning data to client...", sessionsArray);
            return _context4.abrupt("return", sessionsArray);

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 9, 12, 16]]);
  }));
  return _getAllSessionsForUser.apply(this, arguments);
}

function getUser(_x3) {
  return _getUser.apply(this, arguments);
} //Function: getUsers
//Input: none
//Output: returns usersArray = {dataArray:[{id: user doc id, data: user doc data},{...},{...}]}
//Description: Returns all the users in the users collection
//TODO: Implement limit? Paginate data?


function _getUser() {
  _getUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userID) {
    var userData, getUserData, _getUserData;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _getUserData = function _ref6() {
              _getUserData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userID) {
                var returnData, docRef, promise;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        returnData = {
                          id: null
                        };
                        docRef = firestore.collection("users").doc(userID);
                        _context5.next = 4;
                        return docRef.get();

                      case 4:
                        promise = _context5.sent;

                        if (!promise.exists) {
                          _context5.next = 9;
                          break;
                        }

                        returnData = {
                          id: promise.id,
                          data: promise.data()
                        };
                        _context5.next = 10;
                        break;

                      case 9:
                        throw error("Requested user does not exist!");

                      case 10:
                        return _context5.abrupt("return", returnData);

                      case 11:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));
              return _getUserData.apply(this, arguments);
            };

            getUserData = function _ref5(_x7) {
              return _getUserData.apply(this, arguments);
            };

            userData = {};
            _context6.prev = 3;
            _context6.next = 6;
            return getUserData(userID);

          case 6:
            userData = _context6.sent;
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](3);
            console.log("Error getting user ", _context6.t0);

          case 12:
            _context6.prev = 12;
            console.log("returning data to client...", userData);
            return _context6.abrupt("return", userData);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 9, 12, 16]]);
  }));
  return _getUser.apply(this, arguments);
}

function getUsers() {
  return _getUsers.apply(this, arguments);
} //Function: createAssignment
//Input: string assignmentLabel: the name of the assignment
//       int bpm: beats per minute
//       int soundOn: time in seconds of game phase where sound was on
//       int soundOff: int,time in seconds of game phase where sound was off
//       int cycles: the amount of times the game cycled. 1 cycle = soundOn + soundOff, 2 cycles = soundOn + soundOff + soundOn + soundOff, etc
//       boolean feedback: true if feedback was enabled, false if not
//       string array userIDs: the list of users that are assigned this assignment
//Output: none
//Description: Creates new assignment for listed users based off of passed parameters
//TODO: Add error handling


function _getUsers() {
  _getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var usersArray, getUserData, _getUserData2;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _getUserData2 = function _ref8() {
              _getUserData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var users, returnData, promise, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, user;

                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        users = firestore.collection("users");
                        returnData = {
                          dataArray: []
                        };
                        _context7.next = 4;
                        return users.orderBy("userID").get();

                      case 4:
                        promise = _context7.sent;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context7.prev = 8;

                        for (_iterator2 = promise.docs[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                          user = _step2.value;
                          returnData.dataArray.push({
                            id: user.id,
                            data: user.data()
                          });
                        }

                        _context7.next = 16;
                        break;

                      case 12:
                        _context7.prev = 12;
                        _context7.t0 = _context7["catch"](8);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context7.t0;

                      case 16:
                        _context7.prev = 16;
                        _context7.prev = 17;

                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                          _iterator2.return();
                        }

                      case 19:
                        _context7.prev = 19;

                        if (!_didIteratorError2) {
                          _context7.next = 22;
                          break;
                        }

                        throw _iteratorError2;

                      case 22:
                        return _context7.finish(19);

                      case 23:
                        return _context7.finish(16);

                      case 24:
                        return _context7.abrupt("return", returnData);

                      case 25:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7, null, [[8, 12, 16, 24], [17,, 19, 23]]);
              }));
              return _getUserData2.apply(this, arguments);
            };

            getUserData = function _ref7() {
              return _getUserData2.apply(this, arguments);
            };

            usersArray = {
              dataArray: null
            };
            _context8.prev = 3;
            _context8.next = 6;
            return getUserData();

          case 6:
            usersArray = _context8.sent;
            _context8.next = 12;
            break;

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](3);
            console.log("Error getting users ", _context8.t0);

          case 12:
            _context8.prev = 12;
            console.log("returning data to client...", usersArray);
            return _context8.abrupt("return", usersArray);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[3, 9, 12, 16]]);
  }));
  return _getUsers.apply(this, arguments);
}

function createAssignment(assignmentLabel, bpm, soundOn, soundOff, cycles, feedback, userIDs) {
  var assignments = firestore.collection("assignments");
  var docData = {
    assignmentLabel: assignmentLabel,
    parameters: {
      bpm: bpm,
      soundOnTime: soundOn,
      soundOffTime: soundOff,
      cycles: cycles,
      feedback: feedback
    },
    userIDs: userIDs
  };
  assignments.add(docData).then(function () {
    alert("New Assignment successfully written!");
  }).catch(function (error) {
    alert("Unable to write new Assignment");
    console.log(error);
  });
} //Function: getAssignmentsForUser
//Input: string userID, id of user that is tied to requested assignments
//Output: returns assignmentsArray = {dataArray:[{id: assignment doc id, data: assignment doc data},{...},{...}]}
//Description: Returns all the assignments for the passed userID
//TODO: Pagination?


function getAssignmentsForUser(_x4) {
  return _getAssignmentsForUser.apply(this, arguments);
}

function _getAssignmentsForUser() {
  _getAssignmentsForUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(userID) {
    var assignmentsArray, getAssignmentData, _getAssignmentData;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _getAssignmentData = function _ref10() {
              _getAssignmentData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(userID) {
                var returnData, assignments, query, promise, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, assign;

                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        returnData = {
                          dataArray: []
                        };
                        assignments = firestore.collection("assignments").orderBy("assignmentLabel");
                        query = assignments.where("userIDs", "array-contains", userID).limit(20);
                        _context9.next = 5;
                        return query.get();

                      case 5:
                        promise = _context9.sent;
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context9.prev = 9;

                        for (_iterator3 = promise.docs[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                          assign = _step3.value;
                          returnData.dataArray.push({
                            id: assign.id,
                            data: assign.data()
                          });
                        }

                        _context9.next = 17;
                        break;

                      case 13:
                        _context9.prev = 13;
                        _context9.t0 = _context9["catch"](9);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context9.t0;

                      case 17:
                        _context9.prev = 17;
                        _context9.prev = 18;

                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                          _iterator3.return();
                        }

                      case 20:
                        _context9.prev = 20;

                        if (!_didIteratorError3) {
                          _context9.next = 23;
                          break;
                        }

                        throw _iteratorError3;

                      case 23:
                        return _context9.finish(20);

                      case 24:
                        return _context9.finish(17);

                      case 25:
                        return _context9.abrupt("return", returnData);

                      case 26:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9, null, [[9, 13, 17, 25], [18,, 20, 24]]);
              }));
              return _getAssignmentData.apply(this, arguments);
            };

            getAssignmentData = function _ref9(_x8) {
              return _getAssignmentData.apply(this, arguments);
            };

            assignmentsArray = {
              dataArray: null
            };
            _context10.prev = 3;
            _context10.next = 6;
            return getAssignmentData(userID);

          case 6:
            assignmentsArray = _context10.sent;
            _context10.next = 12;
            break;

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](3);
            console.log("Error getting assignments ", _context10.t0);

          case 12:
            _context10.prev = 12;
            console.log("returning data to client...", assignmentsArray);
            return _context10.abrupt("return", assignmentsArray);

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[3, 9, 12, 16]]);
  }));
  return _getAssignmentsForUser.apply(this, arguments);
}

function getAllAssignments() {
  return _getAllAssignments.apply(this, arguments);
}

function _getAllAssignments() {
  _getAllAssignments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var assignmentsArray, getAssignmentData, _getAssignmentData2;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _getAssignmentData2 = function _ref12() {
              _getAssignmentData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var returnData, assignments, promise, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, assign;

                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        returnData = {
                          dataArray: []
                        };
                        assignments = firestore.collection("assignments").orderBy("assignmentLabel").limit(20);
                        _context11.next = 4;
                        return assignments.get();

                      case 4:
                        promise = _context11.sent;
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context11.prev = 8;

                        for (_iterator4 = promise.docs[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                          assign = _step4.value;
                          returnData.dataArray.push({
                            id: assign.id,
                            data: assign.data()
                          });
                        }

                        _context11.next = 16;
                        break;

                      case 12:
                        _context11.prev = 12;
                        _context11.t0 = _context11["catch"](8);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context11.t0;

                      case 16:
                        _context11.prev = 16;
                        _context11.prev = 17;

                        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                          _iterator4.return();
                        }

                      case 19:
                        _context11.prev = 19;

                        if (!_didIteratorError4) {
                          _context11.next = 22;
                          break;
                        }

                        throw _iteratorError4;

                      case 22:
                        return _context11.finish(19);

                      case 23:
                        return _context11.finish(16);

                      case 24:
                        return _context11.abrupt("return", returnData);

                      case 25:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11, null, [[8, 12, 16, 24], [17,, 19, 23]]);
              }));
              return _getAssignmentData2.apply(this, arguments);
            };

            getAssignmentData = function _ref11() {
              return _getAssignmentData2.apply(this, arguments);
            };

            assignmentsArray = {
              dataArray: null
            };
            _context12.prev = 3;
            _context12.next = 6;
            return getAssignmentData();

          case 6:
            assignmentsArray = _context12.sent;
            _context12.next = 12;
            break;

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](3);
            console.log("Error getting assignments ", _context12.t0);

          case 12:
            _context12.prev = 12;
            console.log("returning data to client...", assignmentsArray);
            return _context12.abrupt("return", assignmentsArray);

          case 16:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[3, 9, 12, 16]]);
  }));
  return _getAllAssignments.apply(this, arguments);
}

export { createAssignment, createSession, getAllSessionsForUser, getAssignmentsForUser, getUsers, getSession, getUser, getAllAssignments };