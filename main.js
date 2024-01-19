const fs = require('fs')
const path = require('path')
const dir = __dirname

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

        if(!fs.statSync(element).isDirectory()){
            validelem.push(element)
        //Verify if element actually has to be modified
        if(element.split(regex)[1] === undefined){
           var nullType = element.split(/\./)[1]
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
        if(element[1] !== undefined){
            var elementType = element[1]
        }
            //Useless
        else if(nullType !== undefined){
            var elementType = nullType
        }
        //Useless
        else{
            console.log(nullType)
        }
        
        /*FIXES a bug where element was considered
            a String which only returned the first character of the file name 
            instead of the full proper file name*/
        if(typeof element === 'object'){
            element = element[0]
        }
        else{
            //If element is String, just return it :skull:...
            element = element
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
        //console.log(elementarray[i])

        //Verifies every element before filenames[i]
        for(k = i + 1; k < elementarray.length; k++){
            var var1 = elementarray[i]
            var var2 = elementarray[k]
            if(var1 == var2){
                count++
            }
        }
        //"If element was just introduced, keep it unchainged"
        //console.log(elementarray[i])
        if(count > 0){
            elementarray[i] += ` (${count})`
        }
    
    }
    //Yes
    console.log(elementarray)
    var countedmodifer = 0

    //Passes through the directory once again to modify the file names
    validelem.forEach(value => {
        if(!fs.statSync(value).isDirectory()){
        try{
            if(value !== elementarray[countedmodifer]){
                fs.statSync(dir + '\\' + value)

                //You already should have an idea of what is happening there
                fs.renameSync(dir + '\\' + value, dir + '\\' + elementarray[countedmodifer] + fileTypes[countedmodifer])
        }}
        catch(e){
            console.error("There is nothing we can do... I messed up",value)
        }
        countedmodifer++}
    })
}

ReadFile(dir)