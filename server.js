
const express = require('express');
require('./config/connect');
const app = express();
app.use(express.json());
const port = 3000;

const Article = require('./models/article');


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









app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);

});