//랜점번호 지정
//유저가 번호를 입력한다 그리고go 라는 버튼을 누름
//만약에 유저가  랜덤번호를 맞추면, 맞췄습니다!
//랜점번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 up !!
//reset버튼을 누르면 게임이 리셋된다.
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알련준다.  기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.

let computerNum = 0; //여기서 const를 사용하면 에러가 뜬다.
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
//내가 입력한 숫자값이 리셋이된다. 구지 함수이름을 선언하지 않아도 될 느낌 (선언하면 메모리차지됨)
// 이 함수가 다른데 사용하지 않을 때 사용해야한다.
userInput.addEventListener("focus", function () {
  userInput.value = "";
});
//Math.random() 0 ~1 사이 숫자를 반환
function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; //우리가 원하는 숫자의 범위는 1~ 100 까지의 숫자이다.
  console.log("정답", computerNum);
}

//함수도 매개변수로 넘길 수 있다.
function play() {
  let userValue = userInput.value;
  //유효성검사
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해주세요";
    return;
  }
  //데이터 유효성 검사
  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요.";
    return;
  }
  chances--;
  chanceArea.textContent = `남은기회:${chances}`;
  console.log("chance", chances);
  if (userValue < computerNum) {
    resultArea.textContent = "UP!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!";
  } else {
    resultArea.textContent = "정답입니다!!";
    gameOver = true;
  }
  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  //gameover만 입력하면 reset 버튼을 누루고난 후에 남은기회 reset이 되지않는다.
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  //user input창이 깨끗하게 정리되고
  userInput.value = "";
  //새로운 번호가 생성되고
  pickRandomNum();

  resultArea.textContent = "결과값이 여기 나옵니다.";
}

pickRandomNum();
