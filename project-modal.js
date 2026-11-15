const projects = [
  {
    number: "01",
    title: "Bubble Mage",
    type: "Open World Video Game · 2025-26",
    description:
      "An open world fantasy game made in Unity. Currently in development with a Steam page open for wishlisting! Players use bubbles, their sole form of magic, to explore islands, solve puzzles, and interact with the island's natural inhabitants - the slimes.",
    image: "images/project-images/Islands.png",
    imageAlt: "Bubble Mage gameplay screenshot",
  },
  {
    number: "02",
    title: "World of Bits",
    type: "Location-Based Geo-Game · 2025",
    description:
      "A geolocation based game (best suited for the phone but screen responsive for other devices) where players can walk around in the real world and merge tokens to craft higher and higher values.",
    image: "images/project-images/world_of_bits.png",
    imageAlt: "World of Bits gameplay screenshot",
  },
  {
    number: "03",
    title: "Sweet+Swift Sketch!",
    type: "Sketchpad · 2025",
    description:
      "A soft colored sketchpad that supports multiple marker types, stickers, and exporting pngs.",
    image: "images/project-images/sketchpad.png",
    imageAlt: "Sweet+Swift Sketch screenshot",
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