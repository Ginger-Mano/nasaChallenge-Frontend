import React, {Component} from "react"
import Card from "./Card"
import './App.css';



class App extends Component {

 state = {
   apodData: [],
   clicked: false,
   existingLikes: []
 }

 componentDidMount() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
  .then(res => res.json())
  .then(resData => this.setState({
    apodData: resData 
  }))

 }

 clickedLike = (evt) => {
  console.log(evt)
 }





  render() {
    console.log(this.state.apodData.copyright)
  return (
    <div className="App">
      <h2>Spacestagram</h2>
      <Card data={this.state.apodData} clicked={this.state.clicked} clickEvent={this.clickedLike}/>
    </div>
  );
  }
}

export default App;
