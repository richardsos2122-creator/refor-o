# Frequência Reforço

Aplicação para controle de frequência e gerenciamento de alunos e contas.

## Como executar

- Instale dependências:

```bash
cd "C:\Users\User\Documents\AVANCE.JS\frequencia-reforco"
npm install
```

- Inicie em modo de desenvolvimento:

```bash
npm start
```

Abra http://localhost:3000 no navegador.

## Credenciais padrão

- Usuário: `admin`
- Senha: `admin`

As contas são armazenadas no `localStorage` sob a chave `avanca_users_v1`.

## Funcionalidades principais

- Registro e validação de usuários (Login).
- Painel com navegação: Frequência, Alunos, Calendário e Contas.
- Na tela `Contas` há duas abas: "Adicionar Conta" e "Listar Contas" (criar, alterar senha, remover).

## Notas para desenvolvedores

- Arquivo de dados principal: [src/db.js](src/db.js#L1-L200)
- Componente de contas: [src/components/Accounts.js](src/components/Accounts.js#L1-L200)
- Entrada da aplicação: [src/App.js](src/App.js#L1-L200)

Se quiser publicar ou integrar com um backend, recomendo migrar o armazenamento de `localStorage` para uma API ou IndexedDB.

## Licença

Use como desejar. Entre em contato caso precise de ajuda com deploy ou CI/CD.# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
