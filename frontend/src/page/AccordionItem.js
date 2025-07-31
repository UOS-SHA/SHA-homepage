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
    </div>
  );
};

export default AccordionItem;
