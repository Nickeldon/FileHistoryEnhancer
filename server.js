const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8000;
const fs = require('fs')
const app = express();
var path

app.use(cors())
app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});

app.get('/request', (req, res, next) => {
    try {
        path = JSON.parse(req.query.METADATA).data   
    } catch (e) {
        console.log(e)
    }

    console.log('Received data:', path);

    if(path){
    if(VerifyPath(path)){
        if(MultidirVerif(path)){
            res.send('MULTIPLE FOLDERS')
            //res.sendStatus(201)
        }else{
            res.sendStatus(205)
        }
    }else{
        res.sendStatus(404)
    }}
});

app.get('/multichoice', (req, res, next) => {
    
})

function MultidirVerif(path){
    var multidirbool = false
    try {
        console.log('passed')
        fs.readdirSync(path).forEach(temp => {
            if(fs.statSync(`${path}\\${temp}`).isDirectory()){
                multidirbool = true
            }
        })   
    } catch (e) {
        console.log(e)
        return false
    }
    return multidirbool
}

function VerifyPath(path){
    try {
        if(fs.existsSync(path)){
            return true
        }else{
            return false
        }
    } catch (e) {
        return false
    }
}