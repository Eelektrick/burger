$(function() {
    
  $(".devour").on("click", function(event) {
    event.preventDefault();

    let burger_id = $(this).data("id");

    let beenDevoured = {
        devoured: true
    };

    $.ajax("/api/burgers/" + burger_id,{
      type: "PUT",
      data: beenDevoured
    })
    .then(function(){

      console.log("Burger has been eaten", beenDevoured);
      // reload page to display devoured burger in proper column
      location.reload();
    }); 
  });

  //This will create the post  
  $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      let newBurger = {
          burger_name: $("#enter-text").val().trim(),
          devoured: 0
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      })
      .then(
          function() {
              console.log("created new Burger");
              // Reload the page to get the updated list
              location.reload();
          }
      );
  });

  //clear devoured burgers list
  $(".clear").on("click", function(event){
    event.preventDefault();

    $(".eaten").hmtl("");
    //$(".eaten")[0].reset();
  })
});

// //clear devoured burgers list
// $("#clear-button").on('click', function(){
//   //reset form
//   //$("#devoured").hmtl("");
//   $("#devoured")[0].reset();
//   //document.getElementById('#devoured').reset();
// });