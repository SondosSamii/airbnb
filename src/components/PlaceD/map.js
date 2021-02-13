import React, { Component } from 'react';







 export  class Map2 extends Component {
   state = {
        coords:{},
      };

        async componentDidMount(){
            this.setState({coords:this.props.loc})
            console.log(this.props.loc)
            }

  render() {
    // let 
    return (
      <>

      
      </>
    );
  }
}


export default (GoogleApiWrapper({
    apiKey: "AIzaSyDED1xIAqSktQ5LAnZ5BCVIkwtKbJPT31U"  
})(Map2))
// export default