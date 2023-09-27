const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//ROUTES

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos
  });
});

app.get('/photos/:id', async (req, res) => {
  //res.render('photos');
  // console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo',{
    photo
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

//FORM POST REQUEST
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});





const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portuda başlatıldı..`);
});
