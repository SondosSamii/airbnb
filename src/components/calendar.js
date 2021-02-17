// import { Calendar ,DateRangePicker } from 'react-date-range';
import React, { Component } from 'react';
import Calendar from "react-date-range-calendar";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getPlaceReservations  , getReservationByID_NotAuth} from "../actions/reservations"
class CalendarComp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            Days:[],
            // place_id:"60277eabacc6543214610236",
            place_id:"",
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
          //  console.log("//////", this.props);
           this.setState({place_id : await this.props.props.match.params.id});
          //  this.setState({place_id : await this.props.placeId});
           console.log("))))))))", this.state.place_id);

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
      var flag = (this.state.length === this.state.Days.length);
                
      return (  
        <>
              {flag && (
                <Calendar
                  disabledDates= {() => {
                    if(this.state.Days.length > 0) {
                      return this.state.Days;
                    }
                    else {
                      return [];
                    }
                  }}
                  onSelect = {(startDate, endDate,validDateRange) => {
                    this.props.dates(startDate, endDate, validDateRange);
                    // console.log("lllll: " , startDate , "pppppppp" , endDate , " ooooo: " , validDateRange);
                  }}
                  rightArrowCss = "padding-left: 5px; &:hover { background: var(--secondary-color); }"
                  leftArrowCss = "padding-left: 5px; &:hover { background: var(--secondary-color); }"
                  thCss = "color:var(--secondary-color); }"
                  startDateTdCssObj = {{backgroundColor:'var(--secondary-color)', color: '#fff'}}
                  endDateTdCssObj = {{backgroundColor:'var(--secondary-color)', color: '#fff'}}
                  inRangedTdCssObj = {{backgroundColor:'var(--secondary-light-color)', color:'#fff'}}
                  onHoverTdCssObj = {{backgroundColor:'var(--secondary-color)', color: '#fff'}}
                  disablePrevDates
                  // globalCss = "*{ font-size: 14px; background-color: transparent; } tr{ background: blue; }"
                />)
              }   
              </>
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
  
  export default connect(mapstatetoprops, mapactiontoprops)(CalendarComp);
  
  
   