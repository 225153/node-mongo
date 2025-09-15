//1
const mongoose = require('mongoose');
//2
mongoose.connect('mongodb://127.0.0.1:27017/first-database')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});