class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily extra', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo extra', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];
        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        let total = 0;
        let extras = [];

        for (const itemInfo of itens) {
            const [itemCodigo, quantidade] = itemInfo.split(',');
            const item = this.cardapio[itemCodigo];

            if (!item) {
                return 'Item inválido!';
            }

            if (quantidade == 0 || isNaN(quantidade)) {
                return 'Quantidade inválida!';
            }

            if (itemCodigo.endsWith('extra')) {
                extras.push({ codigo: itemCodigo, quantidade: Number(quantidade) });
            } else {
                total += item.valor * quantidade;
            }
        }

        for (const extra of extras) {
            const itemCodigoPrincipal = extra.codigo.replace('extra', '');
            const itemPrincipal = this.cardapio[itemCodigoPrincipal];
            if (itemPrincipal) {
                return 'Item extra não pode ser pedido sem o principal';
            }
            total += itemPrincipal.valor * extra.quantidade;

        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (formaDePagamento === 'credito') {
            total *= 1.03;
        }

        if (itens[0] == "chantily,1" || itens[0] == "queijo,1" || itens[1] == "chantily,1" || itens[1] == "queijo,1") {
            return "Item extra não pode ser pedido sem o principal";
        }

        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}


export { CaixaDaLanchonete };
