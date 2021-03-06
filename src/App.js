import React, {Component} from "react";
import AppBar from '@mui/material/AppBar';
import CardData from "./CardData";
import { blue } from '@mui/material/colors';
import Grid from '@material-ui/core/Grid';
import './App.css';

const sound1 = new Audio('https://freesound.org/data/previews/399/399934_1676145-lq.mp3')
const sound2 = new Audio('https://freesound.org/data/previews/376/376038_1676145-lq.mp3')

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
  sound1.play()
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
      existingLikes: leftoverLikes,
      clicked: true
    })
  })
  sound2.play()
}


  render() {
  return (
    <div className="root">

      <AppBar position="static" 
              sx={{ backgroundColor: blue}}>  

              <h2 className="title">SPACESTAGRAM - <span className="span">View NASA's API Photo of the Day</span> </h2>

      </AppBar>

        <div className="spacer"></div>

      <CardData data={this.state.apodData} 
                clickedLike={this.clickedLike} 
                likeArr={this.state.existingLikes} 
                unliked={this.state.clicked} 
                deletedLikes={this.deleteLikes}/>

    </div>
  );
  }
}

export default App;
