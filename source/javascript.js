const tables = document.querySelectorAll('div.jogo > span')
let vez = Math.round(Math.random(0,1))
const velha = vez + 9
let over = 0
let last = ''
// par -> X
// impar -> O

tables.forEach(ele => {
    ele.addEventListener('click', e => {
        const table = e.target
        const row = table.getAttribute('row')
        const column = table.getAttribute('column') 
        preencherGame(table)
        verLinha(row)
        verColuna(column)
        verDiag()
        const btnOver = document.querySelector('.over')

        if(over) {
            overGame(last, row, column)
            setInterval(() => {
                btnOver.classList.add('show')
            }, 2500)
        }
        else if(vez >= velha) console.log('O jogo deu velha')
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

function overGame(last, row, column) {
    const reta = document.querySelector('div.jogo > div')
    reta.style.opacity = 1
    if(last == "Lin") {
        if(row == 1) reta.style.top = "15%"
        else if(row == 2) reta.style.top = "50%"
        else if(row == 3) reta.style.top = "83%"
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
}

document.querySelector('.over > span').addEventListener( 'click', e => {
    
} )