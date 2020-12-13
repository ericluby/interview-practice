const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000
require('dotenv').config()


app.get('/:id', (req, res) => {
  // 1. parse request to find the company symbols
  const apiKey = process.env.API_KEY
  // const compSymbols = 'AAPL'
  const compSymbols = req.params.id
  // console.log(compSymbols)
  
  const url = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${compSymbols}`

  // 2. grab the data from the api
  fetch(url)
    .then(response => response.json())
    // 3. parse the response to get the pieces we want
    .then(apiResponse => {
      // console.log(apiResponse)

      // yesterday's data is the most recent / first item in the array of data
      yesterdayData = apiResponse.data[0]

      // console.log(yesterdayData)
      const low = yesterdayData.low
      const high = yesterdayData.high
      const spread = Math.round((high - low) * 100) / 100
      // console.log(spread)
      // 4. return the info to the user
      res.send({spread: spread})
      // res.send(`The company with symbol ${compSymbols} traded at a high of ${high} and a low of ${low} yesterday for a spread of ${spread}.`)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})