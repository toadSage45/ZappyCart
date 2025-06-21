import User from '../models/user.js'




export const createOrUpdateUser = async (req , res) => {
    const {name , picture  , email } = req.user;

    const user = await User.findOneAndUpdate({email : email} , {name : email.split('@')[0] , picture} , {new : true})


    if(user){
        console.log('User Updated' , user);
        res.json(user);
    }else{
        const newUser = await new User({
            email , 
            name : email.split('@')[0], 
            picture, 
        }).save();

        console.log('New user created' , newUser);
        res.json(newUser);
        
    }

    
}

export const currentUser = async (req  , res) => {

    try {
        const user = await User.findOne({email: req.user.email})
        res.json(user);

    } catch (error) {
        console.error("Error in currentUser:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}
