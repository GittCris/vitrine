# Vitrine de Móveis

Site estático (HTML + CSS + JS) com vitrine de produtos e botão "Pedir no WhatsApp" em cada item.
Funciona bem no celular e tem um painel de administração (`admin.html`) para você mexer nos produtos sem editar código.

## Arquivos

- `index.html`, `style.css`, `script.js`: o site
- `produtos.json`: dados da loja e dos produtos (o painel edita este arquivo)
- `img/`: fotos dos móveis
- `admin.html`: painel de administração (abra em `https://SEU-USUARIO.github.io/SEU-REPO/admin.html`)

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes arquivos para a raiz:
   ```
   git init
   git add .
   git commit -m "Vitrine de móveis"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```
2. No repositório: **Settings → Pages → Build and deployment**
3. Em *Source* escolha **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
4. Em ~1 minuto o site estará em `https://SEU-USUARIO.github.io/SEU-REPO/`

## Links

- **Para os clientes:** `https://SEU-USUARIO.github.io/SEU-REPO/`
- **Para você (admin):** `https://SEU-USUARIO.github.io/SEU-REPO/admin.html`

Dica: se o repositório se chamar exatamente `SEU-USUARIO.github.io`, o link dos clientes fica só `https://SEU-USUARIO.github.io/`.
Salve o link do admin nos favoritos ou use "Adicionar à tela inicial" no celular. Não divulgue esse link nem coloque no site.
Para um endereço próprio (ex.: www.sualoja.com.br), use Settings → Pages → Custom domain.

## Usar o painel (`/admin.html`)

Na primeira vez, gere um token do GitHub (só precisa fazer uma vez):

1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. *Repository access*: **Only select repositories** e marque só o repositório da vitrine.
3. *Permissions → Repository permissions*: **Contents: Read and write**.
4. Gere e copie o token.

Depois, abra o `admin.html` e cole o token. O painel descobre sozinho o repositório e o branch.

**Senha do aparelho (recomendado):** na primeira vez, crie também uma senha curta (mínimo 4 caracteres). O token é guardado trancado por ela neste aparelho e, nas próximas vezes, você digita só a senha. Se esquecer a senha, toque em "Usar outro token" e cole o token de novo. Em outro celular ou computador, cole o token e crie uma senha de novo.

**Nunca coloque o token ou senhas em arquivos do site** (nem em `.env`): tudo que está no repositório publicado fica visível para qualquer pessoa. O token só deve ficar no painel, no seu aparelho.
Se der erro ao entrar, abra "Opções avançadas" e informe usuário e repositório.

No painel você pode:
- adicionar, editar, excluir e reordenar móveis
- trocar foto pelo celular (a foto é reduzida automaticamente antes de enviar)
- mudar preço, descrição, categoria, marcar "Destaque" ou "Esgotado"
- alterar WhatsApp, nome, endereço e horário da loja

Cada salvamento vira um commit no GitHub; o site atualiza em cerca de 1 minuto.

**Segurança:** o token só dá acesso a este repositório. Não compartilhe o token e use "Sair" no painel se estiver em aparelho de outra pessoa. Quem abrir o `admin.html` sem o token não consegue alterar nada.

## Agentes para modificações (Claude Code no VS Code)

O projeto traz três agentes (pasta `.claude/agents/`), o comando `/vitrine` (pasta `.claude/commands/`) e o `CLAUDE.md`. Tudo isso está no `.gitignore`: **fica só no seu computador e não vai para o GitHub**. Se clonar o projeto em outro computador, copie `.claude/` e `CLAUDE.md` junto.

- `vitrine-dev`: faz a modificação, corrige o que os outros apontarem e publica (só com a sua autorização).
- `design-vitrine-dev`: revisa o visual (erros, coisas feias, "cara de IA") e corrige sozinho.
- `qa-vitrine-dev`: testa o site e reporta problemas. Não edita nada.

**Como usar**
1. Abra a pasta do projeto no VS Code e inicie uma sessão nova do Claude Code (agentes e comandos só são lidos ao começar a sessão).
2. Digite o comando com o pedido, por exemplo: `/vitrine baixe o preço do sofá retrátil para 2299,90 e marque a cama box como destaque`.
3. O Claude coordena: dev → design (quando a mudança é visual ou de foto) → QA. Se o QA achar problema, volta para o dev corrigir (até 3 voltas).
4. Você recebe **um único resumo** e escolhe: Publicar, Ajustar ou Descartar. Só publica se você escolher Publicar.

Para testes no navegador (screenshots do design e testes do QA) é preciso o Playwright. Se os agentes avisarem que falta, rode `npx playwright install chromium` (precisa do Node instalado). Sem ele, eles revisam só pelo código e avisam disso no relatório.

O painel `admin.html` continua sendo o jeito mais rápido para trocar foto e preço pelo celular; os agentes são para mudanças maiores (visual, textos, novas seções).

## Editar sem o painel

Você também pode editar `produtos.json` e `img/` direto no GitHub ou no seu computador e fazer `git push`.
Campos de cada produto: `nome`, `categoria`, `descricao`, `preco` (número ou `null`), `imagem` (ex.: `img/sofa.jpg`), `destaque`, `esgotado`.
