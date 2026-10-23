import {body,validationResult} from "express-validator"

const validate = (req,res,next)=>{
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    res.status(400).json({
        message:errors.array()
    })
}

const registerValidation = [
    body("username").isString().withMessage("username should be string"),
    body("email").isEmail().withMessage("email should be valid"),
    body("password").isLength({min:8}).withMessage("password should be 8 character"),
    validate
] 



const loginValidation = [
    body("email").isEmail().withMessage("email should be valid"),
    body("password").isLength({min:8}).withMessage("password should be 8 character"),
    validate

]

export  {registerValidation , loginValidation}