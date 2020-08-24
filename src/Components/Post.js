import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from './../Firebase'
import ItemCard from './ItemCard';
import Timestamp from 'react-timestamp'
import { Paper } from '@material-ui/core';
import Header from './Header';
import ModalLogin from './ModalLogin';
import { useStateValue } from './../StateProvider';
import Spotify from './Spotify';
import CircularProgress from '@material-ui/core/CircularProgress';


function Post() {
    const { id } = useParams()
    const [dataPost, setDataPost] = useState(null)
    const [{ spotify, phone }] = useStateValue()
    const [loading, setLoading] = useState(true)
    //Get Data
    useEffect(() => {
        db.collection('Posts').doc(id).get().then(function (doc) {
            if (doc.exists) {
                setDataPost({ id: id, data: doc.data() })
                setLoading(false)

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        return
    }, [id])


    useEffect(() => {
        document.title = dataPost?.data.name
    }, [dataPost])

    return [
        <Header key={'header'}></Header>,
        <ModalLogin key={'modallogin'} />,
        <Paper square={true} key={'paperapp'} className='app' elevation={0}>
            {loading ? (<CircularProgress color="primary" />) :
                (<>
                    {spotify && (<Spotify />)}
                    {phone ? (<>

                        {dataPost &&
                            <ItemCard
                                id={dataPost.id}
                                name={dataPost.data.name}
                                description={dataPost.data.description}
                                date={<Timestamp relative date={dataPost.data.date.toDate()} />}
                                url_photo={dataPost.data.url_photo}
                                rate_fotograma={dataPost.data.rate_fotograma}
                                average_rate={dataPost.data.avgRating}
                                show_all={true}
                                expand={true}
                                podcast_id={dataPost.data.spotify_id}

                            />
                        }
                    </>) : (
                            <div>Trabajando en desktop</div>
                        )}

                </>)}



        </Paper>

    ]
}

export default Post
