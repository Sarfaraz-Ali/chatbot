import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .model.generate import Generate

gen = Generate()

@csrf_exempt 
def run(req):
    data = json.loads(req.body.decode())
    question = data["message"]
    print(question)
    res = gen.response(question)
    """ return HttpResponse(res) """
    return JsonResponse({"answer": res})

""" if __name__=="__main__":
    run("hi") """