localStorage.clear()

function colormode(){
    if(document.getElementById('menu1').style.backgroundColor === 'white'){
        document.getElementById('filter').style.opacity = '70%'
        document.getElementById('menu1').style.backgroundColor = 'black'
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
    } else{
        document.getElementById('filter').style.opacity = '5%'
        document.getElementById('menu1').style.backgroundColor = 'white'
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
    }
}

function handler(){
    document.getElementsByClassName('btn-select')[0].children[0].innerHTML = 'Folder selected'
    var files = []
    var metadata
    files.push(document.getElementById('div-select').files)
    document.getElementById('path-ph').innerHTML = 'C://example/FileHistory'
    files.forEach(element => {
        console.log(element)
    });
    console.log(document.getElementById('div-select'))
}

function recursivech(choice){
    if(choice){
        
    }else{

    }
}