"use strict"

let container = document.querySelector('.container')
container.style.left = `${document.body.offsetWidth / 2 - container.clientWidth / 2}px`
container.style.top = `${document.body.offsetHeight / 2 - container.clientHeight / 2}px`

let board = document.querySelector('.board')
let boardArr = []
let clearPlace = []
function createBoard() {
  for (let i = 0; i < 625; i++) {
    let elem = document.createElement('div')
    if (i % 2 == 0) {
      elem.style.backgroundColor = 'Orange'
    } else {
      elem.style.backgroundColor = '#fff'
    }
    board.append(elem)
    elem.style.position = 'relative'
    elem.classList.add('item')
    elem.classList.add(`item${i}`)
    boardArr.push(elem)
    let value = Math.random()
    let span = document.createElement('span')
    if (value > 0.75) span.textContent = '*'
    else span.textContent = ''
    // console.log(span.textContent)
    elem.append(span)
    span.style.opacity = '0'
    if (span.textContent == '') clearPlace.push(elem)
    elem.onclick = choice
    elem.oncontextmenu = markerAdd
  }
}
createBoard()

function markerAdd(event) {
  if (this.children[0].textContent == '' || this.children[0].textContent == '*') {
    if (this.children[1] !== undefined) {
      this.children[1].remove()
    } else {
      let p = document.createElement('p')
      p.style.position = 'absolute'
      p.textContent = '!'
      p.style.color = 'red'
      p.style.fontSize = '30px'
      p.style.fontWeight = 'bold'
      p.style.left = '50%'
      p.style.transform = 'translateX(-50%)'
      p.style.top = '-3px'
      this.append(p)
    }
  }
  event.preventDefault()
}

function choice() {
  let index = boardArr.indexOf(this)
  let span = this.querySelector('span')
  if (span.textContent == '*') alert('Вы проиграли!'), location.reload()
  else {
    if (clearPlace.length == 1) alert('Поздравляю, вы победили!')
    clearPlace = clearPlace.slice(1)
    console.log(clearPlace.length)
    this.style.backgroundColor = '#333'
    this.style.position = 'relative'
    span.style.opacity = '1'
    span.style.color = 'white'
    span.style.top = `50%`
    span.style.left = `50%`
    span.style.transform = `translateY(-50%) translateX(-50%)`
    span.style.position = 'absolute'
    let counter = 0
    if (index >= 1) {
      if (boardArr[index - 1].textContent == '*' && (index % 25) != 0) counter++
    }
    if (index >= 24) {
      if (boardArr[index - 24].textContent == '*' && (index + 1) % 25 != 0 && (index - 24) % 25 != 0) counter++
    }
    if (index >= 25) {
      if (boardArr[index - 25].textContent == '*') counter++
    }
    if (index >= 26) {
      if (boardArr[index - 26].textContent == '*' && (index - 26) % 25 != 0) counter++
    }

    if (index + 1 < boardArr.length) {
      if (boardArr[index + 1].textContent == '*' && ((index + 1) % 25) != 0) counter++
    }
    if (index + 24 < boardArr.length) {
      if (boardArr[index + 24].textContent == '*' && index % 25 != 0 && (index + 25) % 25 != 0) counter++
    }
    if (index + 25 < boardArr.length) {
      if (boardArr[index + 25].textContent == '*') counter++
    }
    if (index + 26 < boardArr.length) {
      if (boardArr[index + 26].textContent == '*' && (index + 1) % 25 != 0 && (index + 26) % 25 != 0) counter++
    }
    span.textContent = counter
  }
}