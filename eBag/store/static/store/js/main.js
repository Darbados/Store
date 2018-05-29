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
	    e.preventDefault()
        if ($(this).closest('div').find('.quantity').val() > 0){
            product = $(this).data('product')
            price = parseFloat($(this).data('price'))
            quantity = parseFloat($(this).closest('.productinfo').find('.quantity').val())
            description = $(this).data('description').replace(',','?')
            category = $(this).data('category')

            if (window.sessionStorage.getItem('Products').length != 0){
                curr_order = window.sessionStorage.getItem('Products').split(',').length++
                order = "Product" + curr_order + ":|Q-" + quantity + "|SP-" + price + "|Pr-" + product + "=" + (price*quantity) + "|CAT-" + category + "|Desc-" + description
                orders_array = window.sessionStorage.getItem('Products')

                console.log("Product", order)

                orders_array = orders_array + ',' + order
                window.sessionStorage.setItem('Products', orders_array)
            } else {
                order = "Product1" + ":|Q-" + quantity + "|SP-" + price + "|Pr-" + product + "=" + (price*quantity) + "|CAT-" + category + "|Desc-" + description
                orders_array = window.sessionStorage.getItem('Products')
                orders_array = orders_array + order + ','

                console.log("Product", order)

                window.sessionStorage.setItem('Products', orders_array)
            }
        } else {
            alert("You can't add 0 items to your bag.")
        }
	})
});
