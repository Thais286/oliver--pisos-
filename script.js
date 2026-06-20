let carrinho = [];
let total = 0;

function addCarrinho(nome, preco, quantidade) {
    quantidade = Number(quantidade);

    // Impede inserir itens com 0 metros
    if (quantidade <= 0) {
        alert("Digite a quantidade em metros!");
        return;
    }

    let subtotal = preco * quantidade;

    carrinho.push({ nome, preco, quantidade, subtotal });
    total += subtotal;

    atualizarCarrinho();
}

function removerItem(index) {
    total -= carrinho[index].subtotal;  // remove o valor correto
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    total = 0;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${item.quantidade}m - ${item.nome}
            <strong>R$ ${item.subtotal.toFixed(2)}</strong>

            <button onclick="removerItem(${index})" 
                style="margin-left:10px; background:red; color:white; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;">
                X
            </button>
        `;
        lista.appendChild(li);
    });

    totalEl.textContent = total.toFixed(2);
}

function finalizarPedido() {
    const pagamento = document.getElementById("pagamento").value;

    const nome = document.getElementById("nomeCliente").value;
    const endereco = document.getElementById("enderecoCliente").value;
    const obs = document.getElementById("obsCliente").value;

    let mensagem = `🧱 *Pedido Oliver Pisos* \n\n`;

    carrinho.forEach(item => {
        mensagem += `• ${item.quantidade}m - ${item.nome} - R$ ${item.subtotal.toFixed(2)}\n`;
    });

    mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n`;
    mensagem += `*Pagamento:* ${pagamento}\n\n`;
    mensagem += `👤 *Cliente:* ${nome}\n`;
    mensagem += `📍 *Endereço:* ${endereco}\n`;
    mensagem += `📝 *Observações:* ${obs}\n`;

    const url = `https://wa.me/553196511118?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}

/* ============================= */
/*          ZOOM DAS IMAGENS     */
/* ============================= */

function abrirZoom(src) {
    document.getElementById("zoomImg").src = src;
    document.getElementById("zoomModal").style.display = "block";
}

function fecharZoom() {
    document.getElementById("zoomModal").style.display = "none";
}

/* ============================= */
/*          PESQUISA             */
/* ============================= */


function pesquisarProduto() {
    const termo = document.getElementById("searchInput").value.toLowerCase().trim();

    if (termo === "") return;

    // O mapa liga o que o usuário digita (chave) ao ID exato que você tem no HTML (valor)
   const mapa = {
    "pisos laminados": "pisos-laminados",
    "unilim": "unilim",
    "click": "click",
    "ecomex": "ecomex",
    "impresive": "impresive",
    "primiere": "primiere",
    "eligna wide": "eligna-wide",
    "vision": "vision",
    "smart": "smart",
    "tarkett": "tarkett",
    "pisos vinilicos": "pisos-vinilicos",
    "rodape": "rodape",
    "rodapé": "rodape"
};
    
    const destino = mapa[termo];

    if (destino) {
        const elemento = document.getElementById(destino);
        if (elemento) {
            elemento.scrollIntoView({ behavior: "smooth" });
        } else {
            console.error(`O ID "${destino}" está registrado no mapa, mas não foi encontrado no seu código HTML.`);
            alert(`Erro: A seção "${destino}" não foi encontrada na página.`);
        }
    } else {
        alert("Produto não encontrado! Verifique a grafia ou tente outro termo.");
    }
}

// Evento para fazer a busca disparar ao pressionar a tecla Enter
document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        pesquisarProduto();
    }
});