const router = require('express').Router();
const {UserModel} = require('../models');
const{UniqurConstraintError} = require('sequelize/lib/errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
console.log(req.body.user, '--------------------------------------')

    try{
        let {username, passwordhash} = req.body.user;

        console.log(`----------------------------------`, req.body.user)

        let User = await UserModel.create({
            username,
            passwordhash: bcrypt.hashSync(passwordhash, 13),
        });

        let token = jwt.sign({id: User.id}, "i_am_secret", {expiresIn: 60 * 60 * 24});
        
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err){
        res.status(500).json({
            message: `Failes to register user /${err}`,
        });
    }
});

router.post('/login', async (req, res) => {
    let { username, passwordhash } = req.body.user;

    try {
    let loginUser = await UserModel.findOne({
            where: {
                username: username,
            },
        });
        
        if (loginUser){

            let passwordHashComparison = await bcrypt.compare(passwordhash, loginUser.passwordhash);

            if(passwordHashComparison) {
                let token = jwt.sign({id: loginUser.id}, "i_am_secret", {expiresIn: 60 * 60 * 24});
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
            
        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
            }
    } catch (err){
        res.status(500).json({
            message: `Failes to log user in ${err}`,
        })
    }
    });


module.exports = router;