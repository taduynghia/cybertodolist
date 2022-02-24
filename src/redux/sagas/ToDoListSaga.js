//generator function
/**
 * redux dispatch 2 loại action:
 * - Loại 1 dispacth action là 1 object (action thường)
 * - Loại 2 dispacth action là 1 function (middleware), thường được dùng để xử lý hoặc gọi các action khác
 */
import axios from "axios";
import {
  fork,
  take,
  takeEvery,
  call,
  put,
  takeLatest,
  delay,
} from "redux-saga/effects";
import {
  ADD_TASK_API,
  DELETE_TASK_API,
  GET_TASKLIST_API,
  GET_TASK_API,
  CHECK_TASK_API,
  REJECT_TASK_API,
} from "../constants/ToDoListConst";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../ultil/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

/**
 * Ngày 3/2/2022: Nghĩa viết chức năng getTaskApiAction
 */
function* getTaskApiAction(action) {
  //while (true) {
  //yield take("getTaskApiAction"); // theo dõi action => xem action nào dispatch mới làm các công việc bên dưới
  //take sẽ chặn lại các action
  //console.log("getTaskApi");
  //call api dispatch lên redux reducer
  //}
  //xử lý sự kiện hay công việc thì thực hiện ở bên dưới
  //hàm nhận vào tham số đầu vào là 1 action mà mình dispatch lên
  //console.log("getTaskApi", action);

  //trước khi hiển thị UI thì hiện thị giao diện loading
  //put giống như dispatch
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    let { data, status } = yield call(toDoListService.getTaskApi);
    //delay để tạo ra loading page
    yield delay(1000);
    if (status === STATUS_CODE.SUCCESS) {
      // xử lý thành công rồi mới xử lý các công việc tiếp theo
      //khi lấy giá trị thành công, dùng hàm put (giống dispatch bên thunk)

      yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("error");
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

/**
 * Ngày 3/2/2022: Nghĩa viết chức năng addTaskApiAction
 */

function* addTaskApiAction(action) {
  const { taskName } = action;
  //gọi api
  try {
    const { data, status } = yield call(() => {
      return toDoListService.addTaskApi(taskName);
    });

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }

  //hiển thị loading
  //thành công thì load lại task = cách gọi lại action saga load tasklist
}

export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction);
}
/**
 * Ngày 3/2/2022: Nghĩa viết chức năng deleteTaskApiAction
 */

function* deleteTaskApi(action) {
  const { taskName } = action;
  try {
    //Bước 1: gọi api
    const { data, status } = yield call(() => {
      return toDoListService.deleteTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      //nếu thành công thì gọi lại action GET_TASKLIST_API
      //(action saga thực thi)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.error(err);
  }
}
export function* theoDoiActionDeleteTaskApi() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApi);
}

/**
 * Ngày 3/2/2022: Nghĩa viết chức năng checkTaskApiAction
 */
function* checkDoneTaskApi(action) {
  const { taskName } = action;
  console.log("taskName check task", taskName);
  try {
    const { data, status } = yield call(() => {
      return toDoListService.checkTaskApi(taskName);
    });
    console.log("data check task done", data);
    if (status === STATUS_CODE.SUCCESS) {
      //nếu thành công thì gọi lại action GET_TASKLIST_API
      //(action saga thực thi)

      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiActionDoneTaskApi() {
  yield takeLatest(CHECK_TASK_API, checkDoneTaskApi);
}

/**
 * Ngày 3/2/2022: Nghĩa viết chức năng rejectTaskApiAction
 */
function* rejectTaskApi(action) {
  const { taskName } = action;
  try {
    const { data, status } = yield call(() => {
      return toDoListService.rejectTaskApi(taskName);
    });
    if (status === STATUS_CODE.SUCCESS) {
      //nếu thành công thì gọi lại action GET_TASKLIST_API
      //(action saga thực thi)
      yield put({
        type: GET_TASKLIST_API,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
export function* theoDoiActionRejectTaskApi() {
  yield takeLatest(REJECT_TASK_API, rejectTaskApi);
}
