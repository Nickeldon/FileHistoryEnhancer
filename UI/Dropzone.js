var path = [];
var count = 0
var action = "addedfiles"
const myDropzone = new Dropzone("#drop-zone", {
    url: "http://localhost:8000/returnrequest",
    init: function() {
        this.hiddenFileInput.setAttribute("webkitdirectory", true);
    },
    autoProcessQueue: false
})

myDropzone.on("addedfiles", (dir) => {
    console.log(dir)
    count++
    if(count === 1){
    document.querySelector('.droptxt h4').style.color = 'transparent'
    document.querySelector('.droptxt h5').style.color = 'transparent'
    Object.entries(dir).forEach((file) => {
        if(!getExt(file[1].path)){
            console.log('passed')
            path.push(file.path)
            console.log(path)
            handler(path)
            return null
        }
        else{
            
            console.log('passed')
            path.push(getParentdir(file.path))
            console.log(path)
            handler(path)
            return null
        }
    })
    myDropzone.removeAllFiles(true)
    }
    if(count > 1) return null
});

function getExt(path){
    let result = path.split('.')
    result.length > 1 ? result = result.pop() : result = undefined
    return result
}

function getParentdir(path){
    try {
        return path.split('\\').slice(0, -1).join('\\')
    } catch (e) {
        console.log(e)
    }
}