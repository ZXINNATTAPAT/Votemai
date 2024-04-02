import React, { useState, useEffect } from 'react'
import  axios  from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Components/Navbar'
import '../StylesSheet/Component.css'
import VotingChart from '../Admin/VotingChart';

export default function Homepage() {
    // ใส่ฟังชั่น Disable button card 
    const [users, setUsers] = useState([]);
    console.log(users)

    const [votesData, setVotesData] = useState(null);

    const [votesData2, setVotesData2] = useState(null);

    const [verifyData,setVerifyData] = useState(true);
 
    const [votesDataipfs, setVotesDataipfs] = useState(null);

    const [indexdata,setindexdata] = useState(null);

    console.log(users);

    useEffect(() => {
        fetch('https://votemai-api-cts.vercel.app/users')
            .then(response => response.json()) // แปลง response เป็น JSON
            .then(data => {
                // กรองข้อมูลเฉพาะฟิลด์ roles ที่มีค่าเป็น "user"
                const filteredUsers = data.filter(user => user.roles === 'user');
                setUsers(filteredUsers); // ตั้งค่าข้อมูลผู้ใช้ให้กับ state
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        const fetchVotesData = async () => {
            try {
                const response = await axios.get('https://votemai-api-cts.vercel.app/sh-votesData');
                const data = response.data; // Access the data object from the response
                const lastadata = data.votes.length -1 ;
                 
                 
                 if(indexdata === null)
                 {
                    setVotesData(data.votes[lastadata]);
                    setVotesDataipfs(data.votes[lastadata].IpfsHash);
                    setindexdata(lastadata);
                 }
                 else{
                    setVotesData(data.votes[indexdata]);
                    setVotesDataipfs(data.votes[indexdata].IpfsHash)
                 }
                 
                
                console.log(lastadata);
            } catch (error) {
                console.error('Error fetching votes data:', error);
            }
        };
        fetchVotesData();
    }, [indexdata]);

    const fetchVotesDataipfs = async () => {
        try {
            const response = await axios.get(`https://black-ready-gayal-309.mypinata.cloud/ipfs/${votesDataipfs}`);
            const ipfsData = JSON.parse(response.data.voteData); // แปลงข้อมูล JSON จาก IPFS
            setVotesData2(ipfsData);
            console.log(ipfsData.votes); // เข้าถึงข้อมูล votes ใน IPFS
        } catch (error) {
            console.error('Error fetching votes data:', error);
        }
    };
    
    // เรียกใช้ fetchVotesDataipfs หากมีข้อมูล votesDataipfs ที่มีค่าไม่ใช่ null
    useEffect(() => {
        if (votesDataipfs !== null) {
            fetchVotesDataipfs();
        }
    }, [votesDataipfs]);

    useEffect(() => {
        // ตรวจสอบว่า votesData และ votesData2 มีค่าไม่เป็น null และ undefined
        if (votesData !== null && votesData2 !== null) {
            // เปรียบเทียบข้อมูลระหว่าง votesData และ votesData2
            const isDataMatch = JSON.stringify(votesData.votes) === JSON.stringify(votesData2.votes);
            // ตั้งค่าตัวแปร verifyData ตามผลการเปรียบเทียบ
            setVerifyData(!isDataMatch);
        }
    }, [votesData, votesData2]);
    

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
                return fetch('https://votemai-api-cts.vercel.app/decrypted/users', {
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
            <div className='img-main-home' 
                style={{ 
                    width: "100%", 
                    height: "80vh", 
                    color: "white" 
                }}>

                <Navbar />

                <div className='container' >
                    <div className='card shadow-lg' 
                        style={{ 
                            border: "none", 
                            backgroundColor: "transparent", 
                            backdropFilter: "blur(75px)", 
                            marginTop: "22.5vh", 
                            color: "#FCFBF7" 
                        }}>

                        <div className='card-body'>
                            <h1 className='display-1'>VOTEMAI Blockchain Technology</h1>
                            <p >Revolutionizing the way we vote with the power of blockchain and IPFS. Join us in building a transparent and secure future for democratic processes.</p>
                            <a href="/Home-page-main" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">Start to Vote</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* #19172 */}
            <div className='container-fluid' style={{ backgroundColor: "rgb(30,30,30)" }}>
                <br/>
                <h3 className='display-5' style={{textAlign:"center",color:"white"}}>TECHNOLOGY</h3>
                <div className='container'><br />
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                        <div className='col'>
                            <div className='card card-set-2' 
                                style={{
                                    height:"280px",
                                    textAlign:"center",
                                    color:"white"
                                }}>
                                <div className='card-body'>
                                    <img src='https://black-ready-gayal-309.mypinata.cloud/ipfs/Qmbzkfzt6yx7Z4ghV8ETTWcZ1dZChG5sSd8r76vAaRzfTR?pinataGatewayToken=lHgRMppm9nIzYtl-XdEPY2zFhe4y_10I0aN3TJX0nSJ5F1fCYr5YenCDs7ByqVFk' alt='sda'
                                        style={{
                                            width:"80px",
                                            height:"80px"
                                        }} />
                                    <br/><br/>
                                    <div className='card-text'>
                                        <h2>Blockchain</h2>
                                            <p style={{color:"rgba(255,255,255, 0.45)"}}>Blockchain is a distributed ledger technology that securely records transactions across multiple computers.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='col'>
                            <div className='card card-set-2 ' 
                                style={{
                                    height:"280px",
                                    textAlign:"center",
                                    color:"white"
                                }}>
                                <div className='card-body'>
                                    <img src="https://black-ready-gayal-309.mypinata.cloud/ipfs/QmV8YCCMySbhcJHi2PbvsvLkEEH95BzLVgYqHoyDfKnsRU?pinataGatewayToken=lHgRMppm9nIzYtl-XdEPY2zFhe4y_10I0aN3TJX0nSJ5F1fCYr5YenCDs7ByqVFk" 
                                        alt='sadsa' 
                                        style={{
                                            width:"80px",
                                            height:"80px"
                                        }} />
                                    <br/><br/>
                                    <div className='card-text'>
                                        <h2>IPFS</h2>
                                            <p style={{color:"rgba(255,255,255, 0.45)"}}>
                                                IPFS is a protocol and network designed to create a decentralized method for storing and sharing hypermedia in a distributed file system.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col' style={{height:"280px"}}>
                            <div className='card card-set-2 ' 
                                style={{
                                    height:"280px",
                                    textAlign:"center",
                                    color:"white"
                                }}>
                                <div className='card-body'>
                                    <img src='https://black-ready-gayal-309.mypinata.cloud/ipfs/QmaEa41gjF6UNXepPjhYcjfFPZbtPSek2huvidhcN883az?pinataGatewayToken=lHgRMppm9nIzYtl-XdEPY2zFhe4y_10I0aN3TJX0nSJ5F1fCYr5YenCDs7ByqVFk' alt='asd' 
                                        style={{
                                            width:"80px",
                                            height:"80px"
                                        }}/>
                                    <br/><br/>
                                    <div className='card-text'>
                                        <h2>METAMASK</h2>
                                            <p style={{color:"rgba(255,255,255, 0.45)"}}>
                                                MetaMask is a cryptocurrency wallet and gateway to blockchain apps that allows users to interact with the Ethereum blockchain.
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div><br/>
                </div><br/><br/>
            </div>

            <div style={{backgroundColor:"#f5f5f5"}}>
                <div className='container' ><br/>
                    <h3 className='display-5' style={{textAlign:"center"}}>Elections in progress</h3><br/>
                            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3'>
                                <div className='col'>  
                                    <div className='card shadow-sm' style={{border:"none"}}>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col p-4'>
                                                    <center>
                                                        <div className='Logo-kmutnb' style={{width:"175px",height:"175px"}}></div>
                                                    </center>
                                                </div>
                                                <div className='col p-4'>
                                                    <h2>Student Council President Election 1nd </h2>
                                                    <p>Starting on April 6th 2023</p>
                                                    {/* <button className='btn btn-outline-primary'>Start</button> */}
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className='col'>  
                                    <div className='card shadow-sm' style={{border:"none"}}>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col p-4'>
                                                    <center>
                                                        <div className='Logo-kmutnb' style={{width:"175px",height:"175px"}}></div>
                                                    </center>
                                                </div>
                                                <div className='col p-4'>
                                                    <h2>Student Council President Election 2nd </h2>
                                                    <p>Starting on April 6th 2024</p>
                                                    {/* <button className='btn btn-outline-primary'>Start</button> */}
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                
                            
                            </div>
                </div>
                <br/>
            
            </div> <br/>

            <h1 className='display-5' style={{textAlign:"center"}}>Announcement of election results</h1>
                    <p style={{textAlign:"center"}}>Shows only the latest information in the system.</p>
                    

            <div className='container-fluid'>
                            <div className='container-fluid shadow-sm border' style={{backgroundColor:"#7459f7" ,borderRadius:"8px"}}><br/>
                                <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 '>
                                    <div className='col '>
                                        <center>
                                        <div className='card shadow-lg  img-main-home4'style={{border:"none"}}>
                                            <div className='card-body ' >
                                                <br/><br/><br/>
                                            </div>
                                        </div> </center>

                                    </div>
                                    <div className='col'>
                                        <div className='card card-set-pinata h-100' style={{border:"none",background:"none",color:"white"}}>
                                            <div className='card-body ' >
                                                <div className="inline-set-Card">
                                                    <h2>Verify data via IPFS Pinata</h2><br/>
                                                    <ul>
                                                        <li><strong>Access Information:</strong> Verify data directly from IPFS using the provided link.</li><br/>
                                                        <li><strong>Data Format:</strong> The data is structured in JSON format.</li><br/>
                                                        <li><strong>Authentication:</strong> Ensure the authenticity and integrity of the data before usage.</li><br/>
                                                        <li><strong>Learn More:</strong> Explore the official IPFS website for detailed insights on its functionality.</li><br/>
                                                    </ul>
                                                    <i className='btn btn-light'>
                                                        <a href={`https://black-ready-gayal-309.mypinata.cloud/ipfs/${votesDataipfs}`} style={{ textDecoration: "none", color: "#7459f7" }}>Access IPFS Data</a>
                                                    </i>
                                                </div>


                                            </div>
                                        </div>

                                    </div>

                                </div><br/>
                            </div>
                            
                        </div><br/>

            <div className='' style={{backgroundColor:"#f5f5f5"}}>
                <div className='container-fluid '><br/>
                    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3'>
                        <div className='col'>
                            <h1 className='display-6'style={{textAlign:"center"}}>Votes Data from Database</h1>
                            <p style={{textAlign:"center"}}>Shows data in database system.</p>
                            <div className='card shadow-sm'
                                style={{ 
                                    border: "none"}}>
                                <div className='card-body'>
                                    <div className='card-text'> 
                                        <VotingChart votingData={votesData} /><br/>
                                    </div>
                                </div>
                        </div>
                        </div>

                        <div className='col'>
                            <h1 className='display-6' style={{textAlign:"center"}}>Votes Data from IPFS</h1>
                            <p style={{textAlign:"center"}}>Shows data in IPFS system.</p>
                            <div className='card shadow-sm ' style={{ border: "none" }}>
                                <div className='card-body'>
                                    <div className='card-text'> 
                                        
                                        <VotingChart votingData={votesData2} /><br/>
                                    </div>
                                </div>
                        </div><br/>
                        </div>

                    </div>
                </div>

                <div className='container-fluid'>
                        {verifyData ? (
                            <div className=' alert alert-danger' style={{ textAlign:"center" }} role="alert">
                                    Inspected and found an error. in the database system
                            </div>
                        ) : (
                            <div>
                                <div className='alert alert-success' style={{ border: "none",textAlign:"center"  }}  role="alert">
                                    Normal and safe information
                                </div>
                            </div>
                        )}<br/>
                </div> 
                                <h1 className='display-4' style={{textAlign:"center"}}>Those who have already voted</h1><br/>

                            <div className='container'>
                                <div className='card shadow-sm ' style={{ border: "none" }}>
                                    <div className='card-body'>
                                        <div className="table-responsive">
                                            
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">encryption code</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.filter(user => user.vote === 2).map((user, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>
                                                                <button className='btn btn-sm btn-success' onClick={() => checkDataUser(user.encryptedCode)}>
                                                                    <i className="bi bi-lock"></i>
                                                                </button>  {user.encryptedCode}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div><br/>
                            </div>
                        <br/>
            </div>

            <div className='container-fluid' style={{ backgroundColor: "rgb(10,10,10,0.9)" }}>
                    <footer style={{padding: "20px"}}>
                       
                        <h1 className="fonty " style={{ color: "#765AFF", fontSize: "55.5px" }}>VOTEMAI</h1> 
                        <p style={{color: "#FFFFFF", fontSize: "14px"}}>
                            VOTEMAI - Your Trusted Platform for Secure and Transparent Elections
                        </p>
                        <p style={{color: "#FFFFFF", fontSize: "12px"}}>
                            Copyright © 2024 VOTEMAI. All rights reserved.
                        </p>
                     
                    </footer>
            </div>


        </>
    )
}
