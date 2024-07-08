import React, { useState, useEffect } from 'react';
import './admin.css';
import { GetAllUser, DeleteUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import AddUser from '../AddUser/AddUser';
import Pagination from '../Pagination/Pagination';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalUser, setTotalUsers] = useState(0);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
 

  const fetchData = async () => {
    const resp = await GetAllUser({ pageNo: currentPage, limit: itemsPerPage });
    console.log(resp?.data);
    setData(resp?.data?.userList);
    setTotalUsers(resp?.data?.totalUsers);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, showAddUserModal]);

  // Get current posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem , indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = async (id) => {
    console.log('Edit user with id:', id);
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleDelete = async (id) => {
    console.log('Delete user with id:', id);
    const data = await DeleteUser(id);
    if (data.status === 200) {
      fetchData();
    }
    console.log(data);
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
  };

  return (
    <>
      <div className="parent">
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
        </div>
        <button className="edit-btn" onClick={handleAddUser}>
          Add Users+
        </button>
        <div>Total Users: {totalUser}</div>
        <div className="parentTable">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.fname + ' ' + item.lname}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
         itemsPerPage={itemsPerPage}
        totalItems={totalUser}
        paginate={paginate}
      />
      </div>

      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={handleCloseModal}>Close</button>
            <AddUser setBtn={setShowAddUserModal}/>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import './admin.css';
// import { GetAllUser, DeleteUser } from '../../api/api';
// import { useNavigate } from 'react-router-dom';
// import AddUser from '../AddUser/AddUser';
// import Pagination from '../Pagination/Pagination';

// const AdminDashboard = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [totalUser, setTotalUsers] = useState(0);
//   const [showAddUserModal, setShowAddUserModal] = useState(false);
 

//   const fetchData = async () => {
//     try {
//       const resp = await GetAllUser({ pageNo: currentPage, limit: itemsPerPage });
//       console.log(resp?.data);
//       setData(resp?.data?.userList || []);
//       setTotalUsers(resp?.data?.totalUsers || 0);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setData([]);
//       setTotalUsers(0);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, showAddUserModal]);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleEdit = async (id) => {
//     console.log('Edit user with id:', id);
//   };

//   const handleAddUser = () => {
//     setShowAddUserModal(true);
//   };

//   const handleDelete = async (id) => {
//     console.log('Delete user with id:', id);
//     try {
//       const resp = await DeleteUser(id);
//       if (resp.status === 200) {
//         fetchData();
//       }
//       console.log(resp);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowAddUserModal(false);
//   };

//   return (
//     <>
//       <div className="parent">
//         <div className="admin-dashboard">
//           <h1>Admin Dashboard</h1>
//         </div>
//         <button className="edit-btn" onClick={handleAddUser}>
//           Add Users+
//         </button>
//         <div>Total Users: {totalUser}</div>
//         <div className="parentTable">
//           <table className="responsive-table">
//             <thead>
//               <tr>
//                 <th>S. No.</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={item._id}>
//                   <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
//                   <td>{item.fname + ' ' + item.lname}</td>
//                   <td>{item.email}</td>
//                   <td>{item.role}</td>
//                   <td>
//                     <button className="edit-btn" onClick={() => handleEdit(item._id)}>Edit</button>
//                     <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <Pagination
//          itemsPerPage={itemsPerPage}
//         totalItems={totalUser}
//         paginate={paginate}
//       />
//       </div>

//       {showAddUserModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close" onClick={handleCloseModal}>Close</button>
//             <AddUser setBtn={setShowAddUserModal}/>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminDashboard;
