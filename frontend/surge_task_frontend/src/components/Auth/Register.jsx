import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import $, { get } from 'jquery'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
    useEffect(() => {

    });
    const navigate = useNavigate();
    const [RegisterData, setRegisterData] = useState({
        id: 1002,
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "22/07/2022",
        mobile: "",
        status: false,
        password: "",
        accountType: "Student",
    });
    const handleChange = (e) => {
        setRegisterData((prevState) => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          }; 
        });
        // $('#inputDate').datepicker();
        // $('#inputDate').on('changeDate', function() {
        //     $('#my_hidden_input').val(
        //      $('#inputDate').datepicker('getFormattedDate')
        //     );
        // });
        // let hiddenValue = document.getElementById('my_hidden_input');
        // console.log(hiddenValue)
    };
    const addRegisterData = () => {
        axios
        .post('http://localhost:5000/api/user/signup', {
            id: RegisterData.id,
            firstName: RegisterData.firstName,
            lastName: RegisterData.lastName,
            email: RegisterData.email,
            dateOfBirth: RegisterData.dateOfBirth,
            mobile: RegisterData.mobile,
            status: RegisterData.status,
            password: RegisterData.password,
            accountType: RegisterData.accountType,
        })
        .then((response) => {
            if(response !== null){
                Swal.fire({
                    title: "Success",
                    text: "Register Successful !",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "Continue",
                });
                navigate('/login');
            }
            
        })
    }
    
  return (
    <div className='container'>
      <div className='row no-gutter'>
        <div className='col-md-7'>
          <div className='d-flex align-items-center py-5' style={{minHeight: '100vh'}}>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-10 col-xl-7 mx-auto'>
                  <h3 className="display-4">Register</h3>
                  <br />
                  <form>
                    <div className='row'>
                        <div className="form-group mb-3 col-6">
                            <input
                            id="inputFirstName"
                            onChange={handleChange}
                            value={RegisterData.firstName}
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            required={true}
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            />
                        </div>
                        <div className="form-group mb-3 col-6">
                            <input
                            id="inputLastName"
                            onChange={handleChange}
                            value={RegisterData.lastName}
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            required={true}
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            />
                        </div>
                    </div> 
                    <div className="form-group mb-3">
                        <input
                          id="inputEmail"
                          onChange={handleChange}
                          value={RegisterData.email}
                          name="email"
                          type="email"
                            placeholder="Email Address"
                            required={true}
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        />
                    </div>
                    <div className='form-group mb-3 date'>
                        <input
                            id="inputDate"
                            onChange={handleChange}
                            value={RegisterData.dateOfBirth}
                            name="date"
                            type="date"
                            placeholder='Select Date'
                            required={true}
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        />
                    </div>
                    <div className="form-group mb-3">
                            <input
                            id="inputMobile"
                            onChange={handleChange}
                            value={RegisterData.mobile}
                            name="mobile"
                            type="text"
                            placeholder="Mobile Number"
                            required={true}
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            />
                    </div>
                    <div className="form-group mb-3">
                            <input
                            id="inputPassword"
                            onChange={handleChange}
                            value={RegisterData.password}
                            name="password"
                            type="password"
                            placeholder="Enter New Password"
                            required={true}
                            className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                            />
                    </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        onClick={addRegisterData}
                      >
                        Sign Up
                      </button>
                      <div>
                        <input type="hidden" id="my_hidden_input"/>
                      </div>
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

export default Register