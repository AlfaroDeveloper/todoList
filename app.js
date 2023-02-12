// SET VARIABLES TO USE 

// Input from user
let task = document.querySelector('#task');
// Get ul to add tasks to 
let taskList = document.querySelector('.list-group');
// Add task button 
let addTaskBtn = document.querySelector('#addTask');
// Get search to filter through tasks 
const filter = document.querySelector('#filters');


// LOAD ALL EVENTS 
loadAllEvents();

// -----------------------------------------------
// All Events 
function loadAllEvents(){

    document.addEventListener('DOMContentLoaded', displayData);

    addTaskBtn.addEventListener('click', addTask);
    
    filter.addEventListener('keyup', filterTasks);

}

// Display Data 
function displayData(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    // Create elements 
    let taskListItem = document.createElement('li');
    let taskTextElement = document.createElement('p');
    let editButtonHolder = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    // Add bootstrap li class names to make it look nice 
    taskListItem.className = 'list-group-item text-bg-success text-warning w-75 m-auto mb-1 fw-light';
    taskTextElement.className = 'taskText mt-3';
    deleteBtn.className = 'delete btn bg-danger bg-gradient fw-bold m-2';
    editBtn.className = 'edit btn bg-primary bg-gradient fw-bold m-2';
    editButtonHolder.className = 'btnHolder';
    deleteBtn.id = 'delete';
    // Add task text 
    taskTextElement.innerText = `${task.toUpperCase()}`;
    deleteBtn.innerText = 'DELETE';
    editBtn.innerText = 'EDIT';
    // Add to task list 
    editButtonHolder.appendChild(deleteBtn);
    editButtonHolder.appendChild(editBtn);
    taskListItem.appendChild(taskTextElement);
    taskListItem.appendChild(editButtonHolder);
    taskList.appendChild(taskListItem);

    deleteBtn.addEventListener('click', removeTask);
    });
}

// ADD TASK
function addTask(event){
    // Create elements 
    let taskListItem = document.createElement('li');
    let taskTextElement = document.createElement('p');
    let editButtonHolder = document.createElement('div');
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');
    // Add bootstrap li class names to make it look nice 
    taskListItem.className = 'list-group-item text-bg-success text-warning w-75 m-auto mb-1 fw-light';
    taskTextElement.className = 'taskText mt-3';
    deleteBtn.className = 'delete btn bg-danger bg-gradient fw-bold m-2';
    editBtn.className = 'edit btn bg-primary bg-gradient fw-bold m-2';
    editButtonHolder.className = 'btnHolder';
    // Add task text 
    taskTextElement.innerText = `${task.value.toUpperCase()}`;
    deleteBtn.innerText = 'DELETE';
    editBtn.innerText = 'EDIT';
    // Add to task list 
    editButtonHolder.appendChild(deleteBtn);
    editButtonHolder.appendChild(editBtn);
    taskListItem.appendChild(taskTextElement);
    taskListItem.appendChild(editButtonHolder);
    taskList.appendChild(taskListItem);

    // local Storage 
    addToLocalStorage(task.value);

    deleteBtn.addEventListener('click', removeTask);
    

    // Clear task input field 
    task.value = '';

    // Prevent Default Page Reload 
    event.preventDefault();
}

// ADD TASK TO LOCAL STORAGE
function addToLocalStorage(input){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(input);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// EDIT TASK

// FILTER TASKS 
function filterTasks(input){
   const text = input.target.value.toLowerCase();
   const list = document.querySelectorAll('.taskText');

   list.forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.parentElement.style.display = 'flex';
        }else{
            task.parentElement.style.display = 'none';
        }
   });
}

// REMOVE TASK 
function removeTask(e){
    if(e.target.className === 'delete btn bg-danger bg-gradient fw-bold m-2'){
        e.target.parentElement.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.parentElement.firstChild);
    }
}

// REMOVE TASK FROM LOCAL STORAGE
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    
    }
        tasks.forEach(function(task, index){
            if(taskItem.textContent.toLowerCase() === task.toLowerCase()){
                tasks.splice(index, 1);
                console.log(taskItem.textContent.toLowerCase())
            }

        });


    localStorage.setItem('tasks', JSON.stringify(tasks));
}