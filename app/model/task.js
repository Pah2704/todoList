const { log } = require('console');
const fs = require('fs');
const readAllTask = () => {
    const buffer = fs.readFileSync("app/task.json"); //mã hexa
    //Chuyển sang chuỗi
    const taskString = buffer.toString();
    //chuyển sang json
    taskJson = JSON.parse(taskString);
    return taskJson;
}

const createTask = (title, decription) => {
    const newTask = {
        id: Math.random().toString(),
        title,
        decription
    };
    let taskList = readAllTask();
    taskList = [...taskList,newTask];
    fs.writeFileSync("app/task.json",JSON.stringify(taskList));
    return newTask;
};
const readDetailTask=(id)=>{
    let taskList = readAllTask();
    const task = taskList.find((task)=>id ===task.id);
    return task;
}

const updateTask=(id,title,description)=>{
    let taskList = readAllTask();
    const index = taskList.findIndex((task)=>task.id ===id);
    if(index !=-1){
        const oldTask=taskList[index];
        const newTask = {...oldTask,title,description};
        taskList [index] = newTask;
        fs.writeFileSync("app/task.json",JSON.stringify(taskList));
        return newTask;
    }else{
        return false

    }
}

const deleteTask=(id)=>{
    let taskList = readAllTask();
    const index = taskList.findIndex((task)=>task.id ===id);
    if(index !=-1){
        const deleteTask=taskList[index];
        taskList = taskList.filter((deleteTask)=>deleteTask.id!==id);
        fs.writeFileSync("app/task.json",JSON.stringify(taskList));
        return deleteTask;
    }else{
        return false

    }
};
module.exports = {
    readAllTask,
    createTask,
    readDetailTask,
    updateTask,
    deleteTask
}