import React from 'react';

function Main({ compCards }) {
  return (
    <div className="card-section min-h-screen grid grid-cols-2 gap-y-3 gap-x-4 p-6">
      {compCards.length > 0 ? (
        compCards.map((card, index) => (
          <div
            key={index}
            className="card-container bg-white rounded-lg shadow-lg overflow-hidden flex items-center h-[180px]"
          >
            {/* Company Logo */}
            <div className="img-container w-[20%] px-4 py-2">
              <img
                src={card.companylogo}
                alt={`${card.companyname} logo`}
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Company Info */}
            <div className="info w-[80%] px-4">
              <h2 className="text-lg font-bold mb-1">{card.companyname}</h2>
              <div className="review flex items-center gap-2 mb-2">
                <img
                  src={require('../../assets/star-icon.png')}
                  alt="Star"
                  className="w-4 h-4"
                />
                <p className="text-sm text-gray-500">4.5</p>
                <span className="text-sm text-gray-500">
                  ({card.reviews})
                </span>
              </div>
              <div className="type text-sm text-gray-500">
                <p>{card.type.type1}</p>
                <p>{card.type.type2}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center w-full">
          No companies match your filters.
        </p>
      )}
    </div>
  );
}

export default Main;
