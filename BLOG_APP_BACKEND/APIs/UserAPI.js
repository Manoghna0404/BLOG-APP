import exp from 'express'
import {register,authenticate} from '../services/authServices.js'
import { checkAuthor } from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import multer from 'multer';
import { upload } from '../config/multer.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
//mini router
export const userRoute=exp.Router();

//register user
userRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );

//read all articles (protected route)
userRoute.get('/articles',verifyToken("USER"),async(req,res)=>{
    //get articles from api
    let articleInfo=req.params;
    //get all the author articles
    let articles=await ArticleModel.find({isArticleActive:true}).populate("comments.user","email firstName");
    //send res
    res.status(200).json({message:"all articles",payload:articles});
})

userRoute.put('/articles', verifyToken("USER"), async (req, res) => {

    try {

        const { articleId, comment } = req.body;

        // authenticated user from token
        const user = req.user.userId;

        // update article
        let articleWithComment = await ArticleModel.findOneAndUpdate(
            {
                _id: articleId,
                isArticleActive: true
            },
            {
                $push: {
                    comments: {
                        user,
                        comment
                    }
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).populate("comments.user", "email firstName");

        // article not found
        if (!articleWithComment) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        res.status(200).json({
            message: "comment added successfully",
            payload: articleWithComment
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to add comment"
        });
    }
});
// search articles by title
userRoute.get(
  "/articles/search/:title",
  verifyToken("USER"),
  async (req, res) => {

    try {

      const searchedTitle = req.params.title;

      const articles = await ArticleModel.find({
        title: {
          $regex: searchedTitle,
          $options: "i"
        },
        isArticleActive: true
      }).populate("comments.user", "email firstName");

      res.status(200).json({
        message: "searched articles",
        payload: articles
      });

    } catch (err) {

      res.status(500).json({
        message: "Search failed"
      });
    }
  }
);