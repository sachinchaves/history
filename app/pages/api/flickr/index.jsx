const credentials = require('../../../../api/server/credentials');
export default async function handler(req, res) {
    try {
        const keywords = 'vancouver';
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${credentials.flickr.api_key}&tags=${keywords}&format=json&nojsoncallback=1`;
        const response = await fetch(url);
        const result = await response.json();
        res.status(200).json(result)
      } catch (error) {
        console.log(error.message); // Node.js terminal
        // display a user facing error to the front end
        return { error: true, message: 'Flickr web feed call failed' };
      }
    }