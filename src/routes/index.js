const scraperController = require('../controllers/scraperController');

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send("Hello, welcome in news scraper app!");
    })

    app.post('/scraps', async(req, res) => {
        res.setHeader('Content-Type', 'application/json');
        await scraperController.index(req, res)
    })
}