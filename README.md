# News Scraper

News Scraper is a very simple web application built with Node JS that allows users to scrap news from url.

## Features
- Scrap data from news urls to get the content, title, and time of publish.
- Media currently supported:
     - Tribunn News 
     - Kompas
     - Liputan 6
     - Tempo
     - Suara
     - Jawa Pos
     - Merdeka
     - OkeZone
     - Sindo News
     - Kontan

## Notes
- Some news may not be well scraped 
- Some media content may contain extra spaces or tabs (not clean)

## Tech
- Node JS (Node v18 or above)

## Package/Frameworks
- Express JS (v4.18)

## Getting Started
To get started with News Scraper, you will need to have Node JS installed on your computer. You can download Node JS from the official website: https://nodejs.org/

Once you have Node JS installed, follow these steps:
- Clone the repository to your local machine using
```bash
git clone https://github.com/Alitindrawan24/news-scraper
```
- Navigate to the project directory using the command line.
- Install dependencies
```bash
npm install
```
- Run the app using
```bash
npm run start
```
- Using postman or any API tool and navigate to http://localhost:3000 to access the application.

## Endpoints
- ```GET/```  get welcome message
- ```POST/scraps``` scrap url using parameter ```url``` in body

## Test
You can test the app using command :
```bash
npm run test
```

## What's Next ?
- Fix any issue on scraping current media.
- Search news by topic.
- Build a minimal front-end that would be consuming this service.