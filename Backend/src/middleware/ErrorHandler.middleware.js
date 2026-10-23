async function ErrorHandler(error,req,res,next){

    res.status(403).json({
        message:error.message,
        stack:error.stack
    })

}

export default ErrorHandler;