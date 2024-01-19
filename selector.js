const prompts = require('prompts');
prompts.override(require('yargs').argv);
const fs = require('fs')
var dirs = []
var choices
var initialchoices
var response;

function dirsarray(dir){
    choices = []
    initialchoices = []
fs.readdirSync(dir).forEach((value) => {
    if(fs.statSync(dir + '\\' + value).isDirectory()){
        dirs.push(value)
        var json = {
            "title": value,
            "value": value
        }
        choices.push((json))
        initialchoices.push(json)
    }
})}
dirsarray(__dirname)
initialchoices.push(
    {"title": "Current folder", "value": __dirname},
    {"title": "Other folder", "value": "other"}
)

module.exports = {
    initial: async function initial(){
            response = await prompts([
                {
                    type: 'select',
                    name: 'targetdir',
                    message: '\n\nchoose which folder do you want to transform',
                    choices: initialchoices
                }
            ])
            if(response.targetdir === 'other'){
                response = await prompts([
                    {
                        type: 'text',
                        name: 'targetdir',
                        message: '\n\nPlease type the exact path of the dir you want to transform'
                    }
                ])
            }
            return response.targetdir
        
        
        
    },

    direxception: async function direxception(EXCEPTIONdir){
        dirsarray(EXCEPTIONdir)
            response = await prompts([
                {
                    type: 'select',
                    name: 'dirconfirmation',
                    message: '\n\nThere seems to be multiple sub folders inside the targetted folder.\n Enable chain transformation?',
                    choices: [
                        {title: 'yes', value: true},
                        {title: 'no', value: false}
                    ]
                }
            ])
            if(response.dirconfirmation){
                response = await prompts([
                    {
                        type: 'multiselect',
                        name: 'dirselect',
                        message: '\n\nChoose which of the folowing folders you which to transform',
                        choices: (choices)
                    },
                    {
                        type: 'select',
                        name: 'rchoice',
                        message: '\n\nDo you want the program to scan every chosen subfolders and\n their contents?',
                        choices: [
                            {title: 'yes', value: true},
                            {title: 'no', value: false}
                        ]
                    }
                ])
                //console.log(response)
                return response
            }else{
                return response.dirconfirmation
            }
    }
}