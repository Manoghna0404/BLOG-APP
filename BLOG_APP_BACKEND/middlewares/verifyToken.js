import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();
export const verifyToken=(...allowedRoles)=>{
    return async(req,res,next)=>{
    try{
    //read token from req
    let token=req.cookies.token;
    console.log("token:",token);
    // if(token===undefined)
    //     return res.status(400).json({message:"Unauthorized req.Plz login"})
    if (!token) {
    return res.status(401).json({
        message: "Please login"
    });
}
    //verify the validity of the token(decoding the token)
    let decodedToken=jwt.verify(token,process.env.JWT_SECRET);
    console.log("DECODED:", decodedToken);

    console.log("ALLOWED ROLES:", allowedRoles);

    //check if role is allowed
    // if(!allowedRoles.includes(decodedToken.role)){
    //     return res.status(403).json({message:"Forbidden,You don't have permission to access"})
    // }
    if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(decodedToken.role)
) {
    return res.status(403).json({
        message: "Forbidden"
    });
}
    req.user=decodedToken
    //forward req to next middleware/route
    next();
    }catch(err){
        //jwt.verify throws if token is invalid/expired

        console.log("VERIFY ERROR:", err);
        if(err.name==="TokenExpiredError"){
            return res.status(401).json({message:"Session expired.Please login again"})
        }
        if(err.name==="JsonWebTokenError"){
            return res.status(401).json({message:"Invalid Token.Please login again"})
        }
        //next(err);
    }
}
};