var path;
var count = 0
var action = "addedfiles"
const myDropzone = new Dropzone("#drop-zone", {
    maxFiles: 39999,
    url: "http://localhost:8000/returnrequest",
    init: function() {
        this.hiddenFileInput.setAttribute("webkitdirectory", true);
    },
});

myDropzone.on("addedfiles", (dir) => {
    if(count > 1) return null
    path = dir[0].path
    document.querySelector('.dropzone h4').style.color = 'transparent'
    document.querySelector('.dropzone h5').style.color = 'transparent'
    setTimeout(() => {
        document.getElementById('droptxt').style.display = 'none'
    }, 1000)
});

myDropzone.on("complete", () => {
    count++
    if(count === 1){
    handler(path)
}
})