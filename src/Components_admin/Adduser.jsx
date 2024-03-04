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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/addusers', formData);
            console.log(response.data.message);
            // ทำอะไรก็ตามที่คุณต้องการหลังจากส่งข้อมูลสำเร็จ
        } catch (error) {
            console.error('Error adding user:', error);
            alert(error);
            // ทำอะไรก็ตามที่คุณต้องการหลังจากเกิดข้อผิดพลาด
        }
    };

    return (
      <>
            <br/><h1>Add Users</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quam reprehenderit velit nam soluta nobis fugiat sapiente non, possimus reiciendis, similique, modi fugit earum voluptatibus enim amet nesciunt adipisci error.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="code_id" className="form-label">Code ID:</label>
                    <input type="text" className="form-control" id="code_id" name="code_id" value={formData.code_id} onChange={handleChange} required/>
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
                <div className="mb-3">
                    <label htmlFor="address_web3" className="form-label">Web3 Address:</label>
                    <input type="text" className="form-control" id="address_web3" name="address_web3" value={formData.address_web3} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="roles" className="form-label">Roles:</label>
                    <input type="text" className="form-control" id="roles" name="roles" value={formData.roles} onChange={handleChange} required/>
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="vote" className="form-label">Vote:</label>
                    <input type="text" className="form-control" id="vote" name="vote" value={formData.vote} onChange={handleChange} required/>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      </>
    );
}
