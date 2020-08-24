import React from 'react'
import { useHistory } from 'react-router-dom'
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, WhatsappIcon, TwitterIcon } from "react-share";
import Score from './Score';
import Comments from './Comments';



function Item({ id, name, date, description, rate_fotograma, url_photo, show_all = false }) {
    const history = useHistory()
    const urlpost = `localhost:3000/posts/${id}`
    const goPost = () => {
        history.push(`/posts/${id}`)
    }

    return (
        <div className='post'>
            <h2>{name}</h2>
            <Score score={rate_fotograma} />
            <span>{date}</span>
            <p>{description}</p>
            <div className='post_share'>
                <FacebookShareButton
                    className={'share-button-icon'} url={urlpost}>
                    <FacebookIcon size={25} round={true}></FacebookIcon>
                </FacebookShareButton>
                <WhatsappShareButton className={'share-button-icon'} url={urlpost}>
                    <WhatsappIcon size={25} round={true}></WhatsappIcon>
                </WhatsappShareButton>
                <TwitterShareButton className={'share-button-icon'} url={urlpost}>
                    <TwitterIcon size={25} round={true} />
                </TwitterShareButton>

            </div>
            <img src={url_photo} alt={name} onClick={goPost}></img>
            <Comments id={id} show_all={show_all} />

        </div>
    )
}

export default Item
