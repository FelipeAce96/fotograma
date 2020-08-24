import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './Firebase'
import Timestamp from 'react-timestamp'
import ItemCard from './Components/ItemCard';
import Paper from '@material-ui/core/Paper';
import Header from './Components/Header'
import ModalLogin from './Components/ModalLogin';
import Spotify from './Components/Spotify';
import { useStateValue } from './StateProvider';
import CircularProgress from '@material-ui/core/CircularProgress';




function App() {
  const [data, setData] = useState([])
  const [{ spotify, phone }] = useStateValue()
  const [loading, setLoading] = useState(true)

  //Get Data
  useEffect(() => {
    db.collection('Posts').orderBy('date', 'desc').limit(1000).onSnapshot(snapshot => {
      setData(snapshot.docs.map(doc =>
        ({ id: doc.id, data: doc.data() })
      ));
      setLoading(false)
    })
    return
  }, [])


  return [

    <Header key={'header'}></Header>,
    <ModalLogin key={'modallogin'} />,
    <Paper square={true} key={'paperapp'} className='app' elevation={0}>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
          <>
            {spotify && (<Spotify />)}
            {phone ? (<>
              {data && (
                data.map((post) => (
                  <ItemCard
                    id={post.id}
                    name={post.data.name}
                    description={post.data.description}
                    date={<Timestamp relative date={post.data.date.toDate()} />}
                    url_photo={post.data.url_photo}
                    rate_fotograma={post.data.rate_fotograma}
                    key={post.id}
                    average_rate={post.data.avgRating}
                    podcast_id={post.data.spotify_id}

                  />
                ))
              )}


            </>) : (
                <div>desktop</div>
              )}
          </>
        )}



    </Paper>

  ];
}

export default App;



