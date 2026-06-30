let produtos = [
    {nome: "Arroz", preco: 27.90, imagem: "img/arroz.png", quantidade: 0},
    {nome: "Feijão", preco: 9.49, imagem: "img/feijao.png", quantidade: 0},
    {nome: "Macarrão", preco: 6.99, imagem: "img/macarrao.png", quantidade: 0},
    {nome: "Leite", preco: 5.89, imagem: "img/leite.png", quantidade: 0},
    {nome: "Pão", preco: 8.50, imagem: "img/pao.png", quantidade: 0},
    {nome: "Café", preco: 18.75, imagem: "img/cafe.png", quantidade: 0},
    {nome: "Açúcar", preco: 4.89, imagem: "img/acucar.png", quantidade: 0},
    {nome: "Óleo", preco: 8.99, imagem: "img/oleo.png", quantidade: 0},
    {nome: "Sal", preco: 2.79, imagem: "img/sal.png", quantidade: 0},
    {nome: "Manteiga", preco: 14.99, imagem: "img/manteiga.png", quantidade: 0},
    {nome: "Queijo", preco: 21.90, imagem: "img/queijo.png", quantidade: 0},
    {nome: "Presunto", preco: 16.49, imagem: "img/presunto.png", quantidade: 0},
    {nome: "Refrigerante", preco: 9.99, imagem: "img/refrigerante.png", quantidade: 0},
    {nome: "Suco", preco: 7.49, imagem: "img/suco.png", quantidade: 0},
    {nome: "Biscoito", preco: 5.29, imagem: "img/biscoito.png", quantidade: 0},
    {nome: "Chocolate", preco: 8.99, imagem: "img/chocolate.png", quantidade: 0},
    {nome: "Sabonete", preco: 3.49, imagem: "img/sabonete.png", quantidade: 0},
    {nome: "Shampoo", preco: 17.90, imagem: "img/shampoo.png", quantidade: 0},
    {nome: "Detergente", preco: 3.99, imagem: "img/detergente.png", quantidade: 0},
    {nome: "Papel Higiênico", preco: 24.90, imagem: "img/papel_higienico.png", quantidade: 0},
    {nome: "Banana", preco: 6.79, imagem: "img/banana.png", quantidade: 0}
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

    } else if (codigo === "SIXSEVEN") {

        desconto = 67;

    } else if (codigo === "PROMO20") {

        desconto = 20;

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