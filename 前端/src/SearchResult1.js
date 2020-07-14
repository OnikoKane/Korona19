import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    card:{
        background: 'rgba(255,255,255)',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    card1:{
        background: 'rgba(255,255,255)',
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        marginBottom: theme.spacing(1),
        minWidth:'100%'
    },
    paper:{
        width:'60%',
        marginTop: theme.spacing(1.4),
    },
    Typography:{
        marginTop:theme.spacing(1.2),
    },
    chip:{
        marginRight: theme.spacing(1),
        width:'15%',
        background:'#ffb74d',
    },
    chip1:{
        marginRight: theme.spacing(1),
        width:'15%',
        background:'#9ccc65',
    }


}));

function objectToArray(data) {
    let item = [];
    for(let p in data ) {
        if(!!data[p]) {
            item.push([p,data[p]]);
        }
    }

    return item;
}

function Result1(props){
    const classes = useStyles();
    const esRt = objectToArray(props.esRt)? objectToArray(props.esRt) : [];
    return(
        <Paper className={classes.card} elevation={0}>
                { esRt.map((item,key)=>{
                    if ((props.page-1)*10<=key && key<props.page*10){
                        let item1=item[1];
                        return (
                            <CardContent>
                                <Grid  className={classes.card1} >
                                    <Chip label={item1['graph']} className={classes.chip}/>
                                    <Typography  variant="subtitle2" noWrap className={classes.paper}>
                                        {item1['value']}
                                    </Typography>
                                    <Chip label={item1['label']} className={classes.chip1}/>
                                </Grid>
                                <Divider variant="middle"/>
                            </CardContent>
                        );}
                    })
                }
        </Paper>
    );

}

export default Result1;
