# Deploy - Como publicar seu site

Este projeto já inclui suporte para GitHub Pages usando `gh-pages` e scripts `predeploy`/`deploy` no `package.json`.

## GitHub Pages (via npm)
1. Atualize o campo `homepage` em `package.json` para sua URL de pages (ex: `https://SEU_USUARIO.github.io/NOME_DO_REPO`).
2. Instale dependências:

```bash
npm install
```

3. Faça commit de todas as mudanças locais:

```bash
git add .
git commit -m "Prepare app for deployment"
git push origin main
```

4. Rode o deploy:

```bash
npm run deploy
```

O comando criará/atualizará a branch `gh-pages` e o site ficará disponível na URL do `homepage`.

Observações:
- Se seu branch principal for `master` ou outro nome, use `git push origin BRANCH` adequadamente.
- Se você não tiver um repositório remoto, crie um no GitHub e faça `git remote add origin <url>` antes do push.

## Vercel (recomendado - simples)
1. Acesse https://vercel.com e conecte sua conta GitHub.
2. Importe o repositório e use as configurações padrão (build: `npm run build`, output: `build`).
3. O Vercel fará deploy automático a cada push.

## Netlify (alternativa)
1. Acesse https://app.netlify.com e conecte sua conta GitHub.
2. Crie novo site a partir do repositório.
3. Build command: `npm run build`. Publish directory: `build`.

---

Se quiser, eu posso:
- Atualizar o `homepage` em `package.json` para você (me diga seu `https://github.com/SEU_USUARIO/NOME_DO_REPO`).
- Executar localmente `npm install` e `npm run deploy` aqui (preciso que confirme para rodar comandos git e npm no seu ambiente).