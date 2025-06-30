import { useState, useEffect } from 'react'
import { FaRegStar } from "react-icons/fa"
import "../stars/style.css"
import frases from "../../data/frases.json"
import { useSearchParams } from 'react-router-dom'

import BeatLoader from 'react-spinners/BeatLoader'

const Frame = ({ nOfStar = 5, enviar }) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const initialScore = parseInt(searchParams.get("score")) || 0

    const [rating, setRating] = useState(initialScore)
    const [hover, setHover] = useState(initialScore)
    const [mensaje, setMensaje] = useState("ツ")
    const [comments, setComments] = useState("")
    const [isDiv1Visible, setIsDiv1Visible] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (initialScore > 0) {
            setMensaje(frases.mensaje[initialScore - 1])
        }
    }, [initialScore])

    useEffect(() => {
        setSearchParams({ ...Object.fromEntries(searchParams), score: rating })
    }, [rating, setSearchParams, searchParams])

    const handleClick = (getCurrentId) => {
        setRating(getCurrentId)
        setMensaje(frases.mensaje[getCurrentId - 1])
    }
    const handleMouseEnter = (getCurrentId) => {
        setHover(getCurrentId)
    }
    const handleMouseLeave = () => {
        setHover(rating)
    }

    let descriptionScore = frases.descriptionScore
    console.log(frases.mensaje[0])


    const toggleDivs = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await enviar({ rating, comments })
            setIsDiv1Visible(!isDiv1Visible)

        } catch (e) {
            console.log("error al enviar respuesta: ", e)
        } finally {
            setLoading(false)
        }

        enviar({ rating, comments })
        setIsDiv1Visible(!isDiv1Visible)
    };


    return (
        <div className='frame-global'>
            <div className="image-logo">
                <img
                    className="logo-transparente"
                    alt="Logo transparente"
                    src={"https://res.cloudinary.com/dswfd3z0p/image/upload/v1728070637/logo_transparente_ijvtns.png"}
                />
            </div>
            <div className='frame'>
                {isDiv1Visible ? (loading ? <BeatLoader
                    color="#ff00c8"
                    loading
                    margin={1}
                    size={15}
                /> : (

                    <div id='formulario' className='formulario'>
                        {/* <p>¿Cómo calificaría el apoyo que recibió?</p> */}
                        <div className='pregunta'><p className='pregunta-frase'>¿Cómo calificarías la atención recibida?</p></div>
                        <div className='frame-star'>
                            {
                                [...Array(nOfStar)].map((_, index) => {
                                    index += 1
                                    return (
                                        <div className='puntuacion' >
                                            <div>
                                                <FaRegStar
                                                    key={index}
                                                    className={
                                                        index <= (hover || rating) ? 'active' : 'inactive'
                                                    }
                                                    onClick={() => handleClick(index)}
                                                    onMouseOver={() => handleMouseEnter(index)}
                                                    onMouseLeave={() => handleMouseLeave(index)}
                                                />
                                            </div>
                                            <div>
                                                <label className='label'>{descriptionScore[index - 1]}</label>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                        <div className='div-mensaje' >
                            <h2 className='mensaje'>{mensaje}</h2>
                        </div>
                        <div className='box-comentario'>
                            <textarea className='input-comentario' value={comments} placeholder='La atención me pareció...' onChange={(e) => setComments(e.target.value)}></textarea>
                        </div>
                        <div>
                            <button onClick={toggleDivs} >Enviar</button>
                        </div>
                    </div>)) : null}

                {!isDiv1Visible ? (
                    <div id='gracias' className='gracias-div' >
                        <h2 className='gracias'>¡Gracias por calificarnos!</h2>
                        <img
                            className="icono-gracias-form"
                            alt="icono-gracias"
                            src={"https://res.cloudinary.com/dswfd3z0p/image/upload/v1732400983/hombre-saltando_axedlo.png"}
                        />
                    </div>
                ) : null}



            </div>

        </div>


    )
}

export default Frame
