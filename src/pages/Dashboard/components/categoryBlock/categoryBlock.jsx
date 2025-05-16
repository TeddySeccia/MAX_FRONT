import './categoryBlock.css';
import { useUser } from "../../../../hooks/useUser";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/button/button';
import { Block } from "../../../../components/block/block";
import { useNavigationTrail } from "../../../../hooks/useNavigationTrail";
import { useSelectedDocuments } from "../../../../hooks/useSelectedDocuments";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function CategoryBlock() {
  const { user } = useUser();
  
  
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);

  const navigate = useNavigate();

  const {
    currentParentId,
    setNextParent,
    goBack,
    trail // 👈 AJOUT ici pour le bouton "Retour"
  } = useNavigationTrail();

  const { toggleSelected, isSelected } = useSelectedDocuments(); // Utilisation du hook pour la sélection


  const fetchCategoriesAndDocs = useCallback(async (parentId, idUser) => {
    if (!idUser) return;

    try {
      const endpoint = parentId === null
        ? `${VITE_API_URL}/getCategoriesByParent/${idUser}/${parentId}`
        : `${VITE_API_URL}/getCategoriesAndDocs/${idUser}/${parentId}`;

      const res = await fetch(endpoint);
      const data = await res.json();

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
      navigate('/login');
    } else if (user?.idUser) {
      fetchCategoriesAndDocs(currentParentId, user.idUser);
    }
  }, [user, currentParentId, navigate, fetchCategoriesAndDocs]);

  const handleGoBack = () => {
    goBack(); // Change le trail
    // On récupère le parentId avant dans le trail et on fait un fetch avec
    const previousParentId = trail[trail.length - 2]; // L'avant-dernier élément
    fetchCategoriesAndDocs(previousParentId, user.idUser); // Rafraîchit les catégories avec l'ancien parentId
  };

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
                setNextParent(cat.idCategory); // Met à jour le trail
                fetchCategoriesAndDocs(cat.idCategory, user.idUser); // ✅ Appelle manuellement la fonction

              }}
            />
            <div className='cat-info'>
            <p>{cat.categoryName}</p>
            <br />
            </div>
            
          </li>
        ))}

        {documents.map((doc) => (
          <li key={`doc-${doc.idDocument}`} style={{ position: "relative" }}>
            <Button
              icon={VITE_API_URL + `/${doc.icones[0].iconeAvatarPath}`}
              style={{
                backgroundColor: isSelected(doc.idDocument) ? "#A3D9A5" : "#FFFFFF",
                position: "relative"
              }}
              type="button"
              variant='secondary'
              text={doc.documentName}
              onClick={() => toggleSelected(doc.idDocument)} // Appel du toggle pour sélectionner/désélectionner
              onDoubleClick={() => navigate(`/quickview/${doc.idDocument}`)}
            />
            {isSelected(doc.idDocument) && (
              <div
                style={{
                  position: "absolute",
                  top: 60,
                  left: 2,
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  border: "black solid 0.5px"
                }}
              ><img
                  style={{
                    width: "100%",
                    height: "100%"
                  }} src="/public/icones/meta/Valid.webp" alt="Sélectionné" /></div>
            )}
            <div className="doc-info">
              <p className="doc-type">{doc.documentType}</p>
              <p className="doc-name">{doc.documentName}</p>
            </div>




          </li>
        ))}
      </ul>

      {trail.length > 1 && (
        <Button
          text="Retour"
          onClick={handleGoBack}
          style={{ backgroundColor: "#ccc", marginTop: "1rem" }}
        />
      )}
    </Block>
  );
}
