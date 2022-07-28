import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  useEffect(() => {

  });
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getLoginData = () => {
    if (loginData.email === ""){
      Swal.fire("Oops...", "Email is Empty !", "error");
    } else if (loginData.password === "") {
        Swal.fire("Oops...", "Password is Empty !", "error");
    } else {
        axios
          .post('http://localhost:5000/api/user/signin', {
            email: loginData.email,
            password: loginData.password,
          })
          .then((response) => {
            console.log(response)
            if (response.data.message !== "Inavalid Credentials") {
              localStorage.setItem("token", response.data.token)
              let email = response.data.user.email;
              Swal.fire({
                title: "Success",
                text: "Login Successful !",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Continue",
              });
                let userType = response.data.foundUser.accountType;
                let userStatus = response.data.foundUser.status;
                let userId = response.data.foundUser.id;

                if(userType === "Admin"){
                  navigate('/UserList');
                  console.log("Admin");
                  localStorage.setItem("userId", userId)
                }
                else {
                  console.log("Student")
                  if (userStatus === true){
                    navigate('/register');
                    console.log("First Time");
                  }
                  else {
                    navigate('/NoteList');
                    console.log("Not First Time")
                    localStorage.setItem("userId", userId)
                  }
                }
            }
            else{
              Swal.fire("Oops...", "Wrong email or password !", "error");
            }
          })
    }
  }
  return (
    <div className='container'>
      <div className='row no-gutter'>
        <div className='col-md-7'>
          <div className='d-flex align-items-center py-5' style={{minHeight: '100vh'}}>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-10 col-xl-7 mx-auto'>
                  <h3 className="display-4">Login</h3>
                  <br />
                  <form>
                      <div className="form-group mb-3">
                        <input
                          id="inputUserEmail"
                          onChange={handleChange}
                          value={loginData.email}
                          name="email"
                          type="email"
                          placeholder="Email"
                          required={true}
                          autoFocus={true}
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          id="inputPassword"
                          onChange={handleChange}
                          value={loginData.password}
                          name="password"
                          type="password"
                            placeholder="Password"
                            required={true}
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        onClick={getLoginData}
                      >
                        Sign in
                      </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login