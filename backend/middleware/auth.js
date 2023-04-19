var jwt = require('jsonwebtoken');


const auth=(req,res,next)=>{

     const token=req.headers.authorization?.split(" ")[1];

     const payload=req.body
    
     if(token){
            jwt.verify(token, 'hush', function(err, decoded) {

              if(err){
                res.send({msg:err.message,status:"error"})
              }
                const userid=decoded.userid
                console.log(userid) 
                payload.userID=userid;
                next()
              });

     }else{
        res.send({msg:"you are not authorize to access this please login", status:"error"})
     }

    // console.log(token);
    

}

module.exports={auth}