//animacao inicial de flip da carta

/*const cards = document.querySelectorAll('.card');

function flipCard() {
  this.classList.toggle('flip'); ----- 
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard); ---- qs vai gerar uma lista de elementos, ao iterar com foreach, aplicamos um listener em cada elemento, chamando a funcao para cada um deles
});
*/

//LOGICA DO JOGO

//Quando clicamos na primeira carta, precisamos esperar a segunda carta virar.
//As variáveis hasFlippedCard e flippedCard se encarregarão de gerenciar o estado do jogo. 

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return; //fazer apenas quando chegar em duplo clique

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this; //adicionar atributo data no html para o else
        return;
    }
    secondCard = this;
    //hasFlippedCard = false; retirar depois

    checkforMatch(); //criar funcao para checar se as cartas sao iguais atraves do atributo data
}



//funcao que checa se o tipo (atributo data) e valor(nome do atributo) sao iguais
function checkforMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards(); //criar funcao que desabilita o clique nas cartas
        return;
    }

    unflipCards(); //criar funcao que desvira as cartas
}


//funcao que retira o listener dos elementos firstcard e secondcard
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard(); //adicionar depois
}



//funcao que desvira as cartas selecionadas
function unflipCards() {
    lockBoard = true; // -----> apenas depois

    //o settimeout é um metodo js que recebe uma funcao, e um tempo para essa funcao ser ativada, essa funcao é ativada apenas uma vez
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        //lockBoard = false; ----tirar depois
        resetBoard(); //adicionar depois
    }, 1500);
}
//quando tiver toda essa estrutura montada, mostrar o settimeout funcionando



// BLOQUEIO O TABULEIRO
//vamos declarar uma variavel lockboard como false no topo do codigo
//e adiciona-la na primeira linha da funcao flipcard, essa condicao previne que outra carta seja virada ate que as outras desvirem
//quando o jogador clicar na segunda carta, setamos ela como true na funcao unflipcards
//apos remover as classes flip no timeout, setar novamente como false




/*  DUPLO CLIQUE   */
//caso clique na mesma carta 2x, a condicao seria verdadeira e o jogo estaria errado
//avaliar se a segunda carta clicada é a mesma que a primeira e retornar em caso positivo
//adicionar a condicional abaixo da condicional do lockboard em filpcards




//As variáveis firstCard e secondCard precisam ser resetadas após cada rodada.
//Vamos criar um método resetBoard() e extrair hasFlippedCard = false; e lockBoard = false para lá.
//remover hasflippedcard e lockboard

function resetBoard() { //essa funcao vai ser chamada em disablecards e unflipcards
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


/*  EMBARALHAR AS CARTAS   */

//quando display flex é declarado no container, a ordem dos flex-itens sao ordenados a partir de grupo
//e ordem escrita no codigo fonte
//cada ordem e definida pela propriedade order, que pode ser um inteiro, negativo ou positivo
//se existir mais de um grupo no fleex-container, o order é defe=inido por grupo
//vamos iterar as cartas, gerar um numero aleatorio entre 0 e 11 e atribui-lo ao order:

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12); //
        card.style.order =ramdomPosition;
    });
})();

//Para invocar a função shuffle, vamos transformá-la em uma
//Immediately Invoked Function Expression (IIFE) encapsulando-a em parenteses, e invocando em seguida
// assim ela será executada logo após a sua definição.

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

