(function () {
  const $ = (id) => document.getElementById(id);
  const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  let LOJA = {};
  let PRODUTOS = [];

  function linkWpp(texto) {
    return "https://wa.me/" + LOJA.whatsapp + "?text=" + encodeURIComponent(texto);
  }

  function msgProduto(p) {
    const preco = p.preco != null ? ` (${brl(p.preco)})` : "";
    return `Olá! Vi o produto "${p.nome}"${preco} no site da ${LOJA.nome} e gostaria de mais informações.`;
  }

  const placeholderSvg =
    '<div class="ph"><svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 30v-8a6 6 0 0 1 6-6h28a6 6 0 0 1 6 6v8"/><path d="M8 30a4 4 0 0 1 8 0v6h32v-6a4 4 0 0 1 8 0v14H8z"/><path d="M14 44v6M50 44v6"/></svg></div>';

  let categoria = "Todos";
  let termo = "";

  function renderChips() {
    const categorias = ["Todos", ...new Set(PRODUTOS.map((p) => p.categoria).filter(Boolean))];
    if (!categorias.includes(categoria)) categoria = "Todos";
    $("chips").innerHTML = "";
    categorias.forEach((c) => {
      const b = document.createElement("button");
      b.className = "chip";
      b.type = "button";
      b.textContent = c;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", String(c === categoria));
      b.onclick = () => { categoria = c; renderChips(); renderGrade(); };
      $("chips").appendChild(b);
    });
  }

  function card(p) {
    const el = document.createElement("article");
    el.className = "card";

    const img = document.createElement("div");
    img.className = "card__img";
    if (p.imagem) {
      const im = document.createElement("img");
      im.src = p.imagem;
      im.alt = p.nome;
      im.loading = "lazy";
      im.onerror = () => { im.remove(); img.insertAdjacentHTML("afterbegin", placeholderSvg); };
      img.appendChild(im);
    } else {
      img.insertAdjacentHTML("afterbegin", placeholderSvg);
    }
    if (p.esgotado || p.destaque) {
      const t = document.createElement("span");
      t.className = "tag" + (p.esgotado ? " tag--off" : "");
      t.textContent = p.esgotado ? "Esgotado" : "Destaque";
      img.appendChild(t);
    }

    const corpo = document.createElement("div");
    corpo.className = "card__corpo";
    const cat = document.createElement("span");
    cat.className = "card__cat";
    cat.textContent = p.categoria || "";
    const nome = document.createElement("h3");
    nome.className = "card__nome";
    nome.textContent = p.nome;
    const desc = document.createElement("p");
    desc.className = "card__desc";
    desc.textContent = p.descricao || "";
    const preco = document.createElement("div");
    preco.className = "card__preco";
    preco.innerHTML = p.preco != null ? brl(p.preco) : "<small>Preço sob consulta</small>";
    const btn = document.createElement("a");
    btn.className = "btn btn--wpp btn--block";
    btn.href = linkWpp(msgProduto(p));
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.textContent = p.esgotado ? "Consultar disponibilidade" : "Pedir no WhatsApp";

    corpo.append(cat, nome, desc, preco, btn);
    el.append(img, corpo);
    return el;
  }

  function renderGrade() {
    const t = termo.trim().toLowerCase();
    const lista = PRODUTOS.filter(
      (p) =>
        (categoria === "Todos" || p.categoria === categoria) &&
        (!t || ((p.nome || "") + " " + (p.descricao || "") + " " + (p.categoria || "")).toLowerCase().includes(t))
    );
    const grade = $("grade");
    grade.innerHTML = "";
    lista.forEach((p) => grade.appendChild(card(p)));
    $("vazio").hidden = lista.length > 0;
  }

  function init(dados) {
    LOJA = dados.loja || {};
    PRODUTOS = dados.produtos || [];

    document.title = `${LOJA.nome} — Vitrine`;
    $("logo").textContent = LOJA.nome;
    $("hero-titulo").textContent = LOJA.slogan;
    $("rod-nome").textContent = LOJA.nome;
    $("rod-end").textContent = LOJA.endereco || "";
    $("rod-hor").textContent = LOJA.horario || "";
    if (LOJA.instagram) {
      $("rod-insta").href = LOJA.instagram;
      $("rod-insta").hidden = false;
    }
    const geral = linkWpp(`Olá! Vim pelo site da ${LOJA.nome} e gostaria de ajuda.`);
    $("btn-topo").href = geral;
    $("btn-flutuante").href = geral;

    $("busca").addEventListener("input", (e) => { termo = e.target.value; renderGrade(); });
    renderChips();
    renderGrade();
  }

  fetch("produtos.json?v=" + Date.now())
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(init)
    .catch(() => {
      $("vazio").hidden = false;
      $("vazio").textContent = "Não foi possível carregar os produtos. Tente recarregar a página.";
    });
})();
