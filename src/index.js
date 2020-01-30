window.$ = window.jQuery = require('jquery');

const url = 'https://www.clickqi.com.br/api/dataentities/CG/search?_fields=productName,productRating,productListPrice,productBestPrice,productInstallments,productInstallmentsValue,productImage&_sort=productName%20DESC';

function listarProdutos() {
    $(document).ready(function(){
        $.get(url, function(data) {

            if (data && data.length) {
                data.forEach(produto => {
                    let itemDiv = document.createElement('div');
                    $(itemDiv).addClass('item');

                    let img = document.createElement('img');
                    $(img).attr('src', produto.productImage);
                    itemDiv.appendChild(img);

                    let infoDiv = document.createElement('div');
                    $(infoDiv).addClass('info');
                    itemDiv.appendChild(infoDiv);

                    if (produto.productBestPrice < produto.productListPrice) {
                        let descontoDiv = document.createElement('div');
                        $(descontoDiv).addClass('desconto');
                        infoDiv.appendChild(descontoDiv);

                        let off = document.createElement('span');
                        off.innerText = 'OFF';
                        $(off).addClass('sp-desconto');
                        infoDiv.appendChild(off);
                    }

                    let title = document.createElement('span');
                    $(title).addClass('title');
                    title.innerText = produto.productName;
                    infoDiv.appendChild(title);

                    let avaliacao = document.createElement('span');
                    $(avaliacao).addClass('avaliacao');

                    let star;
                    for (let i = 0; i < 5; i++) {
                        star = document.createElement('i');
                        if (i < (produto.productRating / 10)) {
                            star.innerText = 'star';
                        } else {
                            star.innerText = 'star_border';
                        }
                        $(star).addClass('material-icons');
                        avaliacao.appendChild(star);
                    }
                    infoDiv.appendChild(avaliacao);

                    let precoDiv = document.createElement('div');
                    $(precoDiv).addClass('preco');

                    let precoTab = document.createElement('span');
                    $(precoTab).addClass('preco-tab');
                    precoTab.innerText = 'de R$ ' + formatacaoValor(produto.productListPrice);
                    if (produto.productBestPrice < produto.productListPrice) {
                        $(precoTab).addClass('active');
                    }
                    precoDiv.appendChild(precoTab);

                    let precoAtual = document.createElement('span');
                    $(precoAtual).addClass('valor');
                    precoAtual.innerText = 'por R$ ' + formatacaoValor(produto.productBestPrice);
                    precoDiv.appendChild(precoAtual);

                    infoDiv.appendChild(precoDiv);

                    let parcDiv = document.createElement('span');
                    $(parcDiv).addClass('parcelamento');

                    parcDiv.innerText = 'ou em ' + produto.productInstallments +
                        'x de ' + formatacaoValor(produto.productInstallmentsValue);
                    if (produto.productInstallments > 0) {
                        $(parcDiv).addClass('active');
                    }
                        infoDiv.appendChild(parcDiv);

                    let button = document.createElement('button');
                    button.innerText = 'Comprar';
                    infoDiv.appendChild(button);

                    $('#produtos').append(itemDiv);
                });

                $(document).ready(function(){
                    const ca_produtos = $("#produtos");
                
                    ca_produtos.owlCarousel({
                        loop:true,
                        margin:10,
                        responsiveClass:true,
                        dots: false,
                        responsive:{
                            0:{
                                items:1,
                            },
                            600: {
                                items: 2,
                            },
                            800:{
                                items:3,
                            },
                            1000:{
                                items:4,
                            }
                        }
                    });
                
                    $("#arrow_left").on("click", function(){
                        ca_produtos.trigger('prev.owl.carousel');
                    });
                
                    $("#arrow_right").on("click", function(){
                        ca_produtos.trigger('next.owl.carousel');
                    });
                });
            }
        });
    });
}

function formatacaoValor(valor) {
    return valor.toString().slice(0, -2) + ',' + valor.toString().slice(-2);
}

listarProdutos();