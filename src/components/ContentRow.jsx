import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ContentCard from './ContentCard';
// import ContentCard from './ContentCard';

const ContentRow = ({ title, items }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="content-row mb-5">
      <div className="container-fluid">
        <h3 className="text-white mb-3 fw-semibold">{title}</h3>

        <div className="position-relative">
          <div className='d-flex justify-content-between my-3'>
            <button
              className="btn btn-dark content-nav content-nav-prev"
              onClick={() => scroll('left')}
              aria-label="Scroll Left"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </button>

            <button
              className="btn btn-dark content-nav content-nav-next"
              onClick={() => scroll('right')}
              aria-label="Scroll Right"
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>
          </div>

          <div
            className="trending-movie-slider d-flex gap-3 overflow-auto"
            ref={scrollContainerRef}
            style={{ scrollBehavior: 'smooth' }}
          >
            {items.map((item) => (
              <div
                key={`${item.id}-${item.title ? 'movie' : 'tv'}`}
                className="flex-shrink-0"
              >
                <ContentCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRow;
