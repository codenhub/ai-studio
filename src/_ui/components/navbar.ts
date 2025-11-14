import intl from "../scripts/intl.ts";

document.addEventListener("intl-loaded", () => {
  type Page = {
    name: string;
    href: string;
    icon: string;
  };

  const pages: Page[] = [
    {
      name: intl.getKey("navbar.home") || "Home",
      href: "/",
      icon: `/assets/icons/dashboard.svg`,
    },
    {
      name: intl.getKey("navbar.chat") || "Chat",
      href: "/chat/",
      icon: `/assets/icons/chat.svg`,
    },
    {
      name: intl.getKey("navbar.help") || "Help",
      href: "/help/",
      icon: `/assets/icons/help.svg`,
    },
  ];

  const currentPage = window.location.pathname;

  const page = (p: Page) => {
    return `
      <a ${p.href !== currentPage ? `href="${p.href}"` : ""} class="group relative size-10 rounded-md p-2 ${currentPage === p.href ? "bg-primary" : ""}">
        <img src="${p.icon}" alt="${p.name} Icon" ${currentPage === p.href ? 'class="invert"' : ""}/>
        <span class="bg-background-secondary rounded-md p-2 border border-border center-v left-12 pointer-events-none scale-0 group-hover:scale-100 transition-transform origin-left duration-200">${p.name}</span>
      </a>
    `;
  };

  class NavBar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <aside class="flex flex-1 flex-col max-w-xs size-full items-center px-4 py-6 gap-8 border-r border-border">
          <a href="/">
            <img src="/logo.svg" alt="AI Studio Logo" class="size-10 object-contain hover:rotate-90 transition-transform duration-400" />
          </a>
          <nav class="flex flex-1 flex-col gap-4 border-t border-border pt-8">
            ${pages.map(page).join("")}
          </nav>
          ${page({
            name: intl.getKey("navbar.settings") || "Settings",
            href: "/settings/",
            icon: `/assets/icons/settings.svg`,
          })}
        </aside>
      `;
    }
  }

  customElements.define("app-navbar", NavBar);
});
