const AsyncHandler = require("express-async-handler");
const { signup, login, protectedApi, getUsers } = require("../queries/auth/authQueries.js");


class AuthController {

    /* User Registeration */
	register = AsyncHandler(async (req, res) => {
		const {username, email, password} = req.body

		if (!(username && password && email)) {
			res.status(400)
			throw new Error("all fields are required.")
		}

        return await signup(req, res)

    });
    
    /* User Login */
    signIn = AsyncHandler(async (req, res) => {
        const { email, password } = req.body
    
        if (!(email && password)) {
            res.status(400)
            throw new Error("all fields are required")
        }
    
        return await login(req, res)
        
    });

    protectedApi = AsyncHandler(async (req, res) => {
        
    
        return await protectedApi(req, res)
        
    });

    getUsers = AsyncHandler(async (req, res) => {
        
    
        return await getUsers(req, res)
        
    });
}


module.exports = AuthController