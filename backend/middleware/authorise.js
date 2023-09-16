const authorise=(role_array)=>{

    return (req,res,next)=>{
        let user_role=req.body.role;
        if(role_array.includes(user_role)){
            next()
        }else{
            res.status(401).json({msg:"you are not authorized to access this route",status:"failed"});
        }
    }
}

module.exports={authorise}