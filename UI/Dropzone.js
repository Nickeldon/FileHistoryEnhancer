var count = 0;
var action = "addedfiles";
const myDropzone = new Dropzone("#drop-zone", {
  url: "http://localhost:8000/returnrequest",
  init: () => {
  },
  autoProcessQueue: false,
});

myDropzone.on("addedfiles", (dir) => {
  let path = [];
  console.log(dir);
  count++;
  if (count === 1) {
    document.querySelector(".droptxt h4").style.color = "transparent";
    document.querySelector(".droptxt h5").style.color = "transparent";
    Object.entries(dir).forEach((file) => {
      if (!getExt(file[1].path)) {
        path.push(file[1].path);
      } else {
        if (!path.includes(getParentdir(file[1].path)))
          path.push(getParentdir(file[1].path));
      }
    });
    console.log(path);
    handler(path);
    myDropzone.removeAllFiles(true);
  }
  return null;
});

function getExt(path) {
  let result = path.split(".");
  result.length > 1 ? (result = result.pop()) : (result = undefined);
  return result;
}

function getParentdir(path) {
  try {
    return path.split("\\").slice(0, -1).join("\\");
  } catch (e) {
    console.log(e);
  }
}
