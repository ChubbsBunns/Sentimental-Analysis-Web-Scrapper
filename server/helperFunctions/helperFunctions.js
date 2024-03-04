function parseKeyWords(keywordsRaw) {
  console.log("The keywords are " + keywordsRaw);
  return keywordsRaw.split(",").map((phrase) => phrase.trim().toLowerCase());
}

function getFilteredJobs(keyPhrase, jobList) {
  let filteredJobList = [];
  console.log("The keyphrase is " + keyPhrase.toString());
  for (let job of jobList) {
    console.log("The job is: " + job);
    if (job.toLowerCase().includes(keyPhrase.toLowerCase())) {
      filteredJobList.push(job);
    }
  }
  return filteredJobList;
}

function saveCompanyResults(
  jobOpenings,
  jobSearchQueryObject,
  companyName,
  listOfKeywords
) {
  let jobOpeningsArr = [];
  for (const keyPhrase of listOfKeywords) {
    let filteredJobs = this.getFilteredJobs(keyPhrase, jobOpenings);
    jobOpeningsArr.push(filteredJobs);
  }
  jobSearchQueryObject.companyResults.push({
    companyName: companyName,
    keywordResults: listOfKeywords.map((keyword, index) => ({
      keyword,
      results: jobOpeningsArr[index],
    })),
  });
}

module.exports = { parseKeyWords, getFilteredJobs, saveCompanyResults };
