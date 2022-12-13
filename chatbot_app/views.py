import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

import model.generate

@csrf_exempt 
def run(req):
    # data = json.loads(req.body.decode())
    # question = data["question"]
    # print(question)
    # return HttpResponse(question)
    print(req)
    model.generate.say_hello()
    generate = model.generate.Generate()
    generate.response(req)
    return True

if __name__=="__main__":
    run("hi")