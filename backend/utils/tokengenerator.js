import jwt from 'jsonwebtoken'

const createtoken = (userid,res) => {
    const token = jwt.sign({ userid }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    })
    res.cookie('token', token, {
        httpOnly: true, // not allow access token using js
        maxAge: 1 * 24 * 60 * 60 * 1000, //Millisecond
        sameSite:"strict", //csrf attack cross site forgery attack
        secure: process.env.security !== "development" 
    })
}
export default createtoken; 