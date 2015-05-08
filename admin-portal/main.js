  String.prototype.titleize = function() {
    var words = this.split(' ');
    var array = [];
    for (var i=0; i<words.length; ++i) {
      array.push(words[i].charAt(0).toUpperCase() + words[i].toLowerCase().slice(1));
    }
    return array.join(' ');
  };

  Handlebars.registerHelper('titleize', function(str) {
    return str.titleize();
  });

  productsLoaded = false;
  ordersLoaded = false;

  var products = {
    template: function(title){
      return $("#" + title + "-template").html();
    },
    compile: function(title){
        return Handlebars.compile(this.template(title));
    },
    request: function(subject){
      var getProducts = $.ajax({ url: "http://localhost:3000/api/" + subject +".json"});
      if (subject === "products")
        {productsLoaded = true;}

      if(subject === "orders")
        {ordersLoaded = true;}
      // var title = (function(subject){return subject;});
      getProducts.done(this.buildTemplate.bind(null, subject));
    },
    buildTemplate: function(title, products_data){
      // console.log(arguments);
      var html = products.compile(title)(products_data);
      $('body').append(html);
      if (title === 'orders') {
      }
      $(".header").text(title.titleize());

    },
    init: function(subject){
      this.request(subject);
    }
  };

  $(document).ready(function(){
    $("body").on("click" , "div[id*='each-product']",
      function(){
        var showdiv = this.id;
      $("div[id*='each-product']").not(document.getElementById(showdiv)).hide();
    });

    $("#products_button").click(function(){
      $(".each-order").hide();
      if (productsLoaded === false)
        products.init("products");
      else {
        $(".each-product").show();
        $(".header").text("Products");
      }
    });
      $("#orders_button").click(function(){
        $(".each-product").hide();
        if (ordersLoaded === true) {
          $(".each-order").show();
          $(".header").text("Orders");
        }
        else {
          products.init("orders");
        }




  });
  } );


  // $(function(){
  //   products.init("products");
  // });




  //
  // function productsRequest(){
  //
  //   var source   = $("#products-template").html();
  //   var template = Handlebars.compile(source);
  //
  //   $.ajax({
  //     url:"http://localhost:3000/api/products"
  //   }).done(function(data){
  //     console.log(data);
  //     var products = data;
  //     var html = template(products);
  //
  //     $('body').append(html);
  //
  //   });
  // }

    function ordersRequest(){
      var source   = $("#orders-template").html();
      var template = Handlebars.compile(source);

      $.ajax({
        url:"http://localhost:3000/api/orders"
      }).done(function(data){
        console.log(data);
        var orders = data;
        var html = template(orders);

        $('body').append(html);

        });
    }

    function productRequest(product_id){
      // console.log(window.location.search);

      var source   = $("#product-template").html();
      var template = Handlebars.compile(source);

      $.ajax({
        url:"http://localhost:3000/api/products/"+product_id
      }).done(function(data){
        console.log(data);
        var product = data;
        var html = template(product);

        $('body').append(html);

        });

    }
