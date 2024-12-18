import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js';

const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {expiresIn: '60d'});
}

// login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords((password)))) {
        user.firstLogin = false;
        await user.save();
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            googleId: user.googleId,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            active: user.active,
            firstLogin: user.firstLogin,
            created: user.createdAt
        });
    } else {
        res.status(401).send('Invalid E-mail or Password');
        throw new Error('User not found.')
    }
});

// register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).send('We already have and account with that email address.');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const newToken = genToken(user._id);

    sendVerificationEmail(newToken, email, name);

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            googleId: user.googleId,
            firstLogin: user.firstLogin,
            isAdmin: user.isAdmin,
            token: newToken,
            active: user.active,
            created: user.createdAt
        });
    } else {
        res.status(400).send('We could not register you.');
        throw new Error('Something went wrong. Please check your information and try again.');
    }
});

// verify email
const verifyEmail = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try { 
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (user) {
            user.active = true;
            await user.save();
            res.json('Thanks for activating your account. You can close this windows now.');
        } else {
            res.status(404).send('User not found.')
        }
    } catch (error){
        res.status(401).send('E-mail address could not be verified.')
    }
});

// password reset request
const passwordResetRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const newToken = genToken(user._id);
            sendPasswordResetEmail(newToken, user.email, user.name);
            res.status(200).send(`We have sent you a recover e-mail to ${email}`);
        }
    } catch (error) {
        res.status(401).send('An account using this e-mail address does not exist.')
    }
});

// password reset
const passwordReset = asyncHandler(async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    try { 
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (user) {
            user.password = req.body.password;
            await user.save();
            res.json('Your password has been updated successfully.');
        } else {
            res.status(404).send('User not found.')
        }
    } catch (error){
        res.status(401).send('Password reset failed.')
    }
});

userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(verifyEmail);
userRoutes.route('/password-reset-request').post(passwordResetRequest);
userRoutes.route('/password-reset').post(passwordReset);

export default userRoutes;