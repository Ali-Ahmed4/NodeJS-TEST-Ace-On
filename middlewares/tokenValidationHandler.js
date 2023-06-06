const AsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validation = AsyncHandler((req, res, next) => {
    
    let token;
    const auth = req.headers.Authorization || req.headers.authorization  /* coming either from the headers if defined in postman or defined in Authorization(postman) */

    if(auth && auth.startsWith("Bearer"))
    {
        token = auth.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err)
            {
                res.status(403)
                throw new Error("Invalid Token")
            }

            req.user = decoded.user
            next();
        })
    }
    else
    {
        res.status(409)
        throw new Error("A token is required to access this route")
    }
})

module.exports = validation