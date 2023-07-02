//define ui vars

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();
// load all event listeners

function loadEventListeners(){
    //DOM load event

    document.addEventListener("DOMContentLoaded",getTask);
    // add task event
    form.addEventListener("submit",addtask);

    //clear task

    clearbtn.addEventListener("click", del);

    //filter tasks event
  filter.addEventListener("keyup",filterTasks);
}

// get tasks from ls
function getTask(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    //clear  li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to li
    
    li.appendChild(document.createTextNode(task));
    
    // create new link element
    
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    // add icon html
    
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    //append the link to li
    
    li.appendChild(link);
    // append li to ul
    
    tasklist.appendChild(li);
    
  })
}
// add task
function addtask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }
   
    //clear  li element
const li = document.createElement('li');
// Add class
li.className = 'collection-item';
// create text node and append to li

li.appendChild(document.createTextNode(taskInput.value));

// create new link element

const link = document.createElement('a');
//add class
link.className = 'delete-item secondary-content';
// add icon html

link.innerHTML = '<i class="fa fa-remove"></i>';

//append the link to li

li.appendChild(link);
// append li to ul

tasklist.appendChild(li);

// clear input
taskInput.value = '';

e.preventDefault();
}

//store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//store in ls
storeTaskInLocalStorage(taskInput.value);
//removing element 

document.body.addEventListener("click", delete_item);
function delete_item(air){
    if(air.target.parentElement.classList.contains('delete-item')){
      if(confirm("Are you sure?")){
        air.target.parentElement.parentElement.remove();
        
      }
    }
}


// delete all data



//delete action

function del(e){
 tasklist.innerHTML = '';
e.preventDefault();
}

//filter task
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      }else{
        task.style.display = 'none';
      }
    }
  );
 
}