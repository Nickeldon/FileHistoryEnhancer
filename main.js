const fs = require('fs')
const selector = require('./selector')
const ReadFile = require('./transformator').ReadFile
const exceptdir = selector.direxception
const initialdir = selector.initial
var multidirbool = false;

var regex = /\s\(\d{4}_\d{2}_\d{2}\s\d{2}_\d{2}_\d{2}\sUTC\)/


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
                exceptdir(dir).then(response => {
                    var {arraydirs, recchoice, processdir} = []
                    arraydirs = response.dirselect
                    recchoice = response.rchoice
                    processdir = response.dirconfirmation
                    if(!processdir){
                        ReadFile(dir);
                    } else{
                        if(arraydirs && !recchoice){
                            arraydirs.forEach(val => {
                                console.log(`${dir}\\${val}`)
                                try{
                                    ReadFile(`${dir}\\${val}`, false)
                                }catch(e){
                                    console.error("There is nothing we can do... I messed up", e)
                                }
                            })
                            try{
                                ReadFile(dir, false)
                            }catch(e){
                                console.error("There is nothing we can do... I messed up", e)
                            }
                        } else if(recchoice && arraydirs){
                            arraydirs.forEach(val => {
                                ReadFile(dir + '\\' + val, true)
                            })
                        } else if(!arraydirs && !recchoice){
                            console.log(processdir)
                            console.warn("Provided dir does not exist or is not accessible.\nOperation aborted")
                            process.exit(1)
                        }
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