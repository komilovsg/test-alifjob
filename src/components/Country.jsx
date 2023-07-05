import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Country({ country }) {
  const { countryName } = useParams();
  const [currentCountry, setCurrentCountry] = useState(null);

  useEffect(() => {
    if (!country) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          if (response.data.length > 0) {
            setCurrentCountry(response.data[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCurrentCountry(country);
    }
  }, [country, countryName]);

  if (!currentCountry) {
    return <div className="text-center mt-10 uppercase tracking-wide text-sm text-indigo-500 font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:scale-105 transition-all mt-20">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={currentCountry.flags.png}
            alt={`${currentCountry.name.common} flag`}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg text-indigo-500 font-bold">
            {currentCountry.name.common}
          </div>
          <p className="mt-2 text-gray-500">
            <strong>Столица:</strong> {currentCountry.capital && currentCountry.capital[0]}
          </p>
          <p className="mt-2 text-gray-500"><strong>Регион:</strong> {currentCountry.region}</p>
          <p className="mt-2 text-gray-500">
            <strong>Население:</strong> {currentCountry.population}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Country;
