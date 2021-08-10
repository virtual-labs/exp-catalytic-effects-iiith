"use strict";
let overallIteration = -4;
let divWidth;
let videoSpeed = 1;
let speedFactor = 1.0;
let purple = "#886da7";
let red = "#f54545";
let yellow = "#ebe691";

const apparatusOptions = [
  "beaker-gold",
  "beaker-eosin",
  "beaker-sodium",
  "device-cuvette",
  "device-spectro",
  "observe",
];

apparatusOptions.forEach(function (option) {
  document.getElementById(option).style.pointerEvents = "none";
});

document.getElementById("beaker-gold").style.pointerEvents = "auto";

async function moveCuvette() {
  let image = document.getElementById("cuvette");
  image.setAttribute("opacity", "1");
  let a1 = anime.timeline({
    targets: "#cuvette",
    duration: 800,
    easing: "linear",
  });
  let transY = 300;
  let transX = 200;
  screenWidth();
  if (divWidth < 769) {
    transX = 100;
    transY = 250;
  }
  if (overallIteration === 4) {
    a1.add({
      duration: 1000,
      translateX: transX,
      translateY: transY,
      scale: 0.25,
    })
      .add({
        opacity: 0,
      })
      .add({
        translateX: 0,
        translateY: 0,
        scale: 1,
      });
    document.getElementById("observe").style.pointerEvents = "auto";

    //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
    document.getElementById("instruction").innerHTML =
      "Click on Observe button to observe what is happening inside the Spectrophotometer and choose video speed according to your own liking.";
    //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
    document.getElementById("observation").innerHTML =
      "Click on Observe button to observe what is happening inside the Spectrophotometer and choose video speed according to your own liking.";
    overallIteration++;
    restartAnimation = false;
  }
}

let fillCuvette = async () => {
  let path1 = document.getElementById("path1");
  let path2 = document.getElementById("path2");
  let finalPosition = 1;
  let curPosition = 0;
  while (true) {
    if (curPosition > finalPosition) break;
    curPosition += 0.01;
    path1.setAttribute("offset", curPosition);
    path2.setAttribute("offset", curPosition);
    await new Promise((resolve) => setTimeout(resolve, 0.5));
  }
};

let fillPipette = async (color) => {
  const line = document.getElementById("half-grad2");
  const yFinalPosition = 0;
  document.getElementById("line").style.stopColor = color;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
};

async function pourGold() {
  if (overallIteration === 1) {
    changeMessage();

    let image = document.getElementById("pipette");
    image.setAttribute("opacity", "1");
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#pipette",
      duration: 800,
      easing: "linear",
    });
    let startX = "-490%";
    let startY = "-100%";

    let endX = "2050%";
    let endY = "-150%";

    screenWidth();

    if (divWidth < 769) {
      startY = "-120%";
      startX = "-480%";
      endY = "700%";
      endX = "0%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
    });
    fillPipette(purple);
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 500,
      translateX: endX,
    })
      .add({
        duration: 900,
        translateY: endY,
        update: function (anim) {
          fillCuvette();
        },
      })
      .add({
        opacity: 0,
      });

    document
      .getElementById("eosin-beaker")
      .setAttribute("onclick", "pourEosin()");
    overallIteration++;
    document.getElementById("gold-beaker").style.cursor = "default";
    document.getElementById("eosin-beaker").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function pourEosin() {
  if (overallIteration === 2) {
    changeMessage();

    let image = document.getElementById("pipette");
    image.setAttribute("opacity", "1");
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#pipette",
      duration: 800,
      easing: "linear",
    });
    let startX = "450%";
    let startY = "-100%";

    let endX = "2050%";
    let endY = "-150%";

    screenWidth();

    if (divWidth < 769) {
      startY = "-120%";
      startX = "480%";
      endY = "700%";
      endX = "0%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
    });
    fillPipette(red);
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 500,
      translateX: endX,
    })
      .add({
        duration: 800,
        translateY: endY,
      })
      .add({
        opacity: 0,
      });

    document
      .getElementById("sodium-beaker")
      .setAttribute("onclick", "pourSodium()");
    overallIteration++;
    document.getElementById("eosin-beaker").style.cursor = "default";
    document.getElementById("sodium-beaker").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function pourSodium() {
  if (overallIteration === 3) {
    changeMessage();

    let image = document.getElementById("pipette");
    image.setAttribute("opacity", "1");
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#pipette",
      duration: 800,
      easing: "linear",
    });
    let startX = "0%";
    let startY = "180%";

    let endX = "2050%";
    let endY = "-150%";

    screenWidth();

    if (divWidth < 769) {
      startY = "170%";
      startX = "0%";
      endY = "700%";
      endX = "0%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
    });
    fillPipette(yellow);
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 500,
      translateX: endX,
    })
      .add({
        duration: 800,
        translateY: endY,
      })
      .add({
        opacity: 0,
      });

    overallIteration++;
    document.getElementById("sodium-beaker").style.cursor = "default";
    document.getElementById("cuvette").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

let setupMessages = [
  "Click on the Gold Seed Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Eosin Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Sodium Borohydride Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Cuvette option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Spectrophotometer option in the Apparatus Menu to introduce it into the workspace.",
];

let setup = 0;

function setupMessage() {
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = setupMessages[setup];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = setupMessages[setup];
  setup++;
}

function apparatusSetup(visibleID, oldOption, newOption) {
  document.getElementById(visibleID).style.visibility = "visible";
  document.getElementById(oldOption).style.pointerEvents = "none";
  document.getElementById(newOption).style.pointerEvents = "auto";
}

setupMessage();
async function visibility(x) {
  if (x === 1 && overallIteration === -4) {
    apparatusSetup("gold-beaker", "beaker-gold", "beaker-eosin");
    overallIteration++;
    setupMessage();
  } else if (x === 2 && overallIteration === -3) {
    apparatusSetup("eosin-beaker", "beaker-eosin", "beaker-sodium");
    overallIteration++;
    setupMessage();
  } else if (x === 3 && overallIteration === -2) {
    apparatusSetup("sodium-beaker", "beaker-sodium", "device-cuvette");
    overallIteration++;
    setupMessage();
  } else if (x === 4 && overallIteration === -1) {
    apparatusSetup("cuvette-row", "device-cuvette", "device-spectro");
    overallIteration++;
    setupMessage();
  } else if (x === 5 && overallIteration === 0) {
    apparatusSetup("spectro-row", "device-spectro", "restart");
    document.getElementById("gold-beaker").style.cursor = "pointer";
    overallIteration++;
    changeMessage();
  }
}

let instructionMessages = [
  "Click on the Gold Seed solution beaker to transfer small amount (around 2 mL) of the Gold Seed particle solution into the empty Cuvette",
  "Click on the Eosin solution beaker to transfer 0.04 ml of Eosin solution to the Cuvette.",
  "Click on the  Sodium Borohydride solution beaker to transfer 0.40 ml of Sodium Borohydride solution to the Cuvette.",
  "Click on the Cuvette to place it into the Spectrophotometer.",
];
let iter1 = -1;
function changeMessage() {
  iter1++;
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = instructionMessages[iter1];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = instructionMessages[iter1];
}

let iter2 = -1;
let observationMessages = [
  "Now observe the zoomed in animation of the Spectrophotometer. It can be seen that certain wavelengths of light are absorbed by our solution in the cuvette. The rest of the wavelengths are just transmitted back by the solution.",
  "The points on the graph are used to depict the Wavelenghts of the lights absorbed.",
];

function observeMessage() {
  if (restartAnimation) {
    return;
  }
  iter2++;

  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = observationMessages[iter2];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = observationMessages[iter2];
}

function screenWidth() {
  divWidth = document.getElementById("workspace").clientWidth;
}

let originalSimulationHeight =
  document.getElementById("simulation").clientHeight;

document.getElementById("simulation").style.minHeight =
  originalSimulationHeight + "px";

let restartAnimation = false;

async function restart() {
  apparatusOptions.forEach(function (option) {
    document.getElementById(option).style.pointerEvents = "none";
  });
  document.getElementById("beaker-gold").style.pointerEvents = "auto";

  document.getElementById("simulation").style.height = originalSimulationHeight;

  document.getElementById("animation-video").style.display = "none";
  document.getElementById("plotted-graph-window").style.display = "none";

  //"head-instructions" is the Heading of the Instructions HTML element that will be visible only in wide screens, i.e., width greater than 768px
  document.getElementById("head-instructions").innerHTML = "Instructions";
  //"head-observations" is the Heading of the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("head-observations").innerHTML = "Instructions";
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = "";
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = "";
  overallIteration = -4;
  iter2 = -1;
  iter1 = -1;
  setup = 0;
  setupMessage();
  document.getElementById("syringe").style.opacity = 0;
  document.getElementById("apparatus-bottles").style.display = "block";
  document.getElementById("apparatus-spectro").style.display = "block";
  document.getElementById("gold-beaker").style.visibility = "hidden";
  document.getElementById("eosin-beaker").style.visibility = "hidden";
  document.getElementById("sodium-beaker").style.visibility = "hidden";
  document.getElementById("spectro-row").style.visibility = "hidden";
  document.getElementById("cuvette-row").style.visibility = "hidden";
  document.getElementById("slidecontainer").style.display = "none";
  restartAnimation = true;

  document.getElementById("eosin-beaker").style.cursor = "default";
  document.getElementById("gold-beaker").style.cursor = "default";
  document.getElementById("sodium-beaker").style.cursor = "default";

  //Resetting the Cuvette
  let path1 = document.getElementById("path1");
  let path2 = document.getElementById("path2");
  path2.setAttribute("offset", "0%");
  path1.setAttribute("offset", "0%");
  document.getElementById("cuvette").style.cursor = "default";
  document.getElementById("cuvette").setAttribute("opacity", "1");
}

async function observe() {
  if (overallIteration === 5) {
    document.getElementById("observe").style.pointerEvents = "none";
    document.getElementById("slidecontainer").style.display = "block";
    document.getElementById("apparatus-bottles").style.display = "none";
    document.getElementById("apparatus-spectro").style.display = "none";
    document.getElementById("animation-video").style.display = "block";
    document.getElementById("animation-bottom-right").play();

    //"head-instructions" is the Heading of the Instructions HTML element that will be visible only in wide screens, i.e., width greater than 768px
    document.getElementById("head-instructions").innerHTML = "Observations";
    //"head-observations" is the Heading of the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
    document.getElementById("head-observations").innerHTML = "Observations";
    //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
    document.getElementById("observation").innerHTML = "";
    //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
    document.getElementById("instruction").innerHTML = "";

    observeMessage();

    await new Promise((r) => setTimeout(r, 8000 * speedFactor));

    if (!restartAnimation) {
      overallIteration++;
      document.getElementById("observe").style.pointerEvents = "auto";

      //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
      document.getElementById("instruction").innerHTML =
        "Click on Observe option in the Control Menu again to see the graph.";
      //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
      document.getElementById("observation").innerHTML =
        "Click on Observe option in the Control Menu again to see the graph.";
    }
  } else if (overallIteration === 6) {
    document.getElementById("observe").style.pointerEvents = "none";
    observeMessage();

    document.getElementById("slidecontainer").style.display = "none";

    document.getElementById("animation-video").style.display = "none";
    document.getElementById("plotted-graph-window").style.display = "block";
    createGraph();

    overallIteration++;
    setTimeout(function () {
      //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
      document.getElementById("instruction").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
      //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
      document.getElementById("observation").innerHTML =
        "Click on Restart option in the Control Menu to restart the experiment from scratch.";
    }, 10000);
  }
}

let gold = document.getElementById("gold-beaker");
gold.addEventListener("click", pourGold);

let cuvette = document.getElementById("cuvette");
cuvette.addEventListener("click", function () {
  moveCuvette(0);
});

let slider = document.getElementById("slider");
let vid = document.getElementById("animation-bottom-right");
slider.oninput = function () {
  videoSpeed = slider.value;
  vid.playbackRate = videoSpeed;
  speedFactor = 1 / videoSpeed;
};

function createGraph() {
  let trace1 = {
    x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    y: [
      0.186, 0.2, 0.35, 0.4, 0.425, 0.438, 0.445, 0.45, 0.46, 0.468, 0.47,
      0.471, 0.472, 0.473, 0.474, 0.475,
    ],
    mode: "lines",
    line: {
      color: "rgb(100, 0, 0)",
      width: 3,
    },
  };

  let data = [trace1];

  var layout = {
    title: "Absorbance over Time of Particle Solution",
    xaxis: {
      title: "Time (seconds)",
      showgrid: true,
      zeroline: true,
    },
    yaxis: {
      title: "Absorbance at wavelenght 520nm",
      showline: true,
    },
  };

  let config = { responsive: true };
  Plotly.newPlot("chart-container", data, layout, config);
}
