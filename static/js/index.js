(function(){

    $(document).ready(function(){

        //Imports and instantiates classes from model.js
        window.app.Mod_Products = new window.app.Products()
        window.app.Mod_Products.getData()

        //Imports and instantiates classes from model.js
        window.app.Mod_Cart = new window.app.Cart()
        window.app.Mod_Cart.getData()

        //Event that handles interactions with cart and products.
        var close = new Event('close')


        $(window).on("dataChanged", function(){

            //displays list of all products
            var products_list = window.app.Mod_Products.getProducts()
            var template = Handlebars.compile($("#products_template").html())
            var html_prod = template({products_list: products_list})
            $("#message").html(html_prod)

            //Always displays cart quantity and total cost
            var cart_quant = window.app.Mod_Cart.getQuantityTotal()
            var cart_cost = window.app.Mod_Cart.getCostTotal()
            var template2 = Handlebars.compile($("#always_display_template").html())
            var html_always = template2({quantity: cart_quant, cost: cart_cost})
            $("#always_display").html(html_always)

            //Displays product in detail in a div on the right of the page
            $(".item").click(function(){
                $("#cart_display").empty()
                var product = window.app.Mod_Products.getProduct(this.id)
                var template = Handlebars.compile($("#product_display_template").html())
                var html_prod_display = template({id: product.id, name: product.name, cost: product.unit_cost,
                img: product.image_url, desc: product.description})
                $("#product_display").html(html_prod_display)
                window.dispatchEvent(close)
            })

            //On click of products table heading, will sort products list and display onto page.
             $("#sort_name").click(function(){
                window.app.Mod_Products.sortProductsName()
            })

            //On click of cost table heading, will sort products list and display onto page.
            $("#sort_cost").click(function(){
                window.app.Mod_Products.sortProductsCost()
            })

            //On click of "refresh page", will rebuild cart and display onto page.
            $("#refreshCart").click(function(){
                var cart_contents = window.app.Mod_Cart.getCart()
                var totalPrice = window.app.Mod_Cart.getCostTotal()
                var product = window.app.Mod_Products.getProduct(this.id)
                var template = Handlebars.compile($("#cart_template").html())
                var html = template({id: product, cart_contents: cart_contents, totalPrice: totalPrice})
                $("#cart_display").html(html)
                $("#product_display").empty()
                window.dispatchEvent(close)
            })
        })


         $(window).on("close", function(){
               $("#closeProduct").on("click", function(){
                    $("#product_display").empty()
               })

            $("#product_submit").submit(function(event){
               event.preventDefault()
               var quantity = $(this).find("input[name='quantity']").val()
               var product_id = $(this).find("input[name='product_id']").val()
               var update = $(this).find("input[name='update']").val()
               window.app.Mod_Cart.postCart(product_id, quantity, update)
            })

            //Updates the current cart quantity of an item to the input item in the update form in index.html.
            $(".update_cart").submit(function(event){
                event.preventDefault()
                var quantity = $(this).find("input[name='quantity']").val()
                var product_id = $(this).find("input[name='product_id']").val()
                var update = $(this).find("input[name='update']").val()
                window.app.Mod_Cart.postCart(product_id, quantity, update)
            })

            //Removes all instances of an item from the cart.
            $(".remove_from_cart").submit(function(event){
                event.preventDefault()
                var quantity = $(this).find("input[name='quantity']").val()
                var product_id = $(this).find("input[name='product_id']").val()
                var update = $(this).find("input[name='update']").val()
                window.app.Mod_Cart.postCart(product_id, quantity, update)
                window.dispatchEvent(cartChanged)
            })
         })

        //On click displays builds and displays cart.
        $("#view_cart").click(function(){
            var cart_contents = window.app.Mod_Cart.getCart()
            var totalPrice = window.app.Mod_Cart.getCostTotal()
            var product = window.app.Mod_Products.getProduct(this.id)
            var template = Handlebars.compile($("#cart_template").html())
            var html = template({id: product, cart_contents: cart_contents, totalPrice: totalPrice})
            $("#cart_display").html(html)
            $("#product_display").empty()
            window.dispatchEvent(close)
        })
    })
})()


