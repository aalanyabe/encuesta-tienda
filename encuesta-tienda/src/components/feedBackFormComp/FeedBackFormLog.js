import React from 'react'
import { useSearchParams } from "react-router-dom"
import Frame from '../stars/ratingStar'


const FeedBackFormLog = () => {


    const [searParams] = useSearchParams()
    const idTicket = searParams.get('idTicket')
    const boardId = searParams.get('idBoard')
    const column_idClasi = searParams.get('column_idClasi')
    const column_idComm = searParams.get('column_idComm')

   

    const handlerSubmit = async ({ rating, comments }) => {

        try {

            console.log("enviando respuesta")
            // const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE4MDk4NjgyNSwiYWFpIjoxMSwidWlkIjozMDQ2ODAyNywiaWFkIjoiMjAyMi0wOS0xNFQyMjoxODoxOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTE3MTIwMjYsInJnbiI6InVzZTEifQ.TU91f8lcu2mspQDy-BHlOuXzgZt3RQTuGMOp6GDh4N8'
            // let url = 'https://api.monday.com/v2'

            let url = process.env.REACT_APP_URL
            let access_token = process.env.REACT_APP_ACCESS_TOKEN
            
            console.log("url: ",url)
            // let board_id = '6632013315'
            // let column_id2 = 'texto_largo_mkkfmmk2'
            
            let query_clas = `mutation {change_multiple_column_values(item_id:${idTicket}, board_id:${boardId}, column_values: "{\\"${column_idClasi}\\" : {\\"rating\\" : ${rating}}}") {id}}`
            
            console.log("el query es: ", query_clas)

            let query_comments = `mutation {change_multiple_column_values(item_id:${idTicket}, board_id:${boardId}, column_values: "{\\"${column_idComm}\\" : \\"${comments}\\"}"){id}}`

     
            const response_score = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                    // 'API-Version': '2023-04'
                },
                body: JSON.stringify({"query":query_clas})
            });
            if (response_score.ok) {
                // Procesa el cuerpo de la respuesta como JSON
                const data = await response_score.json();
                console.log('Respuesta exitosa:', data);
                alert("Gracias por el score");
            } else {
                // Maneja el caso en el que la respuesta no sea exitosa
                console.error('Error en la solicitud:', response_score.status, response_score.statusText);
                alert(`Error al enviar el score: ${response_score.status}`);
            }

            const response_comments = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                    // 'API-Version': '2023-04'
                },
                body: JSON.stringify({"query":query_comments})
            });
            if (response_comments.ok) {
                // Procesa el cuerpo de la respuesta como JSON
                const data = await response_comments.json();
                console.log('Respuesta exitosa:', data);
                alert("Gracias por el comment");
            } else {
                // Maneja el caso en el que la respuesta no sea exitosa
                console.error('Error en la solicitud:', response_comments.status, response_comments.statusText);
                alert(`Error al enviar el comments: ${response_comments.status}`);
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


