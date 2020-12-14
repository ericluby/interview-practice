const fetch = require('node-fetch');
const fs = require('fs');

const country = 'USA'
const url = `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=${country}`
// insert api key here
const rapidAPIKey = ''

fetch(url, {headers: { 'x-rapidapi-key': rapidAPIKey,
   'x-rapidapi-host': ' covid-19-coronavirus-statistics.p.rapidapi.com' }})
  .then(res => res.json())
  .then(data => {
      // console.log(data.data.covid19Stats)
      const covidData = data.data.covid19Stats
      const stateAggregates = {}
      // example {Alberta: {cases: 10, deaths: 2}}
      covidData.forEach((record)=>{
        if(stateAggregates[record.province]){
          stateAggregates[record.province]= {cases: stateAggregates[record.province].cases + record.confirmed, deaths: stateAggregates[record.province].deaths + record.deaths}
        }else{
          stateAggregates[record.province]= {cases: record.confirmed, deaths: record.deaths}
        }
      })
      // console.log(stateAggregates)
      const states = Object.keys(stateAggregates)
      const stateAggregateData = states.map((state)=>{
        return `${state}: ${stateAggregates[state].cases} cases, ${stateAggregates[state].deaths} deaths`
      })
      const returnedText = stateAggregateData.join('\n')

      fs.writeFile(`covid-19-in-${country}.txt`, returnedText, function(err){
        if(err) {
          return console.log(err)
        }
        console.log("file was saved!")
      })
    }
  );