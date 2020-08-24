import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import { auth } from './../Firebase'
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

export default function Header() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [{ user, dark, }, dispatch] = useStateValue();
    //hay un usuario logeado o no


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        auth.signOut()
        handleClose()
    }


    const logIn = () => {
        dispatch({
            type: 'SET_MODAL',
            modal: true
        })
        handleClose()

    }

    const darkMode = () => {
        localStorage.setItem('darkLocal', !dark);
        dispatch({
            type: 'SET_DARK',
            dark: !dark,
        })


    }
    const history = useHistory()
    const goHome = () => {
        history.push(`/`)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <div className={classes.title} onClick={goHome} id='homelogo'>
                        <Typography variant="h6">
                            FxF
                    </Typography>
                    </div>





                    {user ? (
                        <div>
                            <IconButton onClick={darkMode}>
                                <Brightness7Icon fontSize='default'></Brightness7Icon>
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar className={classes.avatar} alt={user?.displayName} src={user?.photoURL} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                            <div>
                                <IconButton onClick={darkMode}>
                                    <Brightness7Icon fontSize='default'></Brightness7Icon>
                                </IconButton>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={logIn}>Iniciar Sesión</MenuItem>
                                </Menu>
                            </div>
                        )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
