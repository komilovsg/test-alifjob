import { useState } from "react";
import { Link } from "react-router-dom";

function CountryList({ countries }) {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  if (!countries || countries.length === 0) {
    return <div>No countries found</div>;
  }

  // Пагинация - рассчитываем индексы начала и конца текущей страницы
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = countries.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(countries.length / cardsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCards.map((country) => (
          <div
            key={country.cca3}
            className="bg-white rounded-lg shadow-md hover:shadow-lg duration-300 cursor-pointer hover:scale-105 transition-all"
          >
            <Link to={`/country/${country.name.common}`} className="">
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{country.name.common}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="my-8 flex justify-center flex-wrap gap-2">
        {/* Кнопки пагинации */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`mx-1 px-3 py-1 rounded-md active:scale-90 transition-all active:shadow-xl active:shadow-indigo-400 ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CountryList;
