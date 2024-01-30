var path;
var count = 0


const myDropzone = new Dropzone("#drop-zone", {
    maxFiles: 39999,
    url: "http://localhost:8000/returnrequest",
    init: function() {
        this.hiddenFileInput.setAttribute("webkitdirectory", true);
    },
});

myDropzone.on("addedfiles", (dir) => {
    
    path = dir[0].path
    document.querySelector('.dropzone h4').style.color = 'transparent'
    document.querySelector('.dropzone h5').style.color = 'transparent'
  // Add an info line about the added file for each file.
    console.log(dir)
});

myDropzone.on("complete", () => {
    count++
    if(count === 1){
    handler(path)}
})