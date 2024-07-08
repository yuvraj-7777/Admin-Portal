import React from 'react'
import "./user.css";
import { Link } from 'react-router-dom'
const User = () => {

    
  return (
    <div className='userTable'>
    <Link to={"/add"} className='addButton'>Add User</Link>
    <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>S.No.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1.</td>
                <td>Yuvraj Singh</td>
                <td>singhyuvraj1721@gmail.com</td>
                <td className='actionButtons'> 
                    <button>Delete</button>
                    <Link to={'/edit'}>Edit</Link>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
  )
}

export default User
