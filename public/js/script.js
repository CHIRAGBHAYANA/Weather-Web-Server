console.log("JAVA SCRIPT IS RUNNING");

fetch("https://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();

  const valu = search.value;
  if (!valu) {
    console.log("enter");
    return;
  }
  fetch(`http://localhost:3000/weather?address=%22${valu}%22`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageTwo.textContent = data.error;
          console.log(data.error);
        } else {
          messageOne.textContent = `Temperature ${data.temperature} and Feels Like Temp ${data.feelslikeTemp}`;
          console.log(data);
        }
      });
    }
  );
  console.log(valu);
  messageOne.textContent = "";
  messageTwo.textContent = "";
});
