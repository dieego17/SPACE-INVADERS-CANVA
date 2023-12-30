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
        this.x -= this.velocidad;
      } else if (direccion === "right" && this.x < canvas.width - this.width) {
        this.x += this.velocidad;
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
let puntuacion = 0;
let isGameOver = false;
let velocidadAlien = 1;
let direccion = 1;

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
function dibujarPuntuacion() {
  ctx.fillStyle = "red";
  ctx.font = "25px Arial";
  ctx.fillText("Puntuación: " + puntuacion, 8, 20);
}

// Función principal de dibujo del juego
function dibujar() {
  if (isGameOver) {
    ctx.fillStyle = "#0095DD";
    ctx.font = "30px Arial";
    ctx.fillText("¡Has Perdido!", canvas.width / 2 - 70, canvas.height / 2);
    return;
  }

  if (puntuacion === 1010) {
    ctx.fillStyle = "#0095DD";
    ctx.font = "30px Arial";
    ctx.fillText("¡Has Ganado!", canvas.width / 2 - 70, canvas.height / 2);
    isGameOver = true;
    return;
  }

  // Borrar canvas 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarPlayer();
  dibujarBalas();
  dibujarAliens();
  dibujarPuntuacion();
  moverBalas();
  moverAliens();
  colisiones();
  requestAnimationFrame(dibujar); // Continuar la animación
}

// Función para mover las balas
function moverBalas() {
  balas.forEach((bala) => {
    bala.y -= 5;
  });
}

// Función para mover a los aliens
function moverAliens() {
  let maxX = 0;
  let minX = canvas.width;

  aliens.forEach((alien) => {
    alien.x += velocidadAlien * direccion;

    if (alien.x > maxX) {
      maxX = alien.x;
    }

    if (alien.x < minX) {
      minX = alien.x;
    }
  });

  // Cambiar la dirección y mover los aliens hacia abajo
  if (maxX > canvas.width - 30 || minX < 0) {
    direccion = - direccion;
    aliens.forEach((alien) => {
      alien.y += 20;
    });
  }
}


// Función para verificar colisiones entre balas y aliens
function colisiones() {
  balas.forEach((bala, balaIndex) => {
    aliens.forEach((alien, alienIndex) => {
      if (
        bala.x > alien.x &&
        bala.x < alien.x + 30 &&
        bala.y > alien.y &&
        bala.y < alien.y + 20
      ) {
        balas.splice(balaIndex, 1);
        aliens.splice(alienIndex, 1);
        puntuacion += 10;
      }
    });
  });

  // Incrementar la velocidad de los aliens y volver a generarlos si todos son eliminados
  if (aliens.length === 0) {
    velocidadAlien += 0.5;

    const alienFila = 4;
    const alienColumna = 5;
    for (let i = 0; i < alienFila; i++) {
      for (let j = 0; j < alienColumna; j++) {
        aliens.push({ x: 50 * i + 30, y: 30 * j + 30 });
      }
    }
  }

  // Verificar colisión entre jugador y aliens
  aliens.forEach((alien) => {
    if (
      player.x < alien.x + 30 &&
      player.x + player.width > alien.x &&
      player.y < alien.y + 20 &&
      player.y + player.height > alien.y
    ) {
      isGameOver = true;
    }
  });
}

// Evento para controlar el jugador
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.mover("left");
  } else if (e.key === "ArrowRight") {
    player.mover("right");
  }
});

// Evento para disparar sobre el botón
dispararBoton.addEventListener("click", ()=>{
  player.disparar();
});

// Inicializar el juego
function iniciar() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      aliens.push({ x: 50 * i + 30, y: 30 * j + 30 });
    }
  }
}

iniciar();
dibujar();