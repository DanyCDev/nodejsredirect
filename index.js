const express = require('express')
const path = require('path');
var fs = require('fs')
const app = express()
const port = 80

app.use(express.urlencoded({
    extended: true
  }))

app.get('/setup', (req, res) => {
    res.sendFile(path.join(__dirname, '/main.html'));
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/redir.html'));
})

app.post('/submit-form', (req, res) => {
    const from = req.body.from
    const to = req.body.to
    logall(from, to)
    res.redirect("/")
    res.end()
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function logall(from, to) {
    const diti = '<script> if(window.location.hostname === "' + from + '") { window.location.href = "' + to + '"; } </script>'
   console.log(from + to)
   fs.appendFile('redir.html', diti + "\n" + "\n", function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  
  console.log(diti)
 } 



