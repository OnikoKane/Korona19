import React, {Component} from 'react';
import Copyright from './Copyright';
import './App.css';
import SearchBox from './SearchBox';
import SwitchStyles from './Switch';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";


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
        background: 'rgba(0,0,0,0.0)',
        overflowX:'hidden',
        overflowY:'hidden',
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
        top: 'auto',
        bottom: 0,
        background: 'rgba(0,0,0,0.0)',
        zIndex:'-1'
    },
    SearchBox:{
        zIndex:'100'
    },


}));


function App() {
    const [state, setState] = React.useState({
        isToggled: false,
    });
    const classes = useStyles();
    function handleToggled (toggled) {
        setState({isToggled:toggled});
    };
    const data= require('./List');

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <div className={state.isToggled? classes.backgroundColor:classes.background} >

                    <Box display="flex" justifyContent="flex-end" >
                        <SwitchStyles toggled={state.isToggled} isToggled={handleToggled}/>
                    </Box>

                    <Container component="main" maxWidth="xs">
                        <Box display="flex" justifyContent="center" alignItems="center" mt={15}>
                            <Typography component="h3" variant="h4" color="primary">
                                Korona19
                            </Typography>
                        </Box>

                        <SearchBox className={classes.SearchBox} data={data}/>

                        <AppBar className={classes.appBar}>
                        <Box display="flex" justifyContent="center" alignItems="flex-end" mt={2} mb={3}>
                            <Copyright />
                        </Box>
                        </AppBar>

                    </Container>

                </div>
            </ThemeProvider>
        </React.Fragment>
    );
}


export default App;
