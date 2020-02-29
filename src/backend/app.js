const express = require('express')
const app = express()
const port = 3000

const activityList = require('./activity-get')

app.get('/rest/shows', (req, res) => res.send(activityList))

var server = app.listen(3001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })