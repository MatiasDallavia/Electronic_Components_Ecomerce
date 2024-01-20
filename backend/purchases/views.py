from django.shortcuts import render
from django.http import JsonResponse


def create_order(request):
    return JsonResponse({"STATUS":"SUCCSESFUL"})