import { useContext } from "react";
import ModalContext from "../context/ModalContext";

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal() doit être utilisé dans un <ModalProvider>");
    }
    return context;
}
