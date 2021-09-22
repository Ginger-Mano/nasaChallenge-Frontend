import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { green, pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Grid from '@material-ui/core/Grid';

function CardData(props) {

    return(

    <div className="maincard">

        <Grid  container 
                direction="column"
                alignItems="center"
                justify="center">

                <Grid item>
                    <Card sx={{maxWidth: 800}}>
                        <CardHeader avatar={
                            <Avatar 
                                    aria-label="nasa"
                                    src="http://www.nasa.gov/sites/default/files/images/nasaLogo-570x450.png">
                                         NASA
                            </Avatar>
                             }
                                    title={<h1 className="text1">{props.data.title}</h1>}
                                    subheader={<h3 className="text">{props.data.date}</h3>}
                />
           
            
                <CardMedia 
                        component="img"
                        image={props.data.url}
                        alt="currently not available">
                </CardMedia>
            
                <CardContent>
                        {props.data.explanation}
                </CardContent>

                <CardContent style={{fontWeight: 500}}>
                        {props.data.copyright}
                </CardContent>
            
                    </Card>
                </Grid>
             </Grid>

             <div className="spacer"></div>

        <Card>
            <Grid  container 
                    columns={3}
                    spacing={8}
                    alignItems="center"
                    justify="center">

            <Grid item>
                <Button variant="contained" 
                        startIcon={<FavoriteIcon/>} 
                        color="error" 
                        onClick={props.clickedLike}>
                        Like
                </Button>
            </Grid>

            <Grid item>
            {props.unliked ?  
            
            <Button variant="contained" 
                        startIcon={<ThumbDownIcon/>}
                        disabled={true} 
                        onClick={props.deletedLikes}
                        sx={{ bgcolor: pink[500]}} >
                        Unlike
                </Button> :

            <Button variant="contained" 
                        startIcon={<ThumbDownIcon/>} 
                        onClick={props.deletedLikes}
                        sx={{ bgcolor: pink[500]}} >
                        Unlike
                </Button>
            }
            </Grid>

            <Grid item>
                {props.clickedLike ? <p>{props.likeArr.length} people have liked this photo today</p>: null}
            </Grid>
            

            </Grid>
        </Card>

    </div>
    )
}

export default CardData