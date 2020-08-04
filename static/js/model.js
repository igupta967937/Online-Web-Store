(function(){

    var dataChangedEvent = new Event('dataChanged')
    var cart_clicked = new Event('dataChanged')

    //Class which locally stores list of all products from /products URL
    function Products(){
        this.productUrl = '/products'
        this.products = []

    }

    // GET data from /products URL and store it locally
    Products.prototype.getData = function(){
        var self = this

        $.get({
            url: self.productUrl,
            success: function(data){

                //Store data from /products as an attribute of this object
                self.products = data.products

                //Trigger the data change event
                window.dispatchEvent(dataChangedEvent)
            }
        })
    }

    //Getter function which either returns the local list in Products() class or returns and empty list.
    Products.prototype.getProducts = function(){
        if(this.products === []){
            return []
        }
        else{
            products = this.products
            return products
        }
    }

    //Sorts products by name in alphabetical order using the .sort() function.
    Products.prototype.sortProductsName = function(){
        this.products.sort((a,b) => (a.name > b.name) ? 1: ((b.name > a.name) ? -1 : 0))
        window.dispatchEvent(dataChangedEvent)
    }

    //Sorts cost by price in ascending order using the .sort() function.
    Products.prototype.sortProductsCost = function(){
        this.products.sort((a,b) => (a.unit_cost > b.unit_cost) ? 1: ((b.unit_cost > a.unit_cost) ? -1 : 0))
        window.dispatchEvent(dataChangedEvent)
    }

    //Iterates through the list of all products and returns the item with the passed product id.
    Products.prototype.getProduct = function(product_id){
        var products_list = this.products
        for(var i = 0; i < products_list.length; i++){
            if(products_list[i].id == product_id){
                return products_list[i]
            }
        }
    }


    function Cart(){

        this.cartUrl = '/cart'
        this.cart = []

    }

    Cart.prototype.getData = function(){
        var self = this

        $.get({
            url: self.cartUrl,
            success: function(data){

                /* Store data from /products as an attribute of this object */
                self.cart = data.cart
                window.dispatchEvent(dataChangedEvent)
                /* trigger the data change event */
            }
        })
    }

    //POST request which updates the current cart details.
    Cart.prototype.postCart = function(product_id, quantity, update){
        var self = this

        $.post({
            url: self.cartUrl,
            data:{
                "productid": product_id,
                "quantity": quantity,
                "update": update
            },
            success: function(data){
                self.cart = data.cart
                window.dispatchEvent(dataChangedEvent)
            }
        })
    }

    //Getter function which either returns the local list in Cart() class or returns and empty list.
    Cart.prototype.getCart = function(){
        if(this.cart === []){
            return []
        }
        else{
            cart = this.cart
            return cart
        }
    }

    //Iterates through the local list, adding up the unit costs and returning the value.
    Cart.prototype.getCostTotal = function(){
        var cart = this.cart
        var totalCost = 0
        for(var i = 0; i < cart.length; i++){
            totalCost = totalCost + cart[i].cost
        }
        return totalCost
    }

    //Iterates through the local list, adding up the unit quantities per item and returning the value.
    Cart.prototype.getQuantityTotal = function(){
        var cart = this.cart
        var totalQuant = 0
        for(var i = 0; i < cart.length; i++){
            totalQuant = totalQuant + cart[i].quantity
        }
        return totalQuant
    }

    //For the purpose of exporting/importing classes.
    window.app = window.app || {}
    window.app.Products = Products
    window.app.Cart = Cart

})()