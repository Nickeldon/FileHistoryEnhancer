const prompts = require('prompts');
prompts.override(require('yargs').argv);
const fs = require('fs')
var dirs = []
var choices = []
var initialchoices = []
var response
var choosendir = __dirname

fs.readdirSync(choosendir).forEach((value) => {
    if(fs.statSync(value).isDirectory()){
        dirs.push(value)
        var json = {
            "title": value,
            "value": value
        }
        choices.push((json))
        initialchoices.push(json)
    }
})
initialchoices.push(
    {"title": "Current dir", "value": __dirname},
    {"tilte": "Separate dir", "value": "other"})

module.exports = {
    initial: async function initial(){
            response = await prompts([
                {
                    type: 'select',
                    name: 'targetdir',
                    message: 'choose which folder do you want to transform',
                    choices: initialchoices
                }
            ])
            if(response.targetdir === 'other'){
                response = await prompts([
                    {
                        type: 'text',
                        name: 'targetdir',
                        message: 'Please type the exact path of the dir you want to transform'
                    }
                ])
            }
            return response.targetdir
        
        
        
    },

    direxception: function direxception(){
        (async() => {
            response = await prompts([
                {
                    type: 'select',
                    name: 'dirconfirmation',
                    message: 'There seems to be multiple sub folders inside the targetted folder.\n Enable chain transformation?',
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
                        message: 'Choose which of the folowing folders you which to transform',
                        choices: (choices)
                    }
                ])
                console.log(response)
                return response.dirselect
            }else{
                return response.dirconfirmation
            }
        })()
    }
}