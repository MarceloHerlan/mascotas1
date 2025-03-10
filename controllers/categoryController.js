const Category=require('../models/categoryModel')
const Products=require('../models/productModel')

const categoryController={
    getCategories:async(req,res)=>{
        try {
            const categories=await Category.find()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
},
    createCategory: async (req, res) => {
        try {
            const {name}=req.body;
            const category=await Category.findOne({name})
            if(category) return res.status(400).json({msg:'This category alredy exist'})

            const newCategory=new Category({name})

            await newCategory.save()            
            res.json({msg:'category created'})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    deleteCategory: async(req,res) =>{
        try {
         const products=await Products.findOne({category:req.params.id})
         if(products) return res.status(400).json({
             msg:'please delete all the products with this category'
         })
          await Category.findByIdAndDelete(req.params.id)
          res.json({msg:'Category Deleted'})  
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    updateCategory: async(req,res) =>{
        try {
            const {name}=req.body;
            await Category.findByIdAndUpdate({_id:req.params.id},{name})

            res.json({msg:'Updated'})
        } catch (error) {
            
        }
    }

}

module.exports=categoryController