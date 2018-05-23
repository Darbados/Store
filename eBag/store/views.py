from django.shortcuts import render
from django.http import HttpResponse
from .models import Category, Product


def index(request):
    template = 'store/index.html'
    categories = Category.objects.filter(tree_id=1)
    context = {
        'main_categories': categories,
    }
    return render(request, template, context)
