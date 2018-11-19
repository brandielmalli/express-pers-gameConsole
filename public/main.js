const edit = document.getElementsByClassName('fa-edit')
const trash = document.getElementsByClassName('fa-trash')
const parent = document.getElementById('modal')

Array.from(edit).forEach((icon)=>{
  icon.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerHTML
    const quote = this.parentNode.parentNode.childNodes[3].innerHTML
    let input = document.createElement('input');
    let prevWord = document.createElement('input');
    let button = document.createElement('button')
    button.onclick = function(){ update() }
    button.innerHTML = "Submit"
    input.value = name
    input.id = 'new'
    prevWord.value = quote
    prevWord.id = 'prev'
    input.classList.add('hide')
    parent.append(input)
    parent.append(prevWord)
    parent.append(button)
    parent.classList.add('display')
  })
})

function update(){
  const newWord = document.getElementById('new').value
  const prevWord = document.getElementById('prev').value
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': newWord,
      'quote': prevWord
    })
  })
  .then(response => {
      window.location.reload()
  })

}

Array.from(trash).forEach(function(element){
  console.log(trash)
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const quote = this.parentNode.parentNode.childNodes[3].innerText
    fetch('delete', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'quote': quote
      })
    })
    .then(response => {
      window.location.reload(true)
    })
  })
})
