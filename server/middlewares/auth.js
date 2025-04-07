import admin from '../firebase/index.js'

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