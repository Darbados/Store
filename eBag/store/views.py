from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.views import View
from rest_framework.views import APIView
from .models import Category, Product, Order
from .serializers import OrderSerializer
from .forms import OrderForm

def index(request):
    template = 'store/index.html'
    categories = Category.objects.all()
    all_products = Product.objects.all()
    split_products = []
    start_position = 0
    iterator = 3
    number_of_sets = len(all_products) // 3

    print("All products = {}".format(len(all_products)))
    print("Number of sets = {}".format(number_of_sets))

    while number_of_sets > 0:
        split_products.append([p for p in all_products[start_position:iterator]])
        number_of_sets -= 1
        start_position += 3
        iterator += 3

    if number_of_sets*len(split_products) < len(all_products):
        split_products.append([p for p in all_products[start_position:]])

    print(split_products)

    context = {
        'root_children': categories,
        'active_products': split_products[0],
        'not_active': split_products[1:]
    }
    return render(request, template, context)


class ShoppingCart(View):

    def get(self, request):
        template = 'store/cart.html'

        return render(request, template)

    def post(self, request):
        order_text = request.POST['order_text']
        order = Order.objects.create(order_text=order_text)
        order.save()

        return HttpResponseRedirect(reverse('store:checkout'))


def category_products(request, cat_id):
    template = 'store/category.html'
    cat_products = Product.objects.select_related('category').filter(category_id=cat_id)
    context = {'products': cat_products}

    return render(request, template, context)


def checkout(request):
    template = 'store/checkout.html'
    last_order = Order.objects.all().order_by('created_at')[0]
    context = {'last_order': last_order}

    return render(request, template, context)

class OrdersView(APIView):

    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)

        return JsonResponse(serializer.data, safe=False)