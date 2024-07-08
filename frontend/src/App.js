// import './App.css';
// import {RouterProvider, createBrowserRouter } from 'react-router-dom';
// import User from './components/getuser/User';
// import Register from './components/Register/Register';
// import Login from './components/login/login';
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';


// function App() {

//   const route = createBrowserRouter([
//     {
//       path: '/',
//       element: <Login/>,
//     },

//     {
//       path: '/register',
//       element: <Register/>,
//     },

//     {
//       path:"/user",
//       element: <User/>,
//     },
//     {
//       path:"/adminDashboard",
//       element: <AdminDashboard/>,
//     },
//     {
//       path:"/edit",
//       element: "Update user page",
//     },
//   ])

//   return (
//     <div className="App">
//        <RouterProvider router={route}></RouterProvider>
//     </div>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import User from './components/getuser/User';
import Register from './components/Register/Register';
import Login from './components/login/login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Adduser from './components/AddUser/AddUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/addUser" element={<Adduser />} />'
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/edit" element={<div>Update user page</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
