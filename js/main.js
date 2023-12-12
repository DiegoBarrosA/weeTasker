const myTasks = [];
const myStatuses = [];
const backToMenu = () => alert("Going back to the main menu");
const createTasks = () => confirm("There are no tasks, do you want to create one?");
const adjustFrom0 = (x) => x-1;
let selectTask = "";
let listA = "";
let counter = 0;
let promptText = "";
let whatToDo = prompt("What do you want to do?\n1.- View my tasks\n2.- Add a new task\n3.- Update the status of a task");
const statuses = [ "To Do","In Progress","Done"];
mainMenu();
function mainMenu(){
while (whatToDo != ""){
    switch (String(whatToDo)){
        case "1":
            if(myTasks.length != 0){
                selectOption("Tasks:\n",myTasks,myStatuses);
            }else{
                createTasks();
            }
            break;
        case "2":
            addTasks();
            break;
        case "3":
        modifyStatus();
            break;
        default:
        alert("Please enter a parseInt between 0 and 3")
            break;
    }
    whatToDo = prompt("What do you want to do?\n1.- View my tasks\n2.- Add a new task\n3.- Update the status of a task");
}
}
function addTasks(){
    let wantsToContinue = true;
    
    while (wantsToContinue){
        let newTask = prompt("What needs to be done?");
        if(newTask == null || newTask.trim() == ""){
            alert("Please provide a task")
        }else{
            myTasks.push(newTask);
            myStatuses.push(statuses[0]);
        }
        confirmPrompt = confirm("Do you want to add another task?");
        if(!confirmPrompt){
            wantsToContinue = false;
        };
        console.log(myTasks.indexOf)
    };
}
function selectOption(promptText,values){
    if(values == myTasks)
    for (x of values ){
        counter+=1;
        listA += String(counter) + ".- " + x + " - "+ myStatuses[adjustFrom0(counter)]  + "\n";
  }
  else{
    for (x of values ){
        counter+=1;
        listA += String(counter) + ".- " + x + "\n";
  }
  }
  let selectionMade =  prompt(promptText + listA);
  console.log(selectionMade + " was selected.")
  listA ="";
  counter = 0;
  return selectionMade;
}
function modifyStatus(){
if(myTasks.length === 0){
    createTasks();
        if(createTasks){
            addTasks();
            backToMenu();
            return 0;
        } else {
            backToMenu();
            return 0;
        }
    }
    selectTask = selectOption("Which one do you want to modify?:\n",myTasks);
    console.log(myTasks.length);
if(parseInt(selectTask) <= parseInt(myTasks.length)){
    myStatuses[adjustFrom0(parseInt(selectTask))] = statuses[adjustFrom0(parseInt(selectOption("Where to transtion?\n",statuses)))]   
} else if (parseInt(selectTask) === 0) {
    backToMenu();
}else {
    alert("Task " + selectTask +" does not exist, please select a task between 1 and " + String(myTasks.length ))
}
}