import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
//import {theoDoiActionGetTaskApi} from "./ToDoListSaga.js"
export function* rootSaga() {
  //yield fork(getTaskApi); //non blocking chạy không cần chờ
  //vừa chạy hàm rootSaga thì takeEvery sẽ theo dõi các action
  //khi action được dispatch - getTaskApiAction, thì gọi hàm getTaskApi
  //hàm được dùng để theo dõi bất kỳ 1 action nào có tên "getTaskApiAction" được dispatch lên
  //thông qua hàm useDispatch

  yield all([
    //nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    //nghiệp vụ tiếp add task
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTaskApi(),
    ToDoListSaga.theoDoiActionDoneTaskApi(),
    ToDoListSaga.theoDoiActionRejectTaskApi(),
  ]);
}
