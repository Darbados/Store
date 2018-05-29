from django import forms


class OrderForm(forms.Form):
    order_text = forms.Textarea()