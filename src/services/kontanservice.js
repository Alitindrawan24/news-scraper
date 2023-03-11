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
    let time = $(".fs13");
    let span = $(".fs13 span").text()
    let theTime = time.text().replace(" WIB", "").replace("|", "").replace(span, "");
    let newTime = moment(theTime, 'dddd, DD MMMM YYYY hh:mm').format(format.timeFormat())

    return (newTime != "Invalid date") ? newTime : theTime
}

function getTitle($) {
    return $(".jdl_dtl").text().replaceAll("\n", "").replaceAll(' ', " ").trim()
}

function getContent($) {
    let content = $(".ctn");
    $("script", content).remove();
    $("style", content).remove();
    $(".wrap-tag", content).remove();
    $(".listbut-shr", content).remove();
    $("div[d-widget='newsfeed_recommendation']", content).remove();

    content = content.text()

    let nextNews = $(".ctn h2 span").text();
    content = content.replace(nextNews, "").trim()

    nextNews = $(".ctn h2 a").text();
    content = content.replace(nextNews, "").trim()

    let editor = $("#editor").text();
    content = content.replace(editor, "").trim()

    // remove text Baca juga
    while (content.search("Baca Juga") != -1) {
        let index = content.indexOf("Baca Juga")
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

    content = content.replaceAll("KONTAN.CO.ID -  ", "").trim()
    content = content.replaceAll("\n", " ").trim()
    content = content.replaceAll("\t", " ").trim()
    content = content.replaceAll(" ", " ").trim()

    content = content.split('. ')
    newContent = []
    for (const iterator of content) {
        newContent.push(iterator.trim())
    }


    return newContent.join(". ")
}

module.exports = {
    getData
}