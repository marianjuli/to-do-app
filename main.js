let form = document.getElementById("form");
let msg = document.getElementById("msg");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add")





form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure")
        msg.innerHTML = "Task cannot be blank"
    } else {
        console.log("success")
        msg.innerHTML = ""
        acceptData();  // retrieves data
        add.setAttribute("data-bs-dismiss", "modal") // close the modal
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "")
        })()    //IIFE only will run once
    }
};

let data = 
[
     
];

let acceptData = () => {   
    data.push({
        text:  textInput.value,
        date:  dateInput.value,
        description: textarea.value

    });
    localStorage.setItem("data", JSON.stringify(data) );
    console.log(data);

    createTasks();
};

let createTasks = () => {// "x" will target each object one by one and "y" targets the index number
    tasks.innerHTML = "";
    data.map((x,y) => { tasks.innerHTML += `   
        <div id=${y}>
                      <span class="fw-bold">${x.text}</span>
                      <span class="small text-secondary">${x.date}</span>
                      <p>${x.description}</p>

                      <span class="options">
                          <i onClick = "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                          <i  onClick = "deleteTask(this), createTasks()" class="fa-solid fa-trash"></i>
                      </span>
                  </div>
      `;

    })
   
    resetForm();

};


let deleteTask = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data) );
    console.log(data);
}


let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
}


let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";


};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []; // prevents uncaugh TypeError:cannot read properties of null
    createTasks();
    console.log(data);

})()