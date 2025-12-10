/* Banco de perguntas, question é a questão e options são as alternativas */
const questions = [
  { question: 'Em que ano a Microsoft foi fundada?', options: ['A. 1970', 'B. 1975', 'C. 1980', 'D. 1985', 'E. 1990'], correctAnswer: 'B. 1975', points: 10 },

  { question: 'Quais são os dois principais co-fundadores da Microsoft?', options: ['A. Steve Jobs e Steve Wozniak', 'B. Mark Zuckerberg e Eduardo Saverin', 'C. Jeff Bezos e Larry Ellison', 'D. Bill Gates e Paul Allen', 'E. Larry Page e Sergey Brin'], correctAnswer: 'D. Bill Gates e Paul Allen', points: 15 },

  { question: 'Onde está localizada a sede mundial da Microsoft, no estado de Washington, EUA?', options: ['A. Seattle', 'B. Redmond', 'C. Bellevue', 'D. Tacoma', 'E. Spokane'], correctAnswer: 'B. Redmond', points: 10 },

  { question: 'Qual foi o primeiro sistema operacional de grande sucesso comercial da Microsoft, lançado em 1985, que popularizou a interface gráfica do usuário (GUI)?', options: ['A. MS-DOS', 'B. Windows 3.1', 'C. Windows 1.0', 'D. Windows 95', 'E. Windows XP'], correctAnswer: 'C. Windows 1.0', points: 15 },

  { question: 'Qual é o nome do console de videogame lançado pela Microsoft em 2001?', options: ['A. PlayStation', 'B. Nintendo Switch', 'C. Atari', 'D. Xbox', 'E. Sega Genesis'], correctAnswer: 'D. Xbox', points: 10 },

  { question: 'Qual é a suite de produtividade da Microsoft que inclui programas como Word, Excel e PowerPoint?', options: ['A. G Suite (Google Workspace)', 'B. Adobe Creative Cloud', 'C. LibreOffice', 'D. iWork', 'E. Microsoft Office'], correctAnswer: 'E. Microsoft Office', points: 15 },

  { question: 'Qual é a plataforma de computação em nuvem (cloud computing) da Microsoft, que compete com a AWS da Amazon e a Google Cloud?', options: ['A. Azure Stack', 'B. Dynamics 365', 'C. Microsoft Azure', 'D. OneDrive', 'E. GitHub'], correctAnswer: 'C. Microsoft Azure', points: 10 },

  { question: 'Qual foi o navegador de internet que a Microsoft incluiu pela primeira vez no Windows 95?', options: ['A. Microsoft Edge', 'B. Google Chrome', 'C. Mozilla Firefox', 'D. Internet Explorer', 'E. Netscape Navigator'], correctAnswer: 'D. Internet Explorer', points: 15 },

  { question: 'Quem é o atual Chief Executive Officer (CEO) da Microsoft, que sucedeu Steve Ballmer em 2014?', options: ['A. Bill Gates', 'B. Paul Allen ', 'C. Satya Nadella', 'D. Brad Smith', 'E. Kevin Scott'], correctAnswer: 'C. Satya Nadella', points: 10 },

  { question: 'Qual das seguintes empresas de mídia social e desenvolvimento de software foi adquirida pela Microsoft em 2016 por mais de 26 bilhões de dólares?', options: ['A. Facebook (Meta)', 'B. Instagram', 'C. Twitter (X)', 'D. LinkedIn', 'E. TikTok'], correctAnswer: 'D. LinkedIn', points: 15 },
];
/*são as Perguntas e a pontuação de cada uma, correctanswer é a resposta certa e points é a pontuação que a questão vai dar*/
let answers=[]; /*armazena respostas*/

let currentQuestionIndex = 0; /* Questão */
let totalPoints = 0; /* Contagem de pontos */

const backgroundImages = [ // banco de imagens de fundo no questionário //
  '../imagens/img1.jpg',
  '../imagens/img2.jpg',
  '../imagens/img3.jpg',
  '../imagens/win8.jpg',
  '../imagens/vista.jpg',
  '../imagens/win95.jpg',
  '../imagens/winxp.jpg',
]
let changeEvery = 1; // trocar de imagem a cada questão //

function changebackground(){
  const randomIndex = Math.floor(Math.random() * backgroundImages.length); // cria um índice aleatório baseado no número de imagens disponíveis
  document.body.style.backgroundImage = `url(${backgroundImages[randomIndex]})`; // define a imagem de fundo da página como a imagem escolhida aleatoriamente
  document.body.style.backgroundSize = 'cover'; // ajusta a imagem para cobrir toda a tela
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';
}

/* Carrega pergunta */
function loadQuestion() {
  const questionElement = document.getElementById('question'); // seleciona o elemento HTML onde a pergunta será exibida
  const optionsContainer = document.getElementById('options-container'); // seleciona a caixa que armazenará os botões de opções/respostas
  const resultElement = document.getElementById('result'); // seleciona a caixa onde será exibido o resultado da resposta

/* Questão Atual */  
  questionElement.textContent = questions[currentQuestionIndex].question;// define o texto do elemento de pergunta com a pergunta atual do banco de perguntas 'questions'
  optionsContainer.innerHTML = ''; // limpa o conteúdo anterior do container de opções para não duplicar

  document.getElementById('nextbutton').style.display = 'none'; /* Bloqueia o botão no momento das questões */
 
  questions[currentQuestionIndex].options.forEach(option => { // percorre todas as opções da pergunta atual
    const button = document.createElement('button'); // cria um botão HTML para cada opção
    button.textContent = option; // define o texto do botão como a opção atual
    button.onclick = () => checkAnswer(option); // cria um evento de clique ao botão que chama a função checkAnswer
    optionsContainer.appendChild(button); // adiciona o botão criado ao container de opções na página
  });
}

/* Confere resposta */
function checkAnswer(selectedAnswer) {
  clearInterval(countdownInterval);  // para o intervalo do temporizador
  const currentQuestion = questions[currentQuestionIndex];   // obtém a pergunta atual usando o índice
  const resultElement = document.getElementById('result');  // seleciona o elemento onde será exibido o resultado

  document.querySelectorAll('#options-container button').forEach(button=> { button.disabled=true;});  // desativa todos os botões de opção para não clicar várias vezes
  document.querySelector('#options-container button').style.display='block'; // garante que o primeiro botão ainda seja exibido 

  answers.push({ // Adiciona a resposta do usuário ao banco respostas ('answers') para registro
   question: questions[currentQuestionIndex].question, // pergunta respondida
   marcada: selectedAnswer,                            //alternativa selecionada
   correctA: questions[currentQuestionIndex].correctAnswer // resposta certa
  });

  /* Condições */
  if (selectedAnswer === currentQuestion.correctAnswer) { /* Correta */
    totalPoints += currentQuestion.points; //adiciona pontos da questão ao total 
    resultElement.textContent = `Resposta correta! Pontos ganhos: ${currentQuestion.points}`; //mensagem de texto informando seu acerto
    resultElement.style.color = '#008000'; // cor do texto
  } else { /* Resposta contrária a correta (errada) */
    resultElement.textContent = `Resposta incorreta. Pontos: 0. Tente novamente.`; //mensagem que informa seu erro
    resultElement.style.color = 'red'; //cor do texto
  }

  document.getElementById('nextbutton').style.display = 'block'; /* Botão de continuar aparece */
}

/* Próxima pergunta */
let countdownInterval; //armazena o intervalo do temporizador
function nextQuestion(timesUP = false) { //função para avançar para a próxima pergunta. O parâmetro timesUP indica se a mudança de pergunta ocorreu porque o tempo da pergunta anterior acabou (true) ou por clique no botão "Next" (false)
  clearInterval(countdownInterval)  // para qualquer temporizador ativo da pergunta anterior
  const nextButton = document.querySelector('#question-container button');  // seleciona o botão dentro do container de perguntas
  currentQuestionIndex++; // incrementa o índice da pergunta atual para acessar a próxima pergunta

  /* Condições para as próximas perguntas */
  if (nextButton) { // verifica se o botão de proximo existe
    nextButton.style.display='none'; /* Esconde o botão de próximo */
  }
  if (currentQuestionIndex < questions.length) { /* Se a questão presente for menor que o tempo do contador */
    changebackground() // muda a imagem de fundo aleatoriamente
    loadQuestion(); // carrega a próxima pergunta e suas opções
    Countd(); // ativa a contagem regressiva da pergunta
  } else { /* Ao contrário se não houver nenhuma pergunta mostra o fim do quis */
    let sumary = "<h2>Fim do quiz</h2>";  // cria o cabeçalho do resumo final
    sumary += `<p>Pontuação total: <strong>${totalPoints}</strong>pontos</p>`;  // pontuação total do usuário
    sumary += "<h3>Respostas marcadas:</h3>"; // mostra as respostas marcadas
    
    // percorre todas as respostas registradas pelo usuário
    answers.forEach((resp, i)=>{
      const correctA = resp.marcada === resp.correctA; // verifica se a resposta do usuário está correta
    //esse trecho adiciona detalhes da pergunta, resposta correta e resposta do usuário, se foi certa, o texto é marcado de verde, senão fica vermelho  
      sumary +=
      `<div>
       <p><strong>${i+1}.${resp.question}<strong></p>
       <p>Opção selecionada: <strong style="color:${correctA ? 'green' : 'red'}">${resp.marcada}</strong></p>
       <p>Opção Correta: <strong>${resp.correctA}</strong></p>
       </div>`;
  });
  
   document.getElementById('question-container').innerHTML=sumary; // substitui o conteúdo da caixa de perguntas pelo resumo final
   document.body.style.overflow="auto"; // permite rolagem da página após o fim do quiz
   document.getElementById("count").textContent=""; // limpa o contador de tempo na interface
}
}

/* contador principal */
function Countd() {
  clearInterval(countdownInterval); // para qualquer temporizador anterior para evitar múltiplos intervalos
  let timeleft = 15; /* Tempo do contador */
  const display = document.getElementById("count"); // seleciona o HTML onde o tempo restante será exibido
  display.textContent = timeleft; // exibe o tempo inicial no elemento
  countdownInterval = setInterval(()=>{ // inicia o intervalo que decrementa o tempo a cada 1 segundo (1000 ms)
    timeleft--; // decrementa o tempo restante
    display.textContent = timeleft;  // atualiza o display do contador

    /* Se o contador for 0 pula para a próxima questão */
    if (timeleft <=0){
      clearInterval(countdownInterval); // para o intervalo
      display.textContent = "Tempo esgotado"; // mensagem de tempo esgotado

      nextQuestion(true); // chama a função nextQuestion indicando que o tempo acabou

    }
  } , 1000); //executa a cada 1000ms (1 segundo)
}

/* anticheat do quiz */
window.onpopstate = function (){ //não permite que o usuário use o botão de voltar do navegador para sair do quiz
  history.pushState(null, "", location.href); // reinsere o estado atual no histórico, mantendo a página no mesmo lugar
};

window.addEventListener('beforeunload', function(e){ // adiciona um alerta antes de recarregar ou sair da página
  e.preventDefault();  // previne o comportamento padrão do navegador
  alert('Tem certeza que deseja recarregar ou sair do quiz, isto reiniciará o su progreso.'); // avisa o usuário informando que o progresso será perdido
});



/* Inicialização das funções */
changebackground(); // chama a função para alterar a imagem de fundo aleatoriamente
loadQuestion(); // carrega a primeira pergunta do quiz e cria os botões de opção
Countd(); // inicia a contagem regressiva para a pergunta atual