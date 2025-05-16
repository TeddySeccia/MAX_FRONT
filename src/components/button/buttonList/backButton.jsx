// src/components/buttons/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';

export const BackButton = ({ icon, description, ...rest }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Lecture de l'URL précédente ou fallback vers '/dashboard'
    const prev = sessionStorage.getItem('previousPath') || '/dashboard';
    navigate(prev);
  };

  return (
    <Button
      icon={icon}
      description={description}
      onClick={handleBack}
      {...rest}
    />
  );
};
