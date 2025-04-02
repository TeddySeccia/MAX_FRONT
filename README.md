# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

npm run dev pour lancer en local

localhost:5173 dans navigateur pour afficher la page
netstat -ano | findstr ":5173" sur terminal pour ecouter au port 5173
Il te sort un truc comme ça : 

 TCP    [::1]:5173             [::]:0                 LISTENING       24328
  TCP    [::1]:5173             [::1]:59098            ESTABLISHED     24328
  TCP    [::1]:59098            [::1]:5173             ESTABLISHED     18200

Pour libérer un port, tape la ligne de commande avec le PID 24328 du port 5173 suivante : 
taskkill /PID 24328 /F 
avec 24328 le PID