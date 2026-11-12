// Fixed interface text for the public site (page content lives in site.json).
import type { Lang } from "../content/schema.ts";

const en = {
  startProject: "Start a project",
  editPage: "Edit this page",
  source: "Source code",
  theme: "Switch light and dark",
  language: "Language",
  menu: "Menu",
  readMore: "Read",
  noPages: "Nothing here yet.",
  draftBanner: "You are seeing your local edits from the editor.",
  draftOpen: "Open editor",
  draftDiscard: "Show the published site",
  draftHidden: "You are seeing the published site. Your local edits are kept.",
  draftShow: "Show my edits",
  notFoundTitle: "Page not found",
  notFoundBody: "There is no page at this address.",
  home: "Home",
  formName: "Name",
  formEmail: "Work email",
  formCompany: "Company",
  formMessage: "What happens today, and what goes wrong?",
  formSend: "Send",
  formSent: "Thank you. This is a demo site, so the message was not sent anywhere.",
  formInvalid: "Please fill in your name, a valid email and a message.",
  emailLabel: "Email",
  phoneLabel: "Phone",
  addressLabel: "Studio",
};

const de: typeof en = {
  startProject: "Projekt anfragen",
  editPage: "Diese Seite bearbeiten",
  source: "Quellcode",
  theme: "Hell und dunkel wechseln",
  language: "Sprache",
  menu: "Menü",
  readMore: "Lesen",
  noPages: "Hier gibt es noch nichts.",
  draftBanner: "Sie sehen Ihre lokalen Änderungen aus dem Editor.",
  draftOpen: "Editor öffnen",
  draftDiscard: "Veröffentlichte Seite zeigen",
  draftHidden: "Sie sehen die veröffentlichte Seite. Ihre lokalen Änderungen bleiben erhalten.",
  draftShow: "Meine Änderungen zeigen",
  notFoundTitle: "Seite nicht gefunden",
  notFoundBody: "Unter dieser Adresse gibt es keine Seite.",
  home: "Startseite",
  formName: "Name",
  formEmail: "Geschäftliche E-Mail",
  formCompany: "Unternehmen",
  formMessage: "Was passiert heute, und was geht dabei schief?",
  formSend: "Senden",
  formSent: "Danke. Dies ist eine Demo-Website, die Nachricht wurde also nirgendwohin gesendet.",
  formInvalid: "Bitte geben Sie Ihren Namen, eine gültige E-Mail und eine Nachricht an.",
  emailLabel: "E-Mail",
  phoneLabel: "Telefon",
  addressLabel: "Studio",
};

export type UI = typeof en;
export const UI_TEXT: Record<Lang, UI> = { en, de };

export const REPO = "https://github.com/tahamukhtar20/northfold";

/** Turn a content link target into a URL in the current language. */
export function href(target: string, lang: Lang): string {
  if (/^(https?:|mailto:)/.test(target)) return target;
  const path = target.replace(/^\/+/, "");
  return path ? `/${lang}/${path}` : `/${lang}`;
}

export function formatDate(iso: string | undefined, lang: Lang): string {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
