import axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConst";

export const getTaskListApi = () => {
  //tiền xử lý dữ liệu => xử lý function
  return async (dispatch) => {
    try {
      let { data, status } = await axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data,
        });
      }
      console.log("data", data);
    } catch (err) {
      console.error(err.response.data);
    }

    // promise.then((result) => {
    //   //alert(result.data);
    //   console.log("thành công");
    //   //dispatch lên redux
    //   //thành công mới dispatch
    //   dispatch({
    //     type: GET_TASK_API,
    //     taskList: result.data,
    //   });
    //   console.log("thành công");
    // });
    // promise.catch((error) => {
    //   alert(error.response.data);
    //   console.log("thất bại");
    // });
  };
};

export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    //xử lý trước khi dispatch
    try {
      let { data, status } = await axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: { taskName: taskName },
      });
      if (status === 200) {
        dispatch(getTaskListApi());
      }
    } catch (err) {
      console.error(err.response.data);
    }

    //xử lý thành công
    // promise.then((result) => {
    //   //gọi hàm để lấy lại api
    //   dispatch(getTaskListApi());
    // });
    // //Xử lý thất bại
    // promise.catch((error) => {
    //   alert(error.response.data);
    // });
  };
};

export const delTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      alert(result.data);
      //sau khi thực hiện api gọi phương thức action dispatchAction get taskListApi
      dispatch(getTaskListApi());
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
};
export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
};
export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
};
