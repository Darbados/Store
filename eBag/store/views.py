from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    template = 'store/index.html'
    context = {'message': 'This is the home page!'}
    return render(request, template, context)
