from django.db import models
from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):
    name = models.CharField(max_length=100, unique=True)
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)

    def __str__(self):
        return "{0}{1}".format(self.level, self.name)

    class MPTTMeta:
        order_insertion_by = ['name']


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    image = models.ImageField(upload_to='products/{0}'.format(), blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    description = models.TextField(default="")
    available = models.BooleanField(default=True)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return "{0} - {1}".format(self.name, self.description)

    def get_category(self):
        return self.category.name

