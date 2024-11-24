from rest_framework.exceptions import APIException

class ServiceUnavailable(APIException):
    status_code = 503
    default_detail = "Service temporarily unavailable, try again later."
    default_code = "service_unavailable"


class NotAuthorized(APIException):
    status_code = 401
    default_detail = "Not Authorized"
    default_code = "not_authorized"


class BadRequest(APIException):
    status_code = 400
    default_detail = "Parameters not valid"
    default_code = "parameters_error"
