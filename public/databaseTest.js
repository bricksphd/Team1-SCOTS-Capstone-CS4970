
import {createAssignment, createSession} from "./Data.js";

/*const firebaseConfig = {
    apiKey: "AIzaSyDDadfEqiZEovi1FrCu_6BS78CsQttkp9E",
    authDomain: "scots-capstone.firebaseapp.com",
    databaseURL: "https://scots-capstone.firebaseio.com",
    projectId: "scots-capstone",
    storageBucket: "scots-capstone.appspot.com",
    messagingSenderId: "699046472990",
    appId: "1:699046472990:web:4b62279ece6940359a2d0f",
    measurementId: "G-F619W4DX2K"
  };

  firebase.initializeApp(firebaseConfig); */

  //var firestore = firebase.firestore();
  //const docRef = firestore.doc("sessions/session");

  const status = document.querySelector("#status");
  const inputBox = document.querySelector("#myText");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");

 /*  saveButton.addEventListener("click", function(){
      const textToSave = inputBox.value;
      console.log("Saving to firebase");
      docRef.set({
          hotDogStatus: textToSave
      }).then(function(){
          console.log("Status saved");
      }).catch(function (error){
          console.log("Error ", error);
      });
  }) */

saveButton.addEventListener("click", function(){
    createAssignment(
    "Assignment 1",
    "120",
    "10",
    "10",
    "1",
    "True",
    ["user1", "user2"])
    console.log("Created Assignment");
});

  loadButton.addEventListener("click", function(){
    let tapData = [{
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
    },{
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
    },{
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
    }] 
    let ret = createSession(
         "-1",
         "120",
         "10",
         "10",
         "1",
         "True",
         "00001",
         tapData
     );
     console.log(ret);
  })


  //Grab updated docunment in realtime
/*   getRealTimeUpdates = function() {
      docRef.onSnapshot(function (doc) {
        if(doc && doc.exists){
            const myData = doc.data();
            status.innerText = "Status: " + myData.hotDogStatus;
        }
      })
  } */

  //getRealTimeUpdates();

/*
beat: 600
prevBeat: 0
nextBeat: 1200
pressTime: 574
releaseTime: 691
duration: 117
delta: -26
nextDelta: -626
prevDelta: 574
timeSinceLast: 574
soundOn: true
side: 0 */