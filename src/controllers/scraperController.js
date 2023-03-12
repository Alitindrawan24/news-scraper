const scraperService = require('../services/scraperService');
const scraperValidator = require('../validators/scraperValidator');

async function index(req, res) {
    try {
        const { url, media } = scraperValidator.validate(req)
        const result = await scraperService.handle(url, media)

        return res.send(result)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = {
    index
}