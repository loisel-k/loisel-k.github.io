const projects = [
  {
    number: "01",
    title: "Bubble Mage",
    type: "Open World Video Game · 2025-26",
    description:
      "I independently learnt Blender to create 3D assets for characters (complete with custom rigs and animations) and environment, taking sole responsibility for the asset pipelineI also creating shaders and VFX in Unity for in game assets. I implemented key gameplay features such as the equipment system and related effects as well as several of the island puzzles + related mechanics. As a team we managed version control through GitHub, while I organized our development workflow for our team of 3, managed project timeline and Steam/publishing related tasks.",
    note: [
      { text: "Wishlist it on Steam by clicking " },
      { text: "here!", href: "https://store.steampowered.com/app/4703500/Bubble_Mage/" },
    ],
    image: "images/project-images/Islands.png",
    imageAlt: "Bubble Mage gameplay screenshot",
  },
  {
    number: "02",
    title: "World of Bits",
    type: "Location-Based Geo-Game · 2025",
    description:
      "I used leaflet.js to create an interactive map. It supports both readl world movement (through walking around with your device) and and keyboard movement (WASD) for easier computer usage. Day and night mode styling to suit user preference. The game saves player progress for when players return to the website. I used the Flyweight pattern to optimize memory usage and performance by only rendering currently relevant cells of the map. I also used the Memento design pattern by only minimally saving changed cells and the Facade design pattern in implementing a simple code interface for movement (through geolocation or WASD) rather than duplicating code. Additionally, I went through several rounds of refactoring to get rid of classic code smells such as duplicated code.",
    note: [
      { text: "Play the game " },
      { text: "here", href: "https://loisel-k.github.io/World-of-Bits-D3/" },
      { text: ". Check out the code " },
      { text: "here", href: "https://github.com/loisel-k/World-of-Bits-D3/tree/main" },
      { text: "." },
    ],
    image: "images/project-images/world_of_bits.png",
    imageAlt: "World of Bits gameplay screenshot",
  },
  {
    number: "03",
    title: "Timely",
    type: "Meeting Scheduler · 2024-25",
    description:
      "I worked on this project as part of my undergraduate research in a large team of 10. I worked on full stack development, working with Figma, HTML, CSS, and Angular to create web components and style the UI layout. I stored and managed our backend database in Firebase. I also led code reviews on other members' pull requests and particpated in lab wide (~50 people) weekly meetings to discuss progress. As part of this project, I also compiled research papers in social computing and HCI to see relevant research to our project.",
    note: [
      { text: "Check out a live demo " },
      { text: "here", href: "https://loisel-k.github.io/timely-v2-fork/#/" },
      { text: "." },
    ],
    image: "images/project-images/timely/timely_login.png",
    imageAlt: "Timely screenshot",
  },
];

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu, #menu");
const projectModal = document.querySelector(".project-modal");
const modalImage = document.querySelector(".modal-visual .project-image");
const modalIndex = document.querySelector(".modal-index");
const modalType = document.querySelector(".modal-type");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalNote = document.querySelector(".modal-note");
const closeModalButton = document.querySelector(".modal-close");
const modalBackButton = document.querySelector(".modal-back");
let previouslyFocusedElement = null;

function setMenuOpen(isOpen) {
  if (!menuToggle || !mobileMenu) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.classList.toggle("open", isOpen);
  if ("hidden" in mobileMenu) mobileMenu.hidden = !isOpen;
  mobileMenu.inert = !isOpen;
  if (projectModal) {
    document.body.classList.toggle("locked", isOpen || !projectModal.hidden);
  }
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });
}

if (menuToggle && mobileMenu) {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      setMenuOpen(false);
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function openProject(project, trigger) {
  previouslyFocusedElement = trigger;
  modalImage.src = project.image;
  modalImage.alt = project.imageAlt;
  modalIndex.textContent = project.number;
  modalType.textContent = project.type;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalNote.replaceChildren();
  project.note.forEach(({ text, href }) => {
    if (!href) {
      modalNote.append(document.createTextNode(text));
      return;
    }

    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    modalNote.append(link);
  });
  projectModal.hidden = false;
  document.body.classList.add("locked");
  closeModalButton.focus();
}

function closeProject() {
  projectModal.hidden = true;
  document.body.classList.remove("locked");
  if (previouslyFocusedElement) previouslyFocusedElement.focus();
}

if (document.querySelectorAll("[data-project]").length) {
  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      openProject(projects[Number(button.dataset.project)], button);
    });
  });
}

if (closeModalButton) closeModalButton.addEventListener("click", closeProject);
if (modalBackButton) modalBackButton.addEventListener("click", closeProject);
if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) closeProject();
  });
}

if (menuToggle) {
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (projectModal && !projectModal.hidden) closeProject();
    if (menuToggle.getAttribute("aria-expanded") === "true") setMenuOpen(false);
  }
});
}