import React, {Component} from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {createMuiTheme} from "@material-ui/core";
import SearchList from './SearchList';
import Alert from '@material-ui/lab/Alert';



const theme = createMuiTheme({
    palette: {
        primary: {
            light:'#232526',
            main: '#232526',
            dark: '#232526',
            contrastText: '#232526',
        },
        secondary: {
            light:'#25202D',
            main: '#25202D',
            dark: '#25202D',
            contrastText: '#25202D',
        },
    },
});


class SearchBox extends Component{
    constructor(props){
        super(props);
        this.state={
            val:this.props.q?this.props.q:'',
            arr:[],
            index:-1,
            alert:false
        }
    }

    handleChange = async (e)=>{
        this.setState({alert:false})
        this.setState({val:e.target.value});
        //let {s} = await jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+e.targe.value{param:"cb"});
        let value=e.target.value;
        let items=[];
        if(value){
            items =await SearchList(value,this.props.data);
        }
        console.log(typeof(value))
        this.setState({arr:items});
        this.refs.input.focus();
    }



    handleKeyUp=(e)=>{
        let keyCode = e.keyCode;
        if (keyCode === 38 || keyCode === 40) {
            if (keyCode === 38){
                this.setState({index:this.state.index-1})
                if (this.state.index<0){
                    this.setState({index:this.state.arr.length-1});
                }
                //根据上下键切换，则给表单时面赋不同的值
                e.target.value=this.state.arr[this.state.index+1];
                this.setState({val:e.target.value});
            } else {
                this.setState({index:this.state.index+1})
                if (this.state.index >= this.state.arr.length-1) {
                    this.setState({index:-1});
                }
                //根据上下键切换，则给表单时面赋不同的值
                e.target.value=this.state.arr[this.state.index+1];
                this.setState({val:e.target.value});
            }
        }
    }

    handleKeyDown=(e)=>{
        if (e.keyCode ===13){
            //https://www.baidu.com/s?wd=xxx  百度的查询接口
            //window.open('https://www.baidu.com/s?wd=' + this.state.val, '_blank');
            if(this.state.val == ""){
                this.setState({alert:true})}
            else{
                window.location.href='./search?q=' +encodeURI(this.state.val)}
            this.refs.input.focus();
        }
    }
    componentDidMount(){
        //生命周期，在组件加载完成后，让input聚焦 (focus)
        this.refs.input.focus();
    }
    handleMouseEnter=(key,item,event)=>{
        this.setState({index:key,val:item});
        this.refs.input.value = item;
    }
    handleClick=()=>{
        //window.open('./search?q=' +encodeURI(this.state.val), '_blank');
        if(this.state.val == ""){
            this.setState({alert:true})}
        else{
            window.location.href='./search?q=' +encodeURI(this.state.val)}
        this.refs.input.focus();
    }
    render(){
        const useStyles = {
            root: {
                padding: '2px 0px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
            },
            input: {
                marginLeft: theme.spacing(1),
                flex: 1,
            },
            iconButton: {
                padding: 10,
            },
            divider: {
                height: 28,
                margin: 0,
            },
            list:{
                color: 'rgba(0,0,0)',
                background:  theme.palette.background.paper,
            }
        };

        const classes = useStyles;



        return (
            <Paper >
                <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                    <Paper style={classes.root}>
                        <InputBase
                            ref='input'
                            style={classes.input}
                            defaultValue={this.props.q}
                            placeholder="输入问题/关键词"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            onKeyDown={this.handleKeyDown}
                        />
                        <IconButton type="submit" style={classes.iconButton} aria-label="search"  >
                            <SearchIcon  onClick={this.handleClick} />
                        </IconButton>
                        <Divider style={classes.divider} orientation="vertical" />
                    </Paper>
                </Box>
                <Divider />

                <Box className={classes.list}>
                    {this.state.arr.map((item,key)=>{
                        return (
                            <ListItem button onClick={this.handleClick} onMouseEnter={(event)=>this.handleMouseEnter(key,item,event)} selected={key===this.state.index ? true :false} key={key}>
                                <ListItemText primary={item} />
                            </ListItem>
                        );
                    })}
                </Box>
                {this.state.alert == true ?
                    <Alert severity="info">输入为空，请重新输入。</Alert>:
                    <div/>
                }

            </Paper>
        )
    }

}

export default SearchBox;
