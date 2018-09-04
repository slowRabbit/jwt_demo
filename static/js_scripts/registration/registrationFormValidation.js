function registrationFormValidation(){
            
            // var csrf_token = "{{csrf_token()}}";
            // console.log("CSRF TOKEN(REGISTRATION FORM VALIDATION) IS :"+csrf_token_global);
            
            //submitAjaxCall();

			var user = document.getElementById('username_inp').value;
			var password = document.getElementById('password_inp').value;
			var confirmpassword = document.getElementById('confirmpassword_inp').value;
			var mobileno = document.getElementById('mobilenumber_inp').value;
			var email = document.getElementById('email_inp').value;
			
			var user_error = "username_error";
			var password_error = "password_error";
			var confrmpassword_error = "confirmpassword_error";
			var mobileno_error = "mobilenumber_error";
			var email_error = "email_error";
			

            document.getElementById(user_error).innerHTML = "";
            document.getElementById(password_error).innerHTML = "";
            document.getElementById(confrmpassword_error).innerHTML = "";
            document.getElementById(mobileno_error).innerHTML = "";
            document.getElementById(email_error).innerHTML = "";


            //for  USERNAME
			if( user == "" ){
				document.getElementById(user_error).innerHTML = " ** please fill the username ";
				return false;
			}
			if(( user.length < 5) || (user.length > 25)){
				document.getElementById(user_error).innerHTML = " ** please fill the username between 5 and 20";
				return false;
			}

			if(!isNaN(user)){
				document.getElementById(user_error).innerHTML = " ** please enter character";
				return false;
			}

             var reForFirst3CharacterCheck = /^[A-Za-z]+$/;
            if( !reForFirst3CharacterCheck.test(user.substr(0, 3)) )
            {
              document.getElementById(user_error).innerHTML = " ** First 3 characters cannot contain a number";
               return false;
            }
            
            var re = /^[a-zA-Z0-9._-]+$/;
            if( !re.test(user) )
            {
              document.getElementById(user_error).innerHTML = " ** Invalid username, Allowed characters are :  a-z,A-Z,0-9,.,-,_, ";
               return false;
            }



            //for PASSWORD
			if( password == "" ){
				document.getElementById(password_error).innerHTML = " ** please fill the password ";
				return false;
			}

			if((password.length < 8) || (password.length > 25)){
				document.getElementById(password_error).innerHTML = " ** please fill the password between 8 and 25";
				return false;
			}
			
			
			var reForPasswordAllowedCharactersCheck = /^[A-Za-z0-9@#$%^&+=._-]+$/; //alowing only  specific  characters
            if( !reForPasswordAllowedCharactersCheck.test(password) )
            {
              document.getElementById(password_error).innerHTML = " ** Invalid password, Allowed characters are :  a-z,A-Z,0-9,.,-,_,@,#,$,%,^,&,+,= ";
               return false;
            }
            
            var reForPasswordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@#$%^&+=._-]).{8,}$/; //atleast 1 small,upper,number and  special  character
            if( !reForPasswordValidation.test(password) )
            {
              document.getElementById(password_error).innerHTML = " ** Password should contain atleast one smallcase, uppercase alphbet, a number and a special character ";
               return false;
            }


            //for CONFIRMPASSWORD
			if( confirmpassword == "" ){
				document.getElementById(confrmpassword_error).innerHTML = " ** please fill the confrm paasword ";
				return false;
			}


            var reForConfirmPassword = /^[A-Za-z0-9@#$%^&+=._-]+$/;
            if( !reForConfirmPassword.test(confirmpassword) )
            {
              document.getElementById(confrmpassword_error).innerHTML = " ** Invalid password, Allowed characters are :  a-z,A-Z,0-9,.,-,_,@,#,$,%,^,&,+,= ";
               return false;
            }
            
            if( password!=confirmpassword){
				document.getElementById(confrmpassword_error).innerHTML = " **  password are not matching";
				return false;
			}


            //for CONTACTNO
			if( mobileno == "" ){
				document.getElementById(mobileno_error).innerHTML = " ** please fill the mobile number ";
				return false;
			}

			if(mobileno.length!=10){
				document.getElementById(mobileno_error).innerHTML = " ** Mobile number should be of 10 digits ";
				return false;
			}
			if(isNaN(mobileno)){ //mobile number should only contains digits, no characters etc.
				document.getElementById(mobileno_error).innerHTML = " ** Mobile number should conatins only digits ";
				return false;
			}
			
			mobileno = mobileno.replace(/^0+/, ''); // remove  the  leading zeros and then again check the length
            if(mobileno.length!=10){
				document.getElementById(mobileno_error).innerHTML = " ** Invalid  Mobile Number ";
				return false;
			}



            //for EMAIL
			if( email == "" ){
				document.getElementById(email_error).innerHTML = " ** please fill the email id ";
				return false;
			}

            if(email.length >= 50){ //length of email should be less than 50 characters
				document.getElementById(email_error).innerHTML = " ** Mobile number should be 10 digits ";
				return false;
			}
            
			if(email.indexOf('@') <= 0){
				document.getElementById(email_error).innerHTML = " ** please fill the email id i proper format @ ";
				return false;
			}

				

			if((email.charAt(email.length-4)!='.') && (email.charAt(email.length-3)!='.')){

				document.getElementById(email_error).innerHTML = " ** please fill the email id in proper format . ";
				return false;
			} 

            console.log("validation completed !! ");
            //now the form is validated so we call call the ajax call for sending data to backend api
            return submitRegistrationFormAjaxCall();

		}