const cells = Array.from(document.querySelectorAll(".cell"));
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const settingsToggleButton = document.getElementById("settings-toggle");
const soundToggleButton = document.getElementById("sound-toggle");
const tensionMusic = new Audio("Audio/tension-loop.wav");
const settingsModal = document.getElementById("settings-modal");
const settingsCard = document.getElementById("settings-card");
const settingsApplyButton = document.getElementById("settings-apply");
const settingsCancelButton = document.getElementById("settings-cancel");
const boardElement = document.getElementById("board");
const winLine = document.getElementById("win-line");
const pageBody = document.body;
const scoreXElement = document.getElementById("score-x");
const scoreOElement = document.getElementById("score-o");
const xScoreCard = document.getElementById("x-score-card");
const oScoreCard = document.getElementById("o-score-card");
const xStyleButton = document.getElementById("x-style-button");
const oStyleButton = document.getElementById("o-style-button");
const markStyleModal = document.getElementById("mark-style-modal");
const modalTitle = document.getElementById("modal-title");
const modalOptions = document.getElementById("modal-options");
const modalApplyButton = document.getElementById("modal-apply");
const modalCancelButton = document.getElementById("modal-cancel");
const markStyleCard = document.getElementById("mark-style-card");
const previewNote = document.getElementById("preview-note");
const resultModal = document.getElementById("result-modal");
const resultMessage = document.getElementById("result-message");
const resultConfirmButton = document.getElementById("result-confirm");
const resultCard = document.getElementById("result-card");
const resultTitle = document.getElementById("result-title");
const nicknameModal = document.getElementById("nickname-modal");
const nicknameCard = document.getElementById("nickname-card");
const nicknameTitle = document.getElementById("nickname-title");
const nicknameInput = document.getElementById("nickname-input");
const nicknameError = document.getElementById("nickname-error");
const nicknameConfirmButton = document.getElementById("nickname-confirm");
const nicknameCloseButton = document.getElementById("nickname-close");
const startupColorsTitle = document.getElementById("startup-colors-title");
const playerNameDisplay = document.getElementById("player-name-display");
const nicknameLanguageInputs = document.querySelectorAll('input[name="nickname-language"]');
const changeNameButton = document.getElementById("change-name-button");
const markImageByStyle = {
  x_red: "Assets/XXX Red.png",
  x_yellow: "Assets/XXX Yellow.png",
  x_green: "Assets/XXX Green.png",
  o_green: "Assets/OOO Green.png",
  o_red: "Assets/OOO Red.png",
  o_yellow: "Assets/OOO Yellow.png"
};
const markStyleOrder = {
  X: ["x_green", "x_yellow", "x_red"],
  O: ["o_green", "o_yellow", "o_red"]
};

let board = Array(9).fill("");
let currentPlayer = "X";
let isGameActive = true;
let gameMode = "computer";
let computerDifficulty = "normal";
let winLineColor = "yellow";
let language = "en";
let playerName = "";
let playerMark = "";
let nextStartingMark = "X";
let hasStarted = false;
let nicknameModalSnapshot = null;
let isSoundOn = true;
let startupOpponentColorsOpen = false;
const scores = { X: 0, O: 0 };
const markStyles = { X: "x_red", O: "o_green" };
let previewOriginalStyles = { X: "x_red", O: "o_green" };

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const i18n = {
  he: {
    settings: "\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea",
    newGame: "\u05de\u05e9\u05d7\u05e7 \u05d7\u05d3\u05e9",
    settingsTitle: "\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05de\u05e9\u05d7\u05e7",
    modeTitle: "\u05d1\u05d7\u05e8 \u05e0\u05d2\u05d3 \u05de\u05d9 \u05dc\u05e9\u05d7\u05e7:",
    modeFriend: "\u05e0\u05d2\u05d3 \u05d7\u05d1\u05e8",
    modeComputer: "\u05e0\u05d2\u05d3 \u05de\u05d7\u05e9\u05d1",
    difficultyTitle: "\u05e8\u05de\u05ea \u05de\u05d7\u05e9\u05d1:",
    lineColorTitle: "\u05e6\u05d1\u05e2 \u05e7\u05d5 \u05e0\u05d9\u05e6\u05d7\u05d5\u05df:",
    languageTitle: "\u05e9\u05e4\u05d4",
    hebrew: "\u05e2\u05d1\u05e8\u05d9\u05ea",
    english: "English",
    yellow: "\u05e6\u05d4\u05d5\u05d1",
    green: "\u05d9\u05e8\u05d5\u05e7",
    red: "\u05d0\u05d3\u05d5\u05dd",
    cancel: "\u05d1\u05d9\u05d8\u05d5\u05dc",
    confirm: "\u05d0\u05d9\u05e9\u05d5\u05e8",
    chooseColorFor: "\u05d1\u05d7\u05e8 \u05e6\u05d1\u05e2 \u05e2\u05d1\u05d5\u05e8 X \u05d5-O",
    preview: "Preview \u05de\u05d5\u05e6\u05d2 \u05e2\u05dc \u05d4\u05dc\u05d5\u05d7 \u05dc\u05e4\u05e0\u05d9 \u05d0\u05d9\u05e9\u05d5\u05e8",
    resultTitle: "\u05e1\u05d9\u05d5\u05dd \u05de\u05e9\u05d7\u05e7",
    turn: "\u05ea\u05d5\u05e8 \u05e9\u05dc",
    computerTurn: "\u05ea\u05d5\u05e8 \u05d4\u05de\u05d7\u05e9\u05d1",
    winner: "\u05e0\u05d9\u05e6\u05d7!",
    draw: "\u05ea\u05d9\u05e7\u05d5!",
    player: "\u05d4\u05e9\u05d7\u05e7\u05df",
    nicknameTitle: "\u05d1\u05d7\u05e8 \u05db\u05d9\u05e0\u05d5\u05d9",
    nicknamePlaceholder: "\u05d4\u05e7\u05dc\u05d3 \u05db\u05d9\u05e0\u05d5\u05d9",
    startGame: "\u05d4\u05ea\u05d7\u05dc \u05de\u05e9\u05d7\u05e7",
    nicknameError: "\u05e6\u05e8\u05d9\u05da \u05dc\u05d4\u05e7\u05dc\u05d9\u05d3 \u05db\u05d9\u05e0\u05d5\u05d9",
    chooseMarkError: "\u05e6\u05e8\u05d9\u05da \u05dc\u05d1\u05d7\u05d5\u05e8 X \u05d0\u05d5 O",
    changeName: "\u05e9\u05e0\u05d4 \u05d1\u05d7\u05d9\u05e8\u05d5\u05ea",
    chooseMark: "\u05d1\u05d7\u05e8 \u05d1\u05de\u05d4 \u05d0\u05ea\u05d4 \u05de\u05e9\u05d7\u05e7:",
    chooseStartupColors: "\u05d1\u05d7\u05e8 \u05e6\u05d1\u05e2\u05d9\u05dd:",
    soundOn: "\u05e1\u05d0\u05d5\u05e0\u05d3 \u05e4\u05e2\u05d9\u05dc",
    soundOff: "\u05e1\u05d0\u05d5\u05e0\u05d3 \u05de\u05d5\u05e9\u05ea\u05e7"
  },
  en: {
    settings: "Settings",
    newGame: "New Game",
    settingsTitle: "Game Settings",
    modeTitle: "Choose Opponent:",
    modeFriend: "Play with Friend",
    modeComputer: "Play vs Computer",
    difficultyTitle: "Computer Level:",
    lineColorTitle: "Win Line Color:",
    languageTitle: "Language",
    hebrew: "Hebrew",
    english: "English",
    yellow: "Yellow",
    green: "Green",
    red: "Red",
    cancel: "Cancel",
    confirm: "Confirm",
    chooseColorFor: "Choose Colors for X and O",
    preview: "Preview appears on board before confirm",
    resultTitle: "Game Over",
    turn: "Turn:",
    computerTurn: "Computer Turn",
    winner: "wins!",
    draw: "Draw!",
    player: "Player",
    nicknameTitle: "Choose Nickname",
    nicknamePlaceholder: "Enter nickname",
    startGame: "Start Game",
    nicknameError: "Please enter a nickname",
    chooseMarkError: "Please choose X or O",
    changeName: "Change Choices",
    chooseMark: "Choose your mark:",
    chooseStartupColors: "Choose colors:",
    soundOn: "Sound on",
    soundOff: "Sound off"
  }
};

function t(key) {
  return i18n[language][key];
}

function applyLanguageToUI() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "he" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) return;
    element.textContent = t(key);
  });
  settingsToggleButton.textContent = t("settings");
  resetButton.textContent = t("newGame");
  resultTitle.textContent = t("resultTitle");
  previewNote.textContent = t("preview");
  nicknameTitle.textContent = t("nicknameTitle");
  nicknameInput.placeholder = t("nicknamePlaceholder");
  nicknameConfirmButton.textContent = t("startGame");
  modalCancelButton.textContent = t("cancel");
  modalApplyButton.textContent = t("confirm");
  resultConfirmButton.textContent = t("confirm");
  changeNameButton.textContent = t("changeName");
  updateSoundButton();
  if (nicknameError.textContent) {
    nicknameError.textContent = t("nicknameError");
  }
}

function syncLanguageInputs() {
  document.querySelectorAll('input[name="language"], input[name="nickname-language"]').forEach((input) => {
    input.checked = input.value === language;
  });
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  syncLanguageInputs();
  applyLanguageToUI();
  updateStatusText();
}

function updateSoundButton() {
  soundToggleButton.textContent = isSoundOn ? "🔊" : "🔇";
  soundToggleButton.classList.toggle("is-on", isSoundOn);
  soundToggleButton.classList.toggle("is-off", !isSoundOn);
  soundToggleButton.setAttribute("aria-label", isSoundOn ? t("soundOn") : t("soundOff"));
  soundToggleButton.title = isSoundOn ? t("soundOn") : t("soundOff");
}

function startMusic() {
  if (!isSoundOn) return;
  tensionMusic.loop = true;
  tensionMusic.volume = 0.78;
  tensionMusic.play().catch(() => {});
}

function stopMusic() {
  tensionMusic.pause();
}

function toggleSound() {
  isSoundOn = !isSoundOn;
  updateSoundButton();
  if (isSoundOn) {
    startMusic();
    return;
  }
  stopMusic();
}

function getCheckedValue(name, fallbackValue) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : fallbackValue;
}

function getComputerMark() {
  return playerMark === "X" ? "O" : "X";
}

function getOpponentMark(mark) {
  return mark === "X" ? "O" : "X";
}

function getStyleColor(styleValue) {
  return styleValue.split("_")[1];
}

function getFirstStyleWithDifferentColor(mark, blockedColor) {
  return markStyleOrder[mark].find((styleValue) => getStyleColor(styleValue) !== blockedColor) || markStyleOrder[mark][0];
}

function getSelectedStyleValue(inputName, fallbackValue) {
  return getCheckedValue(inputName, fallbackValue);
}

function setSelectedStyleValue(inputName, styleValue) {
  const input = document.querySelector(`input[name="${inputName}"][value="${styleValue}"]`);
  if (input && !input.disabled) {
    input.checked = true;
  }
}

function updateColorOptionLocks(xInputName, oInputName, changedMark = "X") {
  let xValue = getSelectedStyleValue(xInputName, markStyles.X);
  let oValue = getSelectedStyleValue(oInputName, markStyles.O);

  if (getStyleColor(xValue) === getStyleColor(oValue)) {
    if (changedMark === "X") {
      oValue = getFirstStyleWithDifferentColor("O", getStyleColor(xValue));
      setSelectedStyleValue(oInputName, oValue);
    } else {
      xValue = getFirstStyleWithDifferentColor("X", getStyleColor(oValue));
      setSelectedStyleValue(xInputName, xValue);
    }
  }

  document.querySelectorAll(`input[name="${oInputName}"]`).forEach((input) => {
    const isBlocked = getStyleColor(input.value) === getStyleColor(xValue);
    input.disabled = isBlocked;
    input.closest(".color-option")?.classList.toggle("is-disabled", isBlocked);
  });

  document.querySelectorAll(`input[name="${xInputName}"]`).forEach((input) => {
    const isBlocked = getStyleColor(input.value) === getStyleColor(oValue);
    input.disabled = isBlocked;
    input.closest(".color-option")?.classList.toggle("is-disabled", isBlocked);
  });
}

function setStartupMarkOptionsEnabled(mark, isEnabled) {
  document.querySelectorAll(`[data-startup-mark="${mark}"] input`).forEach((input) => {
    input.disabled = !isEnabled;
    input.closest(".color-option")?.classList.toggle("is-disabled", !isEnabled);
  });
}

function updateStartupColorFlow() {
  const selectedPlayerMark = getCheckedValue("player-mark", "");
  const hasSelectedMark = selectedPlayerMark === "X" || selectedPlayerMark === "O";
  startupColorsTitle.classList.toggle("is-flow-hidden", !hasSelectedMark);

  if (!hasSelectedMark) {
    document.querySelectorAll("[data-startup-mark]").forEach((element) => {
      element.classList.add("is-flow-hidden");
      element.style.order = "";
    });
    setStartupMarkOptionsEnabled("X", false);
    setStartupMarkOptionsEnabled("O", false);
    return;
  }

  const opponentMark = getOpponentMark(selectedPlayerMark);

  document.querySelectorAll("[data-startup-mark]").forEach((element) => {
    const mark = element.dataset.startupMark;
    const shouldShow = mark === selectedPlayerMark || (startupOpponentColorsOpen && mark === opponentMark);
    element.classList.toggle("is-flow-hidden", !shouldShow);
    element.style.order = mark === selectedPlayerMark ? "1" : "2";
  });

  setStartupMarkOptionsEnabled(selectedPlayerMark, true);

  if (!startupOpponentColorsOpen) {
    setStartupMarkOptionsEnabled(opponentMark, false);
  } else {
    updateColorOptionLocks("startup-x-style", "startup-o-style", selectedPlayerMark);
    setStartupMarkOptionsEnabled(selectedPlayerMark, true);
  }
}

function isComputerTurn() {
  return Boolean(playerMark) && gameMode === "computer" && currentPlayer === getComputerMark();
}

function syncStartupChoices() {
  const playerMarkInput = document.querySelector(`input[name="player-mark"][value="${playerMark}"]`);
  const xStyleInput = document.querySelector(`input[name="startup-x-style"][value="${markStyles.X}"]`);
  const oStyleInput = document.querySelector(`input[name="startup-o-style"][value="${markStyles.O}"]`);
  document.querySelectorAll('input[name="player-mark"]').forEach((input) => {
    input.checked = false;
  });
  if (playerMarkInput) playerMarkInput.checked = true;
  if (xStyleInput) xStyleInput.checked = true;
  if (oStyleInput) oStyleInput.checked = true;
  startupOpponentColorsOpen = false;
  updateStartupColorFlow();
}

function applyStartupChoices() {
  playerMark = getCheckedValue("player-mark", playerMark);
  updateColorOptionLocks("startup-x-style", "startup-o-style", playerMark || "X");
  markStyles.X = getCheckedValue("startup-x-style", markStyles.X);
  markStyles.O = getCheckedValue("startup-o-style", markStyles.O);
  updatePlayerScoreHighlight();
  rerenderMarksOnBoard();
}

function captureNicknameModalSnapshot() {
  return {
    language,
    playerName,
    playerMark,
    markStyles: { ...markStyles }
  };
}

function restoreNicknameModalSnapshot() {
  if (!nicknameModalSnapshot) return;
  language = nicknameModalSnapshot.language;
  playerName = nicknameModalSnapshot.playerName;
  playerMark = nicknameModalSnapshot.playerMark;
  markStyles.X = nicknameModalSnapshot.markStyles.X;
  markStyles.O = nicknameModalSnapshot.markStyles.O;
  playerNameDisplay.textContent = playerName;
  syncLanguageInputs();
  syncStartupChoices();
  applyLanguageToUI();
  updatePlayerScoreHighlight();
  rerenderMarksOnBoard();
}

function checkWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], pattern };
    }
  }
  return { winner: null, pattern: null };
}

function updateStatusText() {
  if (!isGameActive) return;
  if (isComputerTurn()) {
    statusText.textContent = `${t("computerTurn")} (${getComputerMark()})`;
    return;
  }
  statusText.textContent = `${t("turn")} ${currentPlayer}`;
}

function updateScoreboard() {
  scoreXElement.textContent = String(scores.X);
  scoreOElement.textContent = String(scores.O);
}

function updatePlayerScoreHighlight() {
  xScoreCard.classList.toggle("is-player-card", playerMark === "X");
  oScoreCard.classList.toggle("is-player-card", playerMark === "O");
}

function applyWinLineColor() {
  if (winLineColor === "green") {
    pageBody.style.setProperty("--win-line-image", 'url("Assets/grass green.png")');
    pageBody.style.setProperty("--win-line-glow", "rgba(86, 227, 101, 0.65)");
    return;
  }

  pageBody.style.setProperty("--win-line-image", 'url("Assets/grass yellow.png")');
  pageBody.style.setProperty("--win-line-glow", "rgba(255, 228, 94, 0.65)");
}

function showEndGamePopup(message) {
  resultMessage.textContent = message;
  placeResultModalNearTop();
  resultModal.classList.remove("hidden");
}

function drawWinLine(pattern) {
  const first = cells[pattern[0]].getBoundingClientRect();
  const last = cells[pattern[2]].getBoundingClientRect();
  const boardRect = boardElement.getBoundingClientRect();
  const cellRect = cells[pattern[1]].getBoundingClientRect();

  const x1 = first.left + first.width / 2 - boardRect.left;
  const y1 = first.top + first.height / 2 - boardRect.top;
  const x2 = last.left + last.width / 2 - boardRect.left;
  const y2 = last.top + last.height / 2 - boardRect.top;

  const baseLength = Math.hypot(x2 - x1, y2 - y1);
  const extension = cellRect.width * 0.55;
  const length = baseLength + extension;
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  winLine.style.width = `${length}px`;
  winLine.style.left = `${midX}px`;
  winLine.style.top = `${midY}px`;
  winLine.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  winLine.style.display = "block";
}

function finishGameIfNeeded() {
  const { winner, pattern } = checkWinner();
  if (winner) {
    isGameActive = false;
    scores[winner] += 1;
    updateScoreboard();
    statusText.textContent = `${t("player")} ${winner} ${t("winner")}`;
    pattern.forEach((index) => cells[index].classList.add("win"));
    drawWinLine(pattern);
    showEndGamePopup(`${t("player")} ${winner} ${t("winner")}`);
    return true;
  }

  if (board.every((value) => value)) {
    isGameActive = false;
    statusText.textContent = t("draw");
    showEndGamePopup(t("draw"));
    return true;
  }

  return false;
}

function placeMark(index, mark) {
  board[index] = mark;
  const markImg = document.createElement("img");
  markImg.src = markImageByStyle[markStyles[mark]];
  markImg.alt = mark;
  markImg.className = "mark-image";
  cells[index].replaceChildren(markImg);
  cells[index].disabled = true;
}

function getEmptyIndexes(nextBoard = board) {
  return nextBoard
    .map((value, index) => (value === "" ? index : -1))
    .filter((index) => index !== -1);
}

function getWinnerFromBoard(nextBoard) {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (nextBoard[a] && nextBoard[a] === nextBoard[b] && nextBoard[a] === nextBoard[c]) {
      return nextBoard[a];
    }
  }
  return null;
}

function findImmediateMove(mark) {
  for (const index of getEmptyIndexes()) {
    const nextBoard = [...board];
    nextBoard[index] = mark;
    if (getWinnerFromBoard(nextBoard) === mark) {
      return index;
    }
  }
  return null;
}

function getRandomMove() {
  const emptyIndexes = getEmptyIndexes();
  if (!emptyIndexes.length) return null;
  return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
}

function getNormalMove() {
  const computerMark = getComputerMark();
  const winningMove = findImmediateMove(computerMark);
  if (winningMove !== null) return winningMove;

  const blockingMove = findImmediateMove(playerMark);
  if (blockingMove !== null) return blockingMove;

  return getRandomMove();
}

function scoreBoardForMinimax(nextBoard, depth) {
  const winner = getWinnerFromBoard(nextBoard);
  if (winner === getComputerMark()) return 10 - depth;
  if (winner === playerMark) return depth - 10;
  return 0;
}

function minimax(nextBoard, mark, depth) {
  const winner = getWinnerFromBoard(nextBoard);
  const emptyIndexes = getEmptyIndexes(nextBoard);
  if (winner || !emptyIndexes.length) {
    return { score: scoreBoardForMinimax(nextBoard, depth), index: null };
  }

  const isMaximizing = mark === getComputerMark();
  let bestMove = {
    score: isMaximizing ? -Infinity : Infinity,
    index: emptyIndexes[0]
  };

  for (const index of emptyIndexes) {
    const testBoard = [...nextBoard];
    testBoard[index] = mark;
    const nextMark = mark === "X" ? "O" : "X";
    const result = minimax(testBoard, nextMark, depth + 1);

    if (isMaximizing && result.score > bestMove.score) {
      bestMove = { score: result.score, index };
    }

    if (!isMaximizing && result.score < bestMove.score) {
      bestMove = { score: result.score, index };
    }
  }

  return bestMove;
}

function getHardMove() {
  return minimax([...board], getComputerMark(), 0).index;
}

function getComputerMove() {
  if (computerDifficulty === "easy") return getRandomMove();
  if (computerDifficulty === "hard") return getHardMove();
  return getNormalMove();
}

function rerenderMarksOnBoard() {
  board.forEach((mark, index) => {
    if (!mark) return;
    const markImg = document.createElement("img");
    markImg.src = markImageByStyle[markStyles[mark]];
    markImg.alt = mark;
    markImg.className = "mark-image";
    cells[index].replaceChildren(markImg);
  });
}

function makeComputerMove() {
  if (!isGameActive || !isComputerTurn()) return;

  const choice = getComputerMove();
  if (choice === null) return;
  placeMark(choice, getComputerMark());

  if (finishGameIfNeeded()) return;

  currentPlayer = playerMark;
  updateStatusText();
}

function handleCellClick(event) {
  const index = Number(event.currentTarget.dataset.index);
  if (!isGameActive || board[index]) return;
  if (isComputerTurn()) return;

  placeMark(index, currentPlayer);
  if (finishGameIfNeeded()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatusText();

  if (isComputerTurn()) {
    window.setTimeout(makeComputerMove, 300);
  }
}

function getNextStartingMark() {
  const startingMark = nextStartingMark;
  nextStartingMark = nextStartingMark === "X" ? "O" : "X";
  return startingMark;
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = hasStarted ? getNextStartingMark() : nextStartingMark;
  isGameActive = true;
  winLine.style.display = "none";

  cells.forEach((cell) => {
    cell.replaceChildren();
    cell.disabled = false;
    cell.classList.remove("win");
  });

  updateStatusText();
  if (hasStarted && isComputerTurn()) {
    window.setTimeout(makeComputerMove, 300);
  }
}

function applySettings() {
  const selectedGameMode = document.querySelector('input[name="game-mode"]:checked');
  const selectedDifficulty = document.querySelector('input[name="computer-difficulty"]:checked');
  const selectedLineColor = document.querySelector('input[name="win-line-color"]:checked');
  const selectedLanguage = document.querySelector('input[name="language"]:checked');
  const nextGameMode = selectedGameMode ? selectedGameMode.value : "computer";
  const nextDifficulty = selectedDifficulty ? selectedDifficulty.value : "normal";
  const nextLineColor = selectedLineColor ? selectedLineColor.value : "yellow";
  const nextLanguage = selectedLanguage ? selectedLanguage.value : "he";
  const modeChanged = nextGameMode !== gameMode;
  const difficultyChanged = nextDifficulty !== computerDifficulty;
  const languageChanged = nextLanguage !== language;

  gameMode = nextGameMode;
  computerDifficulty = nextDifficulty;
  winLineColor = nextLineColor;
  language = nextLanguage;
  applyWinLineColor();
  syncLanguageInputs();
  applyLanguageToUI();
  settingsModal.classList.add("hidden");
  settingsApplyButton.classList.remove("is-dirty");

  if (difficultyChanged) {
    resetAll();
  } else if (modeChanged) {
    resetGame();
  } else if (languageChanged) {
    updateStatusText();
  }
}

function resetAll() {
  scores.X = 0;
  scores.O = 0;
  updateScoreboard();
  resetGame();
}

function updateSettingsDirtyState() {
  const selectedGameMode = document.querySelector('input[name="game-mode"]:checked');
  const selectedDifficulty = document.querySelector('input[name="computer-difficulty"]:checked');
  const selectedLineColor = document.querySelector('input[name="win-line-color"]:checked');
  const selectedLanguage = document.querySelector('input[name="language"]:checked');

  const modeValue = selectedGameMode ? selectedGameMode.value : gameMode;
  const difficultyValue = selectedDifficulty ? selectedDifficulty.value : computerDifficulty;
  const lineValue = selectedLineColor ? selectedLineColor.value : winLineColor;
  const languageValue = selectedLanguage ? selectedLanguage.value : language;
  const isDirty = modeValue !== gameMode || difficultyValue !== computerDifficulty || lineValue !== winLineColor || languageValue !== language;
  settingsApplyButton.classList.toggle("is-dirty", isDirty);
}

function openSettingsModal() {
  const gameModeInput = document.querySelector(`input[name="game-mode"][value="${gameMode}"]`);
  const difficultyInput = document.querySelector(`input[name="computer-difficulty"][value="${computerDifficulty}"]`);
  const lineColorInput = document.querySelector(`input[name="win-line-color"][value="${winLineColor}"]`);
  const languageInput = document.querySelector(`input[name="language"][value="${language}"]`);
  if (gameModeInput) gameModeInput.checked = true;
  if (difficultyInput) difficultyInput.checked = true;
  if (lineColorInput) lineColorInput.checked = true;
  if (languageInput) languageInput.checked = true;
  syncLanguageInputs();
  settingsApplyButton.classList.remove("is-dirty");
  centerModalCard(settingsCard);
  settingsModal.classList.remove("hidden");
}

function closeSettingsModal() {
  settingsModal.classList.add("hidden");
}

function confirmNickname() {
  const nextName = nicknameInput.value.trim();
  if (!nextName) {
    nicknameError.textContent = t("nicknameError");
    nicknameInput.focus();
    return;
  }

  const selectedPlayerMark = getCheckedValue("player-mark", "");
  if (!selectedPlayerMark) {
    nicknameError.textContent = t("chooseMarkError");
    return;
  }

  const previousPlayerMark = playerMark;
  const wasStarted = hasStarted;
  playerName = nextName;
  applyStartupChoices();
  hasStarted = true;
  playerNameDisplay.textContent = playerName;
  changeNameButton.classList.remove("hidden");
  nicknameError.textContent = "";
  nicknameModal.classList.add("hidden");
  nicknameModalSnapshot = null;

  if (wasStarted && previousPlayerMark !== playerMark) {
    resetAll();
  } else if (!wasStarted) {
    resetGame();
  }
  startMusic();
}

function openNicknameModal() {
  nicknameModalSnapshot = captureNicknameModalSnapshot();
  nicknameInput.value = playerName;
  nicknameError.textContent = "";
  syncStartupChoices();
  nicknameCloseButton.classList.toggle("hidden", !hasStarted);
  nicknameModal.classList.remove("hidden");
  centerModalCard(nicknameCard);
  nicknameInput.focus();
  nicknameInput.select();
}

function closeNicknameModal() {
  if (!hasStarted) return;
  restoreNicknameModalSnapshot();
  nicknameError.textContent = "";
  nicknameModalSnapshot = null;
  nicknameModal.classList.add("hidden");
}

function openMarkStylePicker() {
  previewOriginalStyles = { ...markStyles };
  const redLabel = t("red");
  const yellowLabel = t("yellow");
  const greenLabel = t("green");
  modalTitle.textContent = t("chooseColorFor");
  modalOptions.classList.add("mark-color-grid");
  modalOptions.innerHTML = `
    <p class="color-section-label">X</p>
    <label class="color-option">
      <input type="radio" name="x-style" value="x_green" ${markStyles.X === "x_green" ? "checked" : ""}>
      <img src="Assets/XXX Green.png" alt="X ${greenLabel}">
      <span>${greenLabel}</span>
    </label>
    <label class="color-option">
      <input type="radio" name="x-style" value="x_yellow" ${markStyles.X === "x_yellow" ? "checked" : ""}>
      <img src="Assets/XXX Yellow.png" alt="X ${yellowLabel}">
      <span>${yellowLabel}</span>
    </label>
    <label class="color-option">
      <input type="radio" name="x-style" value="x_red" ${markStyles.X === "x_red" ? "checked" : ""}>
      <img src="Assets/XXX Red.png" alt="X ${redLabel}">
      <span>${redLabel}</span>
    </label>
    <p class="color-section-label">O</p>
    <label class="color-option">
      <input type="radio" name="o-style" value="o_green" ${markStyles.O === "o_green" ? "checked" : ""}>
      <img src="Assets/OOO Green.png" alt="O ${greenLabel}">
      <span>${greenLabel}</span>
    </label>
    <label class="color-option">
      <input type="radio" name="o-style" value="o_yellow" ${markStyles.O === "o_yellow" ? "checked" : ""}>
      <img src="Assets/OOO Yellow.png" alt="O ${yellowLabel}">
      <span>${yellowLabel}</span>
    </label>
    <label class="color-option">
      <input type="radio" name="o-style" value="o_red" ${markStyles.O === "o_red" ? "checked" : ""}>
      <img src="Assets/OOO Red.png" alt="O ${redLabel}">
      <span>${redLabel}</span>
    </label>
  `;
  updateColorOptionLocks("x-style", "o-style", "X");
  centerModalCard(markStyleCard);
  markStyleModal.classList.remove("hidden");
}

function closeMarkStylePicker(shouldRevert = true) {
  if (shouldRevert) {
    markStyles.X = previewOriginalStyles.X;
    markStyles.O = previewOriginalStyles.O;
    rerenderMarksOnBoard();
  }
  markStyleModal.classList.add("hidden");
}

function applyMarkStyle() {
  updateColorOptionLocks("x-style", "o-style", "X");
  const selectedX = document.querySelector('input[name="x-style"]:checked');
  const selectedO = document.querySelector('input[name="o-style"]:checked');
  if (selectedX) markStyles.X = selectedX.value;
  if (selectedO) markStyles.O = selectedO.value;
  rerenderMarksOnBoard();
  closeMarkStylePicker(false);
}

function previewMarkStyle(event) {
  const changedMark = event?.target?.name === "o-style" ? "O" : "X";
  updateColorOptionLocks("x-style", "o-style", changedMark);
  const selectedX = document.querySelector('input[name="x-style"]:checked');
  const selectedO = document.querySelector('input[name="o-style"]:checked');
  if (selectedX) markStyles.X = selectedX.value;
  if (selectedO) markStyles.O = selectedO.value;
  rerenderMarksOnBoard();
}

function handleStartupColorChange(event) {
  const changedMark = event.target.name === "startup-o-style" ? "O" : "X";
  const selectedPlayerMark = getCheckedValue("player-mark", playerMark);
  if (changedMark === selectedPlayerMark) {
    startupOpponentColorsOpen = true;
  }
  updateColorOptionLocks("startup-x-style", "startup-o-style", changedMark);
  updateStartupColorFlow();
}

function handleStartupPlayerMarkChange() {
  startupOpponentColorsOpen = false;
  nicknameError.textContent = "";
  updateStartupColorFlow();
}

function choosePlayerMarkFromScoreboard(nextPlayerMark) {
  if (playerMark === nextPlayerMark) return;
  playerMark = nextPlayerMark;
  syncStartupChoices();
  updatePlayerScoreHighlight();
  resetAll();
}

function handleResultConfirm() {
  resultModal.classList.add("hidden");
  resetGame();
}

function handleGlobalKeydown(event) {
  if (event.code !== "Space" || resultModal.classList.contains("hidden")) return;
  event.preventDefault();
  handleResultConfirm();
}

function centerModalCard(cardElement) {
  cardElement.style.left = "50%";
  cardElement.style.top = "50%";
  cardElement.style.transform = "translate(-50%, -50%)";
}

function placeResultModalNearTop() {
  resultCard.style.left = "50%";
  resultCard.style.top = "140px";
  resultCard.style.transform = "translateX(-50%)";
}

function enableModalDrag(modalElement, cardElement) {
  const dragHandle = cardElement.querySelector(".modal-drag-handle");
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function onPointerMove(event) {
    if (!isDragging) return;
    cardElement.style.left = `${event.clientX - offsetX}px`;
    cardElement.style.top = `${event.clientY - offsetY}px`;
    cardElement.style.transform = "none";
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", stopDrag);
  }

  dragHandle.addEventListener("pointerdown", (event) => {
    if (modalElement.classList.contains("hidden")) return;
    const rect = cardElement.getBoundingClientRect();
    isDragging = true;
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    dragHandle.style.cursor = "grabbing";
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", () => {
      dragHandle.style.cursor = "grab";
      stopDrag();
    }, { once: true });
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
resetButton.addEventListener("click", resetAll);
settingsToggleButton.addEventListener("click", openSettingsModal);
soundToggleButton.addEventListener("click", toggleSound);
settingsApplyButton.addEventListener("click", applySettings);
settingsCancelButton.addEventListener("click", closeSettingsModal);
xStyleButton.addEventListener("click", (event) => {
  event.stopPropagation();
  choosePlayerMarkFromScoreboard("X");
});
oStyleButton.addEventListener("click", (event) => {
  event.stopPropagation();
  choosePlayerMarkFromScoreboard("O");
});
xScoreCard.addEventListener("click", () => choosePlayerMarkFromScoreboard("X"));
oScoreCard.addEventListener("click", () => choosePlayerMarkFromScoreboard("O"));
modalApplyButton.addEventListener("click", applyMarkStyle);
modalCancelButton.addEventListener("click", closeMarkStylePicker);
modalOptions.addEventListener("change", previewMarkStyle);
resultConfirmButton.addEventListener("click", handleResultConfirm);
document.addEventListener("keydown", handleGlobalKeydown);
nicknameCloseButton.addEventListener("click", closeNicknameModal);
enableModalDrag(markStyleModal, markStyleCard);
enableModalDrag(resultModal, resultCard);
enableModalDrag(settingsModal, settingsCard);
settingsCard.addEventListener("change", updateSettingsDirtyState);
nicknameConfirmButton.addEventListener("click", confirmNickname);
nicknameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    confirmNickname();
  }
});
nicknameLanguageInputs.forEach((input) => {
  input.addEventListener("change", () => setLanguage(input.value));
});
document.querySelectorAll('input[name="startup-x-style"], input[name="startup-o-style"]').forEach((input) => {
  input.addEventListener("change", handleStartupColorChange);
});
document.querySelectorAll('input[name="player-mark"]').forEach((input) => {
  input.addEventListener("change", handleStartupPlayerMarkChange);
});
changeNameButton.addEventListener("click", openNicknameModal);

syncLanguageInputs();
syncStartupChoices();
applyLanguageToUI();
updateScoreboard();
updatePlayerScoreHighlight();
applyWinLineColor();
resetGame();
centerModalCard(nicknameCard);
nicknameInput.focus();


