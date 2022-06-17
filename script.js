const addBtn = document.querySelector('.add-project');
let createTaskToggle = true;
const parent = document.querySelector('.projects'); 

//загрузить таски из локал
let storedTasks = JSON.parse(localStorage.getItem('tasks')) || []; 


//показать таски из локал
window.onload = () => {
    listTasks();
}

function listTasks() {
    document.querySelectorAll('.project-card').forEach(e => e.remove());
    for (let i = 0; i < storedTasks.length; i++) {
        const createTask = document.createElement('div');
        createTask.className = "project-card";
        createTask.innerHTML = `<h3>${storedTasks[i].taskTitle}</h3><p>${storedTasks[i].taskBody}</p><img src="img/check.png"></img> <img class='delete' src='img/delete.png' onclick=Delete(${i})></img>`;
        parent.prepend(createTask);
    }
}

addBtn.onclick = () => {
    if (createTaskToggle) { // если задача не создается, ее можно создать
        const before = document.querySelector('.project-card');
        const createTask = document.createElement('div');
        createTask.className = "project-card new-card";
        createTask.innerHTML = "<input class='task-title' placeholder='Название'></input><input class='task-body' placeholder='Описание'></input> <button class='save-project'>Сохранить</button>"
        parent.prepend(createTask);
        createTaskToggle = false;
        

        document.querySelector('.save-project').onclick = () => {
            const title = document.querySelector('.task-title').value;
            const body = document.querySelector('.task-body').value;

            storedTasks.push({                             // сохраняем задачу в локал
                taskTitle: title,
                taskBody: body
            })
    
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            createTask.remove();
            createTaskToggle = true;
            listTasks();
        }
    }

}

function Delete(index) {
    storedTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    listTasks();
}





