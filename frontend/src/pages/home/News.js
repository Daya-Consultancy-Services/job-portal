import React, { useState } from 'react';

// Helper function to truncate text
const truncateText = (text, maxWords) => {
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

function News() {
  const [newsData, setNewsData] = useState([
    {
      image: require("../../assets/smiling.avif"),
      headline: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus magni perspiciatis eligendi error eaque quo.",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero rerum nisi amet, facilis, assumenda magnam voluptatem quasi fugit perspiciatis incidunt necessitatibus quos esse vitae pariatur sapiente aspernatur odit, tempore ipsam?",
    },
    {
      image: require("../../assets/top-news.avif"),
      headline: "Another news headline example that is longer than usual for testing purposes.",
      description: "Another detailed description for the second news item that goes into the specifics of the content.",
    },
    {
    //   image: require("../../assets/news3.avif"),
      headline: "Breaking: New advancements in technology that are set to change the world.",
      description: "Incredible breakthroughs have been made in various fields, promising a brighter future for everyone involved.",
    },
    {
    //   image: require("../../assets/news4.avif"),
      headline: "Global events shaping the economy and impacting lives worldwide.",
      description: "Economic experts weigh in on the latest trends and their potential effects on the global market and individual livelihoods.",
    }
  ]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [activeNews, setActiveNews] = useState(null);

  const handlePopupToggle = (news) => {
    setActiveNews(news);
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = (e) => {
    if (e.target.id === 'popup-overlay') {
      setIsPopupVisible(false);
      setActiveNews(null);
    }
  };

  return (
    <div className='min-h-[100vh] w-full flex flex-col items-center mt-[46px] rounded-lg overflow-auto relative z-[50]'>
      {newsData.map((news, index) => (
        <div key={index} className="news-card-1 h-[360px] w-[350px] shadow-lg bg-white rounded-xl overflow-hidden m-4">
          <div className="img h-[40%] w-full overflow-hidden">
            <img src={news.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="news-head p-3">
            <h1 className='font-semibold text-xl'>
              {truncateText(news.headline, 10)}
            </h1>
            <p>
              {truncateText(news.description, 15)}
            </p>
            <button 
              className='mt-2 text-blue-500 underline' 
              onClick={() => handlePopupToggle(news)}
            >
              Know More
            </button>
          </div>
        </div>
      ))}

      {isPopupVisible && activeNews && (
        <div 
          id="popup-overlay" 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
          onClick={closePopup}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" 
              onClick={() => setIsPopupVisible(false)}
            >
              &times;
            </button>
            <h1 className='font-semibold text-2xl mb-4'>{activeNews.headline}</h1>
            <p>{activeNews.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;