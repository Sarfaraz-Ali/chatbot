from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.

def play(req):
    print("Hello Sarfaraz")
    return HttpResponse("<div>Hi</div>")