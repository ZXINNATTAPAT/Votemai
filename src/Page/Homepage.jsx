import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar'
import '../StylesSheet/Component.css'



export default function Homepage() {

    // ใส่ฟังชั่น Disable button card 
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // เรียก API ที่ URL http://localhost:8000/users
        fetch('http://localhost:8000/users')
            .then(response => response.json()) // แปลง response เป็น JSON
            .then(data => {
                // กรองข้อมูลเฉพาะฟิลด์ roles ที่มีค่าเป็น "user"
                const filteredUsers = data.filter(user => user.roles === 'user');
                setUsers(filteredUsers); // ตั้งค่าข้อมูลผู้ใช้ให้กับ state
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    function checkDataUser(encryptedCode) {
        Swal.fire({
            title: 'Please enter your secret key',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Check Data',
            showLoaderOnConfirm: true,
            preConfirm: (secret_Key) => {
                return fetch('http://localhost:8000/decrypted/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ encryptedCode, secret_key: secret_Key })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'User Data',
                    html: result.value ? `<pre>${JSON.stringify(result.value, null, 2)}</pre>` : '<p>No user data found.</p>',
                    icon: 'info'
                });
            }
        });
    }

    return (
        <>
            <Navbar /><br />
            <div className='container'>
                <div className='container'>
                    <div className='card shadow-sm p-2 mb-3  rounded' style={{ border: "none" }}>
                        <div className='card-body' >
                            <h4 className='card-text' style={{ textAlign: "center" }}>
                                <i className="em em-pray" aria-label="PERSON WITH FOLDED HANDS"></i> Please log in to <span style={{ color: "orange" }}>METAMASK</span> or contact the staff for further assistance.Thank you.
                            </h4>
                        </div>
                    </div>

                    <div className='card shadow-sm p-2 mb-3  rounded' style={{ border: "none" }}>
                        <div className='card-body' >
                            <h4 className='card-title' style={{ textAlign: "center" }}>InterPlanetary File System  : <span><a href="https://black-ready-gayal-309.mypinata.cloud/ipfs/Qmc5PQpgH1zF6g8qW2orSdnbgfuwkJANvbPTodbZT69w7c?pinataGatewayToken=lHgRMppm9nIzYtl-XdEPY2zFhe4y_10I0aN3TJX0nSJ5F1fCYr5YenCDs7ByqVFk">Link for check dataVote</a></span></h4>
                        </div>
                    </div>

                    <div className='card shadow-sm ' style={{ border: "none" }}>
                        <div className='card-body'>
                            <div className="table-responsive">
                                <p>Those who have already voted</p>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">encryption code</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    <button className='btn btn-sm btn-success'
                                                        onClick={() => checkDataUser(user.encryptedCode)}>
                                                        <i className="bi bi-lock"></i></button>  {user.encryptedCode}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div><br />

                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' >
                        <div className='col '>
                            <div className="card shadow-sm h-100" style={{ border: "none" }}>
                                {/* <img src="..." className="card-img-top" alt="..."/> */}
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>

                        <div className='col ' >
                            <div className="card shadow-sm h-100" style={{ border: "none" }}>
                                {/* <img src="..." className="card-img-top" alt="..."/> */}
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
                                        Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>

                        <div className='col '>
                            <div className="card shadow-sm h-100" style={{ border: "none" }}>
                                {/* <img src="..." className="card-img-top" alt="..."/> */}
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>

                        <div className='col '>
                            <div className="card shadow-sm h-100" style={{ border: "none" }}>
                                {/* <img src="..." className="card-img-top" alt="..."/> */}
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>

                        <div className='col '>
                            <div className="card shadow-sm h-100" style={{ border: "none" }}>
                                {/* <img src="..." className="card-img-top" alt="..."/> */}
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>

                        <div className='col '>
                            <div className="card shadow-sm h-100" style={{ border: "none" }}>
                                {/* <img src="..." className="card-img-top" alt="..."/> */}
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                <br />
            </div>
        </>
    )
}
