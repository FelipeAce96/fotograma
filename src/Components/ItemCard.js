import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import Score from './Score';
import Comments from './Comments';
import './ItemCard.css'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import AddRate from './AddRate'
import { useStateValue } from './../StateProvider';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link';




const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        marginBottom: '20px',
    },
    media: {
        height: 0,
        paddingTop: '75%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function ItemCard({ id, name, date, podcast_id, description, rate_fotograma, average_rate, url_photo, show_all = false, expand = false }) {
    console.log('podcastiddd', podcast_id)
    const urlpost = `https://fotogramaxfotograma-24cab.web.app/posts/${id}`
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(expand);
    const [{ user }, dispatch] = useStateValue();
    const history = useHistory()
    const goPost = () => {
        history.push(`/posts/${id}`)
    }

    //Open Spotify
    const openSpotyfy = () => {
        dispatch({
            type: 'SET_SPOTIFY',
            spotify: true
        });
        dispatch({
            type: 'SET_SPOTIFY_ID',
            spotify_id: podcast_id
        })
    }
    //Handle expand comments
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const logIn = () => {

        dispatch({
            type: 'SET_MODAL',
            modal: true
        })

    }


    return (
        <Card className={classes.root} elevation={4}>
            <div className='card_item_header'>

                <Typography variant="h4" component='h4' style={{ paddingRight: '5px', fontWeight: 700 }}>
                    {name}
                </Typography>
                <div className="scores">
                    <div style={{ marginRight: '5px' }}><Score score={rate_fotograma}></Score></div>
                    <div><Score score={average_rate} usuarios></Score></div>


                </div>

            </div>
            <div className='card_item_image' onClick={goPost}>
                <CardMedia
                    component="img"
                    alt={name}
                    image={url_photo}
                    title={name}
                />
            </div>

            <CardContent>
                <Typography variant="body2" color="textSecondary" align='left' component="p">
                    {description}
                </Typography>
                <Link color='primary' style={{ fontWeight: 600 }} onClick={openSpotyfy}>Escucha nuestro podcast aquí</Link>
                {/*Add rating */}
                {user ? (
                    <div className='btn_login'>
                        <AddRate id={id} key={id} />
                    </div>

                ) : (
                        <div className='btn_login'>
                            <Button variant="contained" color="secondary" onClick={logIn} style={{ borderRadius: '50px' }}>
                                <span style={{ color: '#fff', fontWeight: '600' }}>Inicia sesión para calificar</span>
                            </Button>

                        </div>

                    )}


            </CardContent>





            <CardActions disableSpacing>

                <FacebookShareButton className={'share-button-icon'} url={urlpost}>
                    <IconButton aria-label="share facebook">
                        <FacebookIcon />
                    </IconButton>
                </FacebookShareButton>


                <WhatsappShareButton className={'share-button-icon'} url={urlpost}>
                    <IconButton aria-label="share whatsapp">
                        <WhatsAppIcon />
                    </IconButton>
                </WhatsappShareButton>


                <TwitterShareButton className={'share-button-icon'} url={urlpost}>
                    <IconButton aria-label="share twitter">
                        <TwitterIcon />
                    </IconButton>
                </TwitterShareButton>


                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Comments id={id} show_all={show_all} />
                </CardContent>
            </Collapse>
        </Card>
    );
}