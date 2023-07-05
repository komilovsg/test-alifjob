import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchCountry from "./SearchCountry";

function FilterRegion() {
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(4);

  useEffect(() => {
    if (region) {
      axios
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [region]);

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);

    if (selectedRegion === "region") {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Get current countries
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto pt-8">
      <div className="mb-12">
        <select
          id="region-select"
          className="border border-gray-400 rounded-md p-2"
          onChange={handleRegionChange}
        >
          <option value="region">Регионы</option>
          <option value="africa">Африка</option>
          <option value="americas">Америка</option>
          <option value="asia">Азия</option>
          <option value="europe">Европа</option>
          <option value="oceania">Океания</option>
        </select>
      </div>

      {countries.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentCountries.map((country) => (
              <Link key={country.name.common} to={`/country/${country.name.common}`}>
                <div className="border border-gray-400 rounded-md overflow-hidden shadow-lg hover:shadow-xl">
                  <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{country.name.common}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <ul className="flex justify-center my-8 flex-wrap gap-2">
            {Array.from({ length: Math.ceil(countries.length / countriesPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-2 rounded cursor-pointer active:scale-90 transition-all active:shadow-xl active:shadow-indigo-400 ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <p className="text-xl font-bold text-gray-500"></p>
      )}
    </div>
  );
}

export default FilterRegion;
