import SousPage from "../../components/sous-page/sous-page";
import SousPageMain from "../../components/sous-page/sous-page_main.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const QuickView = () => {
    const { id } = useParams();
    const [doc, setDoc] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetch(`${VITE_API_URL}/getDocument/${id}`)
            .then((res) => res.json())
            .then((data) => setDoc(data.document))
            .catch(console.error);
    }, [id]);

    if (!doc) return <p>Chargement...</p>;

    const fileUrl = `${VITE_API_URL}/${doc.documentPath}`;

    const isPDF = doc.documentPath.endsWith(".pdf");
  const isImage = /\.(jpe?g|png|webp|gif)$/i.test(doc.documentPath);

    // Ton contenu dynamique spécifique à cette page
    let contenu = null;
    if (isPDF) {
      contenu = (
        <iframe
          src={fileUrl}
          title="Aperçu PDF"
          width="100%"
          height="600px"
          style={{ border: "none" }}
        />
      );
    } else if (isImage) {
      contenu = (
        <img src={fileUrl} alt={doc.documentName} style={{ maxWidth: "100%" }} />
      );
    } else {
      contenu = (
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          Télécharger le document
        </a>
      );
    }

    return (
        <SousPage>
            <SousPageMain
                title={`Document : ${doc.documentName}`}
                contenu={contenu}
            />
        </SousPage>
    );
};

export default QuickView;
