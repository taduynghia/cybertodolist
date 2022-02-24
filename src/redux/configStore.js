import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
import LoadingReducer from "../redux/reducers/LoadingReducer";
//middleware saga
import createMiddlewareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
const middleWareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  ToDoListReducer,
  LoadingReducer,
});

const store = createStore(
  rootReducer,
  //1 ứng dụng có thể nhận vào nhiều middleWare, khi sử dụng có thể "," để sử dụng
  applyMiddleware(reduxThunk, middleWareSaga)
);
//gọi saga
//gắn middleWare xong mới gọi saga
//hàm run nhận về 1 generator function để tạo ra các hàm next()
middleWareSaga.run(rootSaga);

export default store;
