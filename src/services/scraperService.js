const tribunnewsService = require('../services/tribunnewsService');
const detikService = require('../services/detikService');
const kompasService = require('../services/kompasService');
const liputanService = require('../services/liputanService');
const tempoService = require('../services/tempoService');
const suaraService = require('../services/suaraService');
const jawaposService = require('../services/jawaposService');
const balipostService = require('./balipostService');
const merdekaService = require('./merdekaService');
const okezoneService = require('./okezoneService');
const sindonewsService = require('./sindonewsService');
const kontanService = require('./kontanService');

async function handle(url, media) {
    let result = []

    try {
        switch (media) {
            case 'tribunnews':
                service = tribunnewsService
                break
            case 'detik':
                service = detikService
                break
            case 'kompas':
                service = kompasService
                break
            case 'liputan':
                service = liputanService
                break
            case 'tempo':
                service = tempoService
                break
            case 'suara':
                service = suaraService
                break
            case 'jawapos':
                service = jawaposService
                break
            case 'balipost':
                service = balipostService
                break
            case 'merdeka':
                service = merdekaService
                break
            case 'okezone':
                service = okezoneService
                break
            case 'sindonews':
                service = sindonewsService
                break
            case 'kontan':
                service = kontanService
                break
            default:
                throw new Error(`Media ${media} is not supported`)
        }

        [title, content, time] = await service.getData(url)

        result = {
            'title': title,
            'content': content,
            'time': time,
            'media': media,
        };

    } catch (error) {
        throw new Error("Service error : " + error.message)
    }

    return result
}

module.exports = {
    handle
}