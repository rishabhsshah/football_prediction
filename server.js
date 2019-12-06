const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '*****************';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
  res.render('index', {data: null, error: null});
})
// var app = require('express')();
// var port = process.env.port || 8080; // 8080 for local or whatever number u want

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `'https://ussouthcentral.services.azureml.net/workspaces/545e912001d148d28db99929a9cefdae/services/ef8161de8e7a4d668df43b268cb185f2/execute?api-version=2.0`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again...'});
    } else {
      let data = JSON.parse(body)
      if(data.main == undefined){
        res.render('index', {data: null, error: 'Error, please try again...'});
      } else {
        let dataText = `dataFound`;
        res.render('index', {weather: dataText, error: null});
      }
    }
  });
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
