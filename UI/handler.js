localStorage.clear()
document.getElementById('sec-notif').style.transform = 'scale(0)'

function colormode(){
    if(document.getElementById('menu1').style.backgroundColor === 'white'){
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
        document.querySelector('.security-notification input').style.borderColor = 'white'
    } else{
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
        document.getElementById('sec-notif').style.color = 'black'
    }
}

function handler(value){
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
      case 404: {
      console.log('path was not valid')
      document.getElementsByClassName('btn-select')[0].children[0].innerHTML = 'No Folder selected'
      document.getElementById('path-ph').innerHTML = null
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
    .then(message => {
      console.log(message);
      // Handle the response as needed
    })
    .catch(error => console.error('Error:', error));
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
        console.log('TASK COMPLETED')
      }break;
    }
  })
  .then((mes) => {
    console.log(mes)
  })
  .catch((e) => {
    console.log(e)
  })
}

function recursivech(choice){
    fetch(`http://localhost:8000/recursion?METADATA=${JSON.stringify({"data": choice})}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      console.log(res)
    }).then((mes) => {

    }).catch((e) => {
      console.log(e)
    })
}