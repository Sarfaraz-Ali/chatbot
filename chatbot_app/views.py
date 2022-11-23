import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.

def run(req):
    age = req.body.decode()
    age = json.loads(age)
    age["Age"] = int(age["Age"]) + 100
    print(age)
    # return "Hello Sarfaraz"
    # return HttpResponse("Hello Sarfaraz")
    return JsonResponse(age)