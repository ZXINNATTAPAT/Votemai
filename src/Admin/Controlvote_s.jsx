import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ControlVote() {
  const [formData, setFormData] = useState({ address_web3: '', code_id: '' });
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const [searchCodeId, setSearchCodeId] = useState('');
  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter(user => user.code_id.includes(searchCodeId)) // Filter by searchCodeId
    .slice(indexOfFirstUser, indexOfLastUser);


  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        // Filter users with vote equal to 0 and role equal to 'user'
        // const filteredUsers = response.data.filter(user => user.vote === 0 && user.roles === 'user' );
        // setUsers(filteredUsers);
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [users]);


  const handleEdit = (user) => {
    setFormData({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateVote();
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };

  const updateVote = async () => {
    try {
      const requestData = {
        address_web3: formData.address_web3,
        code_id: formData.code_id,
        system_req: "admin"
      };

      const response = await axios.post('http://localhost:8000/update-vote', requestData);

      if (response.status === 200) {
        console.log('Vote updated successfully');
        console.log('New vote count:', response.data.newVoteCount);
      } else {
        console.log('Failed to update vote');
      }
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };
  return (
    <>
      <div className="card shadow-sm" style={{ border: "none" }}>
        <div className="card-body">
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="addressWeb3" className="form-label">Address Web3</label>
                <input type="text" className="form-control" id="addressWeb3" value={formData.address_web3} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="codeId" className="form-label">Code ID</label>
                <input type="text" className="form-control" id="codeId" value={formData.code_id} onChange={handleInputChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Update Vote</button>
            </form>
          </div>
        </div>
      </div><br/>

      <div className='card shadow-sm' style={{ border: "none" }}>
        <div className='card-body'>
           <div className="mb-3">
           <label  className="form-label">Search by Code ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Code ID ... "
              value={searchCodeId}
              onChange={(e) => setSearchCodeId(e.target.value)}
            />
          </div>
        </div>
      </div><br/>


      <div className='card shadow-sm' style={{border:"none"}}>
          <div className='card-body'>
          <h5 className='card-title'>People who have verified their identity</h5><br/>
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
                  {users.length > 0  ? (
                    currentUsers.map((user) => (
                      user.vote === 1 && user.roles === "user" && (
                        <tr key={user._id}>
                          <td>{user.code_id}</td>
                          <td>{user.p_name}</td>
                          <td>{user.s_name}</td>
                          <td>{user.address_web3}</td>
                          <td>{user.roles}</td>
                          <td>{user.vote}</td>
                          <td>
                            <button onClick={() => handleEdit(user)} className="btn btn-primary me-2">Edit</button>
                            {/* <button onClick={() => handleDelete(user.code_id)} className="btn btn-danger">Delete</button> */}
                          </td>
                        </tr>
                      )
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#Previous" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                  {/* <span aria-hidden="true">&laquo;</span> */}
                  <span className="sr-only"><i className="bi bi-caret-left-fill"></i><i className="bi bi-caret-left-fill"></i></span>
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
                  {/* <span aria-hidden="true">&raquo;</span> */}
                  <span className="sr-only"><i className="bi bi-caret-right-fill"></i><i className="bi bi-caret-right-fill"></i></span>
                </a>
              </li>
            </ul>
          </nav>
          </div>

      </div><br/>

      <div className='card shadow-sm' style={{border:"none"}}>
          <div className='card-body'>
          <h5 className='card-title'>Those who have not yet come to confirm their identity</h5><br/>

          
          <br/>
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
                  {users.length > 0  ? (
                    currentUsers.map((user) => (
                      user.vote === 0 &&(
                        <tr key={user._id}>
                          <td>{user.code_id}</td>
                          <td>{user.p_name}</td>
                          <td>{user.s_name}</td>
                          <td>{user.address_web3}</td>
                          <td>{user.roles}</td>
                          <td>{user.vote}</td>
                          <td>
                            <button onClick={() => handleEdit(user)} className="btn btn-primary me-2">Edit</button>
                            {/* <button onClick={() => handleDelete(user.code_id)} className="btn btn-danger">Delete</button> */}
                          </td>
                        </tr>
                      )
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a className="page-link" href="#Previous" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                  {/* <span aria-hidden="true">&laquo;</span> */}
                  <span className="sr-only"><i className="bi bi-caret-left-fill"></i><i className="bi bi-caret-left-fill"></i></span>
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
                  {/* <span aria-hidden="true">&raquo;</span> */}
                  <span className="sr-only"><i className="bi bi-caret-right-fill"></i><i className="bi bi-caret-right-fill"></i></span>
                </a>
              </li>
            </ul>
          </nav>
          </div>

      </div>
    </>
  );
}
