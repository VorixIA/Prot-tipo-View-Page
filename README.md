# Protótipo do site — Vorix | Inteligência Automática

Pacote completo do protótipo. Duas versões do mesmo site, mais os arquivos usados para gerar e testar.

---

## O que tem aqui

```
vorix-prototipo-site.html      versão em arquivo único (abre com dois cliques)
site/
  index.html                   versão separada, para entregar ao dev
  assets/styles.css            355 linhas
  assets/script.js             113 linhas
preview-desktop.jpg            página inteira, 1440px
preview-mobile.jpg             página inteira, 390px
ferramentas/shot.py            script que gera os previews
ferramentas/check.py           script que testa interações e erros de console
LEIA-ME.md                     este arquivo
```

As duas versões do site são idênticas em resultado. A de arquivo único serve para mostrar
para alguém agora. A separada serve para dar continuidade ao desenvolvimento.

---

## Identidade visual

A paleta não foi escolhida: foi medida a partir do perfil oficial da marca.

| Uso | Valor |
|---|---|
| Fundo | `#000000` — preto puro |
| Títulos | `#E6E6E6` |
| Corpo de texto | `#B8B8B8` |
| Apoio, legendas, numeração | `#8A8A8A` |
| Destaque máximo | `#FFFFFF` — usado com escassez |
| Fios e bordas | `rgba(255,255,255,.11)` |

A marca não tem cor de destaque. A hierarquia é feita por tom, peso e escala — nunca por cor.
Todos esses valores são variáveis CSS no topo do `styles.css`; trocar a paleta é trocar seis linhas.

**Tipografia:** Space Grotesk (títulos e elementos de interface) e Inter (corpo), carregadas do
Google Fonts. Se preferir hospedar as fontes no próprio servidor, é a única dependência externa
do projeto — o resto é autocontido.

---

## O que substituir antes de publicar

| Onde | O que está lá | O que colocar |
|---|---|---|
| Botão flutuante e rodapé | `wa.me/5554997043135` | número real do WhatsApp |
| Rodapé | `contato@vorix.com.br` | e-mail real |
| CTA final | três botões com `href="#"` | links do formulário, agenda e WhatsApp |
| `<head>` | `https://www.vorix.com.br/` | domínio real (canonical, Open Graph, schema) |
| `<head>` | `og-vorix.jpg` | imagem 1200×630 para compartilhamento |
| Rodapé | LinkedIn com `href="#"` | URL do perfil |

**Conteúdo marcado como ilustrativo.** A seção de Resultados e os três depoimentos exibem um
rótulo na própria tela ("Dados ilustrativos" / "Conteúdo de demonstração"). Os números são faixas
de referência do mercado, não medições da Vorix. Os rótulos só devem sair quando entrarem casos
reais no lugar.

---

## SEO já configurado

- Um único `<h1>`, nove `<h2>`, hierarquia sem saltos
- Meta description, canonical, Open Graph e Twitter Card
- Schema.org em JSON-LD: `Organization`, `Service` e `FAQPage`
- Palavras-chave trabalhadas no corpo do texto: automação RPA, inteligência artificial,
  desenvolvimento de software, automação de processos, integração de sistemas, transformação digital

O `FAQPage` faz as oito perguntas do site poderem aparecer expandidas no Google. Se o texto das
respostas mudar no HTML, precisa mudar também no JSON-LD — os dois têm que bater.

---

## Acessibilidade

- Navegação completa por teclado, com foco visível
- Link "Ir para o conteúdo" no início
- `aria-expanded` no menu e no FAQ, `aria-label` nos controles do carrossel
- SVGs decorativos marcados com `aria-hidden`, a ilustração do hero com descrição
- `prefers-reduced-motion` respeitado: quem desativa animação no sistema recebe a página estática
- Sem estouro horizontal em 390px

---

## Como rodar

Abrir o `index.html` no navegador já funciona. Para desenvolver com recarregamento automático:

```bash
cd site
python3 -m http.server 8000
# http://localhost:8000
```

---

## Porte para React

Cada seção do HTML está isolada e comentada, o que torna a conversão mecânica:

`Header` · `Hero` · `Strip` · `Benefits` · `Services` · `RPA` · `Flow` · `Differentials` ·
`Results` · `Testimonials` · `FAQ` · `FinalCTA` · `Footer` · `FloatingActions`

O CSS é escrito com variáveis e classes independentes, sem framework, então dá para migrar para
CSS Modules, styled-components ou Tailwind sem reescrever a lógica visual.

---

## Sobre os arquivos em `ferramentas/`

Não fazem parte do site. São os dois scripts Python usados durante a construção:

- `shot.py` — abre a página em Chromium headless e salva a captura inteira em desktop e mobile
- `check.py` — dispara FAQ, carrossel e menu, e reporta erros de console

Rodam com `pip install playwright && playwright install chromium`. Úteis se você quiser
conferir o resultado depois de mexer no código.
