const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 8000;
const fs = require('fs')
const app = express();
app.use(cors())
app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
});

app.get('/request', (req, res, next) => {
    var path = JSON.parse(req.query.METADATA).data
    console.log('Received data:', path);
    if(VerifyPath(path)){
        res.send('valid path')
    }else{
        res.sendStatus(404)
    }
});

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