const form = document.querySelector('#task-form');
const lists = document.querySelector('.collection');
const text = document.querySelector('#task');
const card = document.querySelector('.card-action');
const clrBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector('#filter');
loadEventListener();

function loadEventListener(){
     document.addEventListener('DOMContentLoaded', getTasks);
     form.addEventListener('submit', submitForm);
     card.addEventListener('click', deleteTask);
     clrBtn.addEventListener('click', clearTasks);
     filter.addEventListener('input', filterTasks);
}

function getTasks(e){
     let tasks;
     if(localStorage.getItem('tasks') === null){
          tasks = [];
     }
     else{
          tasks = JSON.parse(localStorage.getItem("tasks"));
     }
     tasks.forEach(function(task){

          let newElement = document.createElement('li');
     newElement.className = 'collection-item';
     newElement.appendChild(document.createTextNode(task));
     let link = document.createElement('a');
     link.className = 'delete-item secondary-content';
     link.innerHTML = `<i class='fa fa-remove'></i>`;
     newElement.appendChild(link);

     lists.appendChild(newElement);
     })

   
}

function submitForm(e){
     if(text.value === ''){
          alert('Add Task');
     }
     else{
     let newElement = document.createElement('li');
     newElement.className = 'collection-item';
     newElement.appendChild(document.createTextNode(text.value));
     let link = document.createElement('a');
     link.className = 'delete-item secondary-content';
     link.innerHTML = `<i class='fa fa-remove'></i>`;
     newElement.appendChild(link);

     lists.appendChild(newElement);
     storeItemInLocalStorage(text.value);

     text.value='';
          
     
     e.preventDefault();
}

}

function storeItemInLocalStorage(task){
let tasks;
     if(localStorage.getItem('tasks') === null){
          tasks = [];
     }
     else{
          tasks = JSON.parse(localStorage.getItem("tasks"));
     }
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));
}


function filterTasks(e){
     const text = e.target.value.toLowerCase();
     document.querySelectorAll('.collection-item').forEach(function(task){
          const item = task.firstChild.textContent;
          if(item.toLowerCase().indexOf(text) != -1){
               task.style.display = 'block';
          }
          else{
               task.style.display = 'none';
          }
         

     })
}


function deleteTask(e){
     if(e.target.parentElement.classList.contains('delete-item'))
     {
      if(confirm('Are You Sure?')){
           removeFromLocalStorage(e.target.parentElement.parentElement);
          e.target.parentElement.parentElement.remove();
     }
}
          
}
function removeFromLocalStorage(taskElement){
     let tasks;
     if(localStorage.getItem('tasks') === null){
          tasks = [];
     }
     else{
          tasks = JSON.parse(localStorage.getItem("tasks"));
     }
     tasks.forEach(function(task, index){
          if(taskElement.textContent === task){
               tasks.splice(index, 1);
          }
     })

     localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
    
     
     lists.remove();
}