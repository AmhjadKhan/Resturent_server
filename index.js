const express = require('express');
const app = express();
// const cors = require('cors');
// require('dotenv').config()
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('boss is sitting')
})

app.listen(port, () => {
    console.log(`Bistro boss is sitting on port ${port}`)
})