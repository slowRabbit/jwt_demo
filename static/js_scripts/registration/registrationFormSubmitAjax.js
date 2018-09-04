// magic.js
function submitRegistrationFormAjaxCall() {

        console.log("Submit ajax called");
    
        var user = document.getElementById('username_inp').value;
		var password = document.getElementById('password_inp').value;
		var confrmpassword = document.getElementById('confirmpassword_inp').value;
		var mobileno = document.getElementById('mobilenumber_inp').value;
		var email = document.getElementById('email_inp').value;
           
    
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {        
            'username'              : user,
            'password'          : password,
            'confirmpassword'   : confrmpassword,
            'contactno'          : mobileno,    
            'email'             : email
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/register/', // the url where we want to POST
            contentType : 'application/json; charset=utf-8',
            data        : JSON.stringify(formData), // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            encode      :  true,
            headers: { 'X-CSRFToken': csrf_token_global }
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                // here we will handle errors and validation messages
                console.log("Response from server  :"+data.Response.name); 
                
                console.log("Message  :"+data.Response.message); 
                
                //resetting the fields 
                document.getElementById("error_from_server").innerHTML = "";
                document.getElementById("success_from_server").innerHTML = "";
                
                //now based on the result, 
                // if result ==-1 , then it means user wasn't able to be added and we need to show error
                    if ( data.Response.result == -1)
                    {
                        document.getElementById("error_from_server").innerHTML = data.Response.message;
                    }
                //else result ==1 , means user was added and we need to  show the message  that user was added
                //as well as resetll all the fields
                    else if( data.Response.result == 1)
                    {
                    
                      document.getElementById("success_from_server").innerHTML = data.Response.message;
                      //upon successful user registration we need to reset all the fields
                      resetAllFields();
                    }
                                       
            });

    return false;
}

function resetAllFields()
{
        console.log("Resetting all the fields !!"); 
        document.getElementById('username_inp').value = "";
		document.getElementById('password_inp').value = "";
		document.getElementById('confirmpassword_inp').value = "";
		document.getElementById('mobilenumber_inp').value = "";
		document.getElementById('email_inp').value = "";
}
