const express = require("express")
const router = express.Router();
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../Middleware");
const { User, Account } = require("../db");


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

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
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

    const UserId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

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

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName:zod.string().optional()
})


router.put("/",  authMiddleware , async(req,res) => {
    const { success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: " Error while updateing information"
        })
    }

    await User.updateOne({_id: req.UserId} , req.body);

    res.json({
        message: "updated sucessfully"
    })
})


router.get("/bulk", async (req,res) => {
    const filter = req.query.filter || "";
    const users = await user.find({
        $:[{
            firstName: {
                "$regex" : filter

            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id: user._id
        }))
    })
    
})





module.export = router;





