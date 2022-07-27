import React from 'react'

const UserList = () => {
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
        <div className='row'>
            
        </div>   
    </div>
  )
}

export default UserList