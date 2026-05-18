// ----------------------
// 要素取得
// ----------------------
const problemEl = document.getElementById("problem");
const sign1El = document.getElementById("sign1");
const sign2El = document.getElementById("sign2");
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

// ----------------------
// 現在の問題
// ----------------------
let currentM;
let currentN;

// ----------------------
// ランダム整数生成
// ----------------------
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----------------------
// 符号付き表示
// ----------------------
function formatTerm(num) {
  if (num > 0) return `+ ${num}`;
  return `− ${Math.abs(num)}`;
}
function formatXTerm(num) {
  if (num === 1) return "+ x";
  if (num === -1) return "− x";
  return `${formatTerm(num)}x`;
}
// ----------------------
// 問題生成
// ----------------------
function generateProblem() {
  do {
    currentM = randInt(-12, 12);
    currentN = randInt(-12, 12);
  } while (
    currentM === 0 ||
    currentN === 0 ||
    currentM === currentN
  );

  const b = currentM + currentN;
  const c = currentM * currentN;

 problemEl.innerHTML = formatExpression(b, c);

  clearInputs();
  resultEl.textContent = "";
}
function formatExpression(b, c) {
  let expression = `<span class="x-char">x</span>²`;

  if (b !== 0) {
  expression += ` ${formatXTerm(b)}`;
  }

  expression += ` ${formatTerm(c)}`;

  return expression;
}
// ----------------------
// 入力クリア
// ----------------------
function clearInputs() {
  sign1El.value = "+";
  sign2El.value = "+";
  num1El.value = "";
  num2El.value = "";
}

// ----------------------
// 入力値取得
// ----------------------
function getAnswer(signEl, numEl) {
  const num = parseInt(numEl.value);

  if (isNaN(num)) return null;

  return signEl.value === "+" ? num : -num;
}

// ----------------------
// 判定
// ----------------------
function checkAnswer() {
  const a = getAnswer(sign1El, num1El);
  const b = getAnswer(sign2El, num2El);

  if (a === null || b === null) {
    resultEl.textContent = "数値を入力してください";
    return;
  }

  const correct =
    (a === currentM && b === currentN) ||
    (a === currentN && b === currentM);

  if (correct) {
    resultEl.textContent = "正解！";
    resultEl.style.color = "#36c36b";
  } else {
    resultEl.textContent = "不正解";
    resultEl.style.color = "#e74c3c";
  }
}

// ----------------------
// イベント
// ----------------------
checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", generateProblem);

// ----------------------
// 初期化
// ----------------------
generateProblem();
