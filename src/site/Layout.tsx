// Site chrome: ticker, header with navigation, language and theme switches, and footer.
import type { ReactNode } from "react";
import { Menu, Moon, Pencil, Sun } from "lucide-react";
import { LANGS, pagePath, t } from "../content/schema.ts";
import type { Lang, Page, Site } from "../content/schema.ts";
import { REPO, UI_TEXT, href } from "./ui.ts";

export const THEME_KEY = "northfold.theme";

export function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* storage can be unavailable */
  }
}

type Props = {
  site: Site;
  page: Page | null;
  lang: Lang;
  children: ReactNode;
  /** Shown above the header, e.g. when local edits are displayed. */
  banner?: ReactNode;
  /** In the editor preview links do nothing and the edit link is hidden. */
  preview?: boolean;
};

export function Logo({ name }: { name: string }) {
  return (
    <>
      <i className="mark" aria-hidden />
      {name}
    </>
  );
}

export function Layout({ site, page, lang, children, banner, preview }: Props) {
  const ui = UI_TEXT[lang];
  const current = page ? pagePath(page, lang) : "";
  // "Start a project" goes to whichever page holds the contact form.
  const contactPage = site.pages.find((p) => p.blocks.some((b) => b.type === "contact"));
  const contactUrl = contactPage ? pagePath(contactPage, lang) : href("/contact", lang);
  const editUrl = `/edit?page=${encodeURIComponent(page?.id ?? "home")}&lang=${lang}`;
  const nav = site.nav
    .map((n) => ({ n, p: site.pages.find((p) => p.id === n.page) }))
    .filter((x): x is { n: (typeof site.nav)[number]; p: Page } => !!x.p);
  // A nav item is active on its own page and on pages below it (case studies under Work).
  const active = (p: Page) => !!page && (p.id === page.id || (p.slug && current.startsWith(pagePath(p, lang) + "/")));

  return (
    <div className="site">
      {banner}
      {site.ticker.length > 0 && (
        <div className="ticker mono" aria-label="News">
          {site.ticker.map((item, i) => (
            <span key={i}>{t(item, lang)}</span>
          ))}
        </div>
      )}
      <header className="top">
        <a className="logo" href={href("/", lang)}>
          <Logo name={site.name} />
        </a>
        <nav className="nav" aria-label={site.name}>
          {nav.map(({ n, p }) => (
            <a key={n.page} href={pagePath(p, lang)} aria-current={active(p) ? "page" : undefined}>
              {t(n.label, lang)}
            </a>
          ))}
        </nav>
        <div className="sp" />
        <div className="langs" role="group" aria-label={ui.language}>
          {LANGS.map((l) => (
            <a key={l} href={page ? pagePath(page, l) : `/${l}`} aria-current={l === lang ? "true" : undefined} hrefLang={l} lang={l}>
              {l.toUpperCase()}
            </a>
          ))}
        </div>
        <button type="button" className="icon theme" onClick={toggleTheme} aria-label={ui.theme} title={ui.theme}>
          <Sun size={17} className="sun" aria-hidden />
          <Moon size={17} className="moon" aria-hidden />
        </button>
        <a className="btn hide-sm" href={contactUrl}>
          {ui.startProject}
        </a>
        <details className="burger">
          <summary className="icon" aria-label={ui.menu}>
            <Menu size={18} aria-hidden />
          </summary>
          <nav aria-label={ui.menu}>
            {nav.map(({ n, p }) => (
              <a key={n.page} href={pagePath(p, lang)}>
                {t(n.label, lang)}
              </a>
            ))}
            <a href={contactUrl}>{ui.startProject}</a>
          </nav>
        </details>
      </header>
      <main id="main">{children}</main>
      <footer className="foot">
        <div className="foot-top">
          <a className="logo" href={href("/", lang)}>
            <Logo name={site.name} />
          </a>
          <nav aria-label={`${site.name} footer`}>
            {nav.map(({ n, p }) => (
              <a key={n.page} href={pagePath(p, lang)}>
                {t(n.label, lang)}
              </a>
            ))}
            <a href={contactUrl}>{ui.startProject}</a>
          </nav>
        </div>
        <p className="small">{t(site.footer, lang)}</p>
        <p className="small links">
          <a href={REPO}>{ui.source}</a>
        </p>
      </footer>
      {!preview && (
        <a className="edit-fab" href={editUrl}>
          <Pencil size={16} aria-hidden /> {ui.editPage}
        </a>
      )}
    </div>
  );
}
