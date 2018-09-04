# encoding: utf-8
from flask import Flask, render_template, flash, request, url_for, redirect, jsonify, make_response, session, json, Response
from flask_wtf.csrf import CSRFProtect, CSRFError
from AuthTokens import Auth_JWT_Tokens

app = Flask(__name__)
#db = SQLAlchemy(app)
csrf = CSRFProtect(app)

@app.route('/getToken/', methods = ["GET", "POST"])
def getToken():
    
    if request.method == "POST":
        print"Got post request"
        
        data = {
            "username" : "username",
            "ipaddress": "ipaddress",
            "tokenid" :  "tokenid"
            }
        
        
        AuthTokenObj = Auth_JWT_Tokens()
        return AuthTokenObj.getToken2(data, "01Q3RWx9pfkAkvIlX7aGbg==", "super secret key")
        
        
    else :
        return render_template("getToken.html")


if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user1:pass@user1@localhost/flask_test1'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.run(debug=True, port=8047)