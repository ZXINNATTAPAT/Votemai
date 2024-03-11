import React from 'react'
import Navbar from '../Components_page/Navbar'
import '../StylesSheet/Component.css'


export default function Homepage() {

    // ใส่ฟังชั่น Disable button card 

  return (
    <>
        <Navbar /><br/>
        <div className='container'>

            <div className='container'>

                <div className='card shadow-sm p-3 mb-5  rounded' style={{border:"none"}}> 
                    <div className='card-body' > 
                        <h4 className='card-text' style={{textAlign:"center"}}>
                            <i class="em em-pray" aria-role="presentation" aria-label="PERSON WITH FOLDED HANDS"></i>
                            Please log in to <span  style={{color:"orange"}}>METAMASK</span> or contact the staff for further assistance.<br/>
                            Thank you.
                        </h4>
                    </div>
                </div>

                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' >
                    <div className='col '>
                        <div class="card shadow-sm h-100" style={{border:"none"}}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>

                    <div className='col ' >
                        <div class="card shadow-sm h-100" style={{border:"none"}}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
                                Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>

                    <div className='col '>
                        <div class="card shadow-sm h-100" style={{border:"none"}}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>

                    <div className='col '>
                        <div class="card shadow-sm h-100" style={{border:"none"}}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>

                    <div className='col '>
                        <div class="card shadow-sm h-100" style={{border:"none"}}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>

                    <div className='col '>
                        <div class="card shadow-sm h-100" style={{border:"none"}}>
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>

                </div>
                    
                

                
                

            </div>
            
        </div>
    </>
  )
}
