from celery import shared_task
from predictors.utils import add_plan
import httpx

@shared_task
def run_ml_prediction(data, order):
    response = httpx.post(
        'http://predictor:8001/api/predictor/plan',
        json=data,
        timeout=20.0
    )

    if response.status_code != 200:
        return {
            "error": f"Failed with {response.status_code}",
            "body": response.text
        }
    
    result_json = response.json()
    add_plan(result_json, order)
        
    return {"status": "success"}