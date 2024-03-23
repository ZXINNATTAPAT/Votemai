import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    code_id: '',
    p_name: '',
    s_name: '',
    address_web3: '',
    roles: '',
    vote: 0,
    secret_key: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
  
    fetchUsers();
  }, [users]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleEdit = (user) => {
    setFormData({ ...user });
  };
  
  const handleEditApi = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/users/${formData._id}`, formData);
      alert('User updated successfully');
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user');
    }
  };
  
  const handleDelete = async (codeId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${codeId}`);
      // Optionally, refresh page or update users state to remove deleted user from the table
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <div>
      <div>
      <form onSubmit={handleEditApi}>
        <div className="mb-3">
            <label htmlFor="code_id" className="form-label">CodeID:</label>
            <input type="text" className="form-control" id="code_id" name="code_id" value={formData.code_id} onChange={handleInputChange} />
        </div>
        <div className='row'>
            <div className="col mb-3">
                <label htmlFor="p_name" className="form-label">First Name:</label>
                <input type="text" className="form-control" id="p_name" name="p_name" value={formData.p_name} onChange={handleInputChange} />
            </div>
            <div className="col mb-3">
                <label htmlFor="s_name" className="form-label">Last Name:</label>
                <input type="text" className="form-control" id="s_name" name="s_name" value={formData.s_name} onChange={handleInputChange} />
            </div>
        </div>
        
        <div className="mb-3">
            <label htmlFor="address_web3" className="form-label">Address Web3:</label>
            <input type="text" className="form-control" id="address_web3" name="address_web3" value={formData.address_web3} onChange={handleInputChange} />
        </div>
        <div className='row'>
            <div className="col mb-3">
                <label htmlFor="roles" className="form-label">Roles:</label>
                <input type="text" className="form-control" id="roles" name="roles" value={formData.roles} onChange={handleInputChange} />
            </div>
            <div className="col mb-3">
                <label htmlFor="vote" className="form-label">Vote:</label>
                <input  className="form-control" id="vote" name="vote" value={formData.vote} onChange={handleInputChange} />
            </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <br></br>
      </div>

      <div className='card shadow-sm' style={{border:"none"}}>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className="table">
              <thead>
                <tr>
                  <th>CODE-ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address Web3</th>
                  <th>Roles</th>
                  <th>Vote</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.code_id}</td>
                    <td>{user.p_name}</td>
                    <td>{user.s_name}</td>
                    <td>{user.address_web3}</td>
                    <td>{user.roles}</td>
                    <td>{user.vote}</td>
                    <td>
                      <button onClick={() => handleEdit(user)} className="btn btn-primary me-2">Edit</button>
                      <button onClick={() => handleDelete(user.code_id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href="#Previous" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {usersPerPage ? (
              Array.from({ length: Math.ceil(users.length / usersPerPage) }, (v, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <a className="page-link" href="#page" onClick={() => paginate(i + 1)}>{i + 1}</a>
                </li>
              ))
            ) : null}
            <li className={`page-item ${currentPage === Math.ceil(users.length / usersPerPage) ? 'disabled' : ''}`}>
              <a className="page-link" href="#Next" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>


      </div>

      <br/>

      
  
       
    </div>
  );
};

export default EditUserPage;
