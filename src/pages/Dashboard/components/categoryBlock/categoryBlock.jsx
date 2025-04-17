import './categoryBlock.css';
import { useUser } from "../../../../hooks/useUser";
import { useEffect, useState, useCallback } from "react";
import { Button } from '../../../../components/button/button';
import { Block } from "../../../../components/block/block";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function CategoryBlock() {
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);


  const fetchCategoriesAndDocs = useCallback(async (parentId = null) => {
    if (!user) return;
  
    try {
      const endpoint = parentId === null
        ? `${VITE_API_URL}/getCategoriesByParent/${user.idUser}/${parentId}`
        : `${VITE_API_URL}/getCategoriesAndDocs/${user.idUser}/${parentId}`;
  
      const res = await fetch(endpoint);
      const data = await res.json();

      console.log("25",data);
      console.log(parentId);
      
      
      
      
  
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
  }, [user]);

  useEffect(() => {
    fetchCategoriesAndDocs(); 
  }, [fetchCategoriesAndDocs]);

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
            fetchCategoriesAndDocs(cat.idCategory);
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
