import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    card:{
        background: 'rgba(255,255,255)',
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    paper:{
        background: 'rgba(255,255,255)',
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),},
        width:'46%',
        marginRight: theme.spacing(1.5),
    },
    Typography:{
        marginTop:theme.spacing(1.2),
    },
    chip:{
        marginRight: theme.spacing(1),
        width:'80%',
        background:'#ffeb3b',

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

function Result(props){
    const classes = useStyles();
    const labels = props.labels? props.labels : [];
    const propertys =  objectToArray(props.property_dictTo) ?  objectToArray(props.property_dictTo) : [];
    const relationships = objectToArray(props.property_dictFrom)? objectToArray(props.property_dictFrom) : [];
    return(
        <Card className={classes.card} variant="outlined">
            <CardActionArea>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {props.q}
                    </Typography>
                    <Typography variant="body2" gutterBottom color="textSecondary">
                        实体
                    </Typography>
                </CardContent>
                <Divider variant="middle"/>
                <CardContent>
                    <Typography gutterBottom variant="subtitle2">
                        标签
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.card} >
                        {labels.map((item,key)=>{
                            return (
                                <Chip label={item} component="a" href="#chip" clickable />
                            );
                        })}
                    </Typography>
                </CardContent>
                <Divider variant="middle"/>
                <CardContent>
                    <Typography gutterBottom variant="subtitle2">
                        属性
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.card} >

                        {propertys.map((item,key)=>{
                            return (
                                <Paper className={classes.paper} >
                                    <Typography  variant="subtitle2">
                                        {item[0]}：
                                    </Typography>
                                    {item[1].map((item1,key1)=>{
                                        return (
                                            <Chip label={item1[1]} component="a" href="#chip" clickable className={classes.chip}/>
                                        );
                                    })}
                                </Paper>
                            );
                        })}
                    </Typography>
                </CardContent>
                <Divider variant="middle"/>
                <CardContent>
                    <Typography gutterBottom variant="subtitle2">
                        相关信息
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.card} >
                    {relationships.map((item,key)=>{
                        return (
                            <Paper  className={classes.paper} >
                                <Typography  variant="subtitle2">
                                    {item[0]}：
                                </Typography>
                                {item[1].map((item1,key1)=>{
                                    return (
                                        <Chip label={item1[1]} component="a" href="#chip" clickable className={classes.chip}/>
                                    );
                                })}
                            </Paper>
                        );
                    })}
                    </Typography>
                </CardContent>
                <Divider variant="middle"/>

            </CardActionArea>
        </Card>
    );

}

export default Result;


