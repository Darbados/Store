from django.shortcuts import render
from django.http import HttpResponse
from .models import Category, Product


def index(request):
    template = 'store/index.html'
    categories = Category.objects.all()
    context = {
        'root_children': categories,
    }
    return render(request, template, context)


def shopping_cart(request):
    template = 'store/cart.html'

    return render(request, template)


def category_products(request, cat_id):
    template = 'store/category.html'
    cat_products = Product.objects.select_related('category').filter(category_id=cat_id)
    context = {'products': cat_products}

    return render(request, template, context)
