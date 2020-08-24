import React from 'react'
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Post from './Components/Post';
import Admin from './Components/Admin';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { useStateValue } from './StateProvider';

var primaryDark = '#f7b91e'
var primaryLight = '#f7b91e'



const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',

        primary: {
            main: primaryDark
        },
        secondary: {
            main: '#6c3'
        },
        info: {
            main: '#f2f2f2'
        }
    },
    typography: {
        fontFamily: [
            'Montserrat', 'sans-serif'
        ].join(','),
    },
});

const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: primaryLight
        },
        secondary: {
            main: '#6c3'
        },
        info: {
            main: '#f2f2f2'
        }
    },
    typography: {
        fontFamily: [
            'Montserrat', 'sans-serif'
        ].join(','),
    },
});





function Routes() {
    const [{ dark }] = useStateValue();
    const filter = () => {
        if (dark === null) {
            return true
        }
        else {
            return dark
        }
    }
    document.getElementsByTagName('meta')["theme-color"].content = dark ? primaryDark : primaryLight;


    return (
        <ThemeProvider theme={filter() ? darkTheme : lightTheme}>
            <Switch>
                <Route exact path='/' component={App}></Route>
                <Route path="/posts/:id" component={Post}></Route>
                <Route path="/admin" component={Admin}></Route>
            </Switch>
        </ThemeProvider>
    )
}

export default Routes
