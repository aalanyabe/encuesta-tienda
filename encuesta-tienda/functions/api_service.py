from dotenv import load_dotenv
import os
import requests
import json

load_dotenv("../.env.production")

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
BOARD_ID = os.getenv("BOARD_ID")
COLUMN_ID = os.getenv("COLUMN_ID")
COLUMN_ID2 = os.getenv("COLUMN_ID2")
def updateRating(score,item_id):

    url = "https://api.monday.com/v2?="
    payload = json.dumps({
        "query": f'''mutation {{change_multiple_column_values(item_id:{item_id}, board_id:{BOARD_ID},column_values: "{{\\"{COLUMN_ID}\\": {{\\"rating\\": {score}}}}}"){{id}}}}'''
    })
    headers = {
        'Authorization': ACCESS_TOKEN,
        'Content-Type': 'application/json',
        'API-version': '2023-10'
    }

    response = requests.request("POST",url,headers=headers,data=payload)
    print(response.text)
    return response

def updateComments(commnets, item_id):
    url = "https://api.monday.com/v2?="
    payload = json.dumps({
        "query": f'mutation {{change_multiple_column_values(item_id:{item_id}, board_id:{BOARD_ID}, column_values: "{{\\"{COLUMN_ID2}\\" : \\"{commnets}\\"}}"){{id}}}}'
    })


    headers = {
        'Authorization': ACCESS_TOKEN,
        'Content-Type': 'application/json',
        'API-version': '2023-10'
    }

    response = requests.request("POST",url,headers=headers,data=payload)
    print(response.text)
    return response

def handler(event, context):
    # leer el cuerpo de la solicitud (POST)
    body = json.loads(event['body'])
    
    # Obtener datos del cuerpo
    comments= body.get('comments')
    score = body.get('score')
    idTicket = body.get('idTicket')
    
    if score:
        rating_response = updateRating(score,idTicket)
        comments_response = updateComments(comments,idTicket)
        
    response = {
        
        "statusCode": 200,
        "body":json({
            "message": "Feedback updated successfully",
            "rating_response": rating_response if score else "No rating updated",
            "comments_response": comments_response if comments else "No comments updated"
        })
        
    }
    return response


