const express = require('express');
const cors = require('cors');
const PORT = 8000;
const fs = require('fs')
const app = express();
var path
var multidirs
var ans
const transform = require('./transformator').ReadFile

app.use(cors())

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
}).on('error', () => {
    console.log('port already used')
    process.exit(1)
});   

app.post('/returnrequest', (req, res, next) => {
    console.log('Request returned')
    res.sendStatus(200)
})

app.get('/request', (req, res, next) => {
    try {
        path = JSON.parse(req.query.METADATA).data   
    } catch (e) {
        console.log(e)
    }

    console.log('Received data:', path);

    if(path){
    if(isTransformable(path)){
    if(VerifyPath(path)){
        var data = MultidirVerif(path)
        if(data[0]){
            const folders = data[1]
            res.status(201).json({message: JSON.stringify(folders), status: 201})
        }else{
            transform(path, false).then(() => {
                res.sendStatus(205)
            }).catch((err) => {
                console.log(err)
            })
        }
    }else{
        res.sendStatus(220)
    }} else{
        res.sendStatus(230)
    }
}
});

app.get('/multichoice', (req, res, next) => {
    try {
        multidirs = JSON.parse(req.query.METADATA).data
    } catch (e) {
        console.log(e)
    }
    
    if(isrecursive(path, multidirs)){
        console.log('Ask for recursion')
        res.sendStatus(205)
    } else{
        multidirs.forEach((data) => {
            (async() => transform(`${path}\\${data}`, false))()
        })
        console.log('Complete request')
        res.sendStatus(201)
    }
})

app.get('/recursion', (req, res, next) => {
    try {
        ans = JSON.parse(req.query.METADATA).data
    } catch (e) {
        console.log(e)
    }

    if(ans){
        multidirs.forEach((data) => {
            if(data !== ""){
            (async() => transform(`${path}\\${data}`, true))()}
            else{
                (async() => transform(`${path}\\${data}`, false))()
            }
        })
        res.sendStatus(200)
        console.log('DO RECURSIVE TRANSFORMATION')
    } else{
        multidirs.forEach((data) => {
            if(data !== ""){
            (async() => transform(`${path}\\${data}`, false))()}
        })
            res.sendStatus(200)
        console.log('DO SIMPLE TRANSFORMATION')
    }
})

function isrecursive(path, dirnames){
    var multidirbool = false
    dirnames.forEach((name) => {
        fs.readdirSync(`${path}\\${name}`).forEach((dir) => {
            if(fs.statSync(`${path}\\${name}\\${dir}`).isDirectory()){
                multidirbool = true
            }
        })
    })
    return multidirbool
}

function isTransformable(path){
    try {
        if(!fs.readdirSync(path).length > 0) return false
        else return true
    } catch (e) {
        console.log(e)
        return false
    }
}

function MultidirVerif(path){
    var folders = []
    var multidirbool = false
    try {
        fs.readdirSync(path).forEach(temp => {
            if(fs.statSync(`${path}\\${temp}`).isDirectory()){
                folders.push(temp)
                multidirbool = true
            }
        })   
    } catch (e) {
        console.log(e)
        return false
    }
    return [multidirbool, folders]
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