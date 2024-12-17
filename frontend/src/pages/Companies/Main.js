import React, { useEffect, useState } from 'react';
import CompanyCard from './CompanyCard';



function Main({compCard=[]}) {
  const [noofPosts, setNoofPosts] = useState(compCard.length);
    useEffect(() => {
      // Update noofPosts whenever cards changes
      setNoofPosts(compCard.length);
    }, [compCard]);
  return (
    <>
    <div className="head">
        <h1>Showing {noofPosts} results</h1>        
    </div>

    <div className="card-section min-h-[160vh] grid grid-cols-3 gap-4">
        {/* Check if cards is defined before mapping */}
        {compCard.length > 0 ? (
          compCard.map((card, index) => (
            <CompanyCard key={index} card={card} />
          ))
        ) : (
          <div>No company available</div>
        )
      }
    
      </div>
    
    </>
  );
}

export default Main;
