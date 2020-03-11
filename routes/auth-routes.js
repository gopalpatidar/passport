const router=require('express').Router();
const passport=require('passport');
const api=require('./api')
var multer  = require('multer')
var upload = multer({ dest: 'views/uploads' })
// auth login
router.get('/login',(req,res)=>{
     res.render('login',{user:req.user})
})

//auth logout
router.get('/logout',(req,res)=>{
    //handle with passport
    //res.send('logining out') 
    req.logout();
    res.redirect('/');
})

// auth google
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
   //  res.send(req.user)
   res.redirect('/profile/')
})

//user registration
router.post('/reg',upload.single('image'),async function (req, res) {
    var obj = req.body;
    let temp = 0;
    try {
       console.log("1 red.body",req.body)
      console.log("req.file",req.file)
      var name = obj["Gmail"];
      await api.checkuser(name);
    }
    catch (err) {
      res.send("<script>alert('data Already Inserted <br> Insert Again');location.href='/'</script>");
      console.log(err)
      temp = 1;
    }
    if (temp == 0) {
      try{
        console.log("req.body =====",req.body,"req.body");
      obj.image=req.file.path;
      // console.log(obj.image);
      // console.log(obj);
      await api.adduser(obj);
      res.send("<script>alert('data Inserted');location.href='/'</script>")}
      catch(err){
        res.send(err);
      }
    }
  
  })
  router.post('/showuser', async function (req, res) {
    try {
      var obj = req.body;
      var name = obj["Gmail"];
      var pass = obj["passWord"];
      var data = await api.showuser(name, pass);
      str = data[0].Gmail;
      res.render('../views/localprofile',{name:data});
      // res.send(str) 
    }
    catch (err) {
      console.log(err)
      res.send("<script>alert('Insert Valid User Id and Pass');location.href='/'</script>");
    }
  })

module.exports=router;