from celery import shared_task
from predictors.utils import edit_order
import httpx

@shared_task
def run_ml_prediction_cats(data, order):
    response = httpx.post(
        'http://predictor:8001/api/predictor/cats',
        json=data,
        timeout=20.0
    )

    if response.status_code != 200:
        return {
            "error": f"Failed with {response.status_code}",
            "body": response.text
        }
    
    result_json = response.json()
    edit_order(result_json, order)
        
    return {"status": "success"}