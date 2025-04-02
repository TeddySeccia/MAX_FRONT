import React, { useState, useEffect, useMemo } from 'react';
import data from '../../../datas/login_main.js';  // Import du fichier des données
import './login_main.css';
import SmallView  from '../small_view/small_view.jsx';
import  LargeView  from '../large_view/large_view.jsx';


export default function Login_main() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [randomPortraitEntry, setRandomPortraitEntry] = useState(null);
  const [randomLandscapeEntry, setRandomLandscapeEntry] = useState(null);

  // Sélection aléatoire des images au montage
  useEffect(() => {
    setRandomPortraitEntry(data.portrait[Math.floor(Math.random() * data.portrait.length)]);
    setRandomLandscapeEntry(data.paysage[Math.floor(Math.random() * data.paysage.length)]);
  }, []);

  // Gestion du redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPortrait = useMemo(() => screenSize <= 505, [screenSize]);
  const imagePath = isPortrait ? randomPortraitEntry?.path : randomLandscapeEntry?.path;
  console.log(imagePath);
  console.log(isPortrait);
  
  

  return (
    <main>
      <div className="bg_container">
        {isPortrait ? <SmallView imagePath={imagePath} /> : <LargeView imagePath={imagePath} />}
      </div>
    </main>
  );
}






