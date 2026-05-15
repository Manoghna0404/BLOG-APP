import exp from 'express'
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import multer from 'multer';
import { upload } from '../config/multer.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import cloudinary from '../config/cloudinary.js'
import { register } from '../services/authServices.js';
//mini router
export const adminRoute=exp.Router();

//admin registration
adminRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;
            try {
              let userObj = req.body;

              if (req.file) {
                  cloudinaryResult = await uploadToCloudinary(req.file.buffer);
              }

            const newUserObj = await register({
                  ...userObj,
                  role: "ADMIN",
                  profileImageUrl:
                  cloudinaryResult?.secure_url || userObj.profileImageUrl,
          });

            res.status(201).json({
            message: "admin created",
            payload: newUserObj,
          });

        } catch (err) {

          console.log(err);
          res.status(500).json({
          message: err.message
          });
      }
        }
        );

//read all articles(optional)
adminRoute.get('/articles', verifyToken('ADMIN'), async (req, res) => {
  try {
    const articles = await ArticleModel.find({})
      .populate('author', 'firstName lastName email isActive')
      .populate('comments.user', 'firstName lastName email')
      .sort({ createdAt: -1 })

    res.status(200).json({
      message: 'All articles retrieved successfully',
      payload: articles
    })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving articles', error: error.message })
  }
})

// Get all users - Admin only
adminRoute.get('/users', verifyToken('ADMIN'), async (req, res) => {
  try {
    const users = await UserTypeModel.find({})
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 })

    res.status(200).json({
      message: 'All users retrieved successfully',
      payload: users
    })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message })
  }
})

// //block user
// adminRoute.put('users/block/:uid',async(req,res)=>{
//     //read id from url
//     let uid=req.params.uid;
//     //check whether that user is active or not
//     let userExist=await UserTypeModel.findOne({_id:uid,isActive:true})
//     console.log(uid)
//     if(!userExist)
//         return res.status(401).json({message:"user not exists"});
//     //block the user
//     let blockUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{isActive:false}});
//     //console.log(blockUser)
//     res.status(200).json({message:"user blocked just contact the admin ",payload:blockUser});
// })
// //unblock user
// adminRoute.put('users/unblock/:uid',async(req,res)=>{
//     //read id from url
//     let uid=req.params.uid;
//     //check whether that user is active or not
//     let userExist=await UserTypeModel.findOne({_id:uid,isActive:false})
//     if(!userExist)
//         return res.status(401).json({message:"user is not blocked"});
//     //block the user
//     let UnblockUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{isActive:true}});
//     res.status(200).json({message:"user unblocked",payload:UnblockUser});
// })
adminRoute.put('/users/block/:uid', verifyToken('ADMIN'), async(req,res)=>{

    let uid=req.params.uid;

    let userExist=await UserTypeModel.findOne({
        _id:uid,
        isActive:true
    });

    if(!userExist){
        return res.status(400).json({
            message:"user not exists"
        });
    }

    let blockUser=await UserTypeModel.findByIdAndUpdate(
        uid,
        {$set:{isActive:false}},
        {new:true}
    );

    res.status(200).json({
        message:"user blocked",
        payload:blockUser
    });
});
//unblock user
adminRoute.put('/users/unblock/:uid', verifyToken('ADMIN'), async(req,res)=>{

    let uid=req.params.uid;

    let userExist=await UserTypeModel.findOne({
        _id:uid,
        isActive:false
    });

    if(!userExist){
        return res.status(401).json({
            message:"user is not blocked"
        });
    }

    let UnblockUser=await UserTypeModel.findByIdAndUpdate(
        uid,
        {$set:{isActive:true}},
        {new:true}
    );

    res.status(200).json({
        message:"user unblocked",
        payload:UnblockUser
    });
});
// Activate article - Admin only
adminRoute.put('/articles/activate/:articleId', verifyToken('ADMIN'), async (req, res) => {
  try {
    const { articleId } = req.params

    const article = await ArticleModel.findByIdAndUpdate(
      articleId,
      { isArticleActive: true },
      { new: true }
    ).populate('author', 'firstName lastName email')
     .populate('comments.user', 'firstName lastName email')

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.status(200).json({
      message: 'Article activated successfully',
      payload: article
    })
  } catch (error) {
    res.status(500).json({ message: 'Error activating article', error: error.message })
  }
})

// Deactivate article - Admin only
adminRoute.put('/articles/deactivate/:articleId', verifyToken('ADMIN'), async (req, res) => {
  try {
    const { articleId } = req.params

    const article = await ArticleModel.findByIdAndUpdate(
      articleId,
      { isArticleActive: false },
      { new: true }
    ).populate('author', 'firstName lastName email')
     .populate('comments.user', 'firstName lastName email')

    if (!article) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.status(200).json({
      message: 'Article deactivated successfully',
      payload: article
    })
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating article', error: error.message })
  }
})

// Get dashboard statistics - Admin only
adminRoute.get('/dashboard/stats', verifyToken('ADMIN'), async (req, res) => {
  try {
    const totalUsers = await UserTypeModel.countDocuments()
    const activeUsers = await UserTypeModel.countDocuments({ isActive: true })
    const blockedUsers = await UserTypeModel.countDocuments({ isActive: false })

    const totalArticles = await ArticleModel.countDocuments()
    const activeArticles = await ArticleModel.countDocuments({ isArticleActive: true })
    const inactiveArticles = await ArticleModel.countDocuments({ isArticleActive: false })

    const authors = await UserTypeModel.countDocuments({ role: 'AUTHOR' })
    const regularUsers = await UserTypeModel.countDocuments({ role: 'USER' })
    const admins = await UserTypeModel.countDocuments({ role: 'ADMIN' })

    res.status(200).json({
      message: 'Dashboard statistics retrieved successfully',
      payload: {
        users: {
          total: totalUsers,
          active: activeUsers,
          blocked: blockedUsers,
          breakdown: {
            authors,
            regularUsers,
            admins
          }
        },
        articles: {
          total: totalArticles,
          active: activeArticles,
          inactive: inactiveArticles
        }
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard statistics', error: error.message })
  }
})