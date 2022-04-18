let nome = "";
function entrarNaSala() {
  nome = prompt("Digite seu lindo nome");
  promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    { name: nome }
  );
  promise.then(verificarNome);
  promise.catch(verificarNome);
}
entrarNaSala();

function verificarNome(aResposta) {
  if (aResposta.response.status == 400) {
    entrarNaSala();
  } else {
    setInterval(keepAlive, 5000);
  }
}

function buscarMensagens() {
  const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  promessa.then(processarMensagens);
}
setInterval(buscarMensagens, 3000);

function processarMensagens(mensagens) {
  const mensagensDoArray = mensagens.data;
  const msgs = document.querySelector(".mensagens");
  msgs.innerHTML = "";

  for (let i = 0; i < mensagensDoArray.length; i++) {
    let tipoDaMensagem = mensagensDoArray[i].type;
    switch (tipoDaMensagem) {
      case "private_message":
        if (nome == mensagensDoArray[i].to) {
          msgs.innerHTML += `<div class="mensagem reservadas">
  <div class="horario">${mensagensDoArray[i].time}</div>
  <div class="nome">${mensagensDoArray[i].from}</div>
  <div class="texto">${mensagensDoArray[i].text}</div>
  </div>`;
        }

        break;
      case "status":
        msgs.innerHTML += `<div class="mensagem status">
<div class="horario">${mensagensDoArray[i].time}</div>
<div class="nome">${mensagensDoArray[i].from}</div>
<div class="texto">${mensagensDoArray[i].text}</div>
</div>`;
        break;
      default:
        msgs.innerHTML += `<div class="mensagem">
        <div class="horario">${mensagensDoArray[i].time}</div>
        <div class="nome">${mensagensDoArray[i].from}</div>
        <div class="texto">${mensagensDoArray[i].text}</div>
        </div>`;
        break;
    }
  }
  let ultimaMensagem = document.querySelectorAll(".mensagem");
  ultimaMensagem = ultimaMensagem[ultimaMensagem.length - 1];
  ultimaMensagem.scrollIntoView();
}
function keepAlive() {
  let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
    name: nome,
  });
  promise.then();
}
function enviarMensagem() {
  const mensagemDigitada = document.querySelector(".caixinha");
  let promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    {
      from: nome,
      to: "Todos",
      text: mensagemDigitada.value,
      type: "message",
    }
  );
  promise.then(respostaMensagem);
  promise.catch(respostaMensagem);
  mensagemDigitada.value = "";
}

function respostaMensagem(promise) {
  if (promise.status === 200) {
    buscarMensagens();
  } else {
    window.location.reload();
  }
}
function buttonEnter() {
  const inputEle = document.querySelector(".caixinha");
  inputEle.addEventListener("keyup", function (e) {
    var key = e.code;
    if (key == "Enter") {
      enviarMensagem();
    }
  });
}
buttonEnter();
