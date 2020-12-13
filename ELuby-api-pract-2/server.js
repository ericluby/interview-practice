const request = require('request');

// console logs the array of quotes for a given character name
const character = 'Gimli'
const urlToGetID = `https://the-one-api.dev/v2/character?name=${character}`
// fill in bearerToken
const bearerToken = ''

request({
  url: urlToGetID,
  headers: {
     'Authorization': `Bearer ${bearerToken}`
  },
  // rejectUnauthorized: false
}, function(err, res) {
      if(err) {
        console.error(err);
      } else {
        const json = JSON.parse(res.body)
        const characterID = json.docs[0]._id

        // request for character quotes
        const urlToGetQuotes = `https://the-one-api.dev/v2/character/${characterID}/quote`

        request({
          url: urlToGetQuotes,
          headers: {
             'Authorization': `Bearer ${bearerToken}`
          },
          // rejectUnauthorized: false
        }, function(err, res) {
              if(err) {
                console.error(err);
              } else {
                const jsonQuotes = JSON.parse(res.body)
                // console.log(jsonQuotes.docs)
                const movieQuotes = jsonQuotes.docs.map((obj)=>{
                  return obj.dialog
                })
                console.log(movieQuotes)
              }
        });
      }
});
