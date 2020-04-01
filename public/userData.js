import { getAllSessionsForUser } from "./Data.js";
import { getUser } from "./Data.js";

async function setHeader(userid) {
    let header = document.querySelector("#useridheader");
    let usercall = await getUser(userid);
    let username = usercall.data.userID;
    header.innerHTML = "User ID: " + username;
}

async function populateTable(userid) {
    let table = document.querySelector("#tablebody");
    let sessionsCall = await getAllSessionsForUser(userid);
    let sessionData = sessionsCall.dataArray;
    sessionData.forEach(function (obj) {
        let tr = document.createElement('tr');

        let td_id = document.createElement('td');
        let sessionID = obj.data.assignmentID
        td_id.innerHTML = sessionID;
        tr.appendChild(td_id);

        let td_time = document.createElement('td');
        let sessionTime = obj.data.sessionTime;
        sessionTime = sessionTime.seconds * 1000;
        sessionTime = new Date(sessionTime);
        td_time.innerHTML = sessionTime;
        tr.appendChild(td_time);

        let td_params = document.createElement('td');
        let parameters = obj.data.parameters;
        let fbt = "";
        if (parameters.feedback == "True"){
            fbt = "On"
        } else {
            fbt = "Off"
        }
        td_params.innerHTML = parameters.bpm + " BPM, " + parameters.soundOnTime + " On, " + parameters.soundOffTime + " Off, " + parameters.cycles + " Cycles, Feedback " + fbt;
        tr.appendChild(td_params);

        table.appendChild(tr);
    });
}

let params = new URLSearchParams(location.search);
let userid = params.get('id');
setHeader(userid);
populateTable(userid);