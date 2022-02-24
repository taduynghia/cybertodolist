import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { GET_TASK_API } from "../../redux/constants/ToDoListConst";
import {
  checkTaskApi,
  delTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListAction";
import { addTaskApi } from "../../redux/actions/ToDoListAction";
export default function ToDoListRedux() {
  const { taskList } = useSelector((state) => state.ToDoListReducer);
  const dispatch = useDispatch();
  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const handleChange = (e) => {
    e.preventDefault();
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...state.errors };
    //kiểm tra không cho nhập số cho task chỉ cho nhập tiếng anh:
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid ! ";
    } else {
      newErrors[name] = "";
    }

    //setState cho giá trị mới:
    setState({ ...state, values: newValues, errors: newErrors });
  };
  const addTask = (e) => {
    e.preventDefault(); //chặn sự kiện reload lại trang
    console.log(state.values.taskName);
    dispatch(addTaskApi(state.values.taskName));
  };
  const getTaskList = () => {
    dispatch(getTaskListApi());
  };
  //gọi api để cập nhật lại
  useEffect(() => {
    getTaskList();
  }, []);
  //hàm xử lý reject task
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };
  //hàm xử lý delTask
  const delTask = (taskName) => {
    dispatch(delTaskApi(taskName));
  };
  //hàm xử lý check task (đã done task trong todo list)
  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName));
  };

  const renderTaskTodo = (taskName) => {
    return (
      taskList
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
                    // xóa phải truyền và item
                    delTask(item.taskName);
                  }}
                >
                  <i className="fa fa-trash-alt" />
                </button>
                <button
                  type="button"
                  className="complete"
                  onClick={() => {
                    checkTask(item.taskName);
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
  const renderTaskTodoDone = () => {
    return taskList
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
                    delTask(item.taskName);
                  }}
                />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  rejectTask(item.taskName);
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
  return (
    <div className="card">
      <div className="card__header">
        <img src="./img/X2oObC4.png" alt="..." />
      </div>
      {/* <h2>hello!</h2>  */}
      <form className="card__body" onSubmit={addTask}>
        <div className="card__content">
          <div className="card__title">
            <h2>My Tasks</h2>
            <p>September 9,2020</p>
          </div>
          <div className="card__add">
            <input
              name="taskName"
              id="newTask"
              type="text"
              placeholder="Enter an activity..."
              onChange={handleChange}
            />
            <button id="addItem" type="submit" onClick={addTask}>
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="card__todo">
            {/* Uncompleted tasks */}
            <ul className="todo" id="todo">
              {renderTaskTodo()}
              {/* <li>
                    <span>Đi ngủ</span>
                    <div className="buttons">
                      <button className="remove">
                        <i className="fa fa-trash-alt" />
                      </button>
                      <button className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                      </button>
                    </div>
                  </li> */}
            </ul>
            {/* Completed tasks */}
            <ul className="todo" id="completed">
              {renderTaskTodoDone()}
              {/* <li>
                    <span>Ăn sáng</span>
                    <div className="buttons">
                      <button className="remove">
                        <i className="fa fa-trash-alt" />
                      </button>
                      <button className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                      </button>
                    </div>
                  </li> */}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
