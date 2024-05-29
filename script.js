const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  {title: "Fazer exercícios físicos", type: "Normal"},
  {title: "Agendar consulta médica", type: "Urgente"},
  {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  {title: "Limpar a despensa", type: "Importante"},
  {title: "Pagar a conta de energia", type: "Urgente"},
  {title: "Assistir a um documentário interessante", type: "Normal"},
];

// isso aqui não funcionou como eu queria
/*let firstRun = true;    
if (firstRun) {
  let lixo = document.querySelectorAll(".task__button--remove-task");
  for (let i = 0; i < lixo.length; i++) {
    lixo[i].addEventListener("click", function(event) {
      event.preventDefault();
      tasks.splice(i, 1);
      renderElements(tasks);
    });
    firstRun = false;
  }
}*/

// tive que fazer uma pequena gambiarra, receber o índice como parâmetro p/ saber qual item deletar ao clicar no botão
// não consegui pensar num jeito de detectar o <p> que o botão está localizado p/ comparar com o title dos objetos...
function createTaskItem(obj, index) {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let span = document.createElement("span");
  let p = document.createElement("p");
  let button = document.createElement("button");
  li.className = "task__item";
  div.className = "task-info__container";
  button.className = "task__button--remove-task";
  //button.id = index.toString();
  button.addEventListener("click", function(event) {
    event.preventDefault();
    tasks.splice(index, 1);
    renderElements(tasks);
  });
  let type = obj.type.toLowerCase();
  if (type == "urgente") {
    span.className = "task-type span-urgent";
  } else if (type == "importante") {
    span.className = "task-type span-important";
  } else {
    span.className = "task-type span-normal";
  }
  p.innerText = obj.title;
  li.appendChild(div);
  li.appendChild(button);
  div.appendChild(span);
  div.appendChild(p);
  return li;
}

function renderElements(arr) {
  let lista = document.querySelector(".tasks__list");
  let item = {};
  while (lista.hasChildNodes()) {
    lista.removeChild(lista.firstChild);
  }
  for (let i = 0; i < arr.length; i++) {
    item = createTaskItem(arr[i], i);
    lista.appendChild(item);
  }
}

const butt = document.querySelector(".form__button--add-task");

function AddTask(event) {
  event.preventDefault();
  let newTask = {};
  const text = document.querySelector(".form__input--text");
  const sel = document.querySelector(".form__input--priority");
  if (!text.value) {
    alert("Por favor, digite um título para a tarefa.");
    return;
  }
  if (!sel.selectedIndex) {
    alert("Por favor, selecione a urgência da tarefa.");
    return;
  }
  newTask.title = text.value;
  newTask.type = sel.options[sel.selectedIndex].value;
  tasks.push(newTask);
  renderElements(tasks);
}

butt.addEventListener("click", AddTask);