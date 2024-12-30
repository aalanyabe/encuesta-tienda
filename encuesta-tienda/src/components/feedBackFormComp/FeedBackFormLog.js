import React from 'react'
import { useSearchParams } from "react-router-dom"
import Frame from '../stars/ratingStar'


const FeedBackFormLog = () => {

    const [searParams] = useSearchParams()
    const idTicket = searParams.get('idTicket')

    const handlerSubmit = async ({rating,comments}) => {
        try {
            // e.preventDefault()
            const response = await fetch('http://127.0.0.1:8080/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    comments: comments || "Sin comentarios", idTicket: idTicket, score: rating
                })
            })
            if (response.ok) {
                alert("gracias por tu feed")
            }

        } catch (err) {
            console.log('Error al enviar feedback:', err)

        }


    }

    return (
        <div>
            <Frame enviar={handlerSubmit}></Frame>
        </div>
    )

}

export default FeedBackFormLog
