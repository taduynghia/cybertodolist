import React from "react";
import { useState } from "react";
import { Prompt } from "react-router-dom";
export default function Login(props) {
  const [userLogin, setUserLogin] = useState({ userName: "", passWord: "" });
  console.log(userLogin);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (
      userLogin.userName === "cyberlearn" &&
      userLogin.passWord === "cyberlearn"
    ) {
      //thành công thì chuyển về trang trước đó
      //props.history.goBack();

      //chuyển đến trang chỉ định sau khi xử lý
      //props.history.push("/home");

      //replace thay đổi nội dung path tương ứng
      //props.history.replace("/home");
      props.history.goBack();
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("login failed");
      return;
    }
  };
  return (
    <form className="container mx-60" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>Tài khoản</p>
        <input
          name="userName"
          className="form-control w-50"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Mật khẩu</p>
        <input
          name="passWord"
          className="form-control w-50"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary">Đăng nhập</button>
      </div>
      <Prompt
        when={true}
        message={(location) => {
          console.log(location);
          return "Bạn có chắc muốn rời khỏi trang này !";
        }}
      />
    </form>
  );
}
