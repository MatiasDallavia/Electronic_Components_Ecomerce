from django.shortcuts import render
from django.http import JsonResponse
from purchases.paypal_functions import make_paypal_payment, confirm_order


def create_order(request):
    make_paypal_payment()
    return JsonResponse({"STATUS":"SUCCSESFUL"})

def capture_order(request, token):
    confirm_order(token)
    return JsonResponse({"STATUS":"SUCCSESFUL"})
