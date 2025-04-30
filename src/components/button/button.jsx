import React, {useRef} from 'react';
import './button.css'; 

export const Button = ({
  style, 
  text, 
  icon, 
  description, 
  href, 
  onClick, 
  onDoubleClick,
  type = "button", 
  variant = "primary", 
  disabled = false 
}) => {

  const clickTimeout = useRef(null);

  const handleClick = (e) => {
    // Lance le timer pour un clic simple
    clickTimeout.current = setTimeout(() => {
      onClick && onClick(e);
      clickTimeout.current = null;
    }, 250);
  };

  const handleDoubleClick = (e) => {
    // Annule le clic simple en cas de double-clic
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    onDoubleClick && onDoubleClick(e);
  };
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
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      className={`${variant} ${text}`} 
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      type={type} 
      disabled={disabled}
      title={description}
      style={ style }
    >
      {content}
    </button>
  );
};


