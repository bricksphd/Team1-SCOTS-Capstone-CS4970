import { getUsers } from "./Data.js";

const btnLogout = document.getElementById("btnLogout");

const adminForm = document.querySelector(".admin-action");
//const functions = firebase.functions();
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut().then(function () {
        window.location = "index.html";
    }).catch(function (error) {
        console.log(error);
    });
});

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.getElementById('admin-email').value;
    const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
        console.log(result);
        if (result.data.errorInfo == null) {
            alert(result.data.message);
        }
        else {
            alert(result.data.errorInfo.message);
        }
    });
});


       // tr.setAttribute('data-href', url);
async function populateTable() {
    let table = document.querySelector("#tablebody");
    let usersCall = await getUsers();
    let userData = usersCall.dataArray;
    userData.forEach(function (obj) {
        let tr = document.createElement('tr');
        let td_id = document.createElement('td');
        let a = document.createElement('a');
        let td_ses = document.createElement('td');
        let latestSessionTime = obj.data.latestSessionTime;
        if (latestSessionTime) {
            latestSessionTime = latestSessionTime.seconds * 1000;
            latestSessionTime = new Date(latestSessionTime);
        } else {
            latestSessionTime = "N/A";
        }
        td_ses.innerHTML = latestSessionTime;
        a.innerHTML = obj.data.userID;
        a.href = './user.html?id=' + obj.data.userID;
        td_id.appendChild(a);
        tr.appendChild(td_id);
        tr.appendChild(td_ses);
        table.appendChild(tr);
    });
}

let table = document.querySelector("#tablebody");
let data = fetchData();
populateTable(data, table);

function myFunction(){
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
  }

$('*[data-href]').on("click",function(){
  window.location = $(this).data('href');
  return false;
});
$("td > a").on("click",function(e){
  e.stopPropagation();
});;

populateTable();

