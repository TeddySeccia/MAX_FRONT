
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';

export const HomeButton = ({ variant, style, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Button
      icon="/icones/meta/home.webp"
      description="Accueil"
      onClick={() => navigate('/dashboard')}
      variant={variant}
      style={style}
      {...rest}
    />
  );
};
