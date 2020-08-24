import React, { useState, useEffect } from 'react'
import './AddRate.css'
import TextField from '@material-ui/core/TextField';
import { db } from './../Firebase'
import firebase from 'firebase'
import Rating from '@material-ui/lab/Rating';
import { useStateValue } from '../StateProvider';


function AddRate({ id }) {
    var maxLength = 200
    const [comment, setComment] = useState('')
    const [score, setRate] = useState(10)
    const [largo, setLargo] = useState(0)
    const [rest, setRest] = useState(maxLength)
    const [color, setColor] = useState(null)

    const [error, setError] = useState(false)
    const [value, setValue] = useState(10);
    const [{ user }] = useStateValue();

    useEffect(() => {
        if (score >= 7) {
            setColor('#6c3')
        }
        else if ((score < 7) && (score >= 5)) {
            setColor('#fc3')

        }
        else {
            setColor('#f00')
        }
        return
    }, [score])

    useEffect(() => {
        if (score > 10) {
            setRate(10)
        }
        else if (score < 0) {
            setRate(0)
        }
        return
    }, [score])



    useEffect(() => {
        if (rest < 0) {
            setError(true)
        }
        else {
            setError(false)
        }
    }, [rest])



    const handleChangeInput = (e) => {
        setComment(e.target.value)
        setLargo(e.target.value.length)
        setRest(maxLength - e.target.value.length)
    }


    //Enviar comentario
    const sendRate = (e) => {
        e.preventDefault();
        if ((rest > 0) && (largo > 0) && (score !== "") && (score !== null)) {

            db.collection('Posts').doc(id).collection('Ratings').doc(user.uid).set(
                {
                    rate: score,
                    username: user.displayName,
                    comment: comment,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                }
            ).then(() => {
                setComment('')
                setRate(10)
                setValue(10)
                alert('Se envío correctamente')
            }

            )


        }
        else if ((rest > 0) && (largo <= 0)) {
            alert('Escribe algo')
        }
        else if ((score === '') || (score === null)) {
            alert('Coloca una calificación')
        }
        else {
            alert('Has sobrepasado el número de caracteres permitidos')
        }

    }
    console.log(score)
    return (
        <div className='chatInput'>
            <form>
                <div className='inputs'>
                    <div className='addrate_number' style={{ backgroundColor: color }}>
                        <h2>{score}</h2>
                    </div>

                    <div className='stars_rate'>
                        <Rating
                            name={`star_${id}`}
                            value={value}
                            max={10}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                setRate(newValue)
                            }}
                        />
                    </div>
                </div>
                <div className='addrate_comment'>

                    <TextField
                        error={error}
                        value={comment}
                        onChange={handleChangeInput}
                        id="standard-error-helper-text"
                        label="Deja tu mierda"
                        helperText={`${largo}/${maxLength} caracteres`}
                        style={{ width: '100%' }}
                        color='primary'
                        InputLabelProps={{
                            className: "test-label"
                        }}

                    />
                </div>
                <button type='submit' onClick={sendRate}>SEND</button>

            </form>
        </div>
    )
}

export default AddRate
