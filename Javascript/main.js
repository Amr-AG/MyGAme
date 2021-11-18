// Start The First Game
let buttonStart = document.querySelector(".button-start");
let start = document.querySelector(".button-start span");

// Creat Message box for askking your Name
let div = document.createElement("div");
div.style.cssText =
  "width:340px;position:absolute;top:50%;left:50%;transform:translate(-50%,-175%); text-align:center; color:white";

let ques = document.createElement("h1");

let message = document.createElement("input");
message.placeholder = "Enter Your Name";
message.classList.add("type", "text");

ques.appendChild(document.createTextNode("What's Your Name ?"));
div.appendChild(ques);
div.appendChild(message);
buttonStart.append(div);

start.onclick = () => {
  if (message.value == null || message.value === "") {
    preventDefault();
  } else {
    document.querySelector(".info-conatiner .name span").innerHTML =
      message.value;
  }
  document.querySelector(".button-start").remove();
  document.getElementById("game").play();
};

//start Created Functiuons for the Game
let containerBlocks = document.querySelector(".game-container");

//convert the big block game to array
let blocks = Array.from(containerBlocks.children);

//convert all front&&Back blocks to array
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    filpped(block);checked(block[0],block[1])
  });
});

//Creat Function for start filpped
function filpped(selected) {
  //add class fillpped on clicked card
  selected.classList.add("filpped");

  //get all filpped cards and filter them
  let allCardsFilpped = blocks.filter((filppedClicked) =>
    filppedClicked.classList.contains("filpped")
  );
  if (allCardsFilpped.length === 2) {
    noclick();
    checked(allCardsFilpped[0], allCardsFilpped[1]);
  }
}

//stop click aftr open 2 cards
function noclick() {
  containerBlocks.classList.add("disable");
  setTimeout(() => {
    containerBlocks.classList.remove("disable");
  }, 500);
}

// Start function for correct choise
function checked(firstClick, secClick) {
  let wrong = document.querySelector(".Trays span");
  wrong.style.color = "red";

  if (firstClick.dataset.set === secClick.dataset.set) {
    firstClick.classList.remove("filpped");
    secClick.classList.remove("filpped");
    firstClick.classList.add("same");
    secClick.classList.add("same");
    document.getElementById("correct").play();
  } else {
    wrong.innerHTML = parseInt(wrong.innerHTML) + 1;
    setTimeout(() => {
      firstClick.classList.remove("filpped");
      secClick.classList.remove("filpped");
      document.getElementById("wrong").play();
    }, 400);
  }
}

//Creat Shuffle Function by add array length to blocks order
function shuffle(array) {
  let current = array.length,
    temp,
    reandom;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
