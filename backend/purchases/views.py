from django.shortcuts import render
from django.http import JsonResponse
from purchases.paypal_functions import create_payment, confirm_order
from purchases.models import ProductPurchase


def create_order(request):
    href = create_payment()
    return JsonResponse({"STATUS":href})

def capture_order(request, token):
    is_approved, response = confirm_order(token)
    if is_approved:
        print("APPROVED")
        print(response)

    return JsonResponse({"STATUS":"SUCCSESFUL"})
