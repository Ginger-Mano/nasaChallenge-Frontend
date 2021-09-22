import React, {Component} from "react";
import AppBar from '@mui/material/AppBar';
import CardData from "./CardData";
import { pink } from '@mui/material/colors';
import './App.css';

const sound = new Audio('https://freesound.org/data/previews/399/399934_1676145-lq.mp3')

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
  sound.play()
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
    <div className="root">

      <AppBar position="static" sx={{ bgcolor: pink}}>
      <h2 className="title">SPACESTAGRAM</h2>
      </AppBar>

      <div className="spacer"></div>

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
