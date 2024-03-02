const { By, until } = require("selenium-webdriver");
const helperFunctions = require("../helperFunctions/helperFunctions");
const { Scrapper } = require("./scrapper");

class Shopback_Scrapper extends Scrapper {
  async createJobSearchQuery(listOfKeywords, jobSearchQueryObject) {
    try {
      //Create the headless driver
      let scrapper = new Scrapper();
      let driver = await scrapper.createDriver();
      try {
        //Access the website and get the relevant job data
        await driver.get("https://corporate.shopback.com/careers#job-section");
        let countryFilter = await driver.findElement(By.id("country-filter"));
        let singaporeOption = await driver.findElement(
          By.css("option[value='Singapore']")
        );
        await countryFilter.click();
        await driver.wait(until.elementIsVisible(singaporeOption), 10000);
        await singaporeOption.click();
        const jobs = await driver.findElements(
          By.css('*[style*="display: block;"]')
        );

        let jobOpenings = [];
        for (const job of jobs) {
          jobOpenings.push(await job.getText());
        }

        let jobOpeningsArr = [];
        for (const keyPhrase of listOfKeywords) {
          console.log("keyword in scrapper is " + keyPhrase);
          let filteredJobs = helperFunctions.getFilteredJobs(
            keyPhrase,
            jobOpenings
          );
          jobOpeningsArr.push(filteredJobs);
        }
        jobSearchQueryObject.companyResults.push({
          companyName: "Shopback",
          keywordResults: listOfKeywords.map((keyword, index) => ({
            keyword,
            results: jobOpeningsArr[index],
          })),
        });
      } catch (err) {
        console.error(err);
      } finally {
        await driver.quit();
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = { Shopback_Scrapper };
