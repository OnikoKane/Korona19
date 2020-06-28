import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SearchBox from "./SearchBox";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {createMuiTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Copyright from './Copyright';
import Result from "./SearchResult";
import Toolbar from '@material-ui/core/Toolbar';


const theme = createMuiTheme({
    palette: {
        primary: {
            light:'#ffffff',
            main: '#ffffff',
            dark: '#ffffff',
            contrastText: '#ffffff',
        },
        secondary: {
            light:'#25202D',
            main: '#25202D',
            dark: '#25202D',
            contrastText: '#25202D',
        },
    },
});

const coverChat =
    'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';


const useStyles = makeStyles((theme) => ({
    backgroundColor:{
        width: '100%',
        textAlign: 'left',
        height: '100%',
        position: 'fixed',
        background: `url(${coverChat})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        //backgroundColor: 'rgba(0,0,0,0.10)',
        overflowX:'hidden',
        overflowY:'hidden',
    },
    background:{
        width: '100%',
        textAlign: 'left',
        height: '100%',
        position: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: '#232526',
        overflowX:'hidden',
        overflowY:'auto',
    },
    backDrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',      //#232526
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        background: 'rgba(0,0,0,0.0)',
        zIndex:'-1',
        position:'fixed'
    },
    headerBox: {
        zIndex:'1000',
        position:'fixed',
    },
    header: {
        top: 0,
        bottom: 'auto',
        background: '#232526',
        position:'fixed',
        zIndex:'-1',
    },
    headerComponent: {
        marginLeft: theme.spacing(16),
        marginTop: theme.spacing(-1.5),
        width:'120%',
        zIndex:'1'
        //position:"absolute"
    },
    headerTitle: {
        marginLeft: theme.spacing(0.5),
        marginTop: theme.spacing(2.5),
        marginBottom: theme.spacing(3),
        width:'10%',
        //position:"absolute"
    },
    searchResult:{
        marginLeft: theme.spacing(3),
        zIndex:'-1',
        position:'relative',
        marginTop: theme.spacing(10),
        width:'53%',
    },

}));


function Page() {
    const [state, setState] = React.useState({
        isToggled: true,
    });
    const [res,setRes] = React.useState({
        labels: [],
        propertys:[],
        relationships:[],
    });
    const classes = useStyles();
    function handleToggled (toggled) {
        setState({isToggled:toggled});
    };
    let loc = window.location.href;
    let n1 = loc.length;
    let n2 = loc.indexOf('=');
    //console.log(n2)
    let q ='';
    if (n2!=-1){
        q = decodeURI(loc.substr(n2+1,n1-n2));
    }
    //console.log(q);


    fetch('', {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            "entity": q,
        })
    }).then(res => res.text()).then(res => {setRes({value:strToJson(res).value ,label:strToJson(res).label , graph:strToJson(res).graph })})
        .catch((error) => {
            alert("结果返回失败！");
        });

    function strToJson(str) {
        return JSON.parse(str);
    }


    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <div className={classes.background}>
                    <div className={classes.headerBox}>
                        <AppBar className={classes.header}>
                            <Toolbar >
                                <Typography component="h3" variant="h8" color="primary" className={classes.headerTitle}>
                                    Korona19
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <div className={classes.headerComponent} >
                            <SearchBox value={q} />
                        </div>
                    </div>
                    <div className={classes.searchResult}>
                        <Result q={q} labels={res.labels} relationships={res.relationships} propertys={res.propertys}/>
                    </div>

                    <AppBar className={classes.appBar}>
                        <Box display="flex" justifyContent="center" alignItems="flex-end" mt={2} mb={3}>
                            <Copyright/>
                        </Box>
                    </AppBar>

                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}


export default Page;
