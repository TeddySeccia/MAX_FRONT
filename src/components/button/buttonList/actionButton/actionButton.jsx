
// src/components/context-menu/ContextMenuButton.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../button';
import './actionButton.css';

export const ActionButton = ({ 
  icon, 
  description, 
  menuItems // un tableau d'objets { key, label, onClick } 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Toggle l’ouverture du menu
  const toggle = () => setIsOpen(o => !o);

  // Ferme si clic en dehors
  useEffect(() => {
    const onClickOutside  = e => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside );
    return () => document.removeEventListener('mousedown', onClickOutside );
  }, [isOpen]);

   console.log('actionButton 29 ActionButton render, isOpen=', isOpen);

  return (
    <div className={`actionButton${isOpen ? ' open' : ''}`} ref={ref}>
      <Button icon={icon} description={description} onClick={toggle} />

      {isOpen && (
        <ul className="actionList">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={e => {
                // Ferme le menu
                setIsOpen(false);
                // Déclenche le onClick du composant child
                item.props.onClick?.(e);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
