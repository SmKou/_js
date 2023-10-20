const app = {
    min: 0,
    max: 0,
    n: 0
}

function load() {
    app.min = Math.floor(Math.random() * 42) + 1
    app.max = Math.floor(Math.random() * 42000) + 42
    app.n = Math.floor(Math.random() * (app.max - app.min) + app.min)
    document.getElementById('guess-min').append(document.createTextNode(app.min))
    document.getElementById('guess-max').append(document.createTextNode(app.max))
}
load()

const ipt = document.getElementById('ipt-text')
const ipt_btn = document.getElementById('ipt-btn')
const opt = document.getElementById('opt-text')

ipt.addEventListener('focus', () => opt.innerHTML = '')
ipt.addEventListener('change', e => {
    const val = e.target.value
    if (!val)
        return false
    let guess;
    try { guess = parseInt(val) }
    catch {
        ipt.value = 0
        opt.innerHTML = 'Not a valid number'
        return false
    }
    if (guess < app.min || guess > app.max) {
        opt.innerHTML = 'Out of range'
        return false
    }

    const diff = Math.abs(app.n - guess)
    if (diff === 0) {
        opt.innerHTML = 'You got it!'
        load()
        return true
    }
    
    if (diff < 10) 
        opt.innerHTML = 'Hot!'
    else if (diff < 100)
        opt.innerHTML = 'Warm!'
    else if (diff < 1000)
        opt.innerHTML = 'Cool!'
    else if (diff < 10000)
        opt.innerHTML = 'Cold!'
    else
        opt.innerHTML = 'Freezing!'
})

document.getElementById('reload-btn').addEventListener('click', () => {
    ipt.value = 0
    opt.innerHTML = ''
    load()
})