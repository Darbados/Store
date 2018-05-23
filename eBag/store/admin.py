from django.contrib import admin
from django_mptt_admin.admin import DjangoMpttAdmin
from .models import Category, Product


class CategoryAdmin(DjangoMpttAdmin):
    tree_auto_open = 0
    list_display = ('name', )
    ordering = ('name', )

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser


class ProductAdmin(admin.ModelAdmin):

    class Meta:
        model = Product
        fields = ('category', 'name', 'description', 'image', 'price')


admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
