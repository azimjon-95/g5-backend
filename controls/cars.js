const Cars = require('../model/loginSchema');

let time = new Date();
let addDay = time.getDay() + "." + (time.getMonth() + 1) + "." + time.getFullYear();

// ----searching-----
const searchCar = async (req, res) => {
    const { query } = req.query;
    try {
        const cars = await Cars.find(
            {
                $or: [{
                    name:
                        { $regex: query, $options: 'i' }
                },
                {
                    model:
                        { $regex: query, $options: 'i' }
                }
                ]
            }
        );
        res.json({
            seccess: true,
            message: "Searching successful!",
            innerData: cars
        })
    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}

// ---Get Car----
const getCars = async (req, res) => {
    try {
        let allCars = await Cars.find();
        if (!allCars) {
            return res.json({
                seccess: false,
                message: "Cars is not found!",
                innerData: allCars
            })
        }
        res.json({
            seccess: true,
            message: "Cars is found!",
            innerData: allCars
        })
    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}

// ----create car-----
const createCars = async (req, res) => {
    try {
        // const { addDay } = req.body;
        // addDay: addDay
        const addData = req.body;
        const createData = new Cars(addData);
        await createData.save();
    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}

// ----create car-----
const deleteCars = async (req, res) => {
    try {
        let { id } = req.body;
        let deleted = await Cars.findByIdAndDelete({ _id: id });
        if (!deleted) {
            return res.json({
                seccess: false,
                message: "Cars is not deleted!",
                innerData: deleted
            })
        }
        res.json({
            seccess: true,
            message: "Cars is deleted!",
            innerData: deleted
        })

    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}

// ----update car-----
const updateCars = async (req, res) => {
    try {
        let { id } = req.body;
        let body = req.body;
        let updated = await Cars.updateMany({ _id: id }, body);
        if (!updated) {
            return res.json({
                seccess: false,
                message: "Cars is not updated!",
                innerData: updated
            })
        }
        res.json({
            seccess: true,
            message: "Cars is  updated!",
            innerData: updated
        })
    } catch (error) {
        res.json({ seccess: true, message: error })
    }
};

module.exports = {
    updateCars,
    getCars,
    createCars,
    deleteCars,
    searchCar
};
