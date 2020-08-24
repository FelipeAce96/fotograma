import React from 'react'
import { useStateValue } from './../StateProvider';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';


function Spotify() {
    const [{ spotify_id }, dispatch] = useStateValue()
    var url = `https://open.spotify.com/embed-podcast/episode/${spotify_id}`
    const closeSpoty = () => {
        dispatch({
            type: 'SET_SPOTIFY',
            spotify: false
        })
    }
    return (
        <div className='spotifywidget'>
            <div className='spotifycontrols'>

                <IconButton color='inherit' size='small' onClick={closeSpoty}>
                    <CloseIcon />
                </IconButton>
            </div>
            <iframe src={url}

                width="100%"
                height="160"
                frameborder="0"
                allowtransparency="true"
                title='podcastwidget'
                allow="encrypted-media">

            </iframe>

        </div>


    )
}

export default Spotify
