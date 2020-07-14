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
import Result1 from "./SearchResult1";
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';



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
        background: '#ffffff',
        overflowX:'hidden',
        overflowY:'auto',
    },
    backDrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#ffffff',      //#232526
    },
    appBar: {
        top: '87%',
        bottom: 0,
        background: '#ffffff',
        zIndex:'-1',
        position:'relative',
        marginTop: theme.spacing(6),

    },
    headerBox: {
        zIndex:'10',
        position:'fixed',
    },
    header: {
        top: 0,
        bottom: 'auto',
        background: '#ffffff',
        position:'fixed',
        zIndex:'-1',
    },
    headerComponent: {
        marginLeft: theme.spacing(16),
        marginTop: theme.spacing(-1.5),
        width:'39%',
        zIndex:'1',
        position:"fixed"
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
        //zIndex:'-1',
        position:'relative',
        marginTop: theme.spacing(13),
        width:'53%',  //
        marginBottom: theme.spacing(6),
    },
    searchResult1:{
        marginRight: theme.spacing(3),
        //zIndex:'-1',
        position:'relative',
        marginTop: theme.spacing(13),
        width:'35%',  //
        marginBottom: theme.spacing(6),
    },
    Pagination:{
        marginBottom: theme.spacing(-40),
    },

}));


function Page() {
    const [res,setRes] = React.useState({
        request:false
    });
    const [res1,setRes1] = React.useState({
        request:false
    });
    const classes = useStyles();
    let loc = window.location.href;
    let n1 = loc.length;
    let n2 = loc.indexOf('=');
    //console.log(n2)
    let q ='';
    if (n2!=-1){
        q = decodeURI(loc.substr(n2+1,n1-n2));
    }
    const data= require('./List');
    //console.log(q);


    fetch('http://127.0.0.1:8000/se/search', {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            "sequence": q,
        })
    }).then(res => res.text()).then(res => { strToJson(res).graphRt !== -1? setRes({pk:strToJson(res).graphRt.pk, pklabels:strToJson(res).graphRt.pklabels , property_dictTo:strToJson(res).graphRt.property_dictTo ,property_dictFrom:strToJson(res).graphRt.property_dictFrom, request: true }):setRes({request:false})
        ;strToJson(res).esRt !== -1?setRes1({esRt:strToJson(res).esRt, request: true }):setRes1({request:false})})
        .catch((error) => {
            alert("结果返回失败！");});



    function strToJson(str) {
        return JSON.parse(str);
    }

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };


    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <div className={classes.background}>
                    <div className={classes.headerBox} >
                        <AppBar className={classes.header} >
                            <Toolbar >
                                <Typography component="h3" variant="h8" color="primary" className={classes.headerTitle}>
                                    Korona19
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.headerComponent} >
                            <SearchBox data={data} q={q}/>
                        </div>
                    </div>

                    <Grid >
                        <Grid container spacing={3}>
                            <Grid item xs className={classes.searchResult}>
                                <Result q={res.pk} labels={res.pklabels} property_dictTo={res.property_dictTo} property_dictFrom={res.property_dictFrom}/>
                            </Grid>
                            <Grid item xs className={classes.searchResult1}>
                                <Result1 esRt={res1.esRt} page={page}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} justify="center" className={classes.Pagination}>
                            <Pagination count={3} page={page} onChange={handleChange} />
                        </Grid>
                    </Grid>


                    {res.request && res1.request ?
                        <Grid className={classes.Pagination}>
                            <Grid container spacing={3}>
                                <Grid item xs className={classes.searchResult}>
                                    <Result q={res.pk} labels={res.pklabels} property_dictTo={res.property_dictTo} property_dictFrom={res.property_dictFrom}/>
                                </Grid>
                                <Grid item xs className={classes.searchResult1}>
                                    <Result1 esRt={res1.esRt} page={page}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} justify="center" className={classes.Pagination}>
                                <Pagination count={3} page={page} onChange={handleChange} />
                            </Grid>
                        </Grid>
                        :<Grid/>}

                    {res.request && !res1.request?
                        <Grid className={classes.Pagination}>
                        <Grid container spacing={3}>
                            <Grid item xs className={classes.searchResult}>
                                <Result q={res.pk} labels={res.pklabels} property_dictTo={res.property_dictTo} property_dictFrom={res.property_dictFrom}/>
                            </Grid>
                        </Grid>
                        </Grid>
                        :<Grid/>}

                    {!res.request && res1.request?
                        <Grid className={classes.Pagination}>
                            <Grid container spacing={3} justify="center">
                                <Grid item xs={6} className={classes.searchResult1}>
                                    <Result1 esRt={res1.esRt} page={page}/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} justify="center" className={classes.Pagination}>
                                <Pagination count={3} page={page} onChange={handleChange} />
                            </Grid>
                        </Grid>
                        :<Grid/>}


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
