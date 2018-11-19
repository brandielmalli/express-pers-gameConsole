const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.set('view engine', 'ejs')
//connects index.ejs to style. css and makes it public
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
  var db


MongoClient.connect('mongodb://demoone:abc123@ds123361.mlab.com:23361/demoone',{useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err)
    db = client.db('demoone') // whatever your database name is
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  })

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/delete', (req, res) => {
  console.log(req.body)
  db.collection('quotes').findOneAndDelete({name: req.body.name, quote: req.body.quote},
  (err, result) => {
    if (err) return res.send(500, err)
    res.redirect('/')
  })
})
