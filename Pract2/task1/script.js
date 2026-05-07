const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  let color = "#FFFFFF";

  try {
    fetch("https://www.thecolorapi.com/random?format=json")
      .then((response) => response.json())
      .then((json) => {
        color = json.hex.value;
        btn.style.backgroundColor = color;
      });
  } catch (error) {
    console.error(error);
  }
});
