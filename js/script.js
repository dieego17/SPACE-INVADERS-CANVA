const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Creo la imagen para el jugador
const jugadorImg = document.createElement('img');
// Ruta a la imagen del jugador
jugadorImg.src = "../assets/images/nave.png"; 

// Creo la imagen para el jugador
const alienImg = document.createElement('img');
// Ruta a la imagen de los marcianos
alienImg.src = "../assets/images/marcianos.png"; 



// Clase del jugador
class Jugador {
    constructor(x, y, width, height, velocidad) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.velocidad = velocidad;
    }

    // Método para mover al jugador
    mover(direccion) {
      if (direccion === "left" && this.x > 0) {
        this.x -= this.speed;
      } else if (direccion === "right" && this.x < canvas.width - this.width) {
        this.x += this.speed;
      }
    }

    // Método para disparar balas
    disparar() {
      balas.push({ x: this.x + this.width / 2 - 1, y: this.y });
    }
  
    // Método para dibujar al jugador en el canvas
    dibujar() {
      ctx.drawImage(jugadorImg, this.x, this.y, this.width, this.height);
    }
}

// Clase para dibujar a los aliens
class Alien {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 30;
      this.height = 20;
    }
  
    // Método para dibujar a los aliens en el canvas
    dibujar() {
      ctx.drawImage(alienImg, this.x, this.y, this.width, this.height);
    }
}

// Clase para dibujar las balas
class Bala {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 3;
      this.height = 10;
      this.velocidad = 5;
    }
  
    // Método para mover las balas
    mover() {
      this.y -= this.velocidad;
    }
  
    // Método para dibujar las balas en el canvas
    dibujar() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Variables y configuración inicial
const player = new Jugador(canvas.width / 2, canvas.height - 80, 50, 70, 5);
let aliens = [];
let balas = [];
let score = 0;
let isGameOver = false;
let alienSpeed = 1;
let direction = 1;

// Función para dibujar al jugador
function dibujarPlayer() {
  player.dibujar();
}

// Función para dibujar las balas
function dibujarBalas() {
  balas.forEach((bala) => {
    const balaObject = new Bala(bala.x, bala.y);
    balaObject.dibujar();
  });
}

// Función para dibujar a los aliens
function dibujarAliens() {
  aliens.forEach((alien) => {
    const alienObject = new Alien(alien.x, alien.y);
    alienObject.dibujar();
  });
}

// Función para dibujar la puntuación
function dibujarScore() {
  ctx.fillStyle = "red";
  ctx.font = "25px Arial";
  ctx.fillText("Puntuación: " + score, 8, 20);
}

// Función principal de dibujo del juego
function dibujar() {
  if (isGameOver) {
    ctx.fillStyle = "#0095DD";
    ctx.font = "30px Arial";
    ctx.fillText("Has Perdido!", canvas.width / 2 - 70, canvas.height / 2);
    return;
  }

  // Borrar canvas 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarPlayer();
  dibujarBalas();
  dibujarAliens();
  dibujarScore();
  moverBalas();
  moverAliens();
  Colisiones();
  requestAnimationFrame(dibujar); // Continuar la animación
}

dibujar();