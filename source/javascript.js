const tables = document.querySelectorAll('div.jogo > span')
let vez = 1
let over = 0
// par -> X
// impar -> O

tables.forEach(ele => {
    ele.addEventListener('click', e => {
        const table = e.target
        const row = table.getAttribute('row')
        const column = table.getAttribute('column') 
        preencherGame(table)
        // console.log(table.nextSibling)
        verLinha(row)
        verColuna(column)

        if(over) console.log('O jogo acabou')
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
    if(table[0] == table[1] && table[1] == table[2]) over++
}

function verColuna(column) {
    const table = new Array
    for (let row = 1; row <= 3; row++) {
        table.push(document.querySelector(`div.jogo > span[row="${row}"][column="${column}"]`).innerText)
    }
    if(table[0] == table[1] && table[1] == table[2]) over++
}

function verDiag(column, row) {
    const table = new Array
    for (let row = 1; row <= 3; row++) {
        table.push(document.querySelector(`div.jogo > span[row="${row}"][column="${column}"]`).innerText)
    }
    if(table[0] == table[1] && table[1] == table[2]) over++
}