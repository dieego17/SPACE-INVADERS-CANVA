const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Creo la imagen para el jugador
const jugadorImg = document.createElement('img');
// Ruta a la imagen del jugador
jugadorImg.src = "../assets/images/nave.png"; 
//Agrego la imagen al documento
document.body.appendChild(jugadorImg);

// Creo la imagen para el jugador
const alienImg = document.createElement('img');
// Ruta a la imagen de los marcianos
alienImg.src = "../assets/images/marcianos.png"; 
//Agrego la imagen al documento
document.body.appendChild(alienImg);


// Clase del jugador
class Jugador {
    constructor(x, y, width, height, velocidad) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.velocidad = velocidad;
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