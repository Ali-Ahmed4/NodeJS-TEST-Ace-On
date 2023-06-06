

const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500

    switch(statusCode)
    {
        case +process.env.VALIDATION_ERROR:
            res.status(statusCode).json({title: "Validation Error" ,message: err.message, stackTrace: err.stack})
            break;
        case +process.env.NOT_FOUND:
            res.status(statusCode).json({title: "Not Found" , message: err.message, stackTrace: err.stack})
            break;
        case +process.env.INTERNAL_SERVER_ERROR:
            res.status(statusCode).json({title: "Internal Server Error" ,message: err.message, stackTrace: err.stack})
            break;  
        case +process.env.FORBIDDEN:
            res.status(statusCode).json({title: "Forbidden" ,message: err.message, stackTrace: err.stack})
            break;
        case +process.env.INVALID_TOKEN:
            res.status(statusCode).json({title: "Token required", message: err.message, stackTrace: err.stack})
            break;
        case +process.env.LIMIT_EXCEEDED:
            res.status(statusCode).json({title: "Api Limit Exceeded, try again later", message: err.message, stackTrace: err.stack})
            break;
        default:
            console.log("working good")
    }
}






module.exports = errorHandler