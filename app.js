class TypeWriter {
  constructor(txtElement, words, timeWait) {
    this.txtElement = txtElement;
    this.words = words;
    this.timeWait = timeWait;
    this.numWords = words.length
    this.isWriting = true;
    this.index = 0;
    this.txt = '';
    this.interval;
    this.writing();
  }

  writing() {

    let currentWord = this.words[this.index];
    let time = 400;

    //  Cancelamos el "setInterval" para el efecto cursor
    clearInterval(this.interval);

    if (this.isWriting) {
      //  añadimos un caracter
      this.txt = currentWord.substring(0, this.txt.length + 1);
    } else {
      //  Quitamos un caracter
      this.txt = currentWord.substring(0, this.txt.length - 1);
    }

    //  Cambiamos el texto en el span
    this.txtElement.innerHTML = this.txt;

    //  Comprobamos y cambiamos la palabra del array
    if (!this.isWriting && this.txt === '') {
      this.isWriting = true;
      (this.index === this.numWords - 1) ? this.index = 0 : this.index++;
    }

    //  Comprobamos si escribimos y si la palabra esta completa para cambiar el tiempo de espera
    if (this.isWriting && this.txt.length === currentWord.length) {
      time = this.timeWait;
      this.isWriting = false;
      //  Creamos el efecto parpadeo del cursor
      this.interval = setInterval(() => {
        this.changeCursor();
      }, 400);
    } else {
      time = 400;
    }

    setTimeout(() => this.writing(), time);

  }

  changeCursor() {
    if (!this.txtElement.style.borderColor) {
      this.txtElement.style.borderColor = "rgb(136, 136, 136)";
    }
    //  Cambiamos el color del cursor
    (this.txtElement.style.borderColor === "rgb(136, 136, 136)") ? this.txtElement.style.borderColor = "transparent" : this.txtElement.style.borderColor = "rgb(136, 136, 136)";
  }

}

//  Cogemos los datos del span data-X e inicializamos la clase de TypeWriter
function init() {
  const txtElement = document.querySelector('.txt-effect');
  const timeWait = parseInt(txtElement.getAttribute('data-wait'), 10);
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  new TypeWriter(txtElement, words, timeWait);
}

//  Cuando esta cargado el DOM ejecutamos la funcion init
document.addEventListener('DOMContentLoaded', init);