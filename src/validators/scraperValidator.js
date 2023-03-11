const listOfMedia = {
    "tribunnews": 'https://www.tribunnews.com',
    "detik": 'detik.com/',
    "kompas": 'kompas.com/',
    "liputan": 'liputan6.com/',
    "tempo": 'tempo.co/',
    "suara": 'suara.com/',
    "jawapos": 'jawapos.com/',
    "balipost": 'balipost.com/',
    "merdeka": 'merdeka.com/',
    "okezone": 'okezone.com/',
    "sindonews": 'sindonews.com/',
    "kontan": 'kontan.co.id/'
}

function validate(request) {
    const { url } = request.body

    if (!url) {
        throw new Error('Url is required')
    }

    let media = ''
    for (const key in listOfMedia) {
        if (Object.hasOwnProperty.call(listOfMedia, key)) {
            const mediaUrl = listOfMedia[key];

            if (url.search(mediaUrl) !== -1) {
                media = key
            }
        }
    }

    return { url, media }
}

module.exports = {
    validate
}