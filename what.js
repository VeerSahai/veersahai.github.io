document.addEventListener("DOMContentLoaded", () => {
  //nav menu
//const toggleNav = () => {
  //document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";
//}

const navToggle = document.querySelector('#nav-toggle');
const mainNav = document.querySelector('#nav');

navToggle.addEventListener('click', function() {
  mainNav.classList.toggle('open');
});
  
  
  //cool background effect
  const wrapper = document.getElementById("tiles");

  //create grid
  let columns = 0;
  let rows = 0;

  //store colors
  const colors = [
    "#A6A9C8",
    "#D3D9E9",
    "#554D74",
    "rgb(33, 150, 243)",
    "#e5e5e5",
    "#018786",
  ];
  
  let count = -1;

//animate background on click, index what color
  const handleOnClick = index => {
    count = count + 1;


    anime({
      targets: ".tile",
      backgroundColor: colors[count % (colors.length - 1)],
      delay: anime.stagger(50, {
        grid: [columns, rows],
        from: index
      })
    })
  }


  const createTile = index => {
    const tile = document.createElement("div");

    tile.classList.add("tile");

    tile.onclick = e => handleOnClick(index);

    return tile;
  }

  const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
      wrapper.appendChild(createTile(index));
    })
  }

  createTiles(columns * rows);

  const createGrid = () => {
    wrapper.innerHTML = "";

    columns = Math.floor(document.body.clientWidth / 50);
    rows = Math.floor(document.body.clientHeight / 50);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
  }

  createGrid();

  window.onresize = () => createGrid();
  


  //randomize letters on hover
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  document.querySelector("h1").onmouseover = event => {
    let iterations = 0;

    const interval = setInterval(() => {  
      event.target.innerText = event.target.innerText.split("")
        .map((letter, index) => {
          if(index < iterations) {
            return event.target.dataset.value[index]; 
          }

          return letters[Math.floor(Math.random() * 26)]
        })
        .join("");

      if(iterations >= 12) clearInterval(interval);

      iterations += 1 / 3;
    }, 30);
  }
});
