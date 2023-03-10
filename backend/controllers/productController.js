const { findByIdAndUpdate } = require("../models/productModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/Errorhandler");
const asyncerrors = require("../middleware/asyncerrors");
const apifeat = require("../utils/apifeat");
const Apifeat = require("../utils/apifeat");
const cloudinary = require("cloudinary");

exports.createProduct = asyncerrors(async (req,res,next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
       product
      })
});

exports.updateProduct = asyncerrors(async (req,res,next)=>{       
       let product = Product.findById(req.params.id);
       if(!product){
        return next(new ErrorHandler("Product Not Found",404));
     }
     
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
            usefindandModify: false
        })

        res.status(201).json({
            success: true,
            product
        })

});

exports.deleteProduct = asyncerrors(async(req,res,next)=>{
     const product = await Product.findById(req.params.id);
     if(!product){
        return next(new ErrorHandler("Product Not Found",404));
     }

     await product.remove();

     res.status(201).json({
        success: true,
         message : "Product has been deleted"
     })
});

exports.getProdDetails = asyncerrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
        return next(new ErrorHandler("Product Not Found",500));
     }
     
  res.status(201).json({
     success: true,
      product
  })
});


exports.getAllProducts = asyncerrors(async (req,res)=>{

   const productsCount = await Product.countDocuments();

   const resultPerPage = 8;

     const prod = new Apifeat(Product.find(),req.query).search().pagination(resultPerPage);

     const products = await prod.query;

    res.status(200).json({
         success: true,
         products,
         productsCount,
         resultPerPage
    });
});

exports.getAdminProducts = asyncerrors(async(req,res,next)=>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
})

// Create New Review or Update the review
exports.createProductReview = asyncerrors(async (req, res, next) => {
   const { rating, comment, productId } = req.body;
 
   const review = {
     user: req.user._id,
     name: req.user.name,
     rating: Number(rating),
     comment,
   };
 
   const product = await Product.findById(productId);
 
   const isReviewed = product.reviews.find(
     (rev) => rev.user.toString() === req.user._id.toString()
   );
 
   if (isReviewed) {
     product.reviews.forEach((rev) => {
       if (rev.user.toString() === req.user._id.toString())
         (rev.rating = rating), (rev.comment = comment);
     });
   } else {
     product.reviews.push(review);
     product.numOfReviews = product.reviews.length;
   }
 
   let avg = 0;
 
   product.reviews.forEach((rev) => {
     avg += rev.rating;
   });
 
   product.ratings = avg / product.reviews.length;
 
   await product.save({ validateBeforeSave: false });
 
   res.status(200).json({
     success: true,
   });
 });
 // Get All Reviews of a product
exports.getProductReviews = asyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
// Delete Review
exports.deleteReview = asyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

