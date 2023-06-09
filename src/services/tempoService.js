const moment = require('moment');
const format = require('../config/format');
moment.locale('id');

const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");

async function getData(url) {
    https.globalAgent.options.rejectUnauthorized = false;
    const instance = axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });
    let response = await instance.get(url)
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
            response = await instance.get(pageUrl)
            $ = cheerio.load(response.data)
            content = content + getContent($)
            page++

            if (page > pageCount) break
        }
    }

    return [title, content, time]
}

function getTime($) {
    let time = $(".date");
    let theTime = time.text().replace(" WIB", "");
    let newTime = moment(theTime, 'dddd, DD MMMM YYYY hh:mm').format(format.timeFormat())

    return (newTime != "Invalid date") ? newTime : theTime
}

function getTitle($) {
    return $(".detail-title h1.title").text().replaceAll("\n", "").replaceAll(' ', " ").trim()
}

function getContent($) {
    let content = $("#isi");
    $("script", content).remove();
    $("div.banner728", content).remove();
    $("div.bacajuga", content).remove();
    $("div.parallax-box", content).remove();

    content = content.text()

    let readTooLength = $(".bacajuga").length;
    for (let i = 0; i < readTooLength; i++) {
        let readToo = $(".bacajuga").eq(i).text();
        content = content.replace(readToo, "").trim()
    }

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

    content = content.replace("TEMPO.CO, ", "").trim()
    content = content.replaceAll("\n", " ").trim()
    content = content.replaceAll("\t", " ").trim()
    content = content.replaceAll(' ', " ").trim()
        // content = content.replaceAll('\"', "'").trim()

    return content
}

module.exports = {
    getData
}