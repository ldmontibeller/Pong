//Tamanho da tela
const comprimentoTela = 600;
const alturaTela = 400;

//Posição bolinha
let xBolinha = comprimentoTela/2;
let yBolinha = alturaTela/2;

//Tamanho da bolinha
const diametro = 20;
const raio = diametro / 2; //usado na colisão com as bordas

//Movimento bolinha
const velocidadeBolinha = 6;
let velocidadeXBolinha = velocidadeBolinha;
let velocidadeYBolinha = velocidadeBolinha;

//Tamanho raquetes
const comprimentoRaquetes = 10;
const alturaRaquetes = 100;
const distanciaDaBorda = 1;

//Posição das raquetes
let xRaquete1 = distanciaDaBorda;
let yRaquete1 = alturaTela/2 - alturaRaquetes/2;
let xRaquete2 = comprimentoTela - (comprimentoRaquetes + distanciaDaBorda) ;
let yRaquete2 = alturaTela/2 - alturaRaquetes/2;

//Movimento raquetes
const velocidadeRaquetes = 10;

//Colisão raquetes
let colisaoRaquete1 = false;
let colisaoRaquete2 = false;

//Pontos 
let pontosJogador1 = 0;
let pontosJogador2 = 0;

//Função de preparação da biblioteca P5
function setup() {
  createCanvas(comprimentoTela, alturaTela);
}

//Função principal de desneho da biblioteca P5
function draw() {
  background(0); 

  mostrarBolinha();
  moverBolinha();
  colidirBordas();

  mostrarRaquete(xRaquete1, yRaquete1);
  mostrarRaquete(xRaquete2, yRaquete2);
  moverRaquete1();
  moverRaquete2();
  //colidirRaquete1();
  colidirRaqueteComBiblioteca(xRaquete1, yRaquete1);
  colidirRaqueteComBiblioteca(xRaquete2, yRaquete2);
  

  incluirPlacar();
  marcarPontos()
}

function mostrarBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function mostrarRaquete(x,y){
  rect(x, y, comprimentoRaquetes, alturaRaquetes);
}

function moverBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function moverRaquete1(){
  if(keyIsDown(87) && yRaquete1 > 0){
    yRaquete1 -= velocidadeRaquetes;
  }
  if(keyIsDown(83) && (yRaquete1 + alturaRaquetes) <= height){
    yRaquete1 += velocidadeRaquetes;
  }
}

function moverRaquete2(){
  if(keyIsDown(UP_ARROW) && yRaquete2 > 0){
    yRaquete2 -= velocidadeRaquetes;
  }
  if(keyIsDown(DOWN_ARROW) && (yRaquete2 + alturaRaquetes) <= height){
    yRaquete2 += velocidadeRaquetes;
  }
  
}

function colidirBordas(){
  if(xBolinha + raio >= width || xBolinha - raio <= 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio >= height  || yBolinha - raio <= 0){
    velocidadeYBolinha *= -1;
  }
}

function colidirRaquete1(){
  if((xBolinha - raio < xRaquete1 + comprimentoRaquetes) && (yBolinha - raio < yRaquete1 + alturaRaquetes) && (yBolinha + raio > yRaquete1)){
    velocidadeXBolinha *= -1;
  }
}

function colidirRaqueteComBiblioteca(x, y){
  colisaoRaquete1 = collideRectCircle(x, y, comprimentoRaquetes, alturaRaquetes, xBolinha, yBolinha, raio);
  if (colisaoRaquete1){
    velocidadeXBolinha *= -1;
  }
}

function incluirPlacar(){
  fill(255);
  textSize(20);
  textStyle(BOLD);
  text(pontosJogador1, 278,26);
  text(pontosJogador2, 321, 26);
}

function marcarPontos(){
  if(xBolinha > 590){
    pontosJogador1++;
  }
  if(xBolinha < 10){
    pontosJogador2++;
  }
}
