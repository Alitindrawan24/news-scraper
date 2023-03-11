const moment = require('moment');
const format = require('../config/format');
moment.locale('id');

const axios = require("axios");
const cheerio = require("cheerio");

async function getData(url) {
    let response = await axios.get(url)
    let $ = cheerio.load(response.data)

    let title = getTitle($)
    let content = getContent($)
    let time = getTime($)

    // check page
    let page = 2
    let pageCount = $('.paging a').text()
    if (pageCount != undefined && pageCount != '') {
        pageCount = parseInt(pageCount.charAt(pageCount.length - 1))
        while (true) {
            const pageUrl = url + '?page=' + page
            response = await axios.get(pageUrl)
            $ = cheerio.load(response.data)
            content = content + getContent($)
            page++

            if (page > pageCount) break
        }
    }

    return [title, content, time]
}

function getTime($) {
    let time = $(".date-post");
    let theTime = time.text().replace(" WIB", "").replace("|", "");
    let newTime = moment(theTime, 'dddd, DD MMMM YYYY hh:mm').format(format.timeFormat())

    return (newTime != "Invalid date") ? newTime : theTime
}

function getTitle($) {
    return $(".mdk-dt-headline h1").text().replaceAll("\n", "").replaceAll(' ', " ").trim()
}

function getContent($) {
    let content = $(".mdk-body-paragraph");
    $("script", content).remove();

    content = content.text()

    // remove text Baca juga
    while (content.search("BACA JUGA") != -1) {
        let index = content.indexOf("BACA JUGA")
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

    return content
}

module.exports = {
    getData
}