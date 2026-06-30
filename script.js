let produtos = [
    {nome: "Arroz - 5Kg", preco: 27.90, imagem: "img/arroz.png", quantidade: 0},
    {nome: "Feijão - 1Kg", preco: 9.49, imagem: "img/feijao.png", quantidade: 0},
    {nome: "Macarrão - 500g", preco: 6.99, imagem: "img/macarrao.png", quantidade: 0},
    {nome: "Leite - 1L", preco: 5.89, imagem: "img/leite.png", quantidade: 0},
    {nome: "Pão - un", preco: 8.50, imagem: "img/pao.png", quantidade: 0},
    {nome: "Café - 1Kg", preco: 18.75, imagem: "img/cafe.png", quantidade: 0},
    {nome: "Açúcar - 1Kg", preco: 4.89, imagem: "img/acucar.png", quantidade: 0},
    {nome: "Óleo - 900mL", preco: 8.99, imagem: "img/oleo.png", quantidade: 0},
    {nome: "Sal - 1Kg", preco: 2.79, imagem: "img/sal.png", quantidade: 0},
    {nome: "Manteiga - 500g", preco: 14.99, imagem: "img/manteiga.png", quantidade: 0},
    {nome: "Queijo - 4.2Kg", preco: 35.90, imagem: "img/queijo.png", quantidade: 0},
    {nome: "Presunto - 3.5Kg", preco: 16.49, imagem: "img/presunto.png", quantidade: 0},
    {nome: "Refrigerante - 1.5L", preco: 3.99, imagem: "img/refrigerante.png", quantidade: 0},
    {nome: "Suco - 1L", preco: 7.49, imagem: "img/suco.png", quantidade: 0},
    {nome: "Biscoito - 125g", preco: 5.29, imagem: "img/biscoito.png", quantidade: 0},
    {nome: "Chocolate - 215g", preco: 8.99, imagem: "img/chocolate.png", quantidade: 0},
    {nome: "Sabonete - 80g", preco: 3.49, imagem: "img/sabonete.png", quantidade: 0},
    {nome: "Shampoo - 250mL", preco: 17.90, imagem: "img/shampoo.png", quantidade: 0},
    {nome: "Detergente - 500mL", preco: 3.99, imagem: "img/detergente.png", quantidade: 0},
    {nome: "Papel Higiênico - 4un", preco: 8.90, imagem: "img/papel_higienico.png", quantidade: 0},
    {nome: "Banana - Dúzia", preco: 6.79, imagem: "img/banana.png", quantidade: 0}
];

let desconto = 0;
let pagamento = "";

function iniciarMercado() {

    const area = document.getElementById("produtos");

    area.innerHTML = "";

    produtos.forEach((produto, i) => {

        area.innerHTML += `
        <div class="produto">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <p class="preco">
                R$ ${produto.preco.toFixed(2)}
            </p>

            <div class="contador">

                <button onclick="diminuir(${i})">-</button>

                <span id="qtd${i}">
                    ${produto.quantidade}
                </span>

                <button onclick="aumentar(${i})">+</button>

            </div>

        </div>
        `;

    });

    atualizarCarrinho();

}

function aumentar(i) {

    produtos[i].quantidade++;

    document.getElementById("qtd" + i).innerText =
        produtos[i].quantidade;

    atualizarCarrinho();

}

function diminuir(i) {

    if (produtos[i].quantidade > 0) {

        produtos[i].quantidade--;

        document.getElementById("qtd" + i).innerText =
            produtos[i].quantidade;

        atualizarCarrinho();

    }

}

function calcularSubtotal(preco, quantidade) {

    return preco * quantidade;

}

function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    let total = 0;

    produtos.forEach(produto => {

        if (produto.quantidade > 0) {

            const subtotal = calcularSubtotal(produto.preco, produto.quantidade);

            total += subtotal;

            lista.innerHTML += `
            <li>
                ${produto.nome}
                (${produto.quantidade}x)
                - R$ ${subtotal.toFixed(2)}
            </li>
            `;

        }

    });

    total -= total * desconto / 100;

    document.getElementById("total").innerText =
        total.toFixed(2);

}

function aplicarCupom() {

    const campo = document.getElementById("cupom");
    const codigo = campo.value;

    if (codigo === "DESCONTO10") {

        desconto = 10;

    } else if (codigo === "15OFF") {

        desconto = 15;

    } else if (codigo === "PROMO20") {

        desconto = 20;

    } 
    else if (codigo === "SIXSEVEN") {

        desconto = 67;

    } else {

        alert("Cupom inválido!");
        return;

    }

    campo.value = "";

    document.getElementById("desconto").innerText =
        "Desconto: " + desconto + "%";

    atualizarCarrinho();

}
document.getElementById("cupom").addEventListener("input", function () {
    let campo = document.getElementById("cupom");
    campo.value = campo.value.toUpperCase();
});


    function selecionarPagamento(metodo) {

        pagamento = metodo;

        document.getElementById("formaPagamento").innerText =
            "Forma de pagamento: " + metodo;

    }

    function obterFormaPagamento() {

        return pagamento;

    }

    function finalizarCompra() {

        const forma = obterFormaPagamento();

        if (forma === "") {

            alert("Selecione uma forma de pagamento!");

            return;

        }

        const total =
            document.getElementById("total").innerText;

        alert(
            "Compra finalizada!\n\n" +
            "Total: R$ " + total +
            "\nPagamento: " + forma
        );

    }

    window.onload = function () {

        let tema = localStorage.getItem("tema");

        if (tema === "preto") {

            document.body.classList.remove("dark");
            localStorage.setItem("tema", "branco");

        } else {

            document.body.classList.add("dark");
            localStorage.setItem("tema", "preto");

        }

        iniciarMercado();

    }