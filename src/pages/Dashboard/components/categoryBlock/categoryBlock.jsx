import './categoryBlock.css';
import { useUser } from "../../../../hooks/useUser";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom'; // Import de useNavigate pour la redirection
import { Button } from '../../../../components/button/button';
import { Block } from "../../../../components/block/block";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function CategoryBlock() {
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate(); // Fonction pour rediriger
  console.log("cB14", user);
  


  const fetchCategoriesAndDocs = useCallback(async (parentId = null, idUser) => {
    if (!idUser) return;
  
    try {
      const endpoint = parentId === null
        ? `${VITE_API_URL}/getCategoriesByParent/${idUser}/${parentId}`
        : `${VITE_API_URL}/getCategoriesAndDocs/${idUser}/${parentId}`;
  
      const res = await fetch(endpoint);
      const data = await res.json();

      console.log("25",data);
      console.log(parentId);
      console.log(idUser);
      
      
      
      
  
      if (parentId === null) {
        setCategories(Array.isArray(data) ? data : []);
        setDocuments([]);
      } else {
        setCategories(data.categories || []);
        setDocuments(data.documents || []);
      }
  
    } catch (err) {
      console.error("Erreur récupération catégories/documents :", err);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      // Redirection vers la page login si user est null
      navigate('/login');
    } else if (user?.idUser) {
      fetchCategoriesAndDocs(null, user.idUser); // Chargement initial
    }
  }, [user, navigate, fetchCategoriesAndDocs]); // Re-déclenche si `user` change

  return (
    <Block blockName="category">
  <ul>
    {categories.map((cat) => (
      <li key={`cat-${cat.idCategory}`}>
        <Button
          icon={VITE_API_URL + `/${cat.icones[0].iconeAvatarPath}`}
          style={{ backgroundColor: "#6EBF7D" }}
          type="button"
          text={cat.categoryName}
          onClick={() => {
            fetchCategoriesAndDocs(cat.idCategory, user.idUser);
          }}
        />
      </li>
    ))}

    {documents.map((doc) => (
      <li key={`doc-${doc.idDocument}`}>
        <Button
          icon={VITE_API_URL + `/${doc.icones[0].iconeAvatarPath}`}
          style={{ backgroundColor: "#7D9CBF" }}
          type="button"
          text={doc.documentName}
          onClick={() => {
            // Peut-être ouvrir ou afficher le doc 
          }}
        />
      </li>
    ))}
  </ul>
</Block>

  
  );

  
}
