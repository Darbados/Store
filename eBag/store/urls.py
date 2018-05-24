from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cart/', views.shopping_cart, name='cart'),
    re_path('^products/([0-9]+)$', views.category_products, name='products')
]