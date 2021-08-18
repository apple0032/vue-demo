import jwt from 'jsonwebtoken'
const RS256 = "RS256"


function getKey(header, callback){
    let jwksClient = require('jwks-rsa');
    var client = jwksClient({ 
        strictSsl: false,           // hotfix to handle auth issue: for some reason, this library cannot resolve the endpoints ssl
        jwksUri:  process.env.VUE_APP_AUTH_JWKS 
    });
    client.getSigningKey(header.kid, function(key) {
        var signingKey = key.getPublicKey()
        callback(null, signingKey);
    });
}

export async function decodeToken(token){
    let verifyOptions = {
        // issuer:  process.env.VUE_APP_JWT_ISSUER,
        audience:  process.env.VUE_APP_JWT_AUDIENCE,
        algorithm:  [RS256]
    };

    let decodedToken = new Promise((resolve, reject) => jwt.verify(
        token, getKey, verifyOptions, (err, decode) => err ? reject(err) : resolve(decode)
    ))

    return decodedToken
} 