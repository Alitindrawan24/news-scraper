const moment = require('moment');
moment.locale('id');

const axios = require("axios");
const cheerio = require("cheerio");

async function getData(url) {
    let response = await axios.get(url)
    let $ = cheerio.load(response.data)

    let title = getTitle($)
    let content = getContent($)
    let time = getTime($)

    return [title, content, time]
}

function getTime($) {
    let time = $(".detail__header .detail__date");
    let theTime = time.text().replace(" WIB", "");
    let newTime = moment(theTime, 'dddd, DD MMMM YYYY hh:mm').format('YYYY-MM-DD hh:mm')

    return (newTime != "Invalid date") ? newTime : theTime
}

function getTitle($) {
    return $(".detail__header .detail__title").text().replaceAll("\n", "").replaceAll(' ', " ").trim()
}

function getContent($) {
    let content = $(".detail__body-text.itp_bodycontent");
    $("script", content).remove();

    content = content.text()

    // remove text Baca juga
    while (content.search("Baca juga") != -1) {
        let index = content.indexOf("Baca juga")
        let textCut = ''

        while (index < content.length) {
            if (content[index] == "\n") {
                break
            }

            textCut += content[index]
            index++
        }

        content = content.replace(textCut, "").trim()
    }

    content = content.replaceAll("\n", " ").trim()
    content = content.replaceAll("\t", " ").trim()
    content = content.replaceAll(' ', " ").trim()
        // content = content.replaceAll('\"', "'").trim()

    return content
}

module.exports = {
    getData
}