const PATH_URL = `http://localhost:3000/weather?address=`
const $resp = document.querySelector('.res')

const showResponse = (data) => {
    const { address, forecast, location } = data

    $resp.innerHTML = `
        <p>${forecast}</p>
        <p>${location}</p>
        <p>${address}</p>
    `
}

const $form = document.querySelector('form')

$form.addEventListener('submit', (e) => {
    e.preventDefault()

    const { input } = e.target

    if (!input.value) {
        $resp.innerHTML = 'well you are an a.... please add one location'
    } else {
        const location = input.value
        const url = `${PATH_URL}${location}`

        $resp.innerHTML = 'wait...'

        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    $resp.innerHTML = data.error
                } else {
                    console.log(data)
                    showResponse(data)
                }
            })
        })
    }
})
