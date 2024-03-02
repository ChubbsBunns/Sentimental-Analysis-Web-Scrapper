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

module.exports = { parseKeyWords, getFilteredJobs };
