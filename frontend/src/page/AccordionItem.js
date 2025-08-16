import React, { useState } from 'react';
import '../Home.css';

const AccordionItem = ({ title, detail }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hangeo">
      <div className="hangeo-title">
        <p>{title}</p>
        {detail && (
          <img
            className={`img-down ${isOpen ? 'rotated' : ''}`}
            src={`${process.env.PUBLIC_URL}/down.png`}
            alt="down"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>

      {isOpen && (
        <div className={`accordion-detail ${isOpen ? 'show' : ''}`}>
          {detail}
        </div>
      )}

      <div className="mobile-hangeo">
        <div className="mobile-hangeo-title">
          <div className="mobile-real-title">{title}</div>
          {detail && (
            <img
              className={`img-down ${isOpen ? 'rotated' : ''}`}
              src={`${process.env.PUBLIC_URL}/down.png`}
              alt="down"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>

        {isOpen && (
          <div className={`mobile-accordion-detail ${isOpen ? 'show' : ''}`}>
            {detail}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionItem;
