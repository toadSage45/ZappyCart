import admin from '../firebase/index.js'
import User from "../models/user.js";



export const authCheck = async (req , res , next ) => {
    //console.log(req.headers);
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);

        //console.log('Firebase user in authcheck' , firebaseUser);
        req.user = firebaseUser ;
        next();

     } catch (error) {
        
       res.status(401)
          .json({
            error : "Invalid or expired token",
          })
    }
}

export const adminCheck = async (req, res ,next ) => {
  const {email} = req.user;

  const adminUser = await User.findOne({email}).exec();

  if(adminUser.role !== "admin"){
    res.status(403).json({
      err : "Bakchodi nhi laude , admin ka kaam hai"
    });
  } else{
    next();
  }
};