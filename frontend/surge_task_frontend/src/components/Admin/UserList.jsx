import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [modalData, setModalData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        mobile: "",
        accountType: ""
    })
    const [createData, setCreateData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        mobile: "",
        password: "",
        status: true,
        accountType: ""
    });
    const ModalhandleChange = (e) => {
        setCreateData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const getUsersData = () => {
        axios
            .get('http://localhost:5000/api/user/allUsers')
            .then((response) => {
                setUsers(response.data)
            })
    }
    useEffect(() => {
        getUsersData();
    }, []);

    const getCreateData = () => {
        if (createData.email === "") {
            Swal.fire("Oops...", "Email is Empty !", "error");
        } else if (createData.password === "") {
            Swal.fire("Oops...", "Password is Empty !", "error");
        } else {
            axios
                .post('http://localhost:5000/api/user/signup', {
                    id: createData.id,
                    firstName: createData.firstName,
                    lastName: createData.lastName,
                    email: createData.email,
                    dateOfBirth: createData.dateOfBirth,
                    mobile: createData.mobile,
                    status: createData.status,
                    password: createData.password,
                    accountType: createData.accountType,
                })
                .then((response) => {
                    if (response !== null) {
                        Swal.fire({
                            title: "Success",
                            text: "Register Successful !",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "Continue",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        })
                    }
                })
        }
    }

    const showDetails = (names) => {
        setModalData(names);
        console.log(modalData)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <h3 className="display-4" style={{ marginTop: 50 }}>User List</h3>
                </div>
                <div className='col-6'>
                    <button
                        style={{ marginTop: 70 }}
                        type="button"
                        className="btn btn-primary btn-block text-uppercase mb-6 rounded-pill shadow-sm"
                        data-toggle="modal" data-target="#myCreateModal"
                        onClick={""}
                    >
                        Create User
                    </button>
                </div>
            </div>
            <div className='row mt-5'>
                <table className='table table-striped table-sm'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Id</th>
                            <th>First name</th>
                            <th>Last Name</th>
                            <th>Account Type</th>
                            <th>Show Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((names, index) =>
                            <tr key={index}>
                                <td>{names.id}</td>
                                <td>{names.firstName}</td>
                                <td>{names.lastName}</td>
                                <td>{names.accountType}</td>
                                <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={() => showDetails(names)}>Get Details</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 
 Model Box  */}

            <div className="modal fade" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">User Id : {modalData.id}</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <table className="table table-striped table-sm">
                                <thead className="thead-light">
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>DOB</th>
                                        <th>Mobile</th>
                                        <th>Account Type</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td>{modalData.firstName}</td>
                                        <td>{modalData.lastName}</td>
                                        <td>{modalData.email}</td>
                                        <td>{modalData.dateOfBirth}</td>
                                        <td>{modalData.mobile}</td>
                                        <td>{modalData.accountType}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

            {/* 
 Model Box  */}

            <div className="modal fade" id="myCreateModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Create User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputUserId"
                                        onChange={ModalhandleChange}
                                        value={createData.id}
                                        name="id"
                                        type="text"
                                        placeholder="User Id"
                                        required={true}
                                        autoFocus={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputUserEmail"
                                        onChange={ModalhandleChange}
                                        value={createData.email}
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
                                        onChange={ModalhandleChange}
                                        value={createData.password}
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        required={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        id="inputUserType"
                                        onChange={ModalhandleChange}
                                        value={createData.accountType}
                                        name="accountType"
                                        type="text"
                                        placeholder="Account Type"
                                        required={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                    onClick={() => getCreateData()}
                                >
                                    Create User
                                </button>
                            </form>
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>

    )
}

export default UserList