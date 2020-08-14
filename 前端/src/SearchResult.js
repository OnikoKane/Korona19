import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import {Box} from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';


const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
    card:{
        background: 'rgba(255,255,255)',
        //display: 'flex',
        flexWrap: 'wrap',
        alignSelf:"stretch",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper:{
        background: 'rgba(255,255,255)',
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),},
        width: '47%',
        maxWidth:'100%',
    },
    Typography:{
        marginTop:theme.spacing(1.2),
    },
    chip:{
        background:'#ffeb3b',
        maxWidth:'97.5%',
        width: '47%',
    },
    paper1: {
        background: 'rgba(255,255,255)',
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),},
        width: '80%',
    },

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
        <Paper>
            <ListItem  component="nav">
                <Typography component="div">
                    <Typography variant="h6" gutterBottom>
                        {props.q}
                    </Typography>
                    <Typography variant="body2" gutterBottom color="textSecondary">
                        实体
                    </Typography>
                </Typography>
            </ListItem >
            <Divider variant="middle" />
            <ListItem >
                <Typography gutterBottom variant="subtitle2">
                    标签
                </Typography>
            </ListItem>
            <ListItem component="p" className={classes.card} >
                <Typography variant="body2" color="textSecondary" component="p" className={classes.card} >
                    {labels.map((item,key)=>{
                        return (
                            <Chip label={item} className={classes.chip}/>
                        );
                    })}
                </Typography>
            </ListItem >
            <Divider variant="middle" />
            <ListItem >
                <Typography component="div">
                <Typography  variant="subtitle2" >
                    属性
                </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.card} >
                    {propertys.map((item,key)=>{
                        return (
                            <Card className={classes.paper}>
                                <Typography  variant="subtitle2" width={'20%'}>
                                    {item[0]}：
                                </Typography>
                                <Box className={classes.paper1}>
                                {item[1].map((item1,key1)=>{
                                    return (
                                        <LightTooltip title={item1[1]} placement="top">
                                            <Chip label={item1[1]} className={classes.chip} />
                                        </LightTooltip>
                                    );
                                })}
                                </Box>
                            </Card>
                        );
                    })}
                    </Typography>
                </Typography>
            </ListItem >
            <Divider variant="middle" />
                <ListItem>
                    <Typography component="div">
                    <Typography variant="subtitle2">
                        相关信息
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.card} >
                    {relationships.map((item,key)=>{
                        return (
                            <Card  className={classes.paper} >
                                <Typography  variant="subtitle2" width={'20%'}>
                                    {item[0]}：
                                </Typography>
                                {item[1].map((item1,key1)=>{
                                    return (
                                        <LightTooltip title={item1[1]} placement="top">
                                            <Chip label={item1[1]} className={classes.chip} />
                                        </LightTooltip>
                                    );
                                })}
                            </Card>
                        );
                    })}
                    </Typography>
                    </Typography>
                </ListItem>
                <Divider variant="middle" />

        </Paper>
    );

}

export default Result;
