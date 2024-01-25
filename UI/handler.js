localStorage.clear()
document.getElementById('sec-notif').style.transform = 'scale(0)'
document.getElementById('Multidirselect').click()
document.multiselect('#Multidirselect');

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
        
        console.log('There is multiple paths')
        document.getElementById('menu1').style.display = 'none'
        document.getElementById('Multidirselect').toggleAttribute()
        document.getElementById('warn-multichoice').style.display = 'block'
      }break;
    }
  })
    .then(message => {
      console.log(message);
      // Handle the response as needed
    })
    .catch(error => console.error('Error:', error));

        /*fetch(url, {
            method: 'GET',
          })
          .then(response => {console.log(response)})
          .then(data => {
            // Handle the transformed data received from the server
            console.log('Transformed Data:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });*/

        /*const xhttp = new XMLHttpRequest()
        xhttp.open("GET", tempurl, false)
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send()*/
        /*fetch(`http://localhost:5501/request?METADATA=${metadata}`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }).then(res => {
                res.json()
            console.log(res)})
            .then(mes => {
                console.log(mes)
            })
            .catch(err => {
                console.log('ERROR: ', err)
            })*/
    }
}

function recursivech(choice){
    if(choice){
      
        
    }else{

    }
}