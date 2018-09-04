function addNewCaseFormValidation(){
            
            // var csrf_token = "{{csrf_token()}}";
            // console.log("CSRF TOKEN(REGISTRATION FORM VALIDATION) IS :"+csrf_token_global);
            
            //submitAjaxCall();

            //input variables
			var case_client_id_inp           =   document.getElementById('case_client_id_inp').value;
			var case_number_inp              =   document.getElementById('case_number_inp').value;
			var case_title_inp               =   document.getElementById('case_title_inp').value;
			var case_extra_details_inp       =   document.getElementById('case_extra_details_inp').value;
			
			//error variables
			var case_client_id_error         =   'case_client_id_error';
			var case_number_error            =   'case_number_error';
			var case_title_error             =   'case_title_error';
			var case_extra_details_error     =   'case_extra_details_error';
			
			
			//setting all the error fields to empty initially on every page reload
            resetAllErrorFields();
            
            //for CASE CLIENT ID
			if( case_client_id_inp == "" ){
				document.getElementById(case_client_id_error).innerHTML = " ** Client id for case holder is required ";
				return false;
			}
			
			if( case_client_id_inp.length > 10 ){
				document.getElementById(case_client_id_error).innerHTML = " ** Client id cannot exceed 10 digits";
				return false;
			}
			
			if(isNaN(case_client_id_inp)){ //mobile number should only contains digits, no characters etc.
				document.getElementById(case_client_id_error).innerHTML = " ** Client id should conatins only digits ";
				return false;
			}
            
            var reForClientNameAllowedCharactersCheck = new RegExp("(^)[0-9]+($)"); //allowing hindi + english + extra characters
            if(!reForClientNameAllowedCharactersCheck.test(case_client_id_inp) )
            {
               document.getElementById(case_client_id_error).innerHTML = "** Only digits are allowed";
               return false;
            }
            


            //for  CASE NUMBER
			if( case_number_inp == "" ){
				document.getElementById(case_number_error).innerHTML = " ** please fill the case number ";
				return false;
			}
			if( case_number_inp.length > 30 ){
				document.getElementById(case_number_error).innerHTML = " ** case number cannot exceed 30 characters";
				return false;
			}
            
            var re = /^[ a-zA-Z0-9-._/]+$/;
            if( !re.test(case_number_inp) )
            {
              document.getElementById(case_number_error).innerHTML = " ** Invalid case number, Allowed characters: a-z,A-Z,0-9,.,-,_,/,";
               return false;
            }
            
            
            
            //for  CASE TITLE
			if( case_title_inp == "" ){
				document.getElementById(case_title_error).innerHTML = " ** please fill the case title ";
				return false;
			}
			if( case_title_inp.length > 100 ){
				document.getElementById(case_title_error).innerHTML = " ** case title cannot exceed 100 characters";
				return false;
			}
            
            var re = /^[ a-zA-Z0-9-._/]+$/;
            if( !re.test(case_title_inp) )
            {
              document.getElementById(case_title_error).innerHTML = " ** Invalid case title, Allowed characters: a-z,A-Z,0-9,.,-,_,/,";
               return false;
            }
    


            //for Extra CASE Details
            //allow newline characters as well
            //it can be empty as well
            
			if(!(case_extra_details_inp == "") && (case_extra_details_inp.length >= 1))
			{
    			if(case_extra_details_inp.length > 500){
    				document.getElementById(case_extra_details_error).innerHTML = " ** Extra detail can of max 500 characters";
    				return false;
    			}
                
                var reForClientNameAllowedCharactersCheck = new RegExp("(^)[ A-Za-z0-9-\r\n._|]+($)"); //english + extra characters + newline
                if(!reForClientNameAllowedCharactersCheck.test(case_extra_details_inp) )
                {
                   document.getElementById(case_extra_details_error).innerHTML = "** Allowed characters are :  a-z,A-Z,0-9,.,-,:,_,/,/n ";
                   return false;
                }
            }


            console.log("validation completed !! ");
            //now the form is validated so we call call the ajax call for sending data to backend api
            return submitAddNewCaseFormAjaxCall();

		}
		
function resetAllErrorFields()
        {
            document.getElementById('case_client_id_error').innerHTML = "";
			document.getElementById('case_number_error').innerHTML = "";
			document.getElementById('case_title_error').innerHTML = "";
			document.getElementById('case_extra_details_error').innerHTML = "";
        }