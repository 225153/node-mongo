const express = require('express');
const router = express.Router();
const Product = require('../../models/product');


const Multer = require('multer');
let fileName = '';
const myStorage = Multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect)=>{
        fileName = Date.now() + '.' + file.mimetype.split('/')[1];
        redirect(null, fileName);


    }
});



const upload = Multer({ storage: myStorage });

router.post('/addproduct', upload.single('image'), (req, res) => {
    let data = req.body;
    if (req.file) {
        data.image = fileName; // Add the image filename to the product data
    }
    let product = new Product(data);
    product.save()
    .then((savedProduct) => {
        res.status(200).json({
            message: 'Product saved successfully',
            product: savedProduct
        });
        fileName = ''; // Reset the fileName variable
    })
    .catch((error) => {
        res.status(500).json({
            message: 'Error saving product',
            error: error
        });
    });
});
router.put('/updateproduct/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    Product.findByIdAndUpdate(id, data)
    .then((updatedProduct) => {
        if(updatedProduct){
            res.send('Product updated successfully');
        }else{
            res.send('Product not found');
        }
    })
    .catch((error) => {
        res.send('Error updating product:', error);
    });
});
router.get('/listproducts', (req, res) => {
    
    Product.find()
    .then((products) => {
        res.send(products);
    })
    .catch((error) => {
        res.send('Error retrieving products:', error);
    });
});
router.get('/listproducts/:id', (req, res) => {
    let id = req.params.id; 
    Product.findById(id)
    .then((product) => {
        if(product){
            res.send(product);
        }else{
            res.send('Product not found');
        }
        
    })
    .catch((error) => {
        res.send('Error retrieving product:', error);
    });
});
router.delete('/deleteproduct/:id', (req, res) => {
    let id = req.params.id; 
    Product.findByIdAndDelete(id)
    .then((deletedProduct) => {
        if(deletedProduct){
            res.send('Product deleted successfully');
        }else{
            res.send('Product not found');
        }
    })
    .catch((error) => {
        res.send('Error deleting product:', error);
    });
});












module.exports = router;