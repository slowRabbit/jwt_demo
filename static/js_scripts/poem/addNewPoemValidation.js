function addNewPoemFormValidation(){
            
            // var csrf_token = "{{csrf_token()}}";
            // console.log("CSRF TOKEN(REGISTRATION FORM VALIDATION) IS :"+csrf_token_global);
            
            //submitAjaxCall();

			var poem_title = document.getElementById('poem_title_inp').value;
			var poem_tags = document.getElementById('poem_tags_inp').value;
			var poem_content = document.getElementById('poem_content_inp').value;
			
			var poem_title_error = "poem_title_error";
			var poem_tags_error = "poem_tags_error";
			var poem_content_error = "poem_content_error";
			
			
            document.getElementById(poem_title_error).innerHTML = "";
            document.getElementById(poem_tags_error).innerHTML = "";
            document.getElementById(poem_content_error).innerHTML = "";
         
            var numberOfHindiCharacters = 128;
            var unicodeShift = 0x0900;
            var hindiAlphabet = [];
            for(var i = 0; i < numberOfHindiCharacters; i++) {
              hindiAlphabet.push("\\u0" + (unicodeShift + i).toString(16));
            }

            //for  poem_titleNAME
			if( poem_title == "" ){
				document.getElementById(poem_title_error).innerHTML = " ** please fill the Poem Title ";
				return false;
			}
			if(( poem_title.length  > 100)){
				document.getElementById(poem_title_error).innerHTML = " ** Title cannot exceed 100 characters !";
				return false;
			}
            
            //var re = /^[a-zA-Z0-9._-]+$/;
            //DO NOT ALLOW NEWLINE CHARACTERS
            var reForpoem_titleAllowedCharactersCheck = new RegExp("(^)[ A-Za-z0-9-.,!?|"+hindiAlphabet+"]+($)"); //allowing hindi + english + extra characters
            if( !reForpoem_titleAllowedCharactersCheck.test(poem_title) )
            {
              //document.getElementById(poem_title_error).innerHTML = " ** Invalid poem_titlename, Allowed characters are :  a-z,A-Z,0-9,.,-,_, ";
              document.getElementById(poem_title_error).innerHTML = " ** Allowed characters : [English, Hindi, 0-9, -, ., !, ?, /, (,)]";
               return false;
            }

            
            //for poem_tags
			if( poem_tags == "" ){
				document.getElementById(poem_tags_error).innerHTML = " ** please enter suitable tags ";
				return false;
			}
			if(( poem_tags.length  > 100)){
				document.getElementById(poem_tags_error).innerHTML = " ** Tags cannot exceed 100 characters !";
				return false;
			}
            
            //DO NOT ALLOW NEWLINE CHARACTERS
            var reForpoem_tagsAllowedCharactersCheck = new RegExp("(^)[ A-Za-z0-9-.,!?#|]+($)"); //allowing hindi + english + extra characters
            if( !reForpoem_tagsAllowedCharactersCheck.test(poem_tags) )
            {
               document.getElementById(poem_tags_error).innerHTML = "** Allowed characters : [English(only), 0-9, -, ., !, ?, /, #, (,)]";
               return false;
            }
            


            //for poem_content
			if( poem_content == "" ){
				document.getElementById(poem_content_error).innerHTML = " ** please fill the Poem content ";
				return false;
			}

			if((poem_content.length >2000)){
				document.getElementById(poem_content_error).innerHTML = " ** Poem length cannot exceed 2000 characters !";
				return false;
			}
			
			
            
            //var reForpoem_contentAllowedCharactersCheck = new RegExp("(^)[ A-Za-z0-9?-\r\n.,!|"+hindiAlphabet+"]+($)"); //allowing hindi + english + extra characters
            var reForpoem_contentAllowedCharactersCheck = new RegExp("(^)[ A-Za-z0-9-\r\n.,!|?"+hindiAlphabet+"]+($)");
            if( !reForpoem_contentAllowedCharactersCheck.test(poem_content) )
            {
              //document.getElementById(poem_content_error).innerHTML = " ** Allowed characters are :  a-z,A-Z,0-9,.,-,_,@,#,$,%,^,&,+,= ";
               document.getElementById(poem_content_error).innerHTML = " ** Allowed characters : [English, Hindi, 0-9, -, ., !, ?, /, (,)]";
               return false;
            }


            console.log("validation completed !! ");
            //now the form is validated so we call call the ajax call for sending data to backend api
            return submitAddNewPoemFormAjaxCall();

		}