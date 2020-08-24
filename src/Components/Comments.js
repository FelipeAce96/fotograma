import React, { useState, useEffect } from 'react'
import { db } from './../Firebase'
import Score from './Score'
import './Comments.css'
import Timestamp from 'react-timestamp'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function Comments({ id, show_all = false }) {
    const history = useHistory()
    const goPost = () => {
        history.push(`/posts/${id}`)
    }

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)



    //Get Scores and comments
    useEffect(() => {
        if (show_all) {
            db.collection('Posts').doc(id).collection('Ratings').orderBy('date', 'desc').onSnapshot(snapshot => {
                setData(snapshot.docs.map(doc =>
                    ({ id: doc.id, data: doc.data() })
                ))
                setLoading(false)
            })
        }
        else {
            db.collection('Posts').doc(id).collection('Ratings').orderBy('date', 'desc').limit(3).onSnapshot(snapshot => {
                setData(snapshot.docs.map(doc =>
                    ({ id: doc.id, data: doc.data() })
                ))
                setLoading(false)
            })
        }


        return
    }, [id, show_all])


    console.log(data)

    return (
        <div className='comments'>
            {data?.length > 0 ? [
                data.map((doc) => (
                    <div className='comment' key={doc.id}>
                        <Score score={doc.data?.rate}></Score>
                        <div className='comment_info'>
                            <div className='comment_user'>
                                <Typography variant="h6" className='comment_user_username' style={{ fontWeight: 600 }}>
                                    {doc.data?.username}
                                </Typography>
                                {doc.data.date && (
                                    <Timestamp className='comment_user_date' relative date={doc.data.date.toDate()} autoUpdate />
                                )}

                            </div>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {doc.data?.comment}
                            </Typography>
                        </div>
                    </div>
                )
                ),
                <div key={`buttoncomment${id}`} style={{ textAlign: 'center' }}>
                    {!show_all && (
                        <Button color="info" onClick={goPost}>ver más comentarios</Button>
                    )}
                </div>
            ] : (
                    <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'center' }}>
                        {loading ? (
                            <>Cargando...</>
                        ) : (
                                <>Todavia no hay comentarios</>
                            )}
                    </Typography>
                )}

        </div>
    )
}

export default Comments
