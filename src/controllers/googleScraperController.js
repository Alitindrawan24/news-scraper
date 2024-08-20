const puppeteer = require("puppeteer");

async function index(req, res) {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
    }

    const [result1, result2] = await Promise.all([
        scrapTempo(topic),
        scrapKompas(topic),
    ]);

    // Combine all results into a single array
    const links = [...result1, ...result2];

    res.json({ links });
}

async function scrapTempo(topic) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Menggunakan Chromium yang diinstal
        });
        const page = await browser.newPage();
        console.log(`https://www.tempo.co/search?q=${encodeURIComponent(topic)}`)
        await page.goto(
        `https://www.tempo.co/search?q=${encodeURIComponent(topic)}`,
        { waitUntil: "load", timeout: 0 }
        );

        const links = await page.evaluate(() => {
            const results = [];
            const items = document.querySelectorAll("article.text-card a");
            items.forEach((item) => {
                let link = item.getAttribute("href");
                if (link) {
                    link = link.split("?")[0];
                    if (results.indexOf(link) === -1) {
                        results.push(link);
                    }
                }
            });
                
            return results;
        });

        await browser.close();

        return links
    } catch (error) {
        console.error(error);
        return []
    }
}

async function scrapKompas(topic) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Menggunakan Chromium yang diinstal
        });
        const page = await browser.newPage();
        console.log(`https://search.kompas.com/search/?q=${encodeURIComponent(topic)}`)
        await page.goto(
        `https://search.kompas.com/search/?q=${encodeURIComponent(topic)}`,
        { waitUntil: "load", timeout: 0 }
        );

        const links = await page.evaluate(() => {
            const results = [];
            const items = document.querySelectorAll("a");
            items.forEach((item) => {
                let link = item.getAttribute("data-ctorig");
                if (link) {
                    link = link.split("?")[0];
                    if (results.indexOf(link) === -1) {
                        results.push(link);
                    }
                }
            });
                
            return results;
        });

        await browser.close();

        return links
    } catch (error) {
        console.error(error);
        return []
    }
}

module.exports = {
    index,
};
