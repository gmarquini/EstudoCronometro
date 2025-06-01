/*
Passo a passo:

Selecionar o relógio e os botões.
Pegar o evento de click dos botões
Criar uma função que cria a hora a partir dos segundos.
Criar uma variável para armazenar os segundos.
Criar uma função que inicia o relógio com setInterval. -----------> setInterval(function() {}, 1000);
Criar um variável para armazenar o timer, a função iniciaRelogio deve atualizar a variável timer.
*/


//Modelo de relogio.
function criaHoraDosSegundos(segundos) {
  const data = new Date(segundos * 1000);
  return data.toLocaleTimeString('pt-BR', {
    hour12: false,
    timeZone: 'UTC'
  })
};

//seletores e variáveis.
const relogio = document.querySelector('.relogio');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
let segundos = 0;
let timer;

//Função que inicia o relógio e mostra o tempo.
function iniciaRelogio() {
  timer = setInterval(function () {
    segundos++;
    relogio.innerHTML = criaHoraDosSegundos(segundos);
  }, 1000);
};

//Faz o botão iniciar funcionar e evita que ele seja iniciado se ja estiver ligado.
iniciar.addEventListener('click', e => {
  if (timer) return;
  relogio.classList.remove('pausado'); //Tira o vermelho do pausado.
  clearInterval(timer);
  iniciaRelogio();
});

//Pausa e deixa vermelho.
pausar.addEventListener('click', e => {
  relogio.classList.add('pausado');//adiciona a cor vermelha.
  clearInterval(timer);
  timer = null;
});

zerar.addEventListener('click', e => {
  clearInterval(timer);
  relogio.innerHTML = '00:00:00';
  segundos = 0;
  timer = null;
});

//É importante que o timer seja nulo quando quando for pausado ou zerado, para que o "if" seja verificado corretamente no botão iniciar. Se o timer não for nulo, o botão iniciar não vai funcionar, pois teoricamente, ele já estaria rodando.