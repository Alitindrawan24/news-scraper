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
    let pageCount = $('.paging .paging__wrap a').text()
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
    let time = $(".read__time");
    let theTime = time.text().replace("Kompas.com - ", "").replace(',', '').replace(" WIB", "");
    let newTime = moment(theTime, 'DD/MM/YYYY hh:mm').format(format.timeFormat())

    return (newTime != "Invalid date") ? newTime : theTime
}

function getTitle($) {
    return $(".read__title").text().replaceAll("\n", "").replaceAll(' ', " ").trim()
}

function getContent($) {
    let content = $(".read__content");
    $("script", content).remove();
    $("strong", content).remove();

    content = content.text()

    let survey = $(".survey__wrap").text();
    content = content.replaceAll(survey, "").trim()

    let author = $(".photo__author.author").text();
    content = content.replaceAll(author, "").trim()

    let caption = $(".photo__caption").text();
    content = content.replaceAll(caption, "").trim()

    content = content.replaceAll("KOMPAS.com - ", "").trim()

    content = content.replaceAll("\n", " ").trim()
    content = content.replaceAll("\t", " ").trim()
    content = content.replaceAll(' ', " ").trim()
    content = content.replaceAll(`Dapatkan update berita pilihan dan breaking news setiap hari dari Kompas.com. Mari bergabung di Grup Telegram \"Kompas.com News Update\", caranya klik link https://t.me/kompascomupdate, kemudian join. Anda harus install aplikasi Telegram terlebih dulu di ponsel.`, "").trim()
        // content = content.replaceAll('\"', "'").trim()

    return content
}

module.exports = {
    getData
}