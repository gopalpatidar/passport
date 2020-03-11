const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20');
const key=require('./keys')
const User=require('../model/user-model')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
})


passport.use(
    new GoogleStrategy({
        
        callbackURL:'/auth/google/redirect',
        clientID:key.google.clientID,
        clientSecret:key.google.clientSecret
    },(accessToken,refreshToken,profile,done)=>{
        //passport callback Function
        User.findOne({googleid:profile.id}).then((currentUser)=>{

            if(currentUser){
                console.log('user is'+currentUser)
                done(null, currentUser)
            } else {
                  
                new User({
                    username:profile.displayName,
                    googleid:profile.id,
                    thumbnail:profile._json.picture
                }).save().then((newUser)=>{
                    console.log('new user created'+newUser)
                    done(null,newUser)
                })
            }
        })
    }))