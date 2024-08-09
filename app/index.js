//import yargs from "yargs"
const yargs = require("yargs");
const fs = require("fs"); // file system (build trong nodejs)
const {
  readAllTask,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
} = require("./model/task");
// tạo lệnh test
//node app/index.js test
yargs.command({
  command: "test",
  handler: () => {
    console.log("test");
  },
});

//CRUD

//create
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    decription: {
      type: "string",
    },
  },
  handler: (args) => {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log("Đã tạo mới công việc thành công: ", newTask);
  },
});

//read all
yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(result);
  },
});

//read detail
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log(`Task ${id}`, task);
    } else {
      console.log("Not found");
    }
  },
});

//update
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const updatedTask = updateTask(id, title, description);
    if (updatedTask) {
      console.log("Task updateđ: ", updatedTask);
    } else {
      console.log("Not found");
    }
  },
});

//delete
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const deletedTask = deleteTask(id);
    if(deletedTask){
      console.log("Deleted task: ",deletedTask);
    }else{
      console.log("Not found")
    }
  },
});

//lưu lại các lệnh vừa tạo
yargs.parse();
