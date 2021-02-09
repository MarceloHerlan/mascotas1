const router=require('express').Router()
const cloudinary=require('cloudinary')
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')
const fs=require('fs')

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

//Upload image only admin
router.post('/upload',(req,res)=>{
    try {
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
        return res.status(400).send('No files uploaded')

        const file=req.files.file;
        if(file.size>1024*1024*5) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg:'size too large'})
        }


        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'},
        async(error,result)=>{
            if(error) throw error;

            removeTmp(file.tempFilePath)

            return res.json({public_id:result.public_id,url:result.url})
        }
        )

        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})

//delete image only admin
router.post('/destroy',(req,res)=>{
    try {        
    const{public_id}=req.body
    if(!public_id)  return res.status(400).json({msg:'No images selected'})

    cloudinary.v2.uploader.destroy(public_id,async(error,result)=>{
        if(error) throw error;

        res.json({msg:'Deleted Image'})
    })
    } catch (error) {
       return res.status(500).json({msg:error.message})
    }


})


const removeTmp= (path) =>{
    fs.unlink(path,err=>{
        if(err) throw err
    })
}

module.exports=router