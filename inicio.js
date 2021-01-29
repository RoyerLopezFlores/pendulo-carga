
var distanciaplacas=1;
var largocuerda=200;
var voltaje=4;
var masa=2;
var carga=6;
var flag=true;
var d=distanciaplacas*100;
var posx=d/2;
var angulo = Math.ceil((voltaje*carga/distanciaplacas)*(largocuerda/(masa*9.81))*(1/10));
var limsup = d/2+angulo;
var liminf = d/2-angulo;
var posible=true;
var radio = 10;
function actualizarValores(){
    distanciaplacas = document.getElementById('rgnDistancia').value;
    largocuerda = document.getElementById('rgncuerda').value;
    voltaje = document.getElementById('rgnVoltaje').value;
    masa = document.getElementById('rgnMasa').value;
    carga = document.getElementById('rgnCarga').value;
    document.getElementById('txtDistancia').value=distanciaplacas;
    document.getElementById('txtCuerda').value=largocuerda;
    document.getElementById('txtVoltaje').value=voltaje;
    document.getElementById('txtMasa').value=masa;
    document.getElementById('txtCarga').value=carga;
    posible=true;
    d=distanciaplacas*100;
    posx = distanciaplacas*50;

    largocuerda*=100;
    angulo = Math.ceil((voltaje*carga/distanciaplacas)*(largocuerda/(masa*9.81))*(1/10));

    limsup = d/2+angulo;
    liminf = d/2-angulo;
    flag=true;
    if(limsup+15>d) alerta('(Angulo demasiado grande)');
    if(limsup-d/2<2)alerta('(Angulo demasiado pequeño)');

}

function alerta(mensaje){
  alert('No se puede simular con estos valores'+mensaje);
  posible=false;
}
 function dibujarCanvas(){
  var canvas= document.getElementById('canvas');
    c= canvas.getContext('2d');
  var large,tall;
  large = canvas.width;
  tall = canvas.height;
  var sep=25;
  var x0,y0;
  x0=50;
  y0=tall-50;
  var h;
  h=600;
  c.fillStyle='white';
  c.fillRect(0,0,large,tall);
    c.lineWidth=10;
    c.strokeRect(0,0,large,tall);
    //malla
    malla(large,tall,sep,c);
    //ejesX
    graficareje(0,tall-50,large,tall-50);
    triangulo(large-15,tall-35,large-15,tall-65,large,tall-50);
    //ejey
    graficareje(x0,0,x0,tall);
    triangulo(35,15,50,0,65,15);
    graficarplacas(x0,y0,x0,y0-h,'blue');
    graficarplacas(x0+d,y0,x0+d,y0-h,'red');
  if(posible){
    if(flag){
      posx++;
      if(posx == limsup) flag=false;
    }
    if(!flag){
      posx--;
      if(posx == liminf) flag=true;
    }
  }
    graficarcuerda(x0+d/2,y0,h,x0+posx);
    setTimeout("dibujarCanvas()",50);
};
function dibujarcarga(x,y,r){
  c.beginPath();
  c.fillStyle = 'black';
  c.arc(x,y,r,0,2*Math.PI);
  c.fill();
}
function graficarcuerda(x,y,h,x1){
  var y1;
  y1=Math.ceil(Math.sqrt(Math.abs(largocuerda*largocuerda-(x1-x)*(x1-x))));

  c.strokeStyle = 'brown';
  c.lineWidth = 3;

  c.beginPath();
  c.moveTo(x,y-h);
  c.lineTo(x1,y-h+y1);
  c.stroke();
  dibujarcarga(x1,y-h+y1,radio);


}
function graficarplacas(x,y,x1,y1,color){
  c.strokeStyle = color;
  c.lineWidth = 10;
  c.beginPath();
  c.moveTo(x,y);
  c.lineTo(x1,y1);
  c.stroke();
}
function graficareje(x,y,x1,y1){
  c.strokeStyle = 'black';
  c.lineWidth = 5;
  c.beginPath();
  c.moveTo(x,y);
  c.lineTo(x1,y1);
  c.stroke();
}
function triangulo(x,y,x1,y1,x2,y2){
  c.fillStyle = 'black';
  c.beginPath();
  c.moveTo(x,y);
  c.lineTo(x1,y1);
  c.lineTo(x2,y2);
  c.closePath();
  c.fill();
}

function malla(ancho,alto,separar,c){
  var tamx,tamy,m;
  tamy = alto/separar;
  tamx=ancho/separar;
  var au=0;
  for(var i=0;i<=tamx;i++){
    au=separar*i;
    graficarLineas(au,0,au,alto,c);
  }
  for(var j=0;j<tamy;j++){
    au=separar*j;
    graficarLineas(0,au,ancho,au,c);
  }

}
function graficarLineas(x,y,x1,y1,c){
  c.strokeStyle = 'black';
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(x,y);
  c.lineTo(x1,y1);
  c.stroke();
}
