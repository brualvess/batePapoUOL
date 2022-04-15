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

  for (let i = 0; i < mensagensDoArray.length; i++) {
    let tipoDaMensagem = mensagensDoArray[i].type;
    switch (tipoDaMensagem) {
      case "reservadas":
        msgs.innerHTML += `<div class="mensagem reservadas">
<div class="horario">${mensagensDoArray[i].time}</div>
<div class="nome">${mensagensDoArray[i].from}</div>
<div class="texto">${mensagensDoArray[i].text}</div>
</div>`;
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
  console.log("hellooo");
  console.log(mensagens);
}
