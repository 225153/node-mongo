
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
app.get('/byid/:id', (req, res) => {
    
    id=req.params.id;
    console.log('GET request received with id:', id);
    res.send('Hello World! ID: '+id);
});









app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);

});