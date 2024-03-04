const JobSearchQuery = require("../models/JobSearchQuery");
const { Shopback_Scrapper } = require("../scrapers/shopback_scrapper");
const { Visa_Scrapper } = require("../scrapers/Visa_Scrapper");
const { Cloudflare_Scrapper } = require("../scrapers/Cloudflare_Scrapper");
const helperFunctions = require("../helperFunctions/helperFunctions");
const util = require("util");

async function createJobSearchQuery(req, res) {
  try {
    console.log(util.inspect(req.body));
    const companies = req.body.companies;
    let listOfKeywords = helperFunctions.parseKeyWords(
      req.body.keywords.toString()
    );
    let jobSearchQuery = new JobSearchQuery();
    for (let company of companies) {
      switch (company) {
        case "Shopback":
          let shopbackScrapper = new Shopback_Scrapper();
          await shopbackScrapper.createCompanyJobSearchQuery(
            listOfKeywords,
            jobSearchQuery
          );
          break;
        case "Cloudflare":
          let cloudflareScrapper = new Cloudflare_Scrapper();
          await cloudflareScrapper.createCompanyJobSearchQuery(
            listOfKeywords,
            jobSearchQuery
          );
          break;
        case "Visa":
          let visaScrapper = new Visa_Scrapper();
          await visaScrapper.createCompanyJobSearchQuery(
            listOfKeywords,
            jobSearchQuery
          );
          break;
        default:
          console.error(
            "For some reason a company who's scrapper has not been implemented was sent to the backend"
          );
      }
    }

    jobSearchQuery
      .save()
      .then(() => console.log("Job search query updated successfully!"))
      .catch((error) => console.error(error));
    res.json(req.body);
  } catch (err) {
    console.log("Got err");
    console.log(err);
    res.json(err);
  }
}

module.exports = {
  createJobSearchQuery,
};
