import React, { Component } from "react";
import "./style.css";
import axios from "axios";
export default class TodoListRCC extends Component {
  state = {
    //mảng các object
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };
  getTaskList = () => {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    //trả về promise, nếu thành công promise.then
    promise.then((result) => {
      console.log(result.data);
      //nếu gọi api lấy về kết quả thành công
      //=>set lại state của component
      this.setState({
        taskList: result.data,
      });
      console.log("thành công");
    });
    //nếu thất bại trả về promise.catch
    promise.catch((error) => {
      console.log(error.response.data);
      console.log("thất bại");
    });
  };
  //task chưa thực hiện
  renderTaskTodo = (taskName) => {
    return (
      this.state.taskList
        //lọc các task có status = false (chưa thực hiện - not yet done)
        .filter((item) => !item.status)
        .map((item, index) => {
          return (
            <li key={index}>
              <span>{item.taskName}</span>
              <div className="buttons">
                <button
                  type="button"
                  className="remove"
                  onClick={() => {
                    //xóa phải truyền và item
                    this.delTask(item.taskName);
                  }}
                >
                  <i className="fa fa-trash-alt" />
                </button>
                <button
                  type="button"
                  className="complete"
                  onClick={() => {
                    this.checkTask(item.taskName);
                  }}
                >
                  <i className="far fa-check-circle" />
                  <i className="fas fa-check-circle" />
                </button>
              </div>
            </li>
          );
        })
    );
  };
  //xử lý done task

  checkTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  //hàm xử lý xóa task
  delTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  renderTaskTodoDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove">
                <i
                  className="fa fa-trash-alt"
                  type="button"
                  onClick={() => {
                    this.delTask(item.taskName);
                  }}
                />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  this.rejectTask(item.taskName);
                }}
              >
                {/* <i className="far fa-check-circle" /> */}
                <i className="fas fa fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };
  //xử lý rejectTask
  rejectTask = (taskName) => {
    let promise = axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      console.log(result.data);
      alert(result.data);
      this.getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  //Hàm sẽ tự động thực thi sau khi nội dung component được thực thi
  //componentsDidMount để gọi axios lấy dữ liệu về
  componentDidMount() {
    this.getTaskList();
  }
  handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    //cập nhật state cho value, check validation
    let newValues = { ...this.state.values }; //sao chép ra mảng mới
    newValues = { ...newValues, [name]: value }; //thêm dữ liệu vào mảng cũ
    let newErrors = { ...this.state.errors }; // sao chép ra mảng mới

    //kiểm tra không cho nhập số cho task chỉ cho nhập tiếng anh:
    const regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid ! ";
    } else {
      newErrors[name] = "";
    }

    //setState cho giá trị mới:
    this.setState({ ...this.state, values: newValues, errors: newErrors });
  };
  addTask = (e) => {
    e.preventDefault(); //dừng sự kiện submit form
    console.log(this.state.values.taskName);
    let promise = axios({
      url: "http://svcy.myclass.vn/api/TodoList/AddTask",
      method: "POSt",
      data: { taskName: this.state.values.taskName },
    });
    //xử lý thành công
    promise.then((result) => {
      //alert(result.data);
      // lấy lại api nữa mà sẽ gọi lại để hiển thị lại task mới
      this.getTaskList();
    });
    //xử lý thất bại
    promise.catch((error) => {
      console.log(error.response.data);
      //sau khi gọi thành công thì không cần refresh lại trang để
      alert(error.response.data);
    });
  };
  render() {
    return (
      <form onSubmit={this.addTask}>
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task list
        </button> */}
        <div className="card">
          <div className="card__header">
            <img src="./img/X2oObC4.png" alt="..." />
          </div>
          {/* <h2>hello!</h2>  */}
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9,2020</p>
              </div>
              <div className="card__add">
                <input
                  name="taskName"
                  onChange={this.handleChange}
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button id="addItem" onClick={this.addTask}>
                  <i className="fa fa-plus" />
                </button>
              </div>
              <span className="text-red-500">{this.state.errors.taskName}</span>

              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskTodo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskTodoDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
