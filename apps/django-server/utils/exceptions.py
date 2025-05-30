from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None and 'detail' in response.data:
        detail = response.data['detail']
        if not isinstance(detail, list):
            response.data['detail'] = [detail]

    return response
