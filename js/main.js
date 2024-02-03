import { callApi } from "./api.js";
let storedTasks = JSON.parse(localStorage.getItem("myTasks") || "[]");
let myTasks = storedTasks;
const statuses = ["Open", "In Progress", "Done"];

let handyString = "";

let filterTasksStatuses = (x) =>
  myTasks.filter((obj) => {
    return obj.status == x;
  });

for (let i = 0; i < statuses.length; i++) {
  handyString += `<option>${statuses[i]}</option>`;
}

document.getElementById("statuses").innerHTML = handyString;
handyString = "";
let statusColor = "badge";
for (let j = 0; j < statuses.length; j++) {
  for (let i = 0; i < filterTasksStatuses(statuses[j]).length; i++) {
    if (filterTasksStatuses(statuses[j])[i].status == "Open") {
      statusColor = "badge rounded-2 border-3 border-secondary  bg-secondary";
    } else if (filterTasksStatuses(statuses[j])[i].status == "In Progress") {
      statusColor = "badge rounded-2 border-3 border-primary bg-primary";
    } else if (filterTasksStatuses(statuses[j])[i].status == "Done") {
      statusColor = "badge rounded-2 border-3 border-success  bg-success";
    }
    handyString += `
                <tr>
                  <td>
                    <div class='card border-0'>
                      <div class='row'>
                        <div class='col-6'>
                          <h6 class='card-title'> ${
                            filterTasksStatuses(statuses[j])[i].summary
                          } </h6>
                        </div>
                        <div class='col-6'>
                          <select
                            onchange='transitionate(this.options[this.selectedIndex].value,this.options[this.selectedIndex].id)'
                            id='taskId-${
                              filterTasksStatuses(statuses[j])[i].id
                            }' class='${statusColor}'>
                          </select>
                        </div>
                      </div>
                      <div class='card-text'>
                        ${filterTasksStatuses(statuses[j])[i].description}
                      </div>
                    </div>
                  </td>
                </tr>    
        `;
    statusColor = "badge";
  }

  document.getElementById(statuses[j]).innerHTML = handyString;
  handyString = "";
}


for (let j = 0; j < myTasks.length; j++) {
  for (let s = 0; s < statuses.length; s++) {
    handyString += `<option id='optionId-${j}-${statuses[s]}' value='${statuses[s]}'>${statuses[s]}</option>`;
    document.getElementById(`taskId-${j + 1}`).innerHTML = handyString;
  }
  for (let s = 0; s < statuses.length; s++) {
    if (
      document.getElementById("optionId-" + j + "-" + statuses[s]).value ===
      myTasks[j].status
    ) {
      document
        .getElementById("optionId-" + j + "-" + statuses[s])
        .setAttribute("selected", true);
    }

    
}
  handyString = "";
}
window.transitionate = transitionate;
function transitionate(chosen, name) {
  let idTrantionate = Number(name.match(/\d+/g));
  myTasks[idTrantionate].status = chosen;
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
  location.reload();
}
window.createTask = createTask;
function createTask() {
  const currentDateTime = new Date().toISOString();
  let inputSummary = document.getElementById("summary").value;
  let inputDescription = document.getElementById("description").value;
  let newTask = {
    id: myTasks.length + 1,
    summary: inputSummary,
    status: "Open",
    description: inputDescription,
    creationDateTime: currentDateTime,
    updateDateTime: currentDateTime,
  };
  myTasks.push(newTask);
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
}
