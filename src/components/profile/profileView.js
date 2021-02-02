import "./profileView";
import 'bootstrap/dist/css/bootstrap.css';
//import 'jquery/dist/jquery';
// import 'popper.js/dist/popper';
//import 'bootstrap/dist/js/bootstrap';
import { FaFacebook } from "react-icons/fa";
import  {AiFillInstagram} from "react-icons/ai";
import  {GiEarthAfricaEurope} from "react-icons/gi";
import  {FaHeart} from "react-icons/fa";

const Profile=()=>{



    return(
  
        <div class="container emp-profile">


        <form method="post">
            <div class="row">
                {/* <div class="col-md-4">
                    <div class="profile-img">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
                        

                    </div>
                </div> */}



<div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
                    <div class="mt-3">
                      <h4>John Doe</h4>
                    </div>
                  </div>
                </div>
              </div>
                <div class="col-md-6">
                    <div class="profile-head">
                                <h2> Hello</h2>
                                <h5>
                                     John Doe
                                </h5>
                                <h6>
                                    Cairo,Egypt
                                </h6>

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="col-md-2">
                    <input type="submit" class="profile-edit-btn" name="btnAddMore" value="View Profile"/>
                </div>
            </div>
            <div class="row">
                {/* <div class="col-md-4">
                    <div class="profile-work">
                        <p>Social Media</p>
                        <GiEarthAfricaEurope/>  <a href="">Website Link</a><br/>
                        <FaFacebook/>  <a href="">FaceBook Profile</a><br/>
                        <AiFillInstagram/>   <a href="">Instagram Profile</a>
                        <p>Lovely Country</p>
                        <a href="">Paris</a><br/>
                        <a href="">Alex</a><br/>
                        <a href="">Newyork</a><br/>
                        <a href="">Ismailia</a><br/>
                        
                    </div>
                </div> */}

<div class="card mt-3">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span class="text-secondary">https://bootdey.com</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                    <span class="text-secondary">bootdey</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span class="text-secondary">@bootdey</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span class="text-secondary">bootdey</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span class="text-secondary">bootdey</span>
                  </li>
                </ul>
              </div>


    
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                               
                                        <div class="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Kshiti Ghelani</p>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>kshitighelani@gmail.com</p>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>123 456 7890</p>

                                        </div>
                                    </div>
                                     <div class="row">
                                        <div class="col-md-6">
                                            <label>Password</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>1234568</p>
                                        </div>
                                    </div>
                                 
                                   </div>
     
                            </div>
                        </div>


            </div>
          
        </form>  
        <br />
    

        <h1 class="wl">WishList</h1>
     <div class="d1">

            <div class="card" style={{width: '18rem'}}>
                 <img class="card-img-top" src="images/1.jpg" alt="Card image cap"/>
                      <div class="card-body">
                           <h5 class="card-title">Card title <FaHeart class="heart"/> </h5>
                           <p class="card-text">Some quick example text to build </p>
                    <a href="#" class="btn btn-primary">More Details</a>
                    </div>
            </div>


             <div class="card" style={{width: '18rem'}}>
                 <img class="card-img-top" src="images/2.jpg" alt="Card image cap"/>
                      <div class="card-body">
                           <h5 class="card-title">Card title <FaHeart class="heart"/> </h5>
                           <p class="card-text">Some quick example text to build </p>
                    <a href="#" class="btn btn-primary">More Details</a>
                    </div>
            </div>

            <div class="card" style={{width: '18rem'}}>
                 <img class="card-img-top" src="images/3.jpg" alt="Card image cap"/>
                      <div class="card-body">
                           <h5 class="card-title">Card title <FaHeart class="heart"/> </h5>
                           <p class="card-text">Some quick example text to build </p>
                    <a href="#" class="btn btn-primary">More Details</a>
                    </div>
            </div>
   
                 
    </div>

    <div class="col-md-3">
   
   <button type="submit" class="btnRegister" >
   Load More
   </button>
</div> 

<br />
<br />
<br />


<h1 class="wl">Trips</h1>
     <div class="d1">

            <div class="card" style={{width: '18rem'}}>
            <a href="">
                 <img class="card-img-top" src="images/1.jpg" alt="Card image cap"/>
                 </a>
                      <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build </p>
                   
                    </div>
            </div>


             <div class="card" style={{width: '18rem'}}>
             <a href="">
                 <img class="card-img-top" src="images/2.jpg" alt="Card image cap"/>
                 </a>
                      <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build </p>
                   
                    </div>
            </div>

            <div class="card" style={{width: '18rem'}}>
            <a href="">
                 <img class="card-img-top" src="images/3.jpg" alt="Card image cap"/>
                 </a>
                      <div class="card-body">
                           <h5 class="card-title">Card title</h5>
                           <p class="card-text">Some quick example text to build </p>
                    
                    </div>
            </div>
   
                 
    </div>

    <div class="col-md-3">
   
   <button type="submit" class="btnRegister" >
   Load More
   </button>
</div> 

<br />
<br />
<br />




    </div>





    
    
         
        
    )
}
   


export default Profile