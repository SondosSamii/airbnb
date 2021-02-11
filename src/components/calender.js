// import { Calendar ,DateRangePicker } from 'react-date-range';
import React, { Component } from 'react';
import Calendar from "react-date-range-calendar";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class CalenderComp extends Component {
    constructor(props) {
        super(props);
        this.state ={
            Days:[]
        }
      
    }
     getDaysArray = (s,e) =>
      {
          for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1))
          {
               a.push(new Date(d));
            }
          
            return a;
        };
       async componentDidMount(){
            var arr = await this.getDaysArray(new Date("2021-02-01") ,new Date("2021-02-04"))
            arr.map((v) => {
                v.toISOString().slice(0,10)
                console.log(v)
            }
                ).join("")
            console.log(arr);
            this.setState({Days : arr})
        }

    render() { 
        return (  
            <div className="mt-5">
           	{/* <Calendar selectedRange= {["2019-03-03","2019-03-07"]} /> */}
               <Calendar disabledDates= {() => { return [this.state.Days[0],"2021-02-02","2022-02-08"] } } />
        </div>
        );
    }
}
 


export default CalenderComp;
   