import React, { useEffect, useState } from 'react'
import Adduser from '../Admin/Adduser';
import Addcandidate from '../Admin/Addcandidate';
import Controlvote from '../Admin/Controlvote_s';
import Votescores from '../Admin/Votescores_s';
import Navadmin from '../Components/Navadmin';
import EditUserForm from '../Admin/Editusers';
import '../StylesSheet/Sidebar.css';
import VotingChart from '../Admin/VotingChart';
import axios from 'axios';


//Admin control

export default function Controlpage() {
    const [currentPage, setCurrentPage] = useState("Dashboard"); // Store current page state
    const token = localStorage.getItem('token'); // Check if token exists
    const user = localStorage.getItem('user'); // Check if user data exists
    const userData = user ? JSON.parse(user) : null; // Parse user data to JSON object
    const isAdmin = userData && userData.roles === 'admin'; // Check if user is an admin

    const [votesData, setVotesData] = useState(null);
    const [isMenuExpanded, setIsMenuExpanded] = useState(true);

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
    }, [isAdmin, token]); // Dependencies: isAdmin and token

    

    useEffect(() => {
        const fetchVotesData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/sh-votesData');
                const data = response.data; // Access the data object from the response
                 setVotesData(data);
                console.log(data.votes[0].votes)
            } catch (error) {
                console.error('Error fetching votes data:', error);
            }
        };
    
        fetchVotesData();
    }, []);


    const pageMain = () => {
        setCurrentPage("Dashboard");
    };
    const pageAddUser = () => {
        setCurrentPage("addUser");
    };
    const pageEditUsers = () => {
        setCurrentPage("EditUser");
    };
    const pageSomeOtherPage = () => {
        setCurrentPage("Addcandidate");
    };
    const pagevotescores = () => {
        setCurrentPage("votescores");
    };
    const pagecontrolvote = () => {
        setCurrentPage("controlvote");
    };

    return (
        <>
        <Navadmin /><br />
            <div className='container-fluid'>
                <div className={isMenuExpanded ? 'row g-3':'row g-3'}>
                    <div className={isMenuExpanded ? 'col-md-2 ' : 'col-md-1'}>
                        <div className='card shadow-sm' style={{ border: "none", width: isMenuExpanded ? '' : '', height: "80vh", transition: "width 0.5s ease" }}>
                            <div className='card-body '>
                                <ul className="nav flex-column">
                                    <li className='nav-item mb-3' onClick={handleMenuToggle} >
                                        <a className="nav-link" href='#sdf'>
                                            <i className="bi bi-list me-2" ></i>
                                        </a>
                                    </li>
    
                                    {isMenuExpanded ? (
                                        <>
                                            <li className="nav-item ">
                                                <p>Dashboard</p>
                                            </li>

                                            <li className="nav-item mb-3">
                                                <a className="nav-link" href='#sdf' onClick={pageMain}>
                                                    <i className="bi bi-bar-chart-line me-2"></i>Dashboard
                                                </a>
                                            </li>
                                            <li className="nav-item mb-3">
                                                <a className="nav-link" href='#sdf' onClick={pagevotescores}>
                                                    <i className="bi bi-bar-chart-line me-2"></i>Voting Scores
                                                </a>
                                            </li>

                                            <li className="nav-item mb-3">
                                                <a className="nav-link" href='#sdf' onClick={pagecontrolvote}>
                                                    <i className="bi bi-gear me-2"></i>Manage Voting
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <p className=''>Users</p>
                                            </li>

                                            <li className="nav-item mb-3">
                                                <a className="nav-link" href='#sdf' onClick={pageEditUsers}>
                                                    <i className="bi bi-people me-2"></i>Edit Users
                                                </a>
                                            </li>

                                            <li className="nav-item mb-3">
                                                <a className="nav-link" href='#sdf' onClick={pageAddUser}>
                                                    <i className="bi bi-person-plus me-2"></i>Add Voter
                                                </a>
                                            </li>

                                            <li className="nav-item mb-3">
                                                <a className="nav-link" href='#sdf' onClick={pageSomeOtherPage}>
                                                    <i className="bi bi-person-plus me-2"></i>Add Candidate
                                                </a>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item mb-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Voting Scores">
                                                <a className="nav-link " href='#1' onClick={pagevotescores} >
                                                    <i className="bi bi-bar-chart-line me-2" ></i>
                                                </a>
                                            </li>

                                            <li className="nav-item mb-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Manage Voting">
                                                <a className="nav-link" href='#sdf' onClick={pagecontrolvote}>
                                                    <i className="bi bi-gear me-2"></i>
                                                </a>
                                            </li>

                                            <li className="nav-item mb-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Users">
                                                <a className="nav-link" href='#sdf' onClick={pageEditUsers}>
                                                    <i className="bi bi-people me-2"></i>
                                                </a>
                                            </li>

                                            <li className="nav-item mb-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Add Voter">
                                                <a className="nav-link" href='#sdf' onClick={pageAddUser}>
                                                    <i className="bi bi-person-plus me-2"></i>
                                                </a>
                                            </li>

                                            <li className="nav-item mb-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Add Candidate">
                                                <a className="nav-link" href='#sdf' onClick={pageSomeOtherPage}>
                                                    <i className="bi bi-person-plus me-2"></i>
                                                </a>
                                            </li>
                                        </>
                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={isMenuExpanded ? 'col-md-10 col-10 content-page' : 'col-md-11 col-11  content-page'}>
                                <div className='card shadow-sm' style={{width:'100%',height:"auto",border:"none"}}>
                                    <div className='card-body'>
                                        <h1>{currentPage}</h1>
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className={`breadcrumb-item ${currentPage === 'Dashboard' ? 'active' : ''}`} onClick={pageMain} style={{ color: currentPage === 'Dashboard' ? 'blue' : 'black' }}>Dashboard</li>
                                                <li className={`breadcrumb-item ${currentPage === 'addUser' ? 'active' : ''}`} onClick={pageAddUser} style={{ color: currentPage === 'addUser' ? 'blue' : 'black' }}>Add User</li>
                                                <li className={`breadcrumb-item ${currentPage === 'Addcandidate' ? 'active' : ''}`} onClick={pageSomeOtherPage} style={{ color: currentPage === 'Addcandidate' ? 'blue' : 'black' }}>Addcandidate</li>
                                                <li className={`breadcrumb-item ${currentPage === 'votescores' ? 'active' : ''}`} onClick={pagevotescores} style={{ color: currentPage === 'votescores' ? 'blue' : 'black' }}>votescore</li>
                                                <li className={`breadcrumb-item ${currentPage === 'controlvote' ? 'active' : ''}`} onClick={pagecontrolvote} style={{ color: currentPage === 'controlvote' ? 'blue' : 'black' }}>controlvote</li>
                                                <li className={`breadcrumb-item ${currentPage === 'controlvote' ? 'active' : ''}`} onClick={pageEditUsers} style={{ color: currentPage === 'controlvote' ? 'blue' : 'black' }}>EditUser</li>
                                            </ol>
                                        </nav>
                                        {currentPage === "Dashboard" &&<>
                                            <div className='row'>
                                                <div className='col-sm-4'> 
                                                    <div className='card'>
                                                        <div className='card-body'>
                                                            <VotingChart votingData={votesData} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-sm-4'> 
                                                    <div className='card'>
                                                        <div className='card-body'>
                                                            <VotingChart votingData={votesData} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-sm-4'> 
                                                    <div className='card'>
                                                        <div className='card-body'>
                                                            <VotingChart votingData={votesData} />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                           
                                            
                                        </> }
                                        {currentPage === "addUser" && <Adduser />}
                                        {currentPage === "EditUser" && <EditUserForm />}
                                        {currentPage === "Addcandidate" && <Addcandidate />}
                                        {currentPage === "votescores" && <Votescores />}
                                        {currentPage === "controlvote" && <Controlvote />}
                                    </div>
                                </div>
                          
                      
                        <br/>
                    </div>
                </div>
            </div>
        </>
    )

}
