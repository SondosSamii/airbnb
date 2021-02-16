// import { Calendar ,DateRangePicker } from 'react-date-range';
import React, { Component } from 'react';
import Calendar from "react-date-range-calendar";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getPlaceReservations  , getReservationByID_NotAuth} from "../actions/reservations"
class CalenderComp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            Days:[],
            place_id:"60277eabacc6543214610236",
            token : "",
            startDate : "",
            endDate : "",
            length : 0
        }
      
    }
     getDaysArray = (s,e) =>
      {
          for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1))
          {
            //    a.push(new Date(d).toISOString().slice(0,10));
               this.setState((state) => {
                   const Days = state.Days.push(new Date(d).toISOString().slice(0,10))
               
                   return Days;
               })
            }
            // console.log("Days: " , this.state.Days);
            this.setState({length : this.state.Days.length});
            return a;
    };
       async componentDidMount(){
           this.setState({token: localStorage.getItem("token")})

        //    this.setState({place_id : this.props.place_id})

           await this.props.getPlaceReservations(this.state.place_id);
           console.log("place_Reservaitons:   " , this.props.place_reservations.reservations);


           await this.props.place_reservations.reservations.map(async(reservation_id)=>{
              console.log("object Reservations:   " , reservation_id);
            await this.props.getReservationByID_NotAuth(reservation_id);
            var reservation_obj = this.props.reservation_details_Not_Auth.reservation
            console.log("reservation obje:  " , reservation_obj);   
            this.setState({
                   startDate :reservation_obj.start_date,
                   endDate :reservation_obj.end_date 
                });
             this.getDaysArray(new Date(this.state.startDate) ,new Date(this.state.endDate))
           })
            
        }

        renderDays = ()=>{
            return <Calendar disabledDates= {() => { return this.state.Days  } } />
                      
        }


    render() { 
        console.log("Days:  " , this.state.length);
        var length = this.state.Days.length;
        var flag = (this.state.length === this.state.Days.length);
        
        
      return (  
            <div className="mt-5">
            {/* <Calendar onSelect= {(startDate, endDate,validDateRange) => {
                console.log("lllll: " , startDate , "pppppppp" , endDate , " ooooo: " , validDateRange);
             } } />  */}
              {
                   flag && (
               <Calendar  onSelect= {(startDate, endDate,validDateRange) => {
                console.log("lllll: " , startDate , "pppppppp" , endDate , " ooooo: " , validDateRange);
             } } disabledDates= {() => { return this.state.Days  } } />
                  )
              }      



           	{/* <Calendar selectedRange= {["2019-03-03","2019-03-07"]} /> */}
            {/* <Calendar disabledDates= {() => { return [this.state.Days[0],"2021-02-07","2021-02-08"]  } } /> */}
{/*               
              {
                   flag && (
               <Calendar disabledDates= {() => { return this.state.Days  } } />
                  )
              } */}
        </div>
        );
    }
}
 


const mapactiontoprops = (disptch) => {
    return bindActionCreators(
      {
        getPlaceReservations ,
        getReservationByID_NotAuth
      },
      disptch
      );
    };
    const mapstatetoprops = (state) => {
    return {
      place_reservations : state.Reservations.place_reservations,
      reservation_details_Not_Auth : state.Reservations.reservation_details_Not_Auth
    };
  };
  
  export default connect(mapstatetoprops, mapactiontoprops)(CalenderComp);
  
  
   