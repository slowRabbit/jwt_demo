function submitAddNewPoemFormAjaxCall() {

        console.log("Submit ajax called");
    
        	var client_name                =   document.getElementById('client_name_inp').value;
			var client_username            =   document.getElementById('client_username_inp').value;
			var client_password            =   document.getElementById('client_password_inp').value;
			var client_confirmpassword     =   document.getElementById('client_confirmpassword_inp').value;
			var client_contactnumber1      =   document.getElementById('client_contactnumber1_inp').value;
			var client_contactnumber2      =   document.getElementById('client_contactnumber2_inp').value;
			var client_reference           =   document.getElementById('client_reference_inp').value;
		           
    
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {        
            'client_name'                   : client_name,
            'client_username'               : client_username,
            'client_password'               : client_password,
            'client_confirmpassword'        : client_confirmpassword,
            'client_contactnumber1'         : client_contactnumber1,
            'client_contactnumber2'         : client_contactnumber2,
            'client_reference'              : client_reference   
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/admin/addNewClient/', // the url where we want to POST
            contentType : 'application/json',
            data        : JSON.stringify(formData), // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            encode      :  true,
            headers: { 'X-CSRFToken': csrf_token_global }
        })
            // using the done promise callback
            .done(function(data) {

                // log data to the console so we can see
                // here we will handle errors and validation messages
                console.log("Response from server  :"+data); 
                console.log("Message  :"+data.Response.message); 
                
                //resetting all the error fields 
                resetAllInputErrorFields();
                resetAllServerErrorAndSuccessFields();
                
                //now based on the result, 
                // if result ==-1 , then it means user wasn't able to be added and we need to show error
                if ( data.Response.result == -1)
                    {
                        document.getElementById("error_from_server").innerHTML = data.Response.message;
                        //document.getElementById('password_inp').value = "";
                    }
                else if( data.Response.result == 1)
                    {
                      //console.log("Current Url  :  " + window.location.href);
                      //window.location.replace('/dashboard/');
                      document.getElementById("success_from_server").innerHTML = data.Response.message;
                      //upon successful user registration we need to reset all the fields
                      resetAllInputFields();
                    }                
            });
    return false;
}

function resetAllInputFields()
{
        console.log("Resetting all the input fields !!"); 
		document.getElementById('client_name_inp').value = "";
		document.getElementById('client_username_inp').value = "";
		document.getElementById('client_password_inp').value = "";
		document.getElementById('client_confirmpassword_inp').value = "";
		document.getElementById('client_contactnumber1_inp').value = "";
		document.getElementById('client_contactnumber2_inp').value = "";
		document.getElementById('client_reference_inp').value = "";
}

function resetAllInputErrorFields()
{
        console.log("Resetting all the error fields !!"); 
        document.getElementById('client_name_error').innerHTML = "";
		document.getElementById('client_username_error').innerHTML = "";
		document.getElementById('client_password_error').innerHTML = "";
		document.getElementById('client_confirmpassword_error').innerHTML = "";
		document.getElementById('client_contactnumber1_error').innerHTML = "";
		document.getElementById('client_contactnumber2_error').innerHTML = "";
		document.getElementById('client_reference_error').innerHTML = "";
}

function resetAllServerErrorAndSuccessFields()
{
        document.getElementById("error_from_server").innerHTML = "";
        document.getElementById("success_from_server").innerHTML = "";
}