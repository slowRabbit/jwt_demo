#this class deals with all kind of things for jwt tokens, like  getting new token, encrypting it, decrypting, decoding etc
from flask import jsonify, json, make_response
import jwt
import datetime

from Crypto.Cipher import AES
import base64, os



class Auth_JWT_Tokens :

    token_encryption_key = None
    token_signature_key = None

    def __init__(self):

        self.token_encryption_key = '01Q3RWx9pfkAkvIlX7aGbg=='
        self.token_signature_key = 'super secret key'


    def getToken(self, username, ipAddress, tokenId):

        data = {
            "username" : username,
            "ipaddress": ipAddress,
            "tokenid" :  tokenId
            }


        encrypted_data = self.encrypt_message(json.dumps(data), self.token_encryption_key, "{")
        sentToken = jwt.encode({'data':encrypted_data, 'exp':datetime.datetime.utcnow()+datetime.timedelta(seconds=300)}, self.token_signature_key)
        print ("TOKEN:"+sentToken)
        return sentToken
    
    
    
    def getToken2(self, data, encryption_key, signature_key):
        
        encrypted_data = self.encrypt_message(json.dumps(data), encryption_key, "{")
        sentToken = jwt.encode({'data':encrypted_data, 'exp':datetime.datetime.utcnow()+datetime.timedelta(seconds=300)}, signature_key)
        print ("TOKEN:"+sentToken)
        return sentToken
        

    def verifyToken(self, tokenToDecode, signature_key):
         
        try:
            recievedToken = jwt.decode(tokenToDecode, signature_key)
            
        except Exception as e:
            print ("Invalid token"+e.message)
            return False
        
        print ("Token verified")
        return True


    def verifyAndDecryptToken2(self, tokenToDecode, encryption_key, signature_key):

        #this function would verify if the token is valid, not expired, and if valid decrypt the payload and return the data
        try:
            recievedToken = jwt.decode(tokenToDecode, self.token_signature_key)
            dataRecieved = recievedToken['data']
            decodedPayloadData = self.decrypt_message(dataRecieved, self.token_encryption_key, "{")
            #this would give the payload data  in json format, WHICH looks  like  DATA JSON object in getToken FUNCTION !
            userDetailsJsonData = json.loads(decodedPayloadData)
            #user = jsonData['username']
            #surname = decodedReceivedData['surname']
            #tokenHttp = jwt.encode({'user':'httpUser', 'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=30)}, app.secret_key)
            #encrypted_tokenHttp = encrypt_message(data, tokenEncyptionKey, "{")
            #decrypted_token = decrypt_message(encrypted_tokenHttp, tokenEncyptionKey, "{")

        except Exception as e:

            #means some error occured during token verification, eg. invalid token, expired  token
            #result =-1 and message should  be given as  error message

            result = -1
            #this next lines gives  the  exact reason of not able to verify the jwt
            #message = e.message
            message = "Invalid session, please login again  !"
            '''
            result = {
                          "result": '-1',
                          "message" : e.message
                    }
            '''
            return (result, message, None)


        #return the decrypted token data, if token is verified properly
        #result = +1 and message should be of success, and return the decoded JSON payload data
        result = 1
        message = "User authenticated"
        userDetails =   {

                                "result"  : "1",
                                "message" : "Token verified and payload decrypted",
                                "jsondata" : userDetailsJsonData,
                                #"user" : user
                        }
        return (result, message, userDetailsJsonData)


    def returnJSONData(self):

         data = {
           "result": '-1',
           "message" : 'hey'
        }

         #return json.dumps(data)
         return str(data)

         return make_response(jsonify({
                          "result": '-1',
                          "message" : 'hey'
                    }),201)

    def returnMultipleData(self):

        List = []
        List.append("1")
        List.append("2")

        data = {
                "val1" : 1,
                "val2" :  2
                }

        return (-1, "hey", List, data)

    #TOKEN FUNCTIONS, DO NOT MODIFY THEM
    def generate_secret_key_for_AES_cipher(self):
        # AES key length must be either 16, 24, or 32 bytes long
        AES_key_length = 16 # use larger value in production
        # generate a random secret key with the decided key length
        # this secret key will be used to create AES cipher for encryption/decryption
        secret_key = os.urandom(AES_key_length)
        # encode this secret key for storing safely in database

        encoded_secret_key = base64.b64encode(secret_key)

        return encoded_secret_key

    def encrypt_message(self,private_msg, encoded_secret_key, padding_character):
        # decode the encoded secret key
        secret_key = base64.b64decode(encoded_secret_key)
        # use the decoded secret key to create a AES cipher
        cipher = AES.new(secret_key)
        # pad the private_msg
        # because AES encryption requires the length of the msg to be a multiple of 16
        padded_private_msg = private_msg + (padding_character * ((16-len(private_msg)) % 16))
        # use the cipher to encrypt the padded message
        encrypted_msg = cipher.encrypt(padded_private_msg)
        # encode the encrypted msg for storing safely in the database
        encoded_encrypted_msg = base64.b64encode(encrypted_msg)
        # return encoded encrypted message
        return encoded_encrypted_msg

    def decrypt_message(self,encoded_encrypted_msg, encoded_secret_key, padding_character):
        # decode the encoded encrypted message and encoded secret key
        secret_key = base64.b64decode(encoded_secret_key)
        #missing_padding = len(encoded_encrypted_msg) % 4
        #if missing_padding != 0:
            #encoded_encrypted_msg += b'='* (4 - missing_padding)

        #encrypted_msg=base64.decodestring(encoded_encrypted_msg + '='*(-len(encoded_encrypted_msg) % 4))
        #encrypted_msg=base64.decodestring(encoded_encrypted_msg + (padding_character * ((16-len(private_msg)) % 16)))

        encrypted_msg = base64.b64decode(encoded_encrypted_msg)
        # use the decoded secret key to create a AES cipher
        cipher = AES.new(secret_key)
        # use the cipher to decrypt the encrypted message
        decrypted_msg = cipher.decrypt(encrypted_msg)
        # unpad the encrypted message
        unpadded_private_msg = decrypted_msg.rstrip(padding_character)
        # return a decrypted original private message
        return unpadded_private_msg


#testing AREA

#token = JWT_Tokens()
#token.getNewToken()
