const JobSearchQuery = require("../models/JobSearchQuery");
const { Shopback_Scrapper } = require("../scrapers/shopback_scrapper");
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
    let scrapper = new Shopback_Scrapper();
    await scrapper.createJobSearchQuery(listOfKeywords, jobSearchQuery);

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
