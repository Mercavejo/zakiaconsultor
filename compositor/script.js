const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuButton = document.querySelector("[data-menu-button]");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

menu?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement) {
    menu.classList.remove("is-open");
    header?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".youtube-embed").forEach((embed) => {
  const video = embed.getAttribute("data-video");
  const title = embed.getAttribute("data-title") || "Vídeo de Daniel Zákia";
  if (!video) return;

  const thumbnail = document.createElement("img");
  thumbnail.src = `https://i.ytimg.com/vi/${video}/hqdefault.jpg`;
  thumbnail.alt = title;
  thumbnail.loading = "lazy";

  const play = document.createElement("a");
  play.className = "youtube-play";
  play.href = `https://www.youtube.com/watch?v=${video}`;
  play.target = "_blank";
  play.rel = "noopener noreferrer";
  play.setAttribute("aria-label", `Assistir ${title} no YouTube`);
  play.innerHTML = "<span aria-hidden=\"true\">▶</span><strong>Assistir no YouTube</strong>";

  embed.append(thumbnail, play);
});
