const BlogSetting = require("../models/blogSettingModel")
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const Post = require("../models/postModel")

const securePassword = async(password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);

        return passwordHash;
    }
    catch (error) {
        console.log(error.message);
    }
}


const blogSetup = async(req, res) => {
    try {
        var blogSetting = await BlogSetting.find({});

        if(blogSetting.length>0) {
            res.redirect('/login');
        }
        else {
            res.render('blogSetup');
        }

    } 
    catch (error) {
        console.log(error.message)
    }
}

const blogSetupSave = async(req, res) => {
    try {
        
        const blog_title = req.body.blog_title;
        const blog_image = req.file.filename;
        const description = req.body.description;
        const name = req.body.name;
        const email = req.body.email;
        const password = await securePassword(req.body.password);

        const blogSetting = new BlogSetting({
            blog_title : blog_title,
            blog_logo : blog_image,
            description : description
        });

        await blogSetting.save();

        const user = new User({
            name : name,
            email: email,
            password: password,
            is_admin: 1
        });

        const userData = await user.save();
        console.log(userData);
        if(userData) {
            res.redirect('/login');
        }
        else {
            res.render('blogSetup', {message : 'Blog not setup properly!'});
        }

    }
    catch (errro) {
        console.log(error.message)
    }
}

const dashboard = async(req, res) => {
    try {
        res.render('admin/dashboard');
    } catch (error) {
        console.log(error.message);
    }
}

const loadPostDashboard = async(req, res, next) => {
    try {
        res.render('admin/postDashboard');
    } catch (error) {
        console.log(error.message);
    }
}

const addPost = async(req, res, next) => {
    try {
        var image = ''
        if(req.body.image!=undefined) {
            image = req.body.image
        }
        const post = new Post({
            title : req.body.title,
            content : req.body.content, 
            image: image
        });

        const postData = await post.save();
        res.render('admin/postDashboard', {message: "Post Added Successfully!"});

    } catch (error) {
        console.log(error.message);
    }
}

const uploadPostImage = async(req, res) => {
    try {
        var imagePath = '/images';
        imagePath = imagePath + '/' + req.file.filename;

        res.send({success:true, msg: 'Image Uploaded Sucessfully', path: imagePath})

    } catch (error) {
        res.send({success: false, msg: error.message})
    }
}

module.exports = {blogSetup, blogSetupSave, dashboard, loadPostDashboard, addPost, securePassword, uploadPostImage}