function loginFormValidation(){
            
            // var csrf_token = "{{csrf_token()}}";
            // console.log("CSRF TOKEN(REGISTRATION FORM VALIDATION) IS :"+csrf_token_global);
            
            //submitAjaxCall();

			var user = document.getElementById('username_inp').value;
			var password = document.getElementById('password_inp').value;
			
			var user_error = "username_error";
			var password_error = "password_error";
			
			
            document.getElementById(user_error).innerHTML = "";
            document.getElementById(password_error).innerHTML = "";
         


            //for  USERNAME
			if( user == "" ){
				document.getElementById(user_error).innerHTML = " ** please fill the username ";
				return false;
			}
			if(( user.length  > 25)){
				document.getElementById(user_error).innerHTML = " ** username cannot be too long !";
				return false;
			}
            
            var re = /^[a-zA-Z0-9._-]+$/;
            if( !re.test(user) )
            {
              //document.getElementById(user_error).innerHTML = " ** Invalid username, Allowed characters are :  a-z,A-Z,0-9,.,-,_, ";
              document.getElementById(user_error).innerHTML = " ** Invalid characters !";
               return false;
            }



            //for PASSWORD
			if( password == "" ){
				document.getElementById(password_error).innerHTML = " ** please fill the password ";
				return false;
			}

			if((password.length >25)){
				document.getElementById(password_error).innerHTML = " ** password cannot be too long !";
				return false;
			}
			
			
			var reForPasswordAllowedCharactersCheck = /^[A-Za-z0-9@#$%^&+=._-]+$/; //alowing only  specific  characters
            if( !reForPasswordAllowedCharactersCheck.test(password) )
            {
              //document.getElementById(password_error).innerHTML = " ** Allowed characters are :  a-z,A-Z,0-9,.,-,_,@,#,$,%,^,&,+,= ";
              document.getElementById(password_error).innerHTML = " ** Invalid characters !";
               return false;
            }


            console.log("validation completed !! ");
            //now the form is validated so we call call the ajax call for sending data to backend api
            return submitLoginFormAjaxCall();

		}