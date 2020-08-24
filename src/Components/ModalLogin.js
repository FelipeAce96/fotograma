import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from './../Firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { useStateValue } from './../StateProvider';



//Styles from modal
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        width: '60%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'

    },
}));
function ModalLogin() {
    // Configure FirebaseUI. para el logeo
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will dis  play Google and Facebook as auth providers.

        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                return false;
            },
            signInFailure: function (error) {
                // Some unrecoverable error occurred during sign-in.
                // Return a promise when error handling is completed and FirebaseUI
                // will reset, clearing any UI. This commonly occurs for error code
                // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                // occurs. Check below for more details on this.
                return alert(error);
            }
        },
        signInOptions: [
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
    };
    //Variables para el modal
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    //Abrir modulo de login
    const [{ modal, user }, dispatch] = useStateValue()

    //Cuerpo del Modal de logearse
    const Logbody = (
        <div style={modalStyle} className={classes.paper}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>);
    //OnClose
    const onClose = () => {
        dispatch({
            type: 'SET_MODAL',
            modal: false
        })
    }

    //Función revisa si hay un cambio en user es decir si se incicia o cierra sesion
    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser)
                //logged in
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                });
                localStorage.setItem('userLocal', JSON.stringify(authUser))
                dispatch({
                    type: 'SET_MODAL',
                    modal: false
                })

            } else {
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })

        return () => {
            //performe a clean
            unsuscribe();
        }
    }, [user, dispatch])

    return (
        <Modal
            open={modal}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {Logbody}
        </Modal>
    )
}

export default ModalLogin
