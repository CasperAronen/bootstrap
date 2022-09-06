'use strict';
const express = require('express');
const path = require('path');

const app = express();
const { port } = require('./config.json');

const Tietovarasto=require('./sqlvarasto/tietovarastokerros');
const varasto=new Tietovarasto();

app.set('view engine','ejs');
app.set('views', path.join (__dirname,'sivut'));
app.use(express.static(__dirname + '/'));

app.get('/',( req, res )=>{
    res.render('etusivu');
});

app.get('/elokuvat',( req, res )=>{
    res.render('elokuvat');
});

app.get('/uudet',( req, res )=>{
    res.render('uudet');
});

app.get('/haeKaikki', (req,res)=>varasto.haeKaikki()
    .then(tulostaulu=>res.render('elokuvat',{
        kieli: 'fi',
        otsikko: 'Hae kaikki',
        aihe: 'elokuvat',
        sarakeotsikot:['title','description','release_year'],
        tulostaulu,
        laheta: 'Lähetä tiedot',
        valikkoteksti: 'Valikko'
    }))
    .catch(virhe=>lahetaTilaviesti(res,virhe)));

app.listen(port, (err) => {
    if(err){
        return console.error(err)
    }
    console.log(`kuuntelee porttia ${port}`)
});