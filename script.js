const timeElement = document.getElementById("timeElement");

const welcomeWindow = document.getElementById("welcome");
const closeWelcomeButton = document.getElementById("closeWelcome");
const openWelcomeButton = document.getElementById("openWelcome");

const buildersCornerWindow =
  document.getElementById("buildersCorner");

const buildersCornerIcon =
  document.getElementById("buildersCornerIcon");

const buildersCornerClose =
  document.getElementById("buildersCornerClose");

const myAppWindow =
  document.getElementById("myApp");

const myAppIcon =
  document.getElementById("myAppIcon");

const myAppClose =
  document.getElementById("myAppClose");

const noteField =
  document.getElementById("story");

const saveNoteButton =
  document.getElementById("saveNote");

const saveStatus =
  document.getElementById("saveStatus");

let selectedIcon;
let highestZIndex = 100;

function updateTime() {
  if (timeElement) {
    timeElement.textContent =
      new Date().toLocaleString();
  }
}

updateTime();
setInterval(updateTime, 1000);

function handleIconTap(element) {
  if (selectedIcon === element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
    return;
  }

  if (selectedIcon) {
    selectedIcon.classList.remove("selected");
  }

  element.classList.add("selected");
  selectedIcon = element;
}

function bringToFront(windowElement) {
  if (!windowElement) {
    return;
  }

  highestZIndex += 1;
  windowElement.style.zIndex = highestZIndex;
}

function makeDraggable(windowElement) {
  if (!windowElement) {
    return;
  }

  const header = document.getElementById(
    windowElement.id + "header"
  );

  if (!header) {
    return;
  }

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", function (event) {
    if (event.target.closest("button")) {
      return;
    }

    event.preventDefault();

    dragging = true;

    const windowPosition =
      windowElement.getBoundingClientRect();

    offsetX =
      event.clientX - windowPosition.left;

    offsetY =
      event.clientY - windowPosition.top;

    bringToFront(windowElement);
  });

  document.addEventListener("mousemove", function (event) {
    if (!dragging) {
      return;
    }

    event.preventDefault();

    windowElement.style.left =
      event.clientX - offsetX + "px";

    windowElement.style.top =
      event.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", function () {
    dragging = false;
  });
}

makeDraggable(welcomeWindow);
makeDraggable(buildersCornerWindow);
makeDraggable(myAppWindow);

if (welcomeWindow) {
  welcomeWindow.addEventListener(
    "mousedown",
    function () {
      bringToFront(welcomeWindow);
    }
  );
}

if (buildersCornerWindow) {
  buildersCornerWindow.addEventListener(
    "mousedown",
    function () {
      bringToFront(buildersCornerWindow);
    }
  );
}

if (myAppWindow) {
  myAppWindow.addEventListener(
    "mousedown",
    function () {
      bringToFront(myAppWindow);
    }
  );
}

if (closeWelcomeButton && welcomeWindow) {
  closeWelcomeButton.addEventListener(
    "click",
    function () {
      welcomeWindow.style.display = "none";
    }
  );
}

if (openWelcomeButton && welcomeWindow) {
  openWelcomeButton.addEventListener(
    "click",
    function () {
      welcomeWindow.style.display = "block";
      bringToFront(welcomeWindow);
    }
  );
}

if (buildersCornerIcon && buildersCornerWindow) {
  buildersCornerIcon.addEventListener(
    "dblclick",
    function () {
      buildersCornerWindow.style.display = "block";
      bringToFront(buildersCornerWindow);
    }
  );
}

if (buildersCornerClose && buildersCornerWindow) {
  buildersCornerClose.addEventListener(
    "click",
    function () {
      buildersCornerWindow.style.display = "none";
    }
  );
}

if (myAppIcon && myAppWindow) {
  myAppIcon.addEventListener(
    "dblclick",
    function () {
      myAppWindow.style.display = "block";
      bringToFront(myAppWindow);
    }
  );
}

if (myAppClose && myAppWindow) {
  myAppClose.addEventListener(
    "click",
    function () {
      myAppWindow.style.display = "none";
    }
  );
}

if (noteField && saveNoteButton && saveStatus) {
  const savedNote =
    localStorage.getItem("buildersCornerNote");

  if (savedNote !== null) {
    noteField.value = savedNote;
  }

  saveNoteButton.addEventListener(
    "click",
    function () {
      localStorage.setItem(
        "buildersCornerNote",
        noteField.value
      );

      saveStatus.textContent = "Note saved!";

      setTimeout(function () {
        saveStatus.textContent = "";
      }, 2500);
    }
  );
}