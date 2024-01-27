document.getElementById('sec-notif').style.transform = 'scale(0)'

try {
  console.log(localStorage.getItem("colormode"))
  colormode(localStorage.getItem("colormode"))
} catch (e) {colormode("light")}

function colorbridge(){
  if(document.getElementById('menu1').style.backgroundColor === 'white') colormode("dark")
  else colormode("light")
}

function colormode(pref){
    if(pref === 'dark'){
        localStorage.setItem("colormode", "dark")
        document.getElementById('filter').style.opacity = '70%'
        document.getElementById('menu1').style.backgroundColor = 'black'
        document.getElementById('sec-notif').style.backgroundColor = 'black'
        document.getElementById('warn-multichoice').style.backgroundColor = 'black'
        document.getElementById('warn-recursive').style.backgroundColor = 'black'
        document.getElementById('menu1').style.color = 'white'
        document.getElementById('warn-multichoice').style.color = 'white'
        document.getElementById('warn-recursive').style.color = 'white'
        document.getElementById('btn-select').style.color = 'white'
        for(i = 0; i < document.getElementsByClassName('choice-rec').length; i++){
            document.getElementsByClassName('choice-rec')[i].style.color = 'white'
            document.getElementsByClassName('choice-rec')[i].style.backgroundColor = 'black'
        }
        document.getElementsByClassName('gg-dark-mode')[0].style.backgroundColor = 'black'
        document.getElementById('sec-notif').style.color = 'white'
        document.querySelector('.security-notification input').style.color = 'white'
        document.querySelector('.security-notification input').style.backgroundColor = 'black'
        document.querySelector('.security-notification input').style.borderColor = 'white';
        document.getElementById('sub-select1').style.backgroundColor = 'black'
        document.getElementById('sub-select1').style.borderColor = 'white'
        document.getElementById('sel-txt').style.color = 'white';
        //console.log(document.querySelector('.multiselect-wrapper').style)
        //document.querySelector('.multiselect-wrapper').classList.add('invert')
        //document.querySelector('.multiselect-wrapper').style.backgroundColor = 'black'
        try {
          document.querySelector('.multiselect-wrapper ul').style.backgroundColor = 'black';
        document.querySelector('.multiselect-wrapper ul').style.color = 'white';
        document.querySelector('.multiselect-list').style.color = 'white';
        document.querySelector('.multiselect-list').style.backgroundColor = 'black'; 
        } catch (e) {
          console.log(e)
        }
        document.getElementById('top-bar').classList.add('invert');
        document.getElementById('err-path').style.color = 'white'
        document.getElementById('error').style.color = 'white'
        document.getElementById('success').style.color = 'white';
        document.getElementById("notification").style.backgroundColor = 'black'
    } else if(pref === 'light'){
        localStorage.setItem("colormode", "light")
        document.getElementById('filter').style.opacity = '5%'
        document.getElementById('menu1').style.backgroundColor = 'white'
        document.getElementById('sec-notif').style.backgroundColor = 'white'
        document.getElementById('warn-multichoice').style.backgroundColor = 'white'
        document.getElementById('warn-recursive').style.backgroundColor = 'white'
        document.getElementById('menu1').style.color = 'black'
        document.getElementById('warn-multichoice').style.color = 'black'
        document.getElementById('warn-recursive').style.color = 'black'
        document.getElementById('btn-select').style.color = 'black'
        for(i = 0; i < document.getElementsByClassName('choice-rec').length; i++){
            document.getElementsByClassName('choice-rec')[i].style.color = 'black'
            document.getElementsByClassName('choice-rec')[i].style.backgroundColor = 'white'
        }
        document.getElementsByClassName('gg-dark-mode')[0].style.backgroundColor = null
        document.getElementById('sec-notif').style.color = 'black';
        document.getElementById('top-bar').classList.remove('invert');
        try {
          document.querySelector('.multiselect-wrapper').classList.remove('invert');
          document.querySelector('.multiselect-wrapper ul').style.backgroundColor = 'white';
          document.querySelector('.multiselect-wrapper ul').style.color = 'black';
          document.querySelector('.multiselect-list').style.color = 'black';
          document.querySelector('.multiselect-list').style.backgroundColor = 'white'; 
        } catch (e) {
          console.log(e)
        }
        document.getElementById('sub-select1').style.backgroundColor = 'white'
        document.getElementById('sub-select1').style.borderColor = 'black'
        document.getElementById('sel-txt').style.color = 'black';
        document.getElementById('err-path').style.color = 'black'
        document.getElementById('error').style.color = 'black'
        document.getElementById('success').style.color = 'black';
        document.getElementById("notification").style.backgroundColor = 'white'
    }
}

function handler(value){  
   console.log('entered')
    if(!value){
    document.getElementById('sec-notif').style.visibility = 'visible'
    document.getElementById('sec-notif').style.transform = 'scale(1)'
    document.getElementsByClassName('btn-select')[0].children[0].innerHTML = 'Folder selected'} 
    else{
        var path = document.getElementById('full-path').value
        document.getElementById('path-ph').innerHTML = path
        document.getElementById('sec-notif').style.transform = 'scale(0)'

        var metadata = {"data": path}

        fetch(`http://localhost:8000/request?METADATA=${JSON.stringify(metadata)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      console.log(response)
    switch(response.status){
      case 220: {
      console.log('path was not valid')
      document.getElementsByClassName('btn-select')[0].children[0].innerHTML = 'No Folder selected'
      document.getElementById('path-ph').innerHTML = null;
      document.getElementById('sec-notif').style.transform = 'scale(0)'
      document.getElementById('sec-notif').style.visibility = 'hidden'
        document.getElementById('notification').style.display = 'block';
        document.getElementById('err-path').style.display = 'block';
        document.getElementById('notification').style.opacity = '100%';
        setTimeout(() => {
        document.getElementById('notification').style.opacity = '0%';
        setTimeout(() => {
          document.getElementById('err-path').style.display = 'none';
          document.getElementById('notification').style.display = 'none';
          window.location.reload()
        }, 500)
        }, 2000)
      }break;
      case 205: {
        console.log('path was valid')
      }break;
      case 201: {
        $.getJSON('http://localhost:8000/request', (data) => {
          const folders = JSON.parse(data.message)
          //console.log(folders)
          folders.forEach((str) => {
            var strchoice = document.createElement('option')
            strchoice.text = str
            strchoice.value = str
            document.getElementById('Multidirselect').add(strchoice)
          })
          document.multiselect('#Multidirselect');
          document.getElementById('menu1').style.display = 'none'
          document.getElementById('warn-multichoice').style.display = 'block'
        })
      }break;
    }
  })
    .catch(error => {console.error('Error:', error); error()});
    }
}

function Multidirres(){
  var choices = []
  for(i = 0; i < document.querySelector('.Multidirselect').children.length; i++){
    if(document.querySelector('.Multidirselect').children[i].selected){
      choices.push(document.querySelector('.Multidirselect').children[i].value)
    }
  } 
  console.log(choices)
  fetch(`http://localhost:8000/multichoice?METADATA=${JSON.stringify({"data": choices})}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    console.log(res)
    
    switch(res.status){
      case 205: {
        console.log('PATH IS RECURSVE')
        document.getElementById('warn-multichoice').style.display = 'none'
        document.getElementById('warn-recursive').style.display = 'block'
      }break;

      case 201: {
        success()
      }break;
    }
  })
  .catch((e) => {
    console.log(e);
    error()
  })
}

function recursivech(choice){
    fetch(`http://localhost:8000/recursion?METADATA=${JSON.stringify({"data": choice})}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if(res.status === 200){
        success()
      } else{
        error()
      }
    }).catch((e) => {
      console.log(e)
      error()
    })
}

function error(){
        document.getElementById('notification').style.display = 'block';
        document.getElementById('error').style.display = 'block';
        document.getElementById('notification').style.opacity = '100%';
        setTimeout(() => {
        document.getElementById('notification').style.opacity = '0%';
        setTimeout(() => {
          document.getElementById('notification').style.display = 'none';
          document.getElementById('error').style.display = 'none';
        }, 1000)
        }, 3000)
}

function success(){
  document.getElementById('notification').style.display = 'block';
        document.getElementById('success').style.display = 'block';
        document.getElementById('notification').style.opacity = '100%';
        setTimeout(() => {
        document.getElementById('notification').style.opacity = '0%';
        setTimeout(() => {
          document.getElementById('notification').style.display = 'none';
          document.getElementById('success').style.display = 'none';
        }, 1000)
        }, 3000)
}