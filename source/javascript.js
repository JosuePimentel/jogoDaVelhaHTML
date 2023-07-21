const tables = document.querySelectorAll('div.jogo > span')
let vez 
let velha 
let over 
let last 
let winX = 0
let winO = 0
let XDOM = document.querySelector('#placar-x span#placar_')
let ODOM = document.querySelector('#placar-o span#placar_')
let SecDOM = document.querySelector('#placar-time span#sec')
let MinDOM = document.querySelector('#placar-time span#min')
let timeSec = 0
let timeMin = 0

setInterval( () => {
    timeSec++
    if(timeSec == 60) {
        timeMin++
        timeSec = 0
    }
    // console.log(timeMin, timeSec)
    SecDOM.innerText = timeSec
    MinDOM.innerText = `0${timeMin}`
}, 1000 )
// par -> X
// impar -> O

function inicioGame() {
    vez = random(0,1)
    velha = vez + 9
    over = 0
    last = ''
    
    tables.forEach(e => {
        e.innerText = ''
    })

    document.querySelector('.over span').innerText = 'The games over!'
    
}
inicioGame()

function random(min, max) {
    return Math.round(Math.random(min, max))
}

tables.forEach((ele) => {
    ele.addEventListener('click', e => {
        const table = e.target
        const row = table.getAttribute('row')
        const column = table.getAttribute('column') 
        preencherGame(table)
        verLinha(row)
        verColuna(column)
        verDiag()
        const btnOver = document.querySelector('.over')

        if(over || vez >= velha) {
            overGame(last, row, column, vez)
            if(vez >= velha && !last) document.querySelector('.over span').innerText = 'O jogo deu velha!'
            setTimeout(() => {
                btnOver.classList.add('show')
            }, 2500)
        }
    })
})


function preencherGame(ele) {
    if(vez%2 == 0 && !ele.innerText) {
        ele.innerText = 'X'
        vez++
    } else if(!ele.innerText) {
        ele.innerText = 'O'
        vez++
    }
}


function verLinha(row) {
    const table = new Array
    for (let column = 1; column <= 3; column++) {
        table.push(document.querySelector(`div.jogo > span[column="${column}"][row="${row}"]`).innerText)
    }
    if(table[0] == table[1] && table[1] == table[2]) {
        over++
        last = "Lin"
    }
}

function verColuna(column) {
    const table = new Array
    for (let row = 1; row <= 3; row++) {
        table.push(document.querySelector(`div.jogo > span[row="${row}"][column="${column}"]`).innerText)
    }
    if(table[0] == table[1] && table[1] == table[2]) {
        over++
        last = "Col"
    }
}

function verDiag() {
    const tableDiag = new Array
    const tableDiagInv = new Array
    const tablleMiddle = document.querySelector(`div.jogo > span[row="${2}"][column="${2}"]`).innerText
    for (let row = 1; row <= 3; row++) {
        for (let column = 1; column <= 3; column++) {
            if(row == column) tableDiag.push(document.querySelector(`div.jogo > span[row="${row}"][column="${column}"]`).innerText)
            
            if(row+column == 4) tableDiagInv.push(document.querySelector(`div.jogo > span[row="${row}"][column="${column}"]`).innerText)
        }
    }

    if(tableDiag[0] == tableDiag[1] && tableDiag[1] == tableDiag[2] && tablleMiddle != '') {
        over++
        last = "Diag"
    }
    else if(tableDiagInv[0] == tableDiagInv[1] && tableDiagInv[1] == tableDiagInv[2] && tablleMiddle != '') {
        over++
        last = "DiagInv"
    }
}

function overGame(last, row, column, vez) {
    if(last) {
        const reta = document.querySelector('div.jogo > div')
        reta.style.opacity = 1
        reta.style.top = 'inherit'
        reta.style.left = "inherit"
        reta.style.width = "100%"
        reta.style.transform = 'rotate(0)'
        if(last == "Lin") {
            if(row == 1) reta.style.top = "20%"
            else if(row == 2) reta.style.top = "50%"
            else if(row == 3) reta.style.top = "79%"
        } else if(last == "Col") {
            reta.style.transform = 'rotate(90deg)'
            reta.style.top = "50%"
            if(column == 1) reta.style.left = "-33%"
            else if(column == 2) reta.style.left = 0
            else if(column == 3) reta.style.left = "33%"
        } else {
            reta.style.top = "50%"
            reta.style.width = "120%"
            if (last == "Diag") reta.style.transform = 'rotate(45deg)'
            else if(last == "DiagInv") reta.style.transform = 'rotate(-45deg)'   
        }

        if((vez-1)%2==0 && vez <= velha) winX++
        else if(vez <= velha) winO++

        XDOM.innerText = `00${winX}`
        ODOM.innerText = `00${winO}`
    }
}

document.querySelector('.over > span').addEventListener( 'click', e => {
    inicioGame()
    document.querySelector('div.jogo > div').style.opacity = 0
    document.querySelector('.over').classList.remove('show')
} )