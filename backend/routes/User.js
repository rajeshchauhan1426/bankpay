const express = require("express")
const router = express.Router();
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const res = require("express/lib/response");


const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup" , async (req, res) => {
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email is already taken / bad crediantials"
        })
    }

    const existingUSer = await User.findOne({
        username: req.body.username
    })
    if(existingUSer){
        return res.status(411).json({
            message: " Email is already taken /  bad crediantials"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const UserId = User._id;

    const token = jwt.sign({
        UserId
    }, JWT_SECRET);

    res.json({
        message: " user created sucessfully",
        token: token
    })
})



const signinBody = zod.object({
    username : zod.string().email(),
    password: zod.string()
})

router.post("/signin" ,async (req, res) => {
    const {success} = signinBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / bad  crediantials "
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            UserId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: " Error while logging in"
    })
})

module.export = router;





