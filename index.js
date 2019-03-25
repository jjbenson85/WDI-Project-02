require('dotenv').config()
const establishmentsController = require('./controllers/establishments')


const express = require('express')
const bodyParser = require('body-parser')

const app = express()


app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.json())

app.get('/api/establishments', establishmentsController.index)

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(process.env.PORT, () => console.log(`Express is serving the dist folder on port ${process.env.PORT}`))
