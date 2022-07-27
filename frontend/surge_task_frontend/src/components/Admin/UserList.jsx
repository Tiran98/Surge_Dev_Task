import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const[users,setUsers] = useState([]);
    const[modalData,setModalData] = useState({
        id:"",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth : "",
        mobile : "",
        accountType: ""
    })

    const getUsersData = () => {
        axios
        .get('http://localhost:5000/api/user/allUsers')
        .then((response) => {
            setUsers(response.data)
        })
    }
    useEffect(() => {
        getUsersData();
    },[]);

    const showDetails = (names) =>{
        setModalData(names);
        console.log(modalData)
    }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-6'>
                <h3 className="display-4" style={{marginTop:50}}>User List</h3>
            </div>
            <div className='col-6'>
                <button
                    style={{marginTop:70}}
                    type="button"
                    className="btn btn-primary btn-block text-uppercase mb-6 rounded-pill shadow-sm"
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
                    {users.map((names,index)=>
                        <tr key={index}>
                            <td>{names.id}</td>
                            <td>{names.firstName}</td>
                            <td>{names.lastName}</td>
                            <td>{names.accountType}</td>
                            <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={()=>showDetails(names)}>Get Details</button></td>
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
 
    </div>   
   
  )
}

export default UserList