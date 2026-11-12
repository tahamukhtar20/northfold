// One component per block type. The public site, the prerenderer and the editor
// preview all render pages through <PageBlocks>, so they cannot drift apart.
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { t } from "../content/schema.ts";
import type { Block, Lang, Link, Page, Site, Text } from "../content/schema.ts";
import { HeroVisual } from "./HeroVisual.tsx";
import { UI_TEXT, formatDate, href } from "./ui.ts";

type Ctx = { lang: Lang; site: Site; page: Page };
type Item = Record<string, unknown>;
const tx = (v: unknown, lang: Lang) => t(v as Text | undefined, lang);
const list = (v: unknown) => (Array.isArray(v) ? (v as Item[]) : []);

function Btn({ link, lang, primary }: { link: Link | undefined; lang: Lang; primary?: boolean }) {
  const label = tx(link?.label, lang);
  if (!link || !label) return null;
  return (
    <a className={primary ? "btn" : "btn line"} href={href(link.href, lang)}>
      {label}
    </a>
  );
}

/** Paragraphs separated by blank lines; consecutive "- " lines become a list. */
export function Prose({ text }: { text: string }) {
  const out: ReactNode[] = [];
  text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .forEach((chunk, i) => {
      const lines = chunk.split("\n");
      if (lines.every((l) => l.trim().startsWith("- ")))
        out.push(
          <ul key={i}>
            {lines.map((l, j) => (
              <li key={j}>{l.trim().slice(2)}</li>
            ))}
          </ul>,
        );
      else out.push(<p key={i}>{chunk}</p>);
    });
  return <>{out}</>;
}

function Head({ heading, intro, lang }: { heading: unknown; intro: unknown; lang: Lang }) {
  const h = tx(heading, lang), i = tx(intro, lang);
  if (!h && !i) return null;
  return (
    <div className="sec-head" data-reveal>
      {h && <h2>{h}</h2>}
      {i && <p className="sub">{i}</p>}
    </div>
  );
}

function Hero({ d, lang, page }: { d: Item; lang: Lang; page: Page }) {
  const buttons = list(d.buttons);
  const dated = page.kind !== "page" && page.date;
  const visual = d.visual === "network";
  return (
    <section className={`hero${visual ? " with-visual" : ""}`}>
      <div className="hero-copy">
        {dated && (
          <p className="meta mono" data-reveal>
            {formatDate(page.date, lang)}
          </p>
        )}
        <h1 data-reveal>{tx(d.heading, lang)}</h1>
        {tx(d.intro, lang) && (
          <p className="lead" data-reveal style={{ ["--i" as string]: 1 }}>
            {tx(d.intro, lang)}
          </p>
        )}
        {buttons.length > 0 && (
          <div className="actions" data-reveal style={{ ["--i" as string]: 2 }}>
            {buttons.map((b, i) => (
              <Btn key={i} link={b.link as Link} lang={lang} primary={i === 0} />
            ))}
          </div>
        )}
      </div>
      {visual && (
        <div className="hero-visual" data-reveal style={{ ["--i" as string]: 2 }}>
          <HeroVisual lang={lang} />
        </div>
      )}
    </section>
  );
}

function Stats({ d, lang }: { d: Item; lang: Lang }) {
  const items = list(d.items);
  return (
    <section className="sec stats" style={{ ["--n" as string]: items.length }}>
      {items.map((it, i) => (
        <div key={i} data-reveal style={{ ["--i" as string]: i }}>
          <b data-count={String(it.value ?? "")}>{String(it.value ?? "")}</b>
          <span>{tx(it.label, lang)}</span>
        </div>
      ))}
    </section>
  );
}

function Cards({ d, lang }: { d: Item; lang: Lang }) {
  return (
    <section className="sec">
      <Head heading={d.heading} intro={d.intro} lang={lang} />
      <div className="cards">
        {list(d.items).map((it, i) => (
          <article className="card spot" key={i} data-reveal style={{ ["--i" as string]: i }}>
            {tx(it.kicker, lang) && <span className="kicker mono">{tx(it.kicker, lang)}</span>}
            <h3>{tx(it.title, lang)}</h3>
            {tx(it.text, lang) && <p>{tx(it.text, lang)}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function TextBlock({ d, lang }: { d: Item; lang: Lang }) {
  return (
    <section className="sec text">
      {tx(d.heading, lang) && <h2 data-reveal>{tx(d.heading, lang)}</h2>}
      <div className="prose" data-reveal style={{ ["--i" as string]: 1 }}>
        <Prose text={tx(d.body, lang)} />
      </div>
    </section>
  );
}

function Steps({ d, lang }: { d: Item; lang: Lang }) {
  return (
    <section className="sec">
      <Head heading={d.heading} intro={d.intro} lang={lang} />
      <ol className="steps">
        {list(d.items).map((it, i) => (
          <li key={i} data-reveal style={{ ["--i" as string]: i }}>
            <span className="n mono">{String(i + 1).padStart(2, "0")}</span>
            {tx(it.when, lang) && <span className="when mono">{tx(it.when, lang)}</span>}
            <h3>{tx(it.title, lang)}</h3>
            {tx(it.text, lang) && <p>{tx(it.text, lang)}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Quote({ d, lang }: { d: Item; lang: Lang }) {
  return (
    <section className="sec">
      <figure className="quote" data-reveal>
        <blockquote>{tx(d.text, lang)}</blockquote>
        <figcaption>
          <b>{String(d.name ?? "")}</b>
          {tx(d.role, lang) && <span>{tx(d.role, lang)}</span>}
        </figcaption>
      </figure>
    </section>
  );
}

function PageList({ d, ctx }: { d: Item; ctx: Ctx }) {
  const { lang, site } = ctx;
  const kind = d.kind === "post" ? "post" : "case";
  const pages = site.pages.filter((p) => p.kind === kind).sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  const shown = d.limit === "all" ? pages : pages.slice(0, Number(d.limit) || 3);
  const ui = UI_TEXT[lang];
  const base = kind === "case" ? "work" : "journal";
  return (
    <section className="sec">
      <Head heading={d.heading} intro={d.intro} lang={lang} />
      {shown.length === 0 ? (
        <p className="sub">{ui.noPages}</p>
      ) : (
        <div className={kind === "case" ? "cards list" : "posts"}>
          {shown.map((p) => (
            <a className={kind === "case" ? "card link spot" : "post"} key={p.id} href={href(`/${base}/${p.slug}`, lang)} data-reveal style={{ ["--i" as string]: shown.indexOf(p) }}>
              <span className="kicker mono">{formatDate(p.date, lang)}</span>
              <h3>{t(p.title, lang)}</h3>
              <p>{t(p.summary, lang)}</p>
              <span className="more">
                {ui.readMore} <ArrowRight size={15} aria-hidden />
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function Facts({ d, lang }: { d: Item; lang: Lang }) {
  return (
    <section className="sec">
      <dl className="facts" data-reveal>
        {list(d.items).map((it, i) => (
          <div key={i}>
            <dt>{tx(it.label, lang)}</dt>
            <dd>{tx(it.value, lang)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Cta({ d, lang }: { d: Item; lang: Lang }) {
  return (
    <section className="sec cta">
      <div className="cta-inner" data-reveal>
        <div>
        <h2>{tx(d.heading, lang)}</h2>
          {tx(d.intro, lang) && <p>{tx(d.intro, lang)}</p>}
        </div>
        <Btn link={d.button as Link} lang={lang} primary />
      </div>
    </section>
  );
}

function Contact({ d, lang }: { d: Item; lang: Lang }) {
  const ui = UI_TEXT[lang];
  const [state, setState] = useState<"idle" | "sent" | "invalid">("idle");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ok = String(f.get("name") ?? "").trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(f.get("email") ?? "")) && String(f.get("message") ?? "").trim();
    setState(ok ? "sent" : "invalid");
    if (ok) e.currentTarget.reset();
  };
  const email = String(d.email ?? ""), phone = String(d.phone ?? "");
  return (
    <section className="hero contact">
      <div>
        <h1>{tx(d.heading, lang)}</h1>
        {tx(d.intro, lang) && <p className="lead">{tx(d.intro, lang)}</p>}
        <ul className="details">
          {email && (
            <li>
              <Mail size={17} aria-hidden /> <span className="sr">{ui.emailLabel}: </span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          )}
          {phone && (
            <li>
              <Phone size={17} aria-hidden /> <span className="sr">{ui.phoneLabel}: </span>
              {phone}
            </li>
          )}
          {tx(d.address, lang) && (
            <li>
              <MapPin size={17} aria-hidden /> <span className="sr">{ui.addressLabel}: </span>
              <span className="pre">{tx(d.address, lang)}</span>
            </li>
          )}
        </ul>
      </div>
      <form className="form" onSubmit={submit} noValidate>
        <label>
          {ui.formName}
          <input name="name" autoComplete="name" />
        </label>
        <label>
          {ui.formEmail}
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          {ui.formCompany}
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          {ui.formMessage}
          <textarea name="message" rows={5} />
        </label>
        <button className="btn" type="submit">
          {ui.formSend}
        </button>
        {state !== "idle" && (
          <p className={state === "sent" ? "ok" : "bad"} role="status">
            {state === "sent" ? ui.formSent : ui.formInvalid}
          </p>
        )}
      </form>
    </section>
  );
}

export function BlockView({ block, ctx }: { block: Block; ctx: Ctx }) {
  const d = block.data, { lang, page } = ctx;
  switch (block.type) {
    case "hero":
      return <Hero d={d} lang={lang} page={page} />;
    case "stats":
      return <Stats d={d} lang={lang} />;
    case "cards":
      return <Cards d={d} lang={lang} />;
    case "text":
      return <TextBlock d={d} lang={lang} />;
    case "steps":
      return <Steps d={d} lang={lang} />;
    case "quote":
      return <Quote d={d} lang={lang} />;
    case "pageList":
      return <PageList d={d} ctx={ctx} />;
    case "facts":
      return <Facts d={d} lang={lang} />;
    case "cta":
      return <Cta d={d} lang={lang} />;
    case "contact":
      return <Contact d={d} lang={lang} />;
    default:
      return null;
  }
}

type Props = Ctx & {
  /** Editor preview: blocks become selectable. */
  selected?: string | null;
  onSelect?: (id: string) => void;
};

export function PageBlocks({ site, page, lang, selected, onSelect }: Props) {
  const ctx = { site, page, lang };
  if (!onSelect) return <>{page.blocks.map((b) => <BlockView key={b.id} block={b} ctx={ctx} />)}</>;
  return (
    <>
      {page.blocks.map((b) => (
        <div
          key={b.id}
          className={`pick${b.id === selected ? " on" : ""}`}
          data-type={b.type}
          data-id={b.id}
          onClickCapture={(e) => {
            e.preventDefault();
            onSelect(b.id);
          }}
        >
          <BlockView block={b} ctx={ctx} />
        </div>
      ))}
    </>
  );
}
