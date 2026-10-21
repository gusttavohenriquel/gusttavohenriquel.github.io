# Portfólio — Gustavo Henrique

Portfólio profissional estático em HTML, CSS e JavaScript, com modo claro/escuro, cards de projetos, estudos de caso em janelas e contatos.

## Organização dos arquivos

```text
portfolio-gustavo-henrique/
├── index.html                      # Estrutura e conteúdo da página
├── css/
│   └── style.css                   # Layout, estilos, temas e responsividade
├── js/
│   └── main.js                     # Alternar tema, detalhes e copiar e-mail
├── assets/
│   ├── icons/
│   │   └── favicon.svg             # Ícone da aba do navegador
│   └── projetos/                   # Reservado às capturas reais
│       ├── markcar/
│       ├── unica/
│       ├── barbearias/
│       └── racha-franca/
├── .nojekyll                       # Publica arquivos estáticos no GitHub Pages
├── .gitignore                      # Evita subir arquivos locais desnecessários
├── CHECKLIST_PUBLICACAO.md        # Revisões antes da divulgação
└── README.md                       # Este documento
```

## Executar no computador

**Alternativa A:** abrir `index.html` no navegador. Os links e o estilo do site usam caminhos relativos.

**Alternativa B (recomendada):** no terminal, dentro da pasta do projeto:

```bash
python3 -m http.server 5500
```

Depois abra `http://localhost:5500/` no navegador. Para parar o servidor, pressione `Ctrl+C`.

Pode usar também a extensão **Live Server** do VS Code (`Go Live`). Não há `npm install` ou build obrigatório.

## Publicar no GitHub Pages

Este guia usa o endereço principal da conta GitHub `gusttavohenriquel`.

1. Acesse o GitHub e crie um repositório **público** com o nome **`gusttavohenriquel.github.io`** (respeitando o nome de usuário exato).
2. Se o repositório foi criado vazio, na pasta deste projeto, execute:

   ```bash
   git init
   git add .
   git commit -m "Publica portfólio profissional"
   git branch -M main
   git remote add origin https://github.com/gusttavohenriquel/gusttavohenriquel.github.io.git
   git push -u origin main
   ```

   Se você criou um README pelo site ao criar o repositório, prefira clonar esse repositório e copiar os arquivos para ele antes de `git add/commit/push`, para evitar divergências de histórico.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Em **Branch**, selecione **main**, pasta **/(root)**, e clique em **Save**.
6. Confira o estado da publicação em **Actions** ou **Settings → Pages**.
7. Acesse **https://gusttavohenriquel.github.io/** quando o GitHub indicar que a publicação terminou.

Se você optar por um repositório chamado `portfolio` em vez de `<usuario>.github.io`, o endereço será `https://gusttavohenriquel.github.io/portfolio/`. Os caminhos relativos deste projeto funcionam nos dois formatos.

Não publique arquivos de configuração com senhas, chaves de API, dados de clientes, placas de veículos, endereços privados ou outras informações internas.

## Alterações futuras

- **Textos e links:** edite `index.html`.
- **Cores, tamanhos, layout e mobile:** edite `css/style.css` (variáveis no `:root`).
- **Botão de tema, modais de projetos e copiar e-mail:** edite `js/main.js`.
- **Logotipo da aba:** edite `assets/icons/favicon.svg`.
- **Capturas de projeto:** salve imagens otimizadas em `assets/projetos/<projeto>/`.

### Como colocar uma captura de tela na janela de um projeto

Dentro de `index.html`, encontre a janela `<dialog id="detail-markcar">`, por exemplo, e substitua o conteúdo de `div.gallery-placeholder` por uma figura:

```html
<figure class="project-shot">
  <img src="./assets/projetos/markcar/dashboard.webp"
       alt="Tela inicial do painel de gestão MarkCar"
       loading="lazy" decoding="async">
  <figcaption>Painel principal do sistema, com informações ilustrativas.</figcaption>
</figure>
```

O CSS `project-shot` será encontrado no final de `css/style.css`. **Não use esse caminho antes de criar a imagem real.** Nunca publique dados reais ou informações confidenciais nos prints.

Antes da publicação pública definitiva, revise o [checklist](./CHECKLIST_PUBLICACAO.md).

## Links

- GitHub: https://github.com/gusttavohenriquel
- LinkedIn usado neste portfólio: https://www.linkedin.com/in/gusttavo-henriquel/
- E-mail: gustavohenriquel.dev@gmail.com

> **Importante:** confirme que o LinkedIn acima é o seu endereço correto. A versão 2 o utiliza, mas ele foi apontado como diferente do endereço que constava no perfil público do GitHub.
