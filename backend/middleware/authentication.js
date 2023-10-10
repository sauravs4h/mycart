var jwt = require('jsonwebtoken');

const {client}=require("../services/redis")


const authentication=async(req,res,next)=>{

     const token=req.headers.authorization?.split(" ")[1];

     const payload=req.body

     
    
     if(token){

             const isblack=await client.SISMEMBER("blacklisttoken",token)

             //console.log(isblack)

            if(isblack){
              res.send({msg:"please login" , status:"error"})
            }
            else{

              jwt.verify(token, 'hush', function(err, decoded) {

                if(err){
                  res.send({msg:err.message,status:"error"})
                }
                  const userid=decoded.userid
                 // console.log(userid) 
                  payload.userID=userid;
                  payload.role=decoded.role;

                  //console.log(decoded)
                  next()
                });

            }

            

     }else{
        res.send({msg:"you are not authorize to access this please login", status:"error"})
     }

    // console.log(token);
    

}

module.exports={authentication}