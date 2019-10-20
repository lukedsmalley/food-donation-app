const express = require('express')

const app = express()
app.use(express.json())

const locations = {
  ChIJnSm6_IYD9YgR9JnxEhq4FLU: true,
  ChIJD56CLPQE9YgRqS8zsD_QNzA: true,
  'ChIJCSNgXoYD9YgRc-ZcDaE4-HA': false
}

const accounts = {
  'blossomtree@gmail.com': 'ChIJnSm6_IYD9YgR9JnxEhq4FLU',
  'jimmyjohns@gmail.com': 'ChIJD56CLPQE9YgRqS8zsD_QNzA',
  'sensationalsubs@gmail.com': 'ChIJCSNgXoYD9YgRc-ZcDaE4-HA'
}

app.get('/api/locations', (request, response) => {
  response.send(locations)
})

app.get('/api/has-food/:location', (request, response) => {
  console.log('Get has-food')
  response.send(locations[request.params.location])
})

app.post('/api/has-food/:location', (request, response) => {
  console.log('Post has-food')
  console.log(request.body.hasFood)
  locations[request.params.location] = request.body.hasFood
})

app.post('/api/login', (request, response) => {
  console.log(request.body.email)

  if (!accounts[request.body.email]) {
    console.log('Login denied')
    response.sendStatus(403)
    return
  }

  console.log('Logged in')
  response.send('"' + accounts[request.body.email] + '"')
})

app.listen(3001, () => console.log('Started'))
