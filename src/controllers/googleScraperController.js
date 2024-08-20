const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

async function index(req, res) {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
    }

    const [result1] = await Promise.all([
        scrapTempo(topic),
        // scrapKompas(topic),
    ]);

    // Combine all results into a single array
    const links = [...result1];

    res.json({ links });
}

async function loadStopwords(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return new Set(data.split(/\r?\n/).map(word => word.toLowerCase()));
    } catch (error) {
        console.error('Error loading stopwords:', error);
        return new Set();
    }
}


async function scrapTempo(topic) {
    try {
        const stopwords = await loadStopwords('./stopwords.txt');
        const filteredTopicWords = topic
            .split(' ')
            .map(word => word.toLowerCase())
            .filter(word => !stopwords.has(word));

        const url = `https://www.tempo.co/search?q=${encodeURIComponent(topic)}`;
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);
        const links = [];

        $('article.text-card a').each((i, element) => {
            let link = $(element).attr('href');
            if (link) {
                link = link.split("?")[0];
                const linkLower = link.toLowerCase();
                
                // Check if the link contains any of the filtered topic words
                if (filteredTopicWords.some(word => linkLower.includes(word))) {
                    if (!links.includes(link)) {
                        links.push(link);
                    }
                }
            }
        });

        return links;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function scrapKompas(topic) {
    try {
        const stopwords = await loadStopwords('./stopwords.txt');
        const filteredTopicWords = topic
            .split(' ')
            .map(word => word.toLowerCase())
            .filter(word => !stopwords.has(word));

        const url = `https://search.kompas.com/search/?q=${encodeURIComponent(topic)}`;
        console.log(url);
        const { data } = await axios.get(url); 

        const $ = cheerio.load(data);
        const links = [];

        $('a.gs-title').each((i, element) => {
            let link = $(element).attr('data-ctorig');
            console.log(link);
            if (link) {
                link = link.split("?")[0];
                const linkLower = link.toLowerCase();
                
                // Check if the link contains any of the filtered topic words
                // if (filteredTopicWords.some(word => linkLower.includes(word))) {
                    if (!links.includes(link)) {
                        links.push(link);
                    }
                // }
            }
        });

        console.log(links);

        return links;
    } catch (error) {
        console.error(error);
        return [];
    }
}

module.exports = {
    index,
};
