///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// Login Form ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



$(document).ready(function() {

  jQuery.validator.setDefaults({
      errorPlacement: function(error, element){
          var name    = $(element).attr("name");
          var $obj    = $("#" + name + "_validate");
          if($obj.length){
              error.appendTo($obj);
          }
          else {
              error.insertAfter(element);
          }
      },
   })
 
  $("#loginForm").validate({
      rules: {
          Aemail: {
              required: true,
              email: true
          },
          Apassword: {
              required: true,
              minlength: 5
          }
      },
      messages: {
          email: "Please enter a valid email address",
          password: {
              required: "Please provide a password",
              minlength: "Your password must be at least 5 characters long"
          },
      },
      submitHandler: function(form) {
          const email = $('#email').val();
          const password = $('#password').val();
          $.ajax({
              url: $('#loginForm').attr('action'),
              type: 'POST',
              contentType: 'application/json',
              dataType: 'json',
              data: JSON.stringify({email: email, password: password}),
              success: function (result) {
                 if(result.code == 401) {
                  toast('danger','Error',result.message)
                 } else {
                location.href = '/dashboard'
                 }
              },
              error: function (error) {
               toast('danger','Error',error)
              }
          });
      }
  });


  $("#signUpForm").validate({
      rules: {
          email: {
              required: true,
              email: true
          },
          password: {
              required: true,
              minlength: 5
          }
      },
      messages: {
          email: "Please enter a valid email address",
          password: {
              required: "Please provide a password",
              minlength: "Your password must be at least 5 characters long"
          },
      },
      submitHandler: function(form) {
          const email = $('#signUpEmail').val();
          const password = $('#signUpPassword').val();
          $.ajax({
              url: $('#signUpForm').attr('action'),
              type: 'POST',
              contentType: 'application/json',
              dataType: 'json',
              data: JSON.stringify({email: email, password: password}),
              success: function (result) {
                 if(result.code != 200) {
                  toast('danger','Error',result.message)
                 } else {
                  location.href = '/dashboard'
                 }
              },
              error: function (error) {
               toast('danger','Error',error)
              }
          });
      }
  }); 

})