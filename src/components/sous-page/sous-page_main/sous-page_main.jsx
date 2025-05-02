



const SousPageMain = ({ title,  contenu }) => {


  return (
    <main>
      <section>
        <div className="title">
        <h2>{title}</h2>
        </div>
        <div className="imageHelp">
          <p>
            image
          </p>
          <div>
            absolute aide trait gris
          </div>
        </div>
        <div className="mainContent">
        {contenu}
        </div>
        <div className="accessMenu">
          bouton de scroll, pagination, boutons contextuels
        </div>

      </section>

    </main>)
};

export default SousPageMain;