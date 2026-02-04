import React, { useState } from 'react';
import '../Home.css';
import './StudyCategory.css';

const AccordionLink = ({ detail }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-link">
        <img
            className={`img-right ${isOpen ? 'rotated' : ''}`}
            src={`${process.env.PUBLIC_URL}/down.png`}
            alt="toggle"
            onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
            <div className={`accordion-detail-link ${isOpen ? 'show' : ''}`}>
            {detail}
            </div>
        )}
    </div>
  );
};

export default AccordionLink;
