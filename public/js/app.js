const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errmessage = document.querySelector('#m1')
const resmessage = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    m1.textContent = 'Please wait, loading forecast ...'
    m2.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent = data.error
            } else {
                m1.textContent = "Location: " + data.location
                m2.textContent = "Forecast: " + data.forecast
            }
        })
    })
})