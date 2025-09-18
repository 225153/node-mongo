
const express = require('express');
require('./config/connect');

const app = express();
app.use(express.json());
const port = 3000;

const Article = require('./models/article');
const Product = require('./models/product');


app.post('/ajout', (req, res) => {
    let data = req.body;
    let article = new Article(data);
    article.save()
    .then((savedArticle) => {
        res.send('Article saved successfully'+JSON.stringify(savedArticle));
    })
    .catch((error) => {
        res.send('Error saving article:', error);
    });

    

});
app.get('/list', (req, res) => {
    
    Article.find()
    .then((articles) => {
        res.send(articles);
    })
    .catch((error) => {
        res.send('Error retrieving articles:', error);
    });
});

app.get('/list/:id', (req, res) => {
    let id = req.params.id;
    Article.findById(id)
    .then((article) => {
        if(article){
            res.send(article);
        }else{
            res.send('Article not found');
        }
        
    })
    .catch((error) => {
        res.send('Error retrieving article:', error);
    });
});

app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    Article.findByIdAndDelete(id)
    .then((deletedArticle) => {
        if(deletedArticle){
            res.send('Article deleted successfully');
        }else{
            res.send('Article not found');
        }
    })
    .catch((error) => {
        res.send('Error deleting article:', error);
    });
});
app.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    Article.findByIdAndUpdate(id, data)
    .then((updatedArticle) => {
        if(updatedArticle){
            res.send('Article updated successfully');
        }else{
            res.send('Article not found');
        }
    })
    .catch((error) => {
        res.send('Error updating article:', error);
    });
});

app.post('/addproduct', (req, res) => {
    let data = req.body;
    let product = new Product(data);
    product.save()
    .then((savedProduct) => {
        res.send('Product saved successfully'+JSON.stringify(savedProduct));
    })
    .catch((error) => {
        res.send('Error saving product:', error);
    });
});
app.put('/updateproduct/:id', (req, res) => {
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
app.get('/listproducts', (req, res) => {
    
    Product.find()
    .then((products) => {
        res.send(products);
    })
    .catch((error) => {
        res.send('Error retrieving products:', error);
    });
});
app.get('/listproducts/:id', (req, res) => {
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
app.delete('/deleteproduct/:id', (req, res) => {
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












app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);

});