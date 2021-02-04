import "./reservationForm.css";
import 'bootstrap/dist/css/bootstrap.css';


const Reservastion=()=>{
    return(

        <section id="login" className="py-5">
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Reservastion</h3>
                         
                            <div className="form-group">
                                <label  className="text-info">Check In :</label>
                                <input type="date"  className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label  className="text-info">Check Out :</label>
                                <input type="date"  className="form-control"/>
                            </div>
                            
                            <div className="form-group">
                                <label  className="text-info">Total Nights :</label>
                                <input type="number"  className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label  className="text-info">Number of guests :</label>
                                <input type="number" className="form-control"/>
                            </div>
                            <div className="form-group">
                    
                               
                              
                                <div className="col-auto my-1">
                                      <button type="submit" className="btn btn-primary float-right  bg-info">Submit</button>
                                </div>
  
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

        )
    }
       
    
    
    export default Reservastion