const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();

//Controller
const photoController = require('./controllers/photoContoroller');
const pageController = require('./controllers/pagesController');

// connect DB
mongoose.connect('mongodb+srv://herakles402:Aa123456yhnarda@cluster0.ewbhpub.mongodb.net/pcat-db?retryWrites=true&w=majority')
.then(() => {
  console.log("db connected!")
});

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//ROUTES

app.get('/', photoController.getAllPhotos);

app.get('/photos/:id', photoController.getPhoto);

//FORM POST REQUEST
app.post('/photos', photoController.createPhoto);

app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);


app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage); 

app.get('/photos/edit/:id', pageController.getEditPage);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portuda başlatıldı..`);
});
