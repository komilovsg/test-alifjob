import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchCountry() {
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          setFilteredCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [query]);

  function handleInputChange(event) {
    const value = event.target.value;
    setQuery(value);
  }

  return (
    <div>
      <form className="my-8">
        <input
          type="text"
          placeholder="Search for a country"
          className="border border-gray-300 rounded-md p-2"
          onChange={handleInputChange}
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <Link to={`/country/${country.name.common}`} key={country.cca2}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg duration-300">
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  {country.name.common}
                </h3>
                <p className="text-gray-700">
                  Population:{" "}
                  {country.population
                    ? country.population.toLocaleString()
                    : "N/A"}
                </p>
                <p className="text-gray-700">
                  Region: {country.region || "N/A"}
                </p>
                <p className="text-gray-700">
                  Capital: {country.capital?.[0] || "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchCountry;
