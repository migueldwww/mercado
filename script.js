let produtos = [
    {nome: "Arroz", preco: 25, imagem: "img/arroz.png", quantidade: 0},
    {nome: "Feijão", preco: 10, imagem: "img/feijao.png", quantidade: 0},
    {nome: "Macarrão", preco: 8, imagem: "img/macarrao.png", quantidade: 0},
    {nome: "Leite", preco: 6, imagem: "img/leite.png", quantidade: 0},
    {nome: "Pão", preco: 7, imagem: "img/pao.png", quantidade: 0},
    {nome: "Café", preco: 15, imagem: "img/cafe.png", quantidade: 0},
    {nome: "Açúcar", preco: 5, imagem: "img/acucar.png", quantidade: 0},
    {nome: "Óleo", preco: 9, imagem: "img/oleo.png", quantidade: 0},
    {nome: "Sal", preco: 3, imagem: "img/sal.png", quantidade: 0},
    {nome: "Manteiga", preco: 12, imagem: "img/manteiga.png", quantidade: 0},
    {nome: "Queijo", preco: 18, imagem: "img/queijo.png", quantidade: 0},
    {nome: "Presunto", preco: 14, imagem: "img/presunto.png", quantidade: 0},
    {nome: "Refrigerante", preco: 9, imagem: "img/refrigerante.png", quantidade: 0},
    {nome: "Suco", preco: 8, imagem: "img/suco.png", quantidade: 0},
    {nome: "Biscoito", preco: 4, imagem: "img/biscoito.png", quantidade: 0},
    {nome: "Chocolate", preco: 7, imagem: "img/chocolate.png", quantidade: 0},
    {nome: "Sabonete", preco: 3, imagem: "img/sabonete.png", quantidade: 0},
    {nome: "Shampoo", preco: 16, imagem: "img/shampoo.png", quantidade: 0},
    {nome: "Detergente", preco: 4, imagem: "img/detergente.png", quantidade: 0},
    {nome: "Papel Higiênico", preco: 20, imagem: "img/papel_higienico.png", quantidade: 0},
    {nome: "Banana", preco: 6, imagem: "img/banana.png", quantidade: 0}
];

let desconto = 0;

function iniciarMercado() {

    let area = document.getElementById("produtos");

    area.innerHTML = "";

    for(let i = 0; i < produtos.length; i++){

        area.innerHTML += `
        <div class="produto">

            <img src="${produtos[i].imagem}" alt="${produtos[i].nome}">

            <h3>${produtos[i].nome}</h3>

            <p class="preco">
                R$ ${produtos[i].preco.toFixed(2)}
            </p>

            <div class="contador">

                <button onclick="diminuir(${i})">-</button>

                <span id="qtd${i}">
                    ${produtos[i].quantidade}
                </span>

                <button onclick="aumentar(${i})">+</button>

            </div>

        </div>
        `;
    }

    atualizarCarrinho();
}

function aumentar(indice){

    produtos[indice].quantidade++;

    document.getElementById("qtd" + indice).innerText =
        produtos[indice].quantidade;

    atualizarCarrinho();
}

function diminuir(indice){

    if(produtos[indice].quantidade > 0){

        produtos[indice].quantidade--;

        document.getElementById("qtd" + indice).innerText =
            produtos[indice].quantidade;

        atualizarCarrinho();
    }
}

function calcularSubtotal(preco, quantidade) {
    return preco * quantidade;
}

function atualizarCarrinho(){

    let lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    let total = 0;

    for(let i = 0; i < produtos.length; i++){

        if(produtos[i].quantidade > 0){

            let subtotal = calcularSubtotal(produtos[i].preco, produtos[i].quantidade);

            total += subtotal;

            lista.innerHTML += `
            <li>
                ${produtos[i].nome}
                (${produtos[i].quantidade}x)
                - R$ ${subtotal.toFixed(2)}
            </li>
            `;
        }
    }

    total = total - (total * desconto / 100);

    document.getElementById("total").innerText =
    total.toFixed(2);
}

function aplicarCupom(){

    let campoCupom = document.getElementById("cupom");

    let codigo = campoCupom.value.toUpperCase();

    if(codigo === "DESCONTO10"){
        desconto = 10;
    }
    else if(codigo === "DESCONTO67"){
        desconto = 67;
    }
    else{
        alert("Cupom inválido!");
        return; 
    }

    campoCupom.value = ""; 

    document.getElementById("desconto").innerText =
        "Desconto: " + desconto + "%";

    atualizarCarrinho();
}

function finalizarCompra() {
    let forma = obterFormaPagamento();

    if (forma === "") {
        alert("Selecione uma forma de pagamento!");
        return;
    }

    let valorTotal = parseFloat(document.getElementById("total").innerText);
    alert("Compra finalizada!\nTotal: R$ " + valorTotal + "\nPagamento: " + forma);
}

let pagamento = "";

function selecionarPagamento(metodo) {
    pagamento = metodo;
    document.getElementById("formaPagamento").innerText =
        "Forma de pagamento: " + pagamento;
}

function obterFormaPagamento() {
    return pagamento;
}