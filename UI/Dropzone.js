var path;
var count = 0
var action = "addedfiles"
const myDropzone = new Dropzone("#drop-zone", {
    maxFiles: 39999,
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
        console.log('passed')
        path = dir[0].path
        console.log(path)
        handler(path)
        myDropzone.removeAllFiles(true)
        return null
    }
    if(count > 1) return null
});