import React , {useState} from 'react'
import Navbar from '../Components_page/Navbar'
import Adduser from '../Components_admin/Adduser';
import Addcandidate from '../Components_admin/Addcandidate';
import Controlvote from '../Components_admin/Controlvote_s';
import Votescores from '../Components_admin/Votescores_s';

export default function Controlpage() {

    const [currentPage, setCurrentPage] = useState("main"); // เก็บสถานะหน้าปัจจุบัน
    

    // ฟังก์ชันที่ใช้ในการเปลี่ยนหน้า
    const pageMain = () => {
        setCurrentPage("Dashboard");
    };
    const pageAddUser = () => {
        setCurrentPage("addUser");
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
        <Navbar />
        <div className='container'>
                <div className='container'>
                <br/>
                <h1>{currentPage}</h1> 
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className={`breadcrumb-item ${currentPage === 'Dashboard' ? 'active' : ''}`} onClick={pageMain} style={{color: currentPage === 'Dashboard' ? 'blue' : 'black'}}>Dashboard</li>
                    <li className={`breadcrumb-item ${currentPage === 'addUser' ? 'active' : ''}`} onClick={pageAddUser} style={{ color: currentPage === 'addUser' ? 'blue' : 'black' }}>Add User</li>
                    <li className={`breadcrumb-item ${currentPage === 'Addcandidate' ? 'active' : ''}`} onClick={pageSomeOtherPage} style={{ color: currentPage === 'Addcandidate' ? 'blue' : 'black' }}>Addcandidate</li>
                    <li className={`breadcrumb-item ${currentPage === 'votescores' ? 'active' : ''}`} onClick={pagevotescores} style={{ color: currentPage === 'votescores' ? 'blue' : 'black' }}>votescore</li>
                    <li className={`breadcrumb-item ${currentPage === 'controlvote' ? 'active' : ''}`} onClick={pagecontrolvote} style={{ color: currentPage === 'controlvote' ? 'blue' : 'black' }}>controlvote</li>
                </ol>

                </nav>


                {currentPage === "Dashboard" && 
                <>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quam reprehenderit velit nam soluta nobis fugiat sapiente non, possimus reiciendis, similique, modi fugit earum voluptatibus enim amet nesciunt adipisci error.</p>
                        <br/>
                        <div className='col-p'>
                                <div className="card btn btn-outline-primary" onClick={pageAddUser}>
                                    <div className="card-body">
                                        <h3 className='card-text'>Add people eligible to vote</h3>
                                    </div>
                                </div><br/>
                
                                <div className="card btn btn-outline-primary" onClick={pageSomeOtherPage}>
                                    <div className="card-body">
                                        <h3 className='card-text'>Add a candidate</h3>
                                    </div>
                                </div><br/>

                                <div className='col-p'>
                                    <div class="card btn btn-outline-primary"  onClick={pagevotescores}>
                                        <div class="card-body">
                                            <h3 className='card-text'>Overview of voting scores</h3>
                                            {/* <button className='btn btn-primary'>choose</button> */}
                                        </div>
                                    </div><br/>
                                    </div>

                                    <div className='col-p'>
                                    <div class="card btn btn-outline-primary"  onClick={pagecontrolvote}>
                                        <div class="card-body">
                                            <h3 className='card-text'>Manage the voting system</h3>
                                            {/* <button className='btn btn-primary'>choose</button> */}
                                        </div>
                                    </div><br/>
                                    </div>
                            </div>   
                </>
                }
                {currentPage === "addUser" && <Adduser />}

                {currentPage === "Addcandidate" && <Addcandidate />}

                {currentPage === "votescores" && <Votescores />}
                
                {currentPage === "controlvote" && <Controlvote />}
            </div>
        </div>
    </>
  )
  
}
