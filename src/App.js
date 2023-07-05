import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import SearchCountry from "./components/SearchCountry";
import FilterRegion from "./components/FilterRegion";
import Country from "./components/Country";
import CountryList from "./components/CountryList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-[95%] mx-auto justify-center">
      <div class="flex flex-col md:flex-row justify-center md:gap-10 text-center my-5 pb-5">
        <div class="pt-10">
          <Link to="/">
            <button class="bg-blue-500 w-[25vh] h-[6vh] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all">
              На начало
            </button>
          </Link>
        </div>
        <div class="pt-10">
          <Link to="/filter-region">
            <button class="bg-blue-500 w-[25vh] h-[6vh] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all">
              Регион
            </button>
          </Link>
        </div>
        <div class="pt-10">
          <Link to="/search-country">
            <button class="bg-blue-500 w-[25vh] h-[6vh] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all">
              Страна
            </button>
          </Link>
        </div>
      </div>
      <Routes className="">
        <Route path="/" element={<CountryList countries={countries}/>} />
        <Route path="/country/:countryName" element={<Country />} />
        <Route path="/search-country" element={<SearchCountry />} />
        <Route path="/filter-region" element={<FilterRegion />} />
      </Routes>
    </div>
  );
}

export default App;
