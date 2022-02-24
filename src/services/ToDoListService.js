import axios from "axios";
import { DOMAIN } from "../ultil/constants/settingSystem";

//hàm khởi tạo đối tượng
export class ToDoListService {
  constructor() {}
  //phương thức
  getTaskApi = () => {
    return axios({
      url: `${DOMAIN}/ToDoList/GetAllTask`,
      method: "GET",
    });
  };
  addTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/AddTask`,
      method: "POST",
      data: {
        taskName: taskName,
      },
    });
  };
  deleteTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
  };
  checkTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
  };
  rejectTaskApi = (taskName) => {
    return axios({
      url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
  };
}
export const toDoListService = new ToDoListService();
