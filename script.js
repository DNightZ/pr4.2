const btnOpenModal = document.getElementById('btnOpenModal');
const modalBlock = document.getElementById('modalBlock');
const closeModal = document.getElementById('closeModal');
const questionTitle = document.getElementById('question');
const formAnswers = document.getElementById('formAnswers');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const sendButton = document.getElementById('send');

// Змінні для результатів
const burgerNameElement = document.getElementById('burgerName');
const burgerImageElement = document.getElementById('burgerImage');
const resultSection = document.querySelector('.result');

let clientWidth = document.documentElement.clientWidth;
let numberQuestion = 0;
let finalAnswers = [];
let burgerName = '';
let burgerImage = '';

btnOpenModal.addEventListener('click', () => {
  modalBlock.classList.add('d-block');
  playTest();
});

closeModal.addEventListener('click', () => {
  modalBlock.classList.remove('d-block');
});

const playTest = () => {
  const renderAnswers = (index) => {
    questions[index].answers.forEach((answer) => {
      const answerItem = document.createElement('div');
      answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

      if (questions[index].type === 'radio') {
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="${answer.title}">
            <span>${answer.title}</span>
          </label>
        `;
      } else if (questions[index].type === 'checkbox') {
        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="${answer.title}">
            <span>${answer.title}</span>
          </label>
        `;
      } else if (questions[index].type === 'input') {
        answerItem.innerHTML = `
          <input type="${questions[index].answers[0].type}" id="burgerNameInput" placeholder="${questions[index].answers[0].placeholder}" name="answer" class="form-control">
        `;
      } else if (questions[index].type === 'file') {
        answerItem.innerHTML = `
          <input type="${questions[index].answers[0].type}" id="answer" accept="${questions[index].answers[0].accept}" class="d-none">
          <label for="answer" class="d-flex flex-column justify-content-between">
            <span>Вибрати файл</span>
          </label>
        `;
      }

      formAnswers.appendChild(answerItem);
    });
  };

  const renderQuestions = (indexQuestion) => {
    formAnswers.innerHTML = '';

    if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
      questionTitle.textContent = `${questions[indexQuestion].question}`;
      renderAnswers(indexQuestion);
    } else {
      showResult(); 
    }

    if (numberQuestion === 0) {
      prevButton.classList.add('d-none');
    } else {
      prevButton.classList.remove('d-none');
    }

    if (numberQuestion === questions.length - 1) {
      nextButton.classList.add('d-none');
      sendButton.classList.remove('d-none');
    } else {
      nextButton.classList.remove('d-none');
      sendButton.classList.add('d-none');
    }
  };

  const checkAnswer = () => {
    const obj = {}; 
    const inputs = [...formAnswers.elements].filter(
      (elem) =>
        elem.checked ||
        elem.type === 'text' ||
        elem.type === 'file'
    );

    inputs.forEach((elem) => {
      if (elem.type === 'file' && elem.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          burgerImage = event.target.result;
        };
        reader.readAsDataURL(elem.files[0]);
      } else if (elem.type === 'text') {
        burgerName = elem.value;
      }
    });

    finalAnswers.push(obj); 
  };

  const showResult = () => {
    burgerNameElement.textContent = burgerName;
    burgerImageElement.setAttribute('src', burgerImage);
    resultSection.classList.remove('d-none');
    modalBlock.classList.remove('d-block');
  };

  nextButton.onclick = () => {
    checkAnswer();
    numberQuestion++;
    renderQuestions(numberQuestion);
  };

  prevButton.onclick = () => {
    numberQuestion--;
    renderQuestions(numberQuestion);
  };

  renderQuestions(numberQuestion);
};

