import exp from 'express';
import {connect} from 'mongoose';
import {config} from 'dotenv';
import { userRoute } from './APIs/UserAPI.js';
import { adminRoute}  from './APIs/AdminAPI.js';
import { authorRoute} from './APIs/AuthorAPI.js';
import cookieParser from 'cookie-parser';
import { commonRoute } from './APIs/CommonAPI.js';
import cors from 'cors'
config()//process .env
//create express application
const app=exp();
//use cors middleware
app.use(cors({origin:["https://blog-app-frontend-delta-plum.vercel.app"],credentials:true}))
//add body parser middleware
app.use(exp.json())
//connect to db
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("connected to database successfully");
    app.listen(process.env.PORT,()=>console.log("HTTP server listening at port"));
    }catch(err){
        console.log("database not connected");
    }
}
connectDB();

//add cookie parser middleware
app.use(cookieParser())
app.use('/user-api',userRoute);
app.use('/admin-api',adminRoute);
app.use('/author-api',authorRoute);
app.use('/common-api',commonRoute);
//Invalid path
app.use((req,res,next)=>{
    res.json({message:`${req.url}  is Invalid path`});
});
app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});
//error handling middleware (if next is not given express not consider it as a middleware)
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});