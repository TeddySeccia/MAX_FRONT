import React from 'react';
import './button.css'; 

export const Button = ({style, text, icon, description, href, onClick, type = "button", variant = "primary", disabled = false }) => {
  const content = icon ? <img src={icon} alt={text || "Bouton"} className="btn-icon" /> : text;

  // Si un href est présent, on affiche un lien `<a>` au lieu d’un `<button>`
  if (href) {
    return (
      <a 
        href={href} 
        className={`${variant} ${text}`} 
        title={description} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      className={`${variant} ${text}`} 
      onClick={onClick} 
      type={type} 
      disabled={disabled}
      title={description}
      style={ style }
    >
      {content}
    </button>
  );
};


