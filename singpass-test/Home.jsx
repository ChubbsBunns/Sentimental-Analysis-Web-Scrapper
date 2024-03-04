import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [keywords, setKeywords] = useState();
  const [companies, setCompanies] = useState();
  const navigate = useNavigate();

  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const handleCheckboxChange = (event) => {
    const newSelectedCompanies = [...selectedCompanies];
    if (event.target.checked) {
      newSelectedCompanies.push(event.target.value);
    } else {
      const index = newSelectedCompanies.indexOf(event.target.value);
      newSelectedCompanies.splice(index, 1);
    }
    setSelectedCompanies(newSelectedCompanies);
  };

  const handleSubmit = async (e) => {
    console.log(keywords);
    //    console.log(companies);
    e.preventDefault();
    try {
      if (!keywords || selectedCompanies.length === 0) {
        throw new Error(
          "Please enter keywords and select at least one company."
        );
      }

      const response = await axios
        .post("http://localhost:3001/submitWebScrappingQuery", {
          keywords,
          companies: selectedCompanies,
        })
        .then((result) => {
          console.log(result);
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="searchFunction ">
        <h2>Start a new query: </h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchValues"
            placeholder="Enter job keywords!"
            className="form-control rounded-0"
            onChange={(enteredValue) => setKeywords(enteredValue.target.value)}
          ></input>
          <br></br>
          <input
            type="checkbox"
            id="Shopback"
            name="companies[]"
            value="Shopback"
            onChange={handleCheckboxChange}
            checked={selectedCompanies.includes("Shopback")}
          />
          <label htmlFor="Shopback">Shopback</label>
          <br></br>

          <input
            type="checkbox"
            id="Cloudflare"
            name="companies[]"
            value="Cloudflare"
            onChange={handleCheckboxChange}
            checked={selectedCompanies.includes("Cloudflare")}
          />
          <label htmlFor="Cloudflare">Cloudflare</label>
          <br></br>

          <input
            type="checkbox"
            id="Visa"
            name="companies[]"
            value="Visa"
            onChange={handleCheckboxChange}
            checked={selectedCompanies.includes("Visa")}
          />
          <label htmlFor="Visa">Visa</label>
          <br></br>

          <button type="submit" className="rounded">
            Lets Scrape!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
