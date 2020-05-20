console.log('clietn side js file')
const url = 'http://localhost:3000/weather?address='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const urlToFetch = url+search.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch('/weather?address='+search.value).then((response) =>{
    response.json().then((data) =>{
      if (data.error)
        messageOne.textContent = 'there was an error - ' + data.error
      else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.foreCast
      }
    })
  })
})