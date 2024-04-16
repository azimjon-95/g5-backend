const { Router } = require('express');

const cars = Router();
const {
    updateCars,
    getCars,
    createCars,
    deleteCars,
    searchCar
} = require('../controls/cars')

cars.get('/getCars', getCars);
cars.post('/createCars', createCars);
cars.put('/updateCars:/id', updateCars);
cars.delete('/deleteCars:/id', deleteCars);
cars.get('/searchCar', searchCar);
module.exports = cars