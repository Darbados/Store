from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cart/', views.ShoppingCart.as_view(), name='cart'),
    re_path('^products/([0-9]+)$', views.category_products, name='products'),
    path('checkout/', views.checkout, name='checkout'),
    path('api/orders/', views.OrdersView.as_view(), name='orders_api')
]