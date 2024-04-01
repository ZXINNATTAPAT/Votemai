import React, { useEffect, useState } from 'react'
import Adduser from '../Admin/Adduser';
// import Addcandidate from '../Admin/Addcandidate';
import Controlvote from '../Admin/Verification';
import Votescores from '../Admin/Votescores_s';
import Navadmin from '../Components/Navadmin';
import EditUserForm from '../Admin/Editusers';
import '../StylesSheet/Sidebar.css';
import VotingChart from '../Admin/VotingChart';
import axios from 'axios';
import Controlblockchain from '../Admin/Controlvote';

//Admin control
export default function Controlpage() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState(null);
    const [currentPage, setCurrentPage] = useState("Dashboard"); // Store current page state

    const token = localStorage.getItem('token'); // Check if token exists
    const user = localStorage.getItem('user'); // Check if user data exists

    const userData = user ? JSON.parse(user) : null; // Parse user data to JSON object

    const isAdmin = userData && userData.roles === 'admin'; // Check if user is an admin

    const owner = userData.address_web3 === '0x229C0c5Da0A6595F652639271297C8Ee8324Ae52';

    const [usersdata, Setusersdata] = useState([]);

    const [votesData, setVotesData] = useState(null);

    const [votesData2, setVotesData2] = useState(null);

    const [verifyData,setVerifyData] = useState(true);
 
    const [votesDataipfs, setVotesDataipfs] = useState(null);

    const [indexdata,setindexdata] = useState(null);

    const [isMenuExpanded, setIsMenuExpanded] = useState(true);

    console.log(votesData ? Object.keys(votesData.votes).length : 0);
    // const votelengthlastdata = votesData.votes.length - 1;
                
    // setindex(votelengthlastdata);
    console.log(votesData);
    
    const handleMenuToggle = () => {
      setIsMenuExpanded(prevState => !prevState);
    };
  
    // const toggleCardSize = () => {
    //   setIsMenuExpanded(prevState => !prevState);
    // };
    useEffect(() => {
        if (!isAdmin && !token) {
            window.location.href = "/Dashboard";
        }
        else{
            setIsConnected(true);
        }
    }, [isAdmin, token]); // Dependencies: isAdmin and token

    
    useEffect(() => {
        const fetchVotesDatausers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users');
                const data = response.data; // Access the data object from the response
                Setusersdata(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching votes data:', error);
            }
        };

        fetchVotesDatausers();
    }, []);

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
        const fetchVotesData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/sh-votesData');
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

    useEffect(() => {
        if (window.ethereum) {window.ethereum.on('accountsChanged', handleAccountsChanged);}// Remove event listener when component unmounts
        return () => {if (window.ethereum) {window.ethereum.removeListener('accountsChanged', handleAccountsChanged);}};
      }); 

    useEffect(() => {
        // ตรวจสอบว่า votesData และ votesData2 มีค่าไม่เป็น null และ undefined
        if (votesData !== null && votesData2 !== null) {
            // เปรียบเทียบข้อมูลระหว่าง votesData และ votesData2
            const isDataMatch = JSON.stringify(votesData.votes) === JSON.stringify(votesData2.votes);
            // ตั้งค่าตัวแปร verifyData ตามผลการเปรียบเทียบ
            setVerifyData(!isDataMatch);
        }
    }, [votesData, votesData2]);

    const adminCount = usersdata.reduce((count, user) => {
        if (user.roles === 'admin') {
            count++;
        }
        return count;
    }, 0);
    const usersCount = usersdata.reduce((count, user) => {
        if (user.roles === 'user') {
            count++;
        }
        return count;
    }, 0);
    const candidatesCount = usersdata.reduce((count, user) => {
        if (user.roles === 'candidate') {
            count++;
        }
        return count;
    }, 0);
    const AllusersCount = usersdata.reduce((count, user) => {
            count++;
        return count;
    }, 0);

    const pageMain = () => {
        setCurrentPage("Dashboard");
    };
    const pageAddUser = () => {
        setCurrentPage("AddUser");
    };
    const pageEditUsers = () => {
        setCurrentPage("EditUser");
    };
    // const pageSomeOtherPage = () => {
    //     setCurrentPage("Addcandidate");
    // };
    const pagevotescores = () => {
        setCurrentPage("votescores");
    };
    const pagecontrolvote = () => {
        setCurrentPage("controlvote");
    };
    const pagecontrolvote2 = () => {
        setCurrentPage("ManageVoting");
    };

    function handleAccountsChanged(accounts) {
        if (accounts.length > 0 && account !== accounts[0]) {
            setAccount(accounts[0]);
            setIsConnected(true);
        } else {
          setIsConnected(false);
          setAccount(null);
        }
        localStorage.clear();
        window.location.href="./dashboard";
      }

    return (
        <>
        <Navadmin /><br />
            <div className='container-fluid'>
                <div className={isMenuExpanded ? 'row g-3':'row g-3'}>
                    <div className={isMenuExpanded ? 'col-md-2 ' : 'col-md-1'}>
                        <div className='card shadow-sm' 
                            style={{ border: "none", width: isMenuExpanded ? '' : '', height: "80vh", transition: "width 0.5s ease" }}>
                            <div className='card-body '>
                                <ul className="nav flex-column">

                                    <li className='nav-item mb-3' onClick={handleMenuToggle} >
                                        <a className="nav-link" href='#sdf'>
                                            <i className="bi bi-list me-2"style={{fontSize:"24.5px"}}  ></i>
                                        </a>
                                    </li>
    
                                    {isMenuExpanded ? (
                                        <>
                                            <li className="nav-item "><p><strong>Dashboard</strong></p></li>

                                            <li className={`nav-item mb-3 ${currentPage === 'Dashboard' ? 'nav-link-active' : ''}`}>
                                                <a className={`nav-link 
                                                    ${currentPage === 'Dashboard' ? 'nav-link-font' : ''}`} 
                                                    href='#Dashboard' onClick={pageMain}>
                                                    <i className="bi bi-bar-chart-line me-2" ></i>Dashboard
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'votescores' ? 'nav-link-active' : ''}`}>
                                                <a className={`nav-link 
                                                    ${currentPage === 'votescores' ? 'nav-link-font' : ''}`} 
                                                    href='#VotingScores' onClick={pagevotescores}>
                                                    <i className="bi bi-bar-chart-line me-2"></i>Voting Scores
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'controlvote' ? 'nav-link-active' : ''}`}>
                                                <a className={`nav-link 
                                                    ${currentPage === 'controlvote' ? 'nav-link-font' : ''}`} 
                                                    href='#Manage Voting' onClick={pagecontrolvote}>
                                                    <i className="bi bi-gear me-2" ></i>verification users
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'ManageVoting ' ? 'nav-link-active' : ''}`}>
                                                <a className={`nav-link 
                                                    ${currentPage === 'ManageVoting ' ? 'nav-link-font' : ''}`} 
                                                    href='#Manage Voting' onClick={pagecontrolvote2}>
                                                    <i className="bi bi-gear me-2" ></i>Manage Voting 
                                                </a>
                                            </li>

                                            <li className="nav-item"><p ><strong>Users</strong></p></li>

                                            <li className={`nav-item mb-3 ${currentPage === 'EditUser' ? 'nav-link-active' : ''}`}>
                                                <a className={`nav-link 
                                                    ${currentPage === 'EditUser' ? 'nav-link-font' : ''}`} 
                                                    href='#Edit Users' onClick={pageEditUsers}>
                                                    <i className="bi bi-people me-2" ></i>Edit Users
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'AddUser' ? 'nav-link-active' : ''}`}>
                                                <a className={`nav-link 
                                                    ${currentPage === 'AddUser' ? 'nav-link-font' : ''}`} 
                                                    href='#Add Voter' onClick={pageAddUser}>
                                                    <i className="bi bi-person-plus me-2" ></i>Add Voter
                                                </a>
                                            </li>
                                            {/* <li className={`nav-item mb-3 ${currentPage === 'Addcandidate' ? 'nav-link-active' : ''}`}>
                                                <a className={`nav-link 
                                                    ${currentPage === 'Addcandidate' ? 'nav-link-font' : ''}`} 
                                                    href='#Add Candidate' onClick={pageSomeOtherPage}>
                                                    <i className="bi bi-person-plus me-2"></i>Add Candidate
                                                </a>
                                            </li> */}

                                        </>
                                    ) : (
                                        <>
                                            <li className={`nav-item mb-3 ${currentPage === 'votescores' ? 'nav-link-active' : ''}`} 
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="Voting Scores">
                                                <a className={`nav-link ${currentPage === 'votescores' ? 'nav-link-font' : ''}`} 
                                                    href='#1' onClick={pagevotescores} style={{textAlign:"center"}}>
                                                    <i className="bi bi-bar-chart-line bi-3x me-2"style={{fontSize:"24.5px"}} ></i>
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'controlvote' ? 'nav-link-active' : ''}`} 
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="Manage Voting">
                                                <a className={`nav-link ${currentPage === 'controlvote' ? 'nav-link-font' : ''}`}  
                                                    href='#sdf' onClick={pagecontrolvote} style={{textAlign:"center"}}>
                                                    <i className="bi bi-gear bi-3x me-2"style={{fontSize:"24.5px"}} ></i>
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'ManageVoting' ? 'nav-link-active' : ''}`} 
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="Manage Voting">
                                                <a className={`nav-link ${currentPage === 'ManageVoting' ? 'nav-link-font' : ''}`}  
                                                    href='#sdf' onClick={pagecontrolvote2} style={{textAlign:"center"}}>
                                                    <i className="bi bi-gear bi-3x me-2"style={{fontSize:"24.5px"}} ></i>
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'EditUser' ? 'nav-link-active' : ''}`} 
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Users">
                                                <a className={`nav-link ${currentPage === 'EditUser' ? 'nav-link-font' : ''}`}  
                                                    href='#sdf' onClick={pageEditUsers} style={{textAlign:"center"}}>
                                                    <i className="bi bi-people bi-3x me-2"style={{fontSize:"24.5px"}}  ></i>
                                                </a>
                                            </li>
                                            <li className={`nav-item mb-3 ${currentPage === 'AddUser' ? 'nav-link-active' : ''}`} 
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="Add Voter">
                                                <a className={`nav-link ${currentPage === 'AddUser' ? 'nav-link-font' : ''}`}
                                                    href='#sdf' onClick={pageAddUser} style={{textAlign:"center"}}>
                                                    <i className="bi bi-person-plus bi-3x me-2"style={{fontSize:"24.5px"}} ></i>
                                                </a>
                                            </li>
                                            {/* <li className={`nav-item mb-3 ${currentPage === 'Addcandidate' ? 'nav-link-active' : ''}`} 
                                                data-bs-toggle="tooltip" data-bs-placement="top" title="Add Candidate">
                                                <a className={`nav-link ${currentPage === 'Add Candidate' ? 'nav-link-font' : ''}`} 
                                                    href='#sdf' onClick={pageSomeOtherPage} style={{textAlign:"center"}}>
                                                    <i className="bi bi-person-plus  me-2"style={{fontSize:"24.5px"}} ></i>
                                                </a>
                                            </li> */}

                                        </>
                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={isMenuExpanded ? 'col-md-10 col-10 content-page' : 'col-md-11 col-11  content-page'}>
                           <div className='' style={{width:'100%',height:"auto",border:"none"}}>
                                    <div className={isMenuExpanded ? 'container-fluid' : 'container-fluid'}>
                                        <h1>{currentPage}</h1>
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className={`breadcrumb-item ${currentPage === 'Dashboard' ? '' : ''}`} 
                                                    onClick={pageMain} style={{ color: currentPage === 'Dashboard' ? 'blue' : 'black' }}>Dashboard</li>
                                                <li className={`breadcrumb-item ${currentPage === 'AddUser' ? '' : ''}`} 
                                                    onClick={pageAddUser} style={{ color: currentPage === 'AddUser' ? 'blue' : 'black' }}>Add User</li>
                                                {/* <li className={`breadcrumb-item ${currentPage === 'Addcandidate' ? '' : ''}`} 
                                                    onClick={pageSomeOtherPage} style={{ color: currentPage === 'Addcandidate' ? 'blue' : 'black' }}>Addcandidate</li> */}
                                                <li className={`breadcrumb-item ${currentPage === 'votescores' ? '' : ''}`} 
                                                    onClick={pagevotescores} style={{ color: currentPage === 'votescores' ? 'blue' : 'black' }}>votescore</li>
                                                <li className={`breadcrumb-item ${currentPage === 'controlvote' ? '' : ''}`} 
                                                    onClick={pagecontrolvote} style={{ color: currentPage === 'controlvote' ? 'blue' : 'black' }}>controlvote</li>
                                                <li className={`breadcrumb-item ${currentPage === 'controlvote' ? '' : ''}`} 
                                                    onClick={pageEditUsers} style={{ color: currentPage === ' EditUser' ? 'blue' : 'black' }}>EditUser</li>
                                            </ol>
                                        </nav>
                                        {currentPage === "Dashboard"&& isConnected &&<>
                                            <div className='row  row-cols-1 row-cols-sm-2 row-cols-md-2'>
                                                <div className='col'>
                                                    <div className='row g-3 row-cols-1 row-cols-sm-1= row-cols-md-2'>
                                                        <div className='col'>
                                                            <div className='card shadow-sm' style={{border:"none"}}>
                                                                <div className='card-body' >
                                                                    <div className='card-title'><h3>Users</h3></div>
                                                                        <div className='card-text'>
                                                                            <h3><i class="bi bi-person"></i> {usersCount}</h3>
                                                                            <p style={{opacity:"60%"}}>Voters or users of the system</p>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <div className='card shadow-sm' style={{border:"none"}}>
                                                                <div className='card-body' >
                                                                <div className='card-title'><h3>Candidate</h3></div>
                                                                    <div className='card-text'> 
                                                                        <h3 ><i class="bi bi-person"></i> {candidatesCount}</h3>
                                                                        <p style={{opacity:"60%"}}>candidates</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <div className='card shadow-sm' style={{border:"none"}}>
                                                                <div className='card-body' >
                                                                <div className='card-title'><h3>Admin</h3></div>
                                                                    <div className='card-text'>
                                                                        <h3 ><i class="bi bi-person"></i> {adminCount}</h3>
                                                                        <p style={{opacity:"60%"}}>System management staff</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <div className='card shadow-sm' style={{border:"none"}}>
                                                                <div className='card-body' >
                                                                <div className='card-title'><h3>All users</h3></div>
                                                                    <div className='card-text'>
                                                                        <h3><i class="bi bi-person"></i> {AllusersCount}</h3> 
                                                                        <p style={{opacity:"60%"}}>All users all </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col'>
                                                    <div className='row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1'>
                                                        <div className='col'>
                                                            <div className='card shadow-sm ' style={{border:"none" }}>
                                                                <div className='card-body'>
                                                                    <div className='card-title'><h3>All voting</h3></div>
                                                                    <div className='card-text'>
                                                                        <h3><i class="bi bi-database"></i> {votesData ? Object.keys(votesData.votes).length : 0}</h3>
                                                                        <p style={{opacity:"60%"}}>All voting datasets</p>
                                                                    </div>
                                                                    

                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className='col'>
                                                            <div className='card shadow-sm h-100' style={{border:"none"}}>
                                                                <div className='card-body'>

                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                            <br/>

                                            <div className='row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1'>
                                                <div className='col'> 
                                                    <div className='card shadow-sm' style={{border:"none"}}>
                                                        <div className='card-body'>
                                                            <div className='card-text'>
                                                                <h3>Latest Voting</h3>
                                                                <VotingChart votingData={votesData} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='col'> 
                                                    <div className='card shadow-sm' style={{border:"none"}}>
                                                        <div className='card-body'>
                                                            
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        
                                        </> }
                                        {currentPage === "AddUser" && isConnected && <Adduser />}
                                        {currentPage === "EditUser" && isConnected && <EditUserForm />}
                                        {/* {currentPage === "Addcandidate" && isConnected && <Addcandidate />} */}

                                        {currentPage === "votescores" && isConnected && 
                                        <Votescores 
                                            votesData={votesData} 
                                            votesData2={votesData2} 
                                            verifyData={verifyData}
                                        />}

                                        {currentPage === "controlvote" && isConnected && <Controlvote />}
                                        {currentPage === "ManageVoting" && isConnected && owner && (
                                            <Controlblockchain />
                                        ) }


                                    </div>
                            </div>     
                          
            
                        <br/>
                    </div>
                </div>
            </div>
        </>
    )

}
