function submitAddNewCaseFormAjaxCall() {

        console.log("Submit ajax called");
    
        	var case_client_id_inp           =   document.getElementById('case_client_id_inp').value;
			var case_number_inp              =   document.getElementById('case_number_inp').value;
			var case_title_inp               =   document.getElementById('case_title_inp').value;
			var case_extra_details_inp       =   document.getElementById('case_extra_details_inp').value;
		           
    
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {        
            'case_client_id'            : case_client_id_inp,
            'case_number'               : case_number_inp,
            'case_title'                : case_title_inp,
            'case_extra_details'        : case_extra_details_inp
        };

        // process the form
        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/admin/addNewCase/', // the url where we want to POST
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
		document.getElementById('case_client_id_inp').value = "";
		document.getElementById('case_number_inp').value = "";
		document.getElementById('case_title_inp').value = "";
		document.getElementById('case_extra_details_inp').value = "";
}

function resetAllInputErrorFields()
{
        console.log("Resetting all the error fields !!"); 
        document.getElementById('case_client_id_error').innerHTML = "";
		document.getElementById('case_number_error').innerHTML = "";
		document.getElementById('case_title_error').innerHTML = "";
		document.getElementById('case_extra_details_error').innerHTML = "";
}

function resetAllServerErrorAndSuccessFields()
{
        document.getElementById("error_from_server").innerHTML = "";
        document.getElementById("success_from_server").innerHTML = "";
}