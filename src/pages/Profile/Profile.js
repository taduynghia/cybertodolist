import React from "react";
import { Redirect } from "react-router-dom";

export default function Profile(props) {
  //nếu thông tin đã đăng nhập và được lưu trên localStorage có tồn
  //tại thì mới hiện ra trang profile
  if (localStorage.getItem("userLogin")) {
    return <div>Profile</div>;
    //nếu không sẽ hiện thông báo chưa đăng nhập và chuyển hướng về
    //trang login
  } else {
    alert("Vui lòng đăng nhập để vào trang này !");
    return <Redirect to="/login" />;
  }
}
