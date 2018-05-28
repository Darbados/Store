$(document).ready(function(){

    let initial_table_html = $(".table").html()
    cart_details(initial_table_html)

    $(".cart_quantity_up").on('click', function(e){
        e.preventDefault()
        $(this).closest('tr').find('.cart_quantity_input').val(parseInt($(this).closest('tr').find('.cart_quantity_input').val())+1)
        $(this).closest('tr').data('t_price', parseFloat(($(this).closest('tr').data('t_price')+$(this).closest('tr').data('price')).toFixed(2)))
        $(this).closest('tr').find('.cart_total').find('p').html($(this).closest('tr').data('t_price') + 'lv.')
    })

    $(".cart_quantity_down").on('click', function(e){
        e.preventDefault()

        if (($(this).closest('tr').find('.cart_quantity_input').val()-1) >= 0 ){
            $(this).closest('tr').find('.cart_quantity_input').val(parseInt($(this).closest('tr').find('.cart_quantity_input').val())-1)
            $(this).closest('tr').data('t_price', parseFloat(($(this).closest('tr').data('t_price')-$(this).closest('tr').data('price')).toFixed(2)))
            $(this).closest('tr').find('.cart_total').find('p').html($(this).closest('tr').data('t_price'))

            $(this).closest('tr').find('.cart_total').find('p').html($(this).closest('tr').data('t_price') + 'lv.')
        } else {
            alert("Negative quantity is not allowed!")
        }
    })

    $(".cart_quantity_delete").on('click', function(e){
        e.preventDefault()

        let row_id = $(this).closest('tr').attr('id')
        let all_orders = window.sessionStorage.getItem('Products').split(',')
        let index = 0

        for (let x=0; x<all_orders.length; x++){
            if (all_orders[x] != ''){
                if (all_orders.indexOf(row_id) != -1){
                    index = x
                }
            }
        }

        all_orders.splice(index, 1)
        window.sessionStorage.setItem('Products', all_orders.join(','))
        cart_details(initial_table_html)
    })
});


function cart_details(base){
     if (window.sessionStorage.hasOwnProperty('Products') && window.sessionStorage.getItem('Products').length > 0){
        let template;
        all_products = window.sessionStorage.getItem('Products').split(',')

        for (let x=0; x<all_products.length; x++){
            if (all_products[x] != ''){
                product_details = all_products[x].split('|')
                product_id = product_details[0].replace(':','')
                product_price = product_details[2].split('-')[1]
                total_price = product_details[3].split('=')[1]
                product_description = product_details[product_details.length-1].replace('?', ', ')
                quantity = product_details[1].split('-')[1]

                template += `<tbody><tr id=${product_id} data-price=${product_price} data-t_price=${total_price} data-quantity=${quantity}>
                                    <td class="cart_product"><a href=""><img src="{% static 'storeimages/cart/one.png' %}" alt=""></a></td>
                                    <td class="cart_description"><h4>${product_description}</h4><p>Web ID: 1089772</p></td>
                                    <td class="cart_price"><p>${product_price}lv.</p></td>
                                    <td class="cart_quantity"><div class="cart_quantity_button"><a class="cart_quantity_up" href="#"> + </a>
                                    <input class="cart_quantity_input" type="text" name="quantity" value=${quantity} autocomplete="off" size="2"><a class="cart_quantity_down" href="#"> - </a></div></td>
                                    <td class="cart_total"><p class="cart_total_price">${total_price}lv.</p></td>
                                    <td class="cart_delete"><a class="cart_quantity_delete" href="#"><i class="fa fa-times"></i></a></td></tr></tbody>`

            }
        }
        console.log(template)
        $(".table").html(base + template)
     }
}