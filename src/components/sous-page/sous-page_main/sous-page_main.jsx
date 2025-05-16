import "./sous-page_main.css";
import React, { useState } from "react";
import { Button } from "../../button/button";

import { HelpModal } from "../../modal/modal";





const SousPageMain = ({ title, contenu, buttons }) => {

  const [isHelpOpen, setHelpOpen] = useState(false);
  const [currentHelpKey, setCurrentHelpKey] = useState("");

  const openHelpModal = (helpKey) => {
    setCurrentHelpKey(helpKey);
    setHelpOpen(true);
  };

  const closeHelpModal = () => {
    setHelpOpen(false);
  };

  return (
    <>
      <main>
        <section className="sousPageBloc">
          <div className="title">
            <h2>{title}</h2>
          </div>
          <div className="imageHelp">
            <div className="imageContainer">
              <img src="/public/icones/menu/apercu.webp" alt="icone aperçu" />
            </div>
            <div className="help">
              <Button
                icon="/public/icones/meta/Help.webp"
                onClick={() => openHelpModal("apercu")}
              />
            </div>
            <div className="hr">
              <hr />
            </div>
          </div>
          <div className="mainContent">
            {contenu}
            <div className="access">
              <div className="scroll">
                <Button
                  icon="/public/icones/meta/scrollDown.webp"
                  onMouseEnter=""
                />
              </div>
              <div className="pagination">
                pagination,
              </div>
            </div>
          </div>
          <div className="sousPageMenu">
            {buttons.map(btn =>
              React.isValidElement(btn)
                ? React.cloneElement(btn, { key: btn.key })
                : <Button key={btn.key} {...btn} />
            )}
          </div>

        </section>

      </main>

      <HelpModal
        isOpen={isHelpOpen}
        onClose={closeHelpModal}
        helpKey={currentHelpKey}
      />
    </>
  )
};

export default SousPageMain;