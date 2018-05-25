from django.db import models
from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):
    name = models.CharField(max_length=100, unique=True)
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)

    def __str__(self):
        return "{0}".format(self.name)

    class MPTTMeta:
        order_insertion_by = ['name']


class Product(models.Model):

    weight_units = (
        ('Kilogram', 'kg'),
        ('Pound', 'pd'),
        ('Gram', 'g'),
        ('Liter', 'l')
    )

    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    brand = models.CharField(max_length=100, default="")
    image = models.ImageField(upload_to='store/static/store/products/%Y_%m_%d', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    description = models.TextField(default="")
    available = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField()
    unit = models.CharField(max_length=10, default="", choices=weight_units)

    def __str__(self):
        return self.name


class Order(models.Model):
    category = models.CharField(max_length=100, default="")
    product = models.CharField(max_length=200, default="")
    single_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    order_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    quantity = models.DecimalField(max_digits=10, decimal_places=3, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{0} - {1} - {2} - {3} - {4}".format(self.category, self.product, self.single_price, self.order_price, self.quantity, self.created_at)

