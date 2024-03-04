const { By } = require("selenium-webdriver");
const helperFunctions = require("../helperFunctions/helperFunctions");
const { Scrapper } = require("./scrapper");

class Cloudflare_Scrapper extends Scrapper {
  async createCompanyJobSearchQuery(listOfKeywords, jobSearchQueryObject) {
    let scrapper = new Scrapper();
    let driver = await scrapper.createDriver();

    try {
      await driver.get(
        "https://www.cloudflare.com/careers/jobs/?location=Singapore"
      );
      let currentViewableJobs = await driver.findElements(
        By.className("inline-link-style f4 fw7 lh-title")
      );
      let jobOpenings = [];
      for (let job of currentViewableJobs) {
        jobOpenings.push(await job.getText());
      }
      helperFunctions.saveCompanyResults(
        jobOpenings,
        jobSearchQueryObject,
        "Cloudflare",
        listOfKeywords
      );
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { Cloudflare_Scrapper };
