const fs = require('fs')
var filenames

var regex = /\s\(\d{4}_\d{2}_\d{2}\s\d{2}_\d{2}_\d{2}\sUTC\)/


module.exports = {
    ReadFile: function ReadFile(dir, rchoice) {
        try{
            filenames = fs.readdirSync(dir, {recursive: rchoice})
        }catch(e){
            console.error("There is nothing we can do... I messed up",e)
        }
           var elementarray = []
           var fileTypes = []
           var validelem = []
        filenames.forEach(element => {
            
            if(!fs.statSync(`${dir}\\${element}`).isDirectory()){
                var continuebool = true
                validelem.push(element)
            //Verify if element actually has to be modified
            if(element.split(regex)[1] === undefined){
               /*element = element.split(/\./)
               element[1] = `.${element[1]}`*/
               console.log('ignore', element)
               continuebool = false
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
            if(element !== undefined && continuebool){
                //console.log(element[1])
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
            if(elementType){
                //console.log(elementType)
            fileTypes.push(elementType)}
            else fileTypes.push(undefined)
        }
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
        //console.log(validelem)
        //console.log(elementarray)
        //console.log(fileTypes)
        validelem.forEach(value => {
            if(!fs.statSync(dir + '\\' + value).isDirectory()){
            try{
                fs.statSync(dir + '\\' + value)
    
                    //You already should have an idea of what is happening there
                    if(value !== elementarray[countedmodifer] + fileTypes[countedmodifer] && fileTypes[countedmodifer]){
                    fs.renameSync(dir + '\\' + value, dir + '\\' + elementarray[countedmodifer] + (fileTypes[countedmodifer].split(".")[1] !== 'undefined' && fileTypes ? fileTypes[countedmodifer] : ""))
                }
            }
            catch(e){
                console.error("There is nothing we can do... I messed up", e)
            }
            countedmodifer++}
        })
    }
}