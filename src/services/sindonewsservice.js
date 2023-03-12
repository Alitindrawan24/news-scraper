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
    let time = $(".detail-date-artikel");
    let theTime = time.text().replace(" WIB", "").replace("|", "");
    let newTime = moment(theTime, 'dddd, DD MMMM YYYY hh:mm').format(format.timeFormat())

    return (newTime != "Invalid date") ? newTime : theTime
}

function getTitle($) {
    return $(".detail-title h1").text().replaceAll("\n", "").replaceAll(' ', " ").trim()
}

function getContent($) {
    let content = $("#detail-desc");;
    $("script", content).remove();

    content = content.text()

    let bacaJuga = $("#detail-desc strong a").text();
    content = content.replace(bacaJuga, "").trim()

    let lihatJuga = $(".box-outlink").text();
    content = content.replace(lihatJuga, "").trim()

    let editor = $(".editor").text();
    content = content.replace(editor, "").trim()

    content = content.replaceAll("\n", " ").trim()
    content = content.replaceAll("\t", " ").trim()

    return content
}

module.exports = {
    getData
}