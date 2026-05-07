const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const sectorForm = document.querySelector("[data-sector-form]");
const sectorFormNote = document.querySelector("[data-sector-form-note]");
const sectorLinks = document.querySelectorAll("[data-sector-link]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

menu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

if (sectorForm) {
  sectorLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const sectorSelect = sectorForm.elements.setor;
      sectorSelect.value = link.dataset.sectorLink;
    });
  });

  sectorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(sectorForm);
    const imageFile = sectorForm.elements.imagem.files[0];
    const imageReference = imageFile ? imageFile.name : "Nenhuma imagem selecionada";
    const sector = data.get("setor");
    const message = [
      `Olá, Daniel Zákia. Vim pelo site e quero tratar sobre: ${sector}.`,
      "",
      `Nome: ${data.get("nome")}`,
      `E-mail: ${data.get("email")}`,
      `WhatsApp: ${data.get("telefone")}`,
      `Setor principal: ${sector}`,
      `Imagem/referência: ${imageReference}`,
      "",
      `Mensagem: ${data.get("mensagem")}`,
    ].join("\n");

    const emailSubject = encodeURIComponent(`Contato pelo site - ${sector}`);
    const emailBody = encodeURIComponent(message);
    const mailLink = document.createElement("a");
    mailLink.href = `mailto:danielzakia@icloud.com?subject=${emailSubject}&body=${emailBody}`;
    mailLink.style.display = "none";
    document.body.appendChild(mailLink);
    mailLink.click();
    mailLink.remove();

    sectorFormNote.textContent = "Abrindo e-mail e WhatsApp com a conversa direcionada.";
    window.setTimeout(() => {
      window.open(`https://wa.me/5517996240418?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    }, 600);
  });
}
