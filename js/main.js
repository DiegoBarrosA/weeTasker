let storedTasks = JSON.parse(localStorage.getItem("myTasks") || "[]");
let myTasks = storedTasks;
let statuses = ['Open', 'In Progress', 'Done'];

let handyString = "";

let filterTasksStatuses = (x) => myTasks.filter(obj => {
  return obj.status == x;
})


for (let i = 0; i < statuses.length; i++) {
  handyString += `<option>${statuses[i]}</option>`
}


document.getElementById("statuses").innerHTML = handyString;
handyString = "";
/* for (let j = 0; j < statuses.length; j++) {
  for (let i = 0; i < filterTasksStatuses(statuses[j]).length; i++) {
    handyString += `<tr><td><input name='${filterTasksStatuses(statuses[j])[i].id}' value='true' type='checkbox' id='taskId-${filterTasksStatuses(statuses[j])[i].id}'> ${filterTasksStatuses(statuses[j])[i].summary}</td></tr>`
  }
  document.getElementById(statuses[j]).innerHTML = handyString;
  handyString = "";
} */

for (let j = 0; j < statuses.length; j++) {
  for (let i = 0; i < filterTasksStatuses(statuses[j]).length; i++) {
    handyString += `<tr><td>${filterTasksStatuses(statuses[j])[i].summary}  <select onchange='transitionate(this.options[this.selectedIndex].value,this.options[this.selectedIndex].id)' id='taskId-${filterTasksStatuses(statuses[j])[i].id}'></select></td></tr>`
  }

  document.getElementById(statuses[j]).innerHTML = handyString;
  handyString = "";
}
for (let j = 0; j < myTasks.length; j++) {
for (s in statuses) {
handyString+= `<option id='optionId-${j}-${statuses[s]}' value='${statuses[s]}'>${statuses[s]}</option>`;
document.getElementById(`taskId-${j+1}`).innerHTML = handyString;
}
for (s in statuses){
if( document.getElementById('optionId-'+j+'-'+statuses[s]).value === myTasks[j].status  ){
  document.getElementById('optionId-'+j+'-'+statuses[s]).setAttribute('selected', true);
}
}
handyString ='';
}

function transitionate(chosen,name){

  
let idTrantionate = Number(name.match(/\d+/g));

myTasks[idTrantionate].status = chosen;

  console.log(myTasks[idTrantionate]);
  localStorage.setItem("myTasks", JSON.stringify(myTasks));

}
function createTask() {
  const currentDateTime = new Date().toISOString();
  let inputSummary = document.getElementById("summary").value;
  let newTask = {
    id: myTasks.length + 1,
    summary: inputSummary,
    status: "Open",
    creationDateTime: currentDateTime,
    updateDateTime: currentDateTime
  }
  myTasks.push(newTask)
  localStorage.setItem("myTasks", JSON.stringify(myTasks));
};




