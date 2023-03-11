const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

// cors
app.use(cors())

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./src/routes/index')(app);

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`)
})

module.exports = app;