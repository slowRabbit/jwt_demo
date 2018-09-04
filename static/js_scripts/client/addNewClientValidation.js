function addNewClientFormValidation(){
            
            // var csrf_token = "{{csrf_token()}}";
            // console.log("CSRF TOKEN(REGISTRATION FORM VALIDATION) IS :"+csrf_token_global);
            
            //submitAjaxCall();

            //input variables
			var client_name_inp                =   document.getElementById('client_name_inp').value;
			var client_username_inp            =   document.getElementById('client_username_inp').value;
			var client_password_inp            =   document.getElementById('client_password_inp').value;
			var client_confirmpassword_inp     =   document.getElementById('client_confirmpassword_inp').value;
			var client_contactnumber1_inp      =   document.getElementById('client_contactnumber1_inp').value;
			var client_contactnumber2_inp      =   document.getElementById('client_contactnumber2_inp').value;
			var client_reference_inp           =   document.getElementById('client_reference_inp').value;
			
			//error variables
			var client_name_error              =   'client_name_error';
			var client_username_error          =   'client_username_error';
			var client_password_error          =   'client_password_error';
			var client_confirmpassword_error   =   'client_confirmpassword_error';
			var client_contactnumber1_error    =   'client_contactnumber1_error';
			var client_contactnumber2_error    =   'client_contactnumber2_error';
			var client_reference_error         =   'client_reference_error';
			
			
			//setting all the error fields to empty initially on every page reload
            resetAllErrorFields();
            
            //for NAME
			if( client_name_inp == "" ){
				document.getElementById(client_name_error).innerHTML = " ** Client name is mandatory ";
				return false;
			}
			
			if(( client_name_inp.length < 5) || (client_name_inp.length > 40)){
				document.getElementById(client_name_error).innerHTML = " ** Client name can of of 5-40 characters";
				return false;
			}
            
            var reForClientNameAllowedCharactersCheck = new RegExp("(^)[ a-zA-Z0-9._-]+($)"); //allowing hindi + english + extra characters
            if(!reForClientNameAllowedCharactersCheck.test(client_name_inp) )
            {
               document.getElementById(client_name_error).innerHTML = "** Allowed characters are :  a-z,A-Z,0-9,.,-,_, ";
               return false;
            }
            



            //for  USERNAME
			if( client_username_inp == "" ){
				document.getElementById(client_username_error).innerHTML = " ** please fill the username ";
				return false;
			}
			if(( client_username_inp.length < 5) || (client_username_inp.length > 25)){
				document.getElementById(client_username_error).innerHTML = " ** please fill the username between 5 and 20";
				return false;
			}

			if(!isNaN(client_username_inp)){
				document.getElementById(client_username_error).innerHTML = " ** please enter character";
				return false;
			}

             var reForFirst3CharacterCheck = /^[A-Za-z]+$/;
            if( !reForFirst3CharacterCheck.test(client_username_inp.substr(0, 3)) )
            {
              document.getElementById(client_username_error).innerHTML = " ** First 3 characters cannot contain a number";
               return false;
            }
            
            var re = /^[a-zA-Z0-9._-]+$/;
            if( !re.test(client_username_inp) )
            {
              document.getElementById(client_username_error).innerHTML = " ** Invalid username, Allowed characters are :  a-z,A-Z,0-9,.,-,_, ";
               return false;
            }
    



            //for PASSWORD
			if( client_password_inp == "" ){
				document.getElementById(client_password_error).innerHTML = " ** please fill the password ";
				return false;
			}

			if((client_password_inp.length < 8) || (client_password_inp.length > 25)){
				document.getElementById(client_password_error).innerHTML = " ** please fill the password between 8 to 25 characters";
				return false;
			}
			
			
			var reForclient_password_inpAllowedCharactersCheck = /^[A-Za-z0-9@#$%^&+=._-]+$/; //alowing only  specific  characters
            if( !reForclient_password_inpAllowedCharactersCheck.test(client_password_inp) )
            {
              document.getElementById(client_password_error).innerHTML = " ** Invalid password, Allowed characters are :  a-z,A-Z,0-9,.,-,_,@,#,$,%,^,&,+,= ";
               return false;
            }
            
            var reForclient_password_inpValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#$%^&+=._-]).{8,}$/; //atleast 1 small,upper,number and  special  character
            if( !reForclient_password_inpValidation.test(client_password_inp) )
            {
              document.getElementById(client_password_error).innerHTML = " ** password should contain atleast one smallcase, uppercase alphbet, a number and a special character ";
               return false;
            }




            //for CONFIRMPASSWORD
			if( client_confirmpassword_inp == "" ){
				document.getElementById(client_confirmpassword_error).innerHTML = " ** please fill the confrm paasword ";
				return false;
			}


            var reForConfirmPassword = /^[A-Za-z0-9@#$%^&+=._-]+$/;
            if( !reForConfirmPassword.test(client_confirmpassword_inp) )
            {
              document.getElementById(client_confirmpassword_error).innerHTML = " ** Invalid password, Allowed characters are :  a-z,A-Z,0-9,.,-,_,@,#,$,%,^,&,+,= ";
               return false;
            }
            
            if( client_password_inp!=client_confirmpassword_inp){
				document.getElementById(client_confirmpassword_error).innerHTML = " **  passwords are not matching";
				return false;
			}




            //for CONTACT NUMBER 1
			if( client_contactnumber1_inp == "" ){
				document.getElementById(client_contactnumber1_error).innerHTML = " ** please fill the mobile number ";
				return false;
			}

			if(client_contactnumber1_inp.length!=10){
				document.getElementById(client_contactnumber1_error).innerHTML = " ** Mobile number should be of 10 digits ";
				return false;
			}
			if(isNaN(client_contactnumber1_inp)){ //mobile number should only contains digits, no characters etc.
				document.getElementById(client_contactnumber1_error).innerHTML = " ** Mobile number should conatins only digits ";
				return false;
			}
			
			client_contactnumber1_inp = client_contactnumber1_inp.replace(/^0+/, ''); // remove  the  leading zeros and then again check the length
            if(client_contactnumber1_inp.length!=10){
				document.getElementById(client_contactnumber1_error).innerHTML = " ** Invalid  Mobile Number ";
				return false;
			}
			
			//for CONTACT NUMBER 2
			//we should only validate 2nd contact number if it is entered, otherwise not and allow it to  be sent blank
			
			if( !(client_contactnumber2_inp == "") && (client_contactnumber2_inp.length >= 1) )
			{
    			if(client_contactnumber2_inp.length!=10){
    				document.getElementById(client_contactnumber2_error).innerHTML = " ** Mobile number should be of 10 digits ";
    				return false;
    			}
    			if(isNaN(client_contactnumber2_inp)){ //mobile number should only contains digits, no characters etc.
    				document.getElementById(client_contactnumber2_error).innerHTML = " ** Mobile number should conatins only digits ";
    				return false;
    			}
    			
    			client_contactnumber2_inp = client_contactnumber2_inp.replace(/^0+/, ''); // remove  the  leading zeros and then again check the length
                if(client_contactnumber2_inp.length!=10){
    				document.getElementById(client_contactnumber2_error).innerHTML = " ** Invalid  Mobile Number ";
    				return false;
    			}
            }
         


            //for REFERENCE
            //allow newline characters as well
            //it can be empty as well
            
			if(!(client_reference_inp == "") && (client_reference_inp.length >= 1))
			{
    			if(client_reference_inp.length > 200){
    				document.getElementById(client_reference_error).innerHTML = " ** Client name can of max 200 characters";
    				return false;
    			}
                
                var reForClientNameAllowedCharactersCheck = new RegExp("(^)[ A-Za-z0-9-\r\n._|]+($)"); //english + extra characters + newline
                if(!reForClientNameAllowedCharactersCheck.test(client_reference_inp) )
                {
                   document.getElementById(client_reference_error).innerHTML = "** Allowed characters are :  a-z,A-Z,0-9,.,-,_,/,/n ";
                   return false;
                }
            }


            console.log("validation completed !! ");
            //now the form is validated so we call call the ajax call for sending data to backend api
            return submitAddNewPoemFormAjaxCall();

		}
		
function resetAllErrorFields()
        {
            document.getElementById('client_name_error').innerHTML = "";
			document.getElementById('client_username_error').innerHTML = "";
			document.getElementById('client_password_error').innerHTML = "";
			document.getElementById('client_confirmpassword_error').innerHTML = "";
			document.getElementById('client_contactnumber1_error').innerHTML = "";
			document.getElementById('client_contactnumber2_error').innerHTML = "";
			document.getElementById('client_reference_error').innerHTML = "";
        }