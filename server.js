
const express = require('express');
require('./config/connect');

const app = express();
app.use(express.json());
const port = 3000;


const productRoutes = require('./config/routes/product');
app.use('/product',productRoutes);
const articleRoutes = require('./config/routes/article');
app.use('/article',articleRoutes);
const userRoutes = require('./config/routes/user');
app.use('/user',userRoutes);

app.use('/images', express.static('./uploads')); // Serve static files from the 'uploads' directory

//test endpoint
app.get('/',(req,res)=>{
    res.send('Welcome to the API');
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);

});