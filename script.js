const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
];

const imcTable = document.querySelector('#imc-table');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const calcBtn = document.querySelector('#calc-btn');
const clearBtn = document.querySelector('#clear-btn');
const imcNumber = document.querySelector('#imc-number');
const imcInfo = document.querySelector('#imc-info span');
const backBtn = document.querySelector('#back-btn');
const calcContainer = document.querySelector('#calc-contender');
const resultContainer = document.querySelector('#result-contender');

function createTable(data) {
  data.forEach((item) => {
    
    const div = document.createElement('div');
    div.classList.add('table-data', 'flex', 'justify-between', 'mb-2', 'pb-2', 'border-b-2', 'border-slate-500', 'items-center');

    const classification = document.createElement('p');
    classification.innerText = item.classification;
    classification.classList.add('flex-1');

    const info = document.createElement('p');
    info.innerText = item.info;
    info.classList.add('flex-1');

    const obesity = document.createElement('p');
    obesity.innerText = item.obesity;
    obesity.classList.add('flex-1');

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);

  });
}

function showOrHideResults() {
  calcContainer.classList.toggle('hidden');
  resultContainer.classList.toggle('hidden');
}

function calcImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);

  return imc;
}

function validateDigits(text) {
  return text.replace(/[^0-9.]/g, '');
}

function clearInputs() {
  heightInput.value = '';
  weightInput.value = '';
}

[heightInput, weightInput].forEach((element) => {
  element.addEventListener('input', (e) => {
    const updatedValue = validateDigits(e.target.value);

    e.target.value = updatedValue;
  });
});

calcBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const height = +heightInput.value;
  const weight = +weightInput.value;

  if (!height || !weight) return;

  const imc = calcImc(height, weight);

  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  console.log(info)

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  showOrHideResults();

  



});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearInputs();
});

createTable(data);