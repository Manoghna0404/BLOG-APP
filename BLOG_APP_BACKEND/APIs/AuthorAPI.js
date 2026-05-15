import exp from 'express'
import {register,authenticate} from '../services/authServices.js'
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import {checkAuthor} from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import multer from 'multer';
import { upload } from '../config/multer.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import cloudinary from '../config/cloudinary.js';
//mini router
export const authorRoute=exp.Router();

//register author
authorRoute.post(
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
                role: "AUTHOR",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "author created",
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
//create article(protected)
authorRoute.post('/articles',verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{
    //get article from request
    let newArticle=req.body;
    //check for the author
    // const author=await UserTypeModel.findById(newArticle.author)
    // if(!author || author.role!=="AUTHOR")
    //     return res.status(401).json({message:"Invalid author"});
    //create article doucment
    let newArticleDoc=new ArticleModel(newArticle)
    //save
    let createdArticleDoc=await newArticleDoc.save();
    //send res
    res.status(201).json({message:"article created",payload:createdArticleDoc})
});
//read article of author(protected)
authorRoute.get('/articles/:authorId',verifyToken("AUTHOR"),async(req,res)=>{
  let aid = req.params.authorId;

  //read atricles by this author which are acticve
  let articles = await ArticleModel.find({ author: aid }).populate("author", "firstName email");
  //send res
  res.status(200).json({ message: "articles", payload: articles });
})
//edit article(protected)
authorRoute.put('/articles',verifyToken("AUTHOR"),async(req,res)=>{
    console.log(req.body);
  let author = req.user.userId;
  //get modified article from req
  let { articleId, title, category, content } = req.body;
  console.log(articleId, author);
  //find article
  let articleOfDB = await ArticleModel.findOne({ _id: articleId, author: author });
  console.log(articleOfDB);
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }

  //update the article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,
    {
      $set: { title, category, content },
    },
    { new: true },
  );
  //send res(updated article)
  res.status(200).json({ message: "article updated", payload: updatedArticle });

})
//permanent article   
authorRoute.delete('/:aid/articleId/:arId',verifyToken("AUTHOR"),async(req,res)=>{
    //get the article from url
    let {aid,arId}=req.params;
    //check whether that article exists or not
    let articleExits=await ArticleModel.findById(arId);
    if(!articleExits)
        return res.status(404).json({message:"article not found"});
    if(req.user.role==='AUTHOR' && articleExits.author.toString()!==req.user.userId){
       return res.status(403).json({message:"Forbidden.You can only modify your own article"})
    }
    //delete the article
    let deletedArticle=await ArticleModel.findByIdAndDelete(arId);
    //send the res
    res.status(200).json({message:"Article deleted successfully",payload:deletedArticle})
})
//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticleActive } = req.body;
  // Find article
  const article = await ArticleModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && 
    article.author.toString() !== req.user.userId) {
    return res
    .status(403)
    .json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticleActive === isArticleActive) {
    return res.status(400).json({
      message: `Article is already ${isArticleActive ? "active" : "deleted"}`,
    });
  }

  //update status
  article.isArticleActive = isArticleActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${isArticleActive ? "restored" : "deleted"} successfully`,
    payload:article, //use payload instaed of article to send the updated article document in response
  });
});