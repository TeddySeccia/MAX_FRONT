import React from 'react';
import './block.css';

export const Block = ({ blockName, children }) => {
  return (
    <section className={`${blockName}-block`}>
      <div className="entete">
        <h2>{blockName}</h2>
      </div>
      <div className="corps">
        {children}
      </div>
    </section>
  );
};
