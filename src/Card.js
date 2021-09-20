import React from "react"

function Card(props) {
console.log(props)
    return(
        <div>
            <h2>{props.data.title}</h2>
            <h4>{props.data.date}</h4>
            <img src={props.data.url}></img>
            <h4>{props.data.copyright}</h4>
            <p>{props.data.explanation}</p>

            <button onClick={props.clickEvent}>Like</button>
        </div>
    )
}

export default Card