const inputs = ['body', 'query', 'headers', 'params', 'file', 'files'];

export const  inputsValidation = (Schmea)=>{
    return async(req,res,next)=>{
        //check the input data (params, body, header, querey, file,files)
        for (const key of inputs) {
            if(Schmea[key]){
                const validation_result = Schmea[key].validate(req[key]);
                next();
                res.json({validation_result})
            }
        }
        res.json({message:"validation failed"})
    }
}