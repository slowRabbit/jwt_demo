# encoding: utf-8
from flask import Flask, render_template, request, make_response, jsonify
from AuthTokens import Auth_JWT_Tokens
from flask_wtf.csrf import CSRFProtect, CSRFError

app = Flask(__name__)
#db = SQLAlchemy(app)
csrf = CSRFProtect(app)

@app.route('/getToken/', methods = ["GET", "POST"])
def getToken():
    
    if request.method == "POST":
        print"Got post request"
        
        '''
        data = {
            "username" : "username",
            "ipaddress": "ipaddress",
            "tokenid" :  "tokenid"
            }
        '''
        
        response = request.get_json()
        data = response.get('data')
        encryption_key = response.get('encryption_key')
        signature_key = response.get('signature_key')
        
        AuthTokenObj = Auth_JWT_Tokens()
        #return AuthTokenObj.getToken2(data, "01Q3RWx9pfkAkvIlX7aGbg==", "super secret key")
        jwt_token = AuthTokenObj.getToken2(data, encryption_key, signature_key)
        
        
        resp = make_response(jwt_token)
        #store the token in http only cookie : 'USER_AUTH'
        resp.set_cookie('USER_AUTH_HTTP_ONLY', jwt_token, httponly=True)
        resp.set_cookie('USER_AUTH_NON_HTTP', jwt_token, httponly=False)
        return resp
        
        
    else :
        return render_template("getToken.html")


@app.route('/decodeToken/', methods = ["GET"])
def decodeToken():
        return render_template("decodeToken.html")

@app.route('/', methods = ["GET"])
def indexPage():
    return render_template("indexPage.html")

@app.route('/api/verifyToken/', methods = ["POST"])
def api_verifyToken():
    
    response = request.get_json()
    jwt_token = response.get('jwt_token')
    signature_key = response.get('signature_key')
    
    AuthTokenObj = Auth_JWT_Tokens()
    verification = AuthTokenObj.verifyToken(jwt_token, signature_key)
    #print ("Verification :"+verification)
    print ("Token verified ! :")
    if verification:
        return "1"
    else :
        return "-1"
    
    
    
@app.route('/api/decryptPayload/', methods = ["POST"])
def api_decryptPayload():
    
    response = request.get_json()
    jwt_token = response.get('jwt_token')
    encryption_key = response.get('encryption_key')
    signature_key = response.get('signature_key')
    
    AuthTokenObj = Auth_JWT_Tokens()
    result = AuthTokenObj.verifyAndDecryptToken(jwt_token, encryption_key,signature_key)
    #print ("Verification :"+verification)
    return result


@app.errorhandler(CSRFError)
def handle_csrf_error(e):
    return jsonify({
                        'RegisterResponse':
                        {
                                'result'  : "-1",
                                'message' : "Invalid CSRF token provided",
                        }
                        })

if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user1:pass@user1@localhost/flask_test1'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'powerful secret key'
    app.config['WTF_CSRF_SECRET_KEY'] = "a csrf secret key"

    app.run(debug=True, port=8041)