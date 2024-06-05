//document.getElementById('sec-notif').style.transform = 'scale(0)'
document.getElementById("menu1").classList.add("fade");
document.getElementById("refresh-btn").classList.add("fade");
document.getElementById("warn-multichoice").classList.add("fade");
document.getElementById("warn-recursive").classList.add("fade");
//document.getElementById('refresh').classList.remove('fade')

colormode(localStorage.getItem("colormode") || "light");

function colorbridge() {
  console.log("entered");
  if (document.getElementById("menu1").style.backgroundColor === "white")
    colormode("dark");
  else colormode("light");
}

function colormode(pref) {
  if (pref === "dark") {
    localStorage.setItem("colormode", "dark");
    document.getElementById("back_warn_anim-parent").style.backgroundColor =
      "#2c2c2c";
    document.getElementById("warn_mes_child").style.backgroundColor = "#2c2c2c";
    document.getElementById("warn_mes_content").style.color = "white";
    document.querySelector("#btn_approval button").style.color = "whitesmoke";
    document.querySelector("#btn_approval button").style.borderColor =
      "whitesmoke";

    Object.entries(document.getElementsByClassName("warn_bumps")).forEach(
      (bump) => {
        bump[1].style.backgroundColor = "#2c2c2c";
      }
    );

    document.getElementById("filter").style.opacity = "70%";
    document.getElementById("menu1").style.backgroundColor = "black";
    document.getElementById("refresh-btn").classList.add("invert");
    //document.getElementById('sec-notif').style.backgroundColor = 'black'
    document.getElementById("warn-multichoice").style.backgroundColor = "black";
    document.getElementById("warn-recursive").style.backgroundColor = "black";
    document.querySelectorAll("h4").forEach((elems) => {
      elems.style.color = "white";
    });
    document.querySelectorAll("h5").forEach((elems) => {
      elems.style.color = "white";
    });
    document.getElementById("warn-multichoice").style.color = "white";
    document.getElementById("warn-recursive").style.color = "white";
    document
      .getElementById("warn-multichoice")
      .classList.add("scrl-bar-drk-mode");

    for (i = 0; i < document.getElementsByClassName("choice-rec").length; i++) {
      document.getElementsByClassName("choice-rec")[i].style.color = "white";
    }
    document.getElementsByClassName("gg-dark-mode")[0].style.backgroundColor =
      "black";
    document.getElementById("sub-select1").style.backgroundColor = "black";
    document.getElementById("sub-select1").style.borderColor = "white";
    document.getElementById("sel-txt").style.color = "white";
    try {
      document.querySelector(".multiselect-wrapper ul").style.backgroundColor =
        "black";
      document.querySelector(".multiselect-wrapper ul").style.color = "white";
      document.querySelector(".multiselect-list").style.color = "white";
      document.querySelector(".multiselect-list").style.backgroundColor =
        "black";
      document.querySelector(
        ".multiselect-input-div input"
      ).style.backgroundColor = "black";
      document.querySelector(".multiselect-input-div input").style.color =
        "white";
    } catch (e) {
      console.log(e);
    }
    document.getElementById("top-bar").classList.add("invert");
    document.getElementById("err-path").style.color = "white";
    document.getElementById("error").style.color = "white";
    document.getElementById("success").style.color = "white";
    document.getElementById("empt-path").style.color = "white";
    document.getElementById("inform-err").classList.add("invert");
    document.getElementById("notification").style.backgroundColor = "black";

    document.querySelector(".dropzone").style.backgroundColor = "black";
    document.querySelector(".dropzone").style.color = "white";
    document.querySelectorAll(".dz-image").forEach((elem) => {
      elem.classList.add("invert");
    });

    document.querySelectorAll(".dz-details").forEach((elem) => {
      elem.classList.add("invert");
    });
  } else if (pref === "light") {
    localStorage.setItem("colormode", "light");
    document.getElementById("back_warn_anim-parent").style.backgroundColor =
      "white";
    document.getElementById("warn_mes_child").style.backgroundColor = "white";
    document.getElementById("warn_mes_content").style.color = "black";
    document.querySelector("#btn_approval button").style.color = "black";
    document.querySelector("#btn_approval button").style.borderColor = "black";

    Object.entries(document.getElementsByClassName("warn_bumps")).forEach(
      (bump) => {
        bump[1].style.backgroundColor = "white";
      }
    );

    document.getElementById("filter").style.opacity = "5%";
    document.getElementById("menu1").style.backgroundColor = "white";
    document.getElementById("refresh-btn").classList.remove("invert");
    //document.getElementById('sec-notif').style.backgroundColor = 'white'
    document.getElementById("warn-multichoice").style.backgroundColor = "white";
    document.getElementById("warn-recursive").style.backgroundColor = "white";
    document.querySelectorAll("h4").forEach((elems) => {
      elems.style.color = "black";
    });
    document.querySelectorAll("h5").forEach((elems) => {
      elems.style.color = "black";
    });
    document.getElementById("warn-multichoice").style.color = "black";
    document.getElementById("warn-recursive").style.color = "black";
    document
      .getElementById("warn-multichoice")
      .classList.remove("scrl-bar-drk-mode");
    //document.getElementById('btn-select').style.color = 'black'
    document.querySelector(".dropzone").style.backgroundColor = "white";
    document.querySelector(".dropzone").style.color = "black";
    document.querySelectorAll(".dz-image").forEach((elem) => {
      elem.classList.remove("invert");
    });

    document.querySelectorAll(".dz-details").forEach((elem) => {
      elem.classList.remove("invert");
    });

    //document.querySelector('.dz-details').style.backgroundColor = 'black'
    for (i = 0; i < document.getElementsByClassName("choice-rec").length; i++) {
      document.getElementsByClassName("choice-rec")[i].style.color = "black";
    }
    document.getElementsByClassName("gg-dark-mode")[0].style.backgroundColor =
      null;
    //document.getElementById('sec-notif').style.color = 'black';
    document.getElementById("top-bar").classList.remove("invert");
    try {
      document.querySelector(".multiselect-wrapper").classList.remove("invert");
      document.querySelector(".multiselect-wrapper ul").style.backgroundColor =
        "white";
      document.querySelector(".multiselect-wrapper ul").style.color = "black";
      document.querySelector(".multiselect-list").style.color = "black";
      document.querySelector(".multiselect-list").style.backgroundColor =
        "white";
      document.querySelector(
        ".multiselect-input-div input"
      ).style.backgroundColor = "#fff";
      document.querySelector(".multiselect-input-div input").style.color =
        "black";
    } catch (e) {
      console.log(e);
    }
    document.getElementById("sub-select1").style.backgroundColor = "white";
    document.getElementById("sub-select1").style.borderColor = "black";
    document.getElementById("sel-txt").style.color = "black";
    document.getElementById("err-path").style.color = "black";
    document.getElementById("error").style.color = "black";
    document.getElementById("empt-path").style.color = "black";
    document.getElementById("inform-err").classList.remove("invert");
    document.getElementById("icn-err").classList.remove("invert");
    document.getElementById("success").style.color = "black";
    document.getElementById("notification").style.backgroundColor = "white";
  }
}

function handler(value) {
  console.log(value);
  let metadata = { data: null };

  if (value.length > 0) {
    value.forEach((val) => {
      metadata["data"] = val;
      startProcess(metadata);
    });
    return 0;
  } else {
    if (value) {
      metadata["data"] = value;
      startProcess(metadata);
    }
    return 0
  }

  function startProcess(metadata) {
    fetch(
      `http://localhost:8000/request?METADATA=${JSON.stringify(metadata)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        switch (response.status) {
          case 230:
            {
              reloaderJS("./Addons/Dropzone/min/dropzone-min.js");
              //reloaderCSS('./node_modules/dropzone/dist/min/dropzone.min.css')
              document.getElementById("notification").style.width = "350px";
              document.getElementById("notification").style.display = "block";
              document.getElementById("empt-path").style.display = "block";
              document.getElementById("notification").style.opacity = "100%";
              colormode(localStorage.getItem("colormode"));
              setTimeout(() => {
                document.getElementById("notification").style.opacity = "0%";
                setTimeout(() => {
                  document.getElementById("droptxt").style.display = "block";
                  document.getElementById("empt-path").style.display = "none";
                  document.getElementById("notification").style.display =
                    "none";
                  if (
                    document.getElementById("menu1").style.backgroundColor ===
                    "white"
                  ) {
                    console.log("passed");
                    document.querySelector(".droptxt h4").style.color = "white";
                    document.querySelector(".droptxt h5").style.color = "white";
                  } else {
                    console.log("or is it?");
                    document.querySelector(".droptxt h4").style.color = "black";
                    document.querySelector(".droptxt h5").style.color = "black";
                  }
                  setTimeout(() => {
                    //window.location.reload()
                  }, 1000);
                  document.getElementById("notification").style.width = "250px";
                }, 500);
              }, 2000);
            }
            break;

          case 220:
            {
              document.getElementById("notification").style.display = "block";
              document.getElementById("err-path").style.display = "block";
              document.getElementById("notification").style.opacity = "100%";
              setTimeout(() => {
                document.getElementById("notification").style.opacity = "0%";
                setTimeout(() => {
                  document.getElementById("err-path").style.display = "none";
                  document.getElementById("notification").style.display =
                    "none";
                  //window.location.reload()
                }, 500);
              }, 2000);
            }
            break;
          case 205:
            {
              success();
              setTimeout(() => {
                document.getElementById("main").classList.add("blur");
                setTimeout(() => {
                  document.getElementById("refresh").style.display = "block";
                  document.getElementById("refresh").classList.remove("fade");
                }, 600);
              }, 500);
            }
            break;
          case 201:
            {
              $.getJSON("http://localhost:8000/request", (data) => {
                const folders = JSON.parse(data.message);
                folders.forEach((str) => {
                  var strchoice = document.createElement("option");
                  strchoice.text = str;
                  strchoice.value = str;
                  document.getElementById("Multidirselect").add(strchoice);
                });
                document.multiselect("#Multidirselect");
                colormode(localStorage.getItem("colormode"));
                document.getElementById("menu1").style.display = "none";
                document.getElementById("warn-multichoice").style.display =
                  "block";
              });
            }
            break;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        error();
      });
  }
}

function Multidirres() {
  var choices = [];
  for (
    i = 0;
    i < document.querySelector(".Multidirselect").children.length;
    i++
  ) {
    if (document.querySelector(".Multidirselect").children[i].selected) {
      choices.push(document.querySelector(".Multidirselect").children[i].value);
    }
  }
  fetch(
    `http://localhost:8000/multichoice?METADATA=${JSON.stringify({
      data: choices,
    })}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      switch (res.status) {
        case 205:
          {
            document.getElementById("warn-multichoice").style.display = "none";
            document.getElementById("warn-recursive").style.display = "block";
          }
          break;

        case 201:
          {
            success();
            setTimeout(() => {
              document.getElementById("main").classList.add("blur");
              setTimeout(() => {
                document.getElementById("refresh").style.display = "block";
                document.getElementById("refresh").classList.remove("fade");
              }, 600);
            }, 500);
          }
          break;
      }
    })
    .catch((e) => {
      console.log(e);
      error();
    });
}

function recursivech(choice) {
  fetch(
    `http://localhost:8000/recursion?METADATA=${JSON.stringify({
      data: choice,
    })}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.status === 200) {
        success();
        setTimeout(() => {
          document.getElementById("main").classList.add("blur");
          setTimeout(() => {
            document.getElementById("refresh").style.display = "block";
            document.getElementById("refresh").classList.remove("fade");
          }, 600);
        }, 500);
      } else {
        error();
      }
    })
    .catch((e) => {
      console.log(e);
      error();
    });
}

function error() {
  document.getElementById("notification").style.display = "block";
  document.getElementById("error").style.display = "block";
  document.getElementById("notification").style.opacity = "100%";
  setTimeout(() => {
    document.getElementById("notification").style.opacity = "0%";
    setTimeout(() => {
      document.getElementById("notification").style.display = "none";
      document.getElementById("error").style.display = "none";
    }, 1000);
  }, 3000);
}

function success() {
  document.getElementById("notification").style.display = "block";
  document.getElementById("success").style.display = "block";
  document.getElementById("notification").style.opacity = "100%";
  setTimeout(() => {
    document.getElementById("notification").style.opacity = "0%";
    setTimeout(() => {
      document.getElementById("notification").style.display = "none";
      document.getElementById("success").style.display = "none";
    }, 1000);
  }, 3000);
}
