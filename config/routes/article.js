const express = require('express');
const router = express.Router();
const Article = require('../../models/article');

router.post('/ajout', (req, res) => {
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
router.get('/list', (req, res) => {
    
    Article.find()
    .then((articles) => {
        res.send(articles);
    })
    .catch((error) => {
        res.send('Error retrieving articles:', error);
    });
});

router.get('/list/:id', (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
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
router.put('/update/:id', (req, res) => {
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


module.exports = router;