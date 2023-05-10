let btnEncriptar = document.getElementById("encriptar");
let btnDesencriptar = document.getElementById("desencriptar");
let btnCopiar = document.getElementById("copy");
let msgCopied = document.getElementById("msg-copied");

const entrada = document.getElementById("entrada");
const salida = document.getElementById("salida");
const msg = document.getElementById("msg_box");
const result = document.getElementById("result_box");
const clipboardIcon = btnCopiar.querySelector("i");
const errIcon = document.getElementById("exclamation");

entrada.addEventListener("input", () => {
  if (entrada.value.trim() !== "") {
    msg.style.display = "none";
    result.style.display = "grid";
    salida.value = "";
  } else {
    msg.style.display = "grid";
    result.style.display = "none";
    return salida.value;
  }
});

function limpiarInput() {
  const entrada = document.getElementById("entrada");
  entrada.value = "";
}

function validarTextInput(entrada) {
  let erromsg = document.getElementById("msgalert");
  let errtext = document.getElementById("msg-!");

  const errtextDefault = " Solo letras minúsculas y sin acentos";
  const texto = entrada.value;
  const regex = /^[a-zñ\s]+$/;
  const esValido = regex.test(texto);

  if (esValido) {
    errtext.textContent = errtextDefault;
    erromsg.classList.remove("mistake");
    errIcon.classList.remove("mistake");
    entrada.classList.remove("invalido");
  } else if (texto === "") {
    errtext.textContent = " Debe ingresar almenos una palabra";
    erromsg.classList.add("mistake");
    errIcon.classList.add("mistake");
    entrada.classList.add("invalido");
  } else {
    errtext.textContent = errtextDefault;
    erromsg.classList.add("mistake");
    errIcon.classList.add("mistake");
    entrada.classList.add("invalido");
  }

  return esValido;
}

entrada.addEventListener("input", () => {
  validarTextInput(entrada);
});

function encritpar() {
  const text = document.getElementById("entrada").value;
  const salida = document.getElementById("salida");

  const encryptedKeys = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };
  let encryptedText = "";
  if (text !== "") {
    for (let i = 0; i < text.length; i++) {
      const letra = text[i];
      encryptedText += encryptedKeys[letra] || letra;
    }
    salida.value = encryptedText;
    limpiarInput();
  } else {
    return false;
  }
}

btnEncriptar.onclick = encritpar;

function desencriptar() {
  const encryptedText = document.getElementById("entrada").value;
  const salida = document.getElementById("salida");

  const decryptedKeys = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };
  let decryptedText = encryptedText;

  if (encryptedText !== "") {
    for (const keys in decryptedKeys) {
      decryptedText = decryptedText.replace(
        new RegExp(keys, "g"),
        decryptedKeys[keys]
      );
    }
    salida.value = decryptedText;
    limpiarInput();
  } else {
    return false;
  }
}

btnDesencriptar.onclick = desencriptar;

btnCopiar.addEventListener("click", () => {
  const textToCopy = document.getElementById("salida").value;
  if (textToCopy !== "") {
    navigator.clipboard.writeText(textToCopy);
    btnCopiar.classList.add("active");
    clipboardIcon.classList.add("fa-clipboard-check");
    clipboardIcon.classList.remove("fa-clipboard-list");
    msgCopied.innerHTML = "Copiado! ✔";
    msgCopied.classList.add("hecho");

    setTimeout(() => {
      btnCopiar.classList.remove("active");
      clipboardIcon.classList.remove("fa-clipboard-check");
      clipboardIcon.classList.add("fa-clipboard-list");
      msgCopied.innerHTML = "";
      msgCopied.classList.remove("hecho");
    }, 1500);
  } else {
    msgCopied.innerHTML = "Nada para copiar 😢";
    msgCopied.classList.add("error");
    setTimeout(() => {
      msgCopied.innerHTML = "";
      msgCopied.classList.remove("error");
    }, 1500);
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
