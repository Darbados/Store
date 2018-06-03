$(document).ready(function(){
    let initial_table_html = $(".table").html();
    cart_details(initial_table_html);

    $(".cart_quantity_up").on('click', function(e){
        e.preventDefault();
        let total_price = parseFloat($(this).closest('tr').data('t_price'));
        let single_price = parseFloat($(this).closest('tr').data('price'));
        let previous_quantity = parseInt($(this).closest('tr').find('.cart_quantity_input').val());
        $(this).closest('tr').data('t_price', (total_price+single_price).toFixed(2));

        $(this).closest('tr').find('.cart_quantity_input').val(previous_quantity+1);
        $(this).closest('tr').find('.cart_total').find('span:first').html($(this).closest('tr').data('t_price'));
    });

    $(".cart_quantity_down").on('click', function(e){
        e.preventDefault();
        let previous_quantity = parseInt($(this).closest('tr').find('.cart_quantity_input').val());

        if ((previous_quantity-1) >= 0 ){
            let total_price = parseFloat($(this).closest('tr').data('t_price'));
            let single_price = parseFloat($(this).closest('tr').data('price'));

            $(this).closest('tr').data('t_price', (total_price-single_price).toFixed(2));

            $(this).closest('tr').find('.cart_quantity_input').val(previous_quantity-1);
            $(this).closest('tr').find('.cart_total').find('span:first').html($(this).closest('tr').data('t_price'));
        } else {
            alert("Negative quantity is not allowed!")
        }
    });

    $(".cart_quantity_delete").on('click', function(e){
        e.preventDefault();
        $(this).closest('tr').hide();


        let row_id = $(this).closest('tr').attr('id');
        let all_orders = window.sessionStorage.getItem('Products').split('|NP|');
        let index = 0;

        for (let x=0; x<all_orders.length; x++){
            if (all_orders[x] !== ''){
                if (all_orders.indexOf(row_id) !== -1){
                    index = x
                }
            }
        }

        all_orders.splice(index, 1);
        window.sessionStorage.setItem('Products', all_orders.join('|NP|'));
    });

    $("#cart_submit").on('click', function (e) {
        let order_text = ``;
        $(".table").find('tr:visible').each(function (i,e) {
            if (parseInt($(e).find('.cart_quantity_input').val()) > 0){
                order_text += `${$(e).data('category')}-${$(e).find('td.cart_product').find('p').text()}-${parseFloat($(e).data('price'))}-${parseFloat($(e).data('t_price'))}-${parseInt($(e).find('.cart_quantity_input').val())}|NP|`
            }
        });
        console.log(order_text.split('|NP|'));
        $('input[name="order_text"]').val(order_text);
        window.sessionStorage.setItem("Products","");
        $("#order_data").find('input[type="submit"]').click()
    });
});


function cart_details(base){
     if (window.sessionStorage.hasOwnProperty('Products') && window.sessionStorage.getItem('Products').length > 0){
        let template;
        let all_products = window.sessionStorage.getItem('Products').split('|NP|');
        console.log(all_products)


        for (let x=0; x<all_products.length; x++){
            if (all_products[x] !== ''){
                let product_details = all_products[x].split('|');
                let product_name = product_details[3].split('=')[0].split('-')[1];
                let product_id = product_details[0].replace(':','');
                let product_price = product_details[2].split('-')[1];
                let total_price = parseFloat(product_details[3].split('=')[1]).toFixed(2);
                let category = product_details[product_details.length-2].split('-')[1];
                let product_description = product_details[product_details.length-1];
                let quantity = product_details[1].split('-')[1];


                template += `<tbody><tr id=${product_id} data-price=${product_price} data-t_price=${total_price} data-quantity=${quantity} data-category=${category}>
                                    <td class="cart_product"><p>${product_name}</p></td>
                                    <td class="cart_description"><h4>${product_description}</h4></td>
                                    <td class="cart_price"><span class="price">${product_price}</span><span class="currency">lv.</span></td>
                                    <td class="cart_quantity"><div class="cart_quantity_button"><a class="cart_quantity_up" href="#"> + </a>
                                    <input class="cart_quantity_input" type="text" name="quantity" value=${quantity} autocomplete="off" size="2"><a class="cart_quantity_down" href="#"> - </a></div></td>
                                    <td class="cart_total"><span class="cart_total_price">${total_price}</span><span class="currency">lv.</span></td>
                                    <td class="cart_delete"><a class="cart_quantity_delete" href="#"><i class="fa fa-times"></i></a></td></tr></tbody>`

            }
        }
        //console.log(template);
        $(".table").html(base + template)
     }
}