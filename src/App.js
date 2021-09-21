import React, {Component} from "react";
import CardData from "./CardData";
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


likeArr = (() => {
  fetch(`http://localhost:3000/likes`)
  .then(res => res.json())
  .then(arrayOfLikes => this.setState({
    existingLikes: arrayOfLikes 
  }))
 })()


 clickedLike = () => {
  fetch(`http://localhost:3000/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      like_count: this.state.existingLikes.length + 1
    })
  })
  .then(res => res.json())
  .then(newLike => {
    this.setState({
      existingLikes: [...this.state.existingLikes, newLike]
    })
  })
 }


deleteLikes = () => {
  let like = this.state.existingLikes.pop()
  
  fetch(`http://localhost:3000/likes/${like.id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then((deletedLike) => {
    let leftoverLikes = this.state.existingLikes.filter(likes => likes !== like)
    this.setState({
      existingLikes: leftoverLikes
    })
  })
}


  render() {
  return (
    <div className="App">

      <h2>Spacestagram</h2>

      <CardData data={this.state.apodData} 
                clickedLike={this.clickedLike} 
                likeArr={this.state.existingLikes} 
                clickEvent={this.clickedLike} 
                deletedLikes={this.deleteLikes}/>
    </div>
  );
  }
}

export default App;
