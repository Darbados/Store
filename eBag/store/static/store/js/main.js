$(document).ready(function(){

    if (!window.sessionStorage.hasOwnProperty('Products')){
        window.sessionStorage.setItem('Products', "")
    }

	$(function () {
		$.scrollUp({
	        scrollName: 'scrollUp', // Element ID
	        scrollDistance: 300, // Distance from top/bottom before showing element (px)
	        scrollFrom: 'top', // 'top' or 'bottom'
	        scrollSpeed: 300, // Speed back to top (ms)
	        easingType: 'linear', // Scroll to top easing (see http://easings.net/)
	        animation: 'fade', // Fade, slide, none
	        animationSpeed: 200, // Animation in speed (ms)
	        scrollTrigger: false, // Set a custom triggering element. Can be an HTML string or jQuery object
					//scrollTarget: false, // Set a custom target element for scrolling to the top
	        scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
	        scrollTitle: false, // Set a custom <a> title if required.
	        scrollImg: false, // Set true to use image
	        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	        zIndex: 2147483647 // Z-Index for the overlay
		});
	});

	$('a.add-to-cart').on('click', function(e){
	    e.preventDefault();
        if ($(this).closest('div').find('.quantity').val() > 0){
            let product = $(this).data('product');
            let price = parseFloat($(this).data('price'));
            let quantity = parseFloat($(this).closest('.productinfo').find('.quantity').val());
            let description = $(this).data('description');
            let category = $(this).data('category');

            if (window.sessionStorage.getItem('Products').length !== 0){
                let curr_order = window.sessionStorage.getItem('Products').split('|NP|').length++;
                let order = "Product" + curr_order + ":|Q-" + quantity + "|SP-" + price + "|Pr-" + product + "=" + (price*quantity) + "|CAT-" + category + "|Desc-" + description;
                let orders_array = window.sessionStorage.getItem('Products');

                console.log("Product", order);

                orders_array = orders_array + '|NP|' + order;
                window.sessionStorage.setItem('Products', orders_array);
            } else {
                let order = "Product1" + ":|Q-" + quantity + "|SP-" + price + "|Pr-" + product + "=" + (price*quantity) + "|CAT-" + category + "|Desc-" + description;
                let orders_array = window.sessionStorage.getItem('Products');
                orders_array = orders_array + order + '|NP|';

                console.log("Product", order);

                window.sessionStorage.setItem('Products', orders_array)
            }
        } else {
            alert("You can't add 0 items to your bag.")
        }
	});

    $('button.cart').on('click', function(){
        if ($(this).closest('div').find('.quantity').val() > 0){
            let product = $(this).data('product');
            let price = parseFloat($(this).data('price'));
            let quantity = parseFloat($(this).closest('div').find('.quantity').val());
            let description = $(this).data('description');
            let category = $(this).data('category');

            if (window.sessionStorage.getItem('Products').length !== 0){
                let curr_order = window.sessionStorage.getItem('Products').split('|NP|').length++;
                let order = "Product" + curr_order + ":|Q-" + quantity + "|SP-" + price + "|Pr-" + product + "=" + (price*quantity) + "|CAT-" + category + "|Desc-" + description;
                let orders_array = window.sessionStorage.getItem('Products');

                console.log("Product", order);

                if (orders_array.indexOf(order) === -1 ){
                    orders_array = orders_array + '|NP|' + order;
                    window.sessionStorage.setItem('Products', orders_array);
                }

            } else {
                let order = "Product1" + ":|Q-" + quantity + "|SP-" + price + "|Pr-" + product + "=" + (price*quantity) + "|CAT-" + category + "|Desc-" + description;
                let orders_array = window.sessionStorage.getItem('Products');
                orders_array = orders_array + order + '|NP|';

                console.log("Product", order);

                window.sessionStorage.setItem('Products', orders_array)
            }
        } else {
            alert("You can't add 0 items to your bag.")
        }
	})
});
