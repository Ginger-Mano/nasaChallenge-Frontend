import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { green, pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
                            <Avatar sx={{ bgcolor: green[500]}} 
                                    aria-label="nasa">
                                         NASA
                            </Avatar>
                             }
                                    title={<Typography sx={{fontSize: 20, fontWeight: 50}} style={{fontWeight: 500}}>{props.data.title}</Typography>}
                                    subheader={<Typography sx={{fontSize: 20}}>{props.data.date}</Typography>}
                />
           
            
                <CardMedia 
                        component="img"
                        image={props.data.url}
                        alt="currently not available">
                </CardMedia>
            
                <CardContent>
                        {props.data.explanation}
                </CardContent>

                <CardContent>
                        {props.data.copyright}
                </CardContent>
            
                    </Card>
                </Grid>
             </Grid>

            <Grid  container 
                    columns={3}
                    spacing={4}
                    alignItems="center"
                    justify="center">

            <Grid item>
                <Button variant="contained" 
                        startIcon={<FavoriteIcon/>} 
                        color="error" 
                        onClick={props.clickEvent}>
                        Like
                </Button>
            </Grid>

            <Grid item>
                <Button variant="contained" 
                        onClick={props.deletedLikes}
                        sx={{ bgcolor: pink[500]}} >
                        
                        Unlike
                </Button>
            </Grid>

            <Grid item>
                {props.clickedLike ? <p>{props.likeArr.length} people have liked this photo today</p>: null}
            </Grid>

        </Grid>

    </div>
    )
}

export default CardData