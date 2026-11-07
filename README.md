# CEMAB JS

Editor JavaScript online (playground) que permite escrever, executar e testar código JS diretamente no navegador, com syntax highlighting (CodeMirror), terminal interativo com entrada de dados (`prompt`/`input`) e salvamento de arquivos.

## ✨ Funcionalidades

- Editor com syntax highlighting para JavaScript
- Auto-fechamento de parênteses, chaves e colchetes
- Execução de código no navegador via `eval` sandboxed do próprio browser
- Terminal interativo com suporte a `console.log`, `prompt` e histórico de comandos (↑/↓)
- Salvamento do código em arquivo `.js`
- Layout responsivo e acessível
- SEO otimizado (meta tags, Open Graph, Twitter Card, JSON-LD, sitemap e robots.txt)

## 📁 Estrutura do projeto

```
.
├── index.html              # Página principal
├── 404.html                # Página de erro
├── robots.txt              # Regras para crawlers
├── sitemap.xml             # Mapa do site
├── site.webmanifest        # Manifesto PWA
├── assets/
│   ├── css/styles.css      # Estilos
│   ├── js/app.js           # Lógica da aplicação
│   └── img/icon.jpeg       # Favicon / logo
├── googled866275e09ae876b.html  # Verificação Google Search Console
├── LICENSE
└── README.md
```

## 🚀 Como usar

Basta abrir o `index.html` em um navegador ou servir a pasta com qualquer servidor estático:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Depois acesse `http://localhost:8080`.

## 🌐 Deploy (GitHub Pages)

O projeto é estático e pode ser publicado via GitHub Pages:

1. Vá em **Settings → Pages**
2. Em **Source**, selecione a branch `main` e a pasta `/ (root)`
3. Salve e aguarde a publicação em `https://davidsousadev.github.io/cemabjs/`

## 🔍 SEO

- Meta description, keywords, author, robots
- Open Graph e Twitter Card
- Dados estruturados (JSON-LD `WebApplication`)
- `canonical`, `sitemap.xml`, `robots.txt`
- Verificação do Google Search Console (`googled866275e09ae876b.html`)

## 📄 Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE).

## 👤 Autor

**David Sousa** — [@davidsousadev](https://github.com/davidsousadev)
