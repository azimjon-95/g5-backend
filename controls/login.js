const User = require('../model/loginSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getUsers = async (req, res) => {
    try {
        const data = await User.find()
        res.json({
            success: true,
            message: "All Users",
            innerData: data
        })
    } catch (error) {
        console.error("Error>>>", error);
    }
}
// ----------------Login-SignIn-------------------
const Login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Username or Password involid!"
            })
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username }, "secret")
            return res.status(200).send({
                success: true,
                message: `Welcome back ${username}`,
                token: token
            })
        }
        else {
            res.status(401).send({
                success: false,
                message: "Username or Password involid!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            succes: false,
            message: "Server error"
        })
    }
}

// ----------------Register-SignUp-------------------
const Register = async (req, res) => {
    let { username } = req.body;
    try {
        const checkUsername = await User.findOne({ username })
        if (checkUsername) {
            return res.json({
                success: false,
                message: "Username already exists!",
                innerData: checkUsername
            })
        } else {
            let data = req.body;
            const newUser = await User.create(data);
            await newUser.save();
            console.log(newUser);
            res.json({
                success: true,
                message: "Register successful!",
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: "sever error",
            innerData: error
        })
    }
}

// ----------------Delete User--------------------
const deleteUser = async (req, res) => {
    try {
        let deleted = await User.findByIdAndDelete({ _id: req.params._id });

        if (!deleted) {
            return res.send({
                success: false,
                message: "User deleted!",
                innerData: deleted
            })
        }
    } catch (error) {
        res.send({ success: false, message: error })
    }
}
// ----------------Update User--------------------
const updateUser = async (req, res) => {
    try {
        let { _id } = req.body;
        let body = req.body;
        let editUser = await User.updateMany({ _id }, body);

        if (!editUser) {
            return res.send({
                success: false,
                message: "User is not updated!",
                innerData: editUser
            })
        }
        res.send({
            success: true,
            message: "User is updated!",
            innerData: editUser
        });
    } catch (error) {
        res.send({ success: false, message: error })
    }
}


module.exports = {
    getUsers,
    Login,
    Register,
    deleteUser,
    updateUser
}