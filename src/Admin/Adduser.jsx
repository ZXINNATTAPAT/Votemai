import React, { useState } from 'react';
import axios from 'axios';

export default function AddUser() {
    const [formData, setFormData] = useState({
        code_id: '',
        p_name: '',
        s_name: '',
        address_web3: '',
        roles: '',
        vote: '0'
    });
    const [codeidcheck , Setcodeidcheck] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://votemai-api-cts.vercel.app/addusers', formData);
            console.log(response.data.message);

        } catch (error) {
            console.error('Error adding user:', error);
            if(error){
                Setcodeidcheck(false)
            }
            
        }
    };

    

    return (
      <>
           
            <div className='card shadow-sm' style={{border:"none"}}>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="code_id" className="form-label">Code ID:</label>
                            <input type="text" className="form-control" id="code_id" name="code_id" value={formData.code_id} onChange={handleChange} required/>
                            <br/>
                            <div class={codeidcheck ? 'visually-hidden':'alert alert-danger '} role="alert">
                                User with the same code_id or address_web3 already exists
                            </div>
                        </div>
                        <div className='row'>
                            <div className="mb-3 col">
                                <label htmlFor="p_name" className="form-label">First Name:</label>
                                <input type="text" className="form-control" id="p_name" name="p_name" value={formData.p_name} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3 col">
                                <label htmlFor="s_name" className="form-label">Last Name:</label>
                                <input type="text" className="form-control" id="s_name" name="s_name" value={formData.s_name} onChange={handleChange} required/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="mb-3 col">
                                <label htmlFor="address_web3" className="form-label">Web3 Address:</label>
                                <input type="text" className="form-control" id="address_web3" name="address_web3" value={formData.address_web3} onChange={handleChange} required/>
                            </div>
                            <div className="mb-3 col">
                                <label htmlFor="roles" className="form-label">Roles:</label>
                                <select className="form-select" id="roles" name="roles" value={formData.roles} onChange={handleChange}>
                                    <option value="" selected>Choose...</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="candidate">Candidate</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* <div className="mb-3">
                            <label htmlFor="vote" className="form-label">Vote:</label>
                            <input type="text" className="form-control" id="vote" name="vote" value={formData.vote} onChange={handleChange} required/>
                        </div> */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            
      </>
    );
}
