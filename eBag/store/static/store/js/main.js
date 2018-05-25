$(document).ready(function(){

    if (!window.sessionStorage.hasOwnProperty('Orders')){
        window.sessionStorage.setItem('Orders', "")
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
            quantity = $(this).closest('.quantity').val()

            console.log("Session storage length: ", window.sessionStorage.length)

            if (window.sessionStorage.getItem('Orders').length != 0){
                order = "Order" + window.sessionStorage.getItem('Orders').length++ + ": " + quantity + " " + product + " = " + (price*parseInt(quantity))
                orders_array = window.sessionStorage.getItem('Orders')

                console.log("Order", order)
                console.log("Orders array", orders_array)

                orders_array = orders_array + ',' + order
                window.sessionStorage.setItem('Orders', orders_array)
            } else {
                order = "Order1" + ": " + quantity + " " + product + " = " + (parseInt(price)*parseInt(quantity))
                orders_array = window.sessionStorage.getItem('Orders')
                orders_array = orders_array + ',' + order

                console.log("Order", order)
                console.log("Orders array", orders_array)

                window.sessionStorage.setItem('Orders', orders_array)
            }
        } else {
            alert("You can't add 0 items to your bag.")
        }
	})
});
