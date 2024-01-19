const fs = require('fs')
const path = require('path')
const selector = require('./selector')
const exceptdir = selector.direxception
const initialdir = selector.initial
var multidirbool = false;

var regex = /\s\(\d{4}_\d{2}_\d{2}\s\d{2}_\d{2}_\d{2}\sUTC\)/

function ReadFile(dir) {
    try{
    var filenames = fs.readdirSync(dir)
    }catch(e){
        console.error("There is nothing we can do... I messed up",e)
    }
       var elementarray = []
       var fileTypes = []
       var validelem = []
    filenames.forEach(element => {
        
        if(!fs.statSync(`${dir}\\${element}`).isDirectory()){
            validelem.push(element)
        //Verify if element actually has to be modified
        if(element.split(regex)[1] === undefined){
           element = element.split(/\./)
           element[1] = `.${element[1]}`
        }
        else {
            element = element.split(regex)
        }
        
        /*
        DEBUG
        console.log(element)
        console.log(element[1])
        */
        
        //Verifies if element has valid file extension
        if(element !== undefined){
            var elementType = element[1]
        }
        
        /*FIXES a bug where element was considered
            a String which only returned the first character of the file name 
            instead of the full proper file name*/
        if(typeof element === 'object'){
            //console.log(element)
            element = element[0]
        }
        else{
            //console.log('EXCEPTION: ',element)
        }
        
        //Adds transformed element to previously created array (ln.11)
        elementarray.push(element)

        //Creates a backup of every file extension
        if(elementType !== undefined){
        fileTypes.push(elementType)}}
    });  
    /*
    DEBUG
    console.log(filenames)
    console.log(elementarray)
    */
    
    //Verifies how many times a certain file name was repeated over the directory (First element is unchanged)
    for(i = elementarray.length - 1; i >= 0; i--){
        var count = 0
        /*
        DEBUG
        //console.log(elementarray[i])
        //console.log(elementarray[i], fileTypes[i])
        */
        //Verifies every element before filenames[i]
        for(k = i + 1; k < elementarray.length; k++){
            var var1 = elementarray[i].split(" (")[0]
            var var2 = elementarray[k].split(" (")[0]
            var ext1 = fileTypes[i]
            var ext2 = fileTypes[k]
            if(var1 === var2 && ext1 === ext2){
                count++
            }
        }
        //"If element was just introduced, keep it unchainged"
        if(count > 0){
            elementarray[i] += ` (${count})`
        }
    
    }
    /*
    DEBUG
    console.log(elementarray)
    */
    //console.log(elementarray)
    var countedmodifer = 0
    //Passes through the directory once again to modify the file names
    validelem.forEach(value => {
        if(!fs.statSync(value).isDirectory()){
        try{
            fs.statSync(dir + '\\' + value)

                //You already should have an idea of what is happening there
                if(value !== elementarray[countedmodifer] + fileTypes[countedmodifer]){
                fs.renameSync(dir + '\\' + value, dir + '\\' + elementarray[countedmodifer] + fileTypes[countedmodifer])}
        }
        catch(e){
            console.error("There is nothing we can do... I messed up", e)
        }
        countedmodifer++}
    })
}

initialdir().then((value) => {
    dir = value;
    if(dir){
        if(!fs.existsSync(dir)){
            console.warn("Provided dir does not exist or is not accessible.\nOperation aborted")
            process.exit(1)
        }
        else{
            fs.readdirSync(dir).forEach(temp => {
                if(fs.statSync(`${dir}\\${temp}`).isDirectory()){
                    multidirbool = true
                }
            })   
            if(!multidirbool){ ReadFile(dir); console.log("done")}
            else{
                exceptdir(dir).then(arraydirs => {
                    if(arraydirs !== false && arraydirs){
                    arraydirs.forEach(val => {
                        console.log(`${dir}\\${val}`)
                        try{
                            ReadFile(`${dir}\\${val}`)
                        }catch(e){
                            console.error("There is nothing we can do... I messed up", e)
                        }
                    })}
                    try{
                        ReadFile(dir)
                    }catch(e){
                        console.error("There is nothing we can do... I messed up", e)
                    }
                    console.log("done")
                })
            }
            
        }
    }else{
        console.warn("Provided dir does not exist or is not accessible.\nOperation aborted")
        process.exit(1)
    }
})