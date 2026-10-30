"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { imageUrl, SECTION_IDS, type Content, type SectionKey } from "@/lib/content";
import { saveSection, uploadImage } from "./actions";
import SignOutButton from "./SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";

const TABS: { key: SectionKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "skills", label: "Skills" },
  { key: "work", label: "Work" },
  { key: "experience", label: "Experience" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

const inputCls =
  "w-full rounded-md border border-primary/30 bg-backgroundcolor text-fortext px-3 py-2 outline-none focus:border-primary transition-colors";
const btnCls = "rounded-md border border-primary/30 px-3 py-1 text-sm hover:bg-primary hover:text-white transition-colors disabled:opacity-50";

type Status = { saving?: boolean; saved?: boolean; errors?: string[] };

export default function AdminTabs({ content: initial }: { content: Content }) {
  const [content, setContent] = useState(initial);
  const [tab, setTab] = useState<SectionKey>("home");
  const [status, setStatus] = useState<Status>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const patch = <K extends SectionKey>(key: K, data: Partial<Content[K]>) => {
    setContent((c) => ({ ...c, [key]: { ...c[key], ...data } }));
    setStatus({});
  };

  // Preview: push unsaved form values into the homepage iframe (see ClientWrapper).
  const send = useCallback(
    (scroll: boolean) =>
      iframeRef.current?.contentWindow?.postMessage(
        { type: "preview-content", content, scrollTo: scroll ? SECTION_IDS[tab] : undefined },
        location.origin,
      ),
    [content, tab],
  );
  useEffect(() => {
    send(false);
  }, [send]);
  useEffect(() => {
    send(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scroll only when the tab changes
  }, [tab]);
  useEffect(() => {
    const onReady = (e: MessageEvent) => {
      if (e.origin === location.origin && e.data?.type === "preview-ready") send(true);
    };
    addEventListener("message", onReady);
    return () => removeEventListener("message", onReady);
  }, [send]);

  async function save() {
    setStatus({ saving: true });
    try {
      const res = await saveSection(tab, content[tab]);
      setStatus(res.ok ? { saved: true } : { errors: res.errors });
    } catch (e) {
      setStatus({ errors: [e instanceof Error ? e.message : "Save failed"] });
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      <nav className="flex flex-wrap lg:flex-col lg:flex-nowrap items-center lg:items-stretch gap-2 border-b lg:border-b-0 lg:border-r border-primary/30 pb-2 lg:pb-0 lg:pr-4 lg:w-44 lg:shrink-0 lg:sticky lg:top-8 lg:self-start lg:h-[calc(100vh-4rem)]">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => {
              setTab(key);
              setStatus({});
            }}
            aria-current={tab === key ? "page" : undefined}
            className={`px-4 py-2 rounded-t-md lg:rounded-md text-left ${tab === key ? "bg-primary text-white" : "hover:bg-primary/20"}`}
          >
            {label}
          </button>
        ))}
        <div className="flex items-center gap-2 lg:mt-auto">
          <SignOutButton className="flex-1" />
          <ThemeToggle inline />
        </div>
      </nav>

      <div className={"flex-1 min-w-0 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"}>
        <div className="flex flex-col gap-4 max-w-3xl">
          <SectionForm tab={tab} content={content} patch={patch} />

          {status.errors && (
            <ul className="text-red-500 text-sm list-disc pl-5">
              {status.errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          <div className="flex items-center gap-3">
            <button onClick={save} disabled={status.saving} className={`${btnCls} px-6 py-2 text-base`}>
              {status.saving ? "Saving…" : "Save"}
            </button>
            {status.saved && <span className="text-sm text-green-500">Saved — live on the homepage.</span>}
          </div>
        </div>

        <PreviewPane iframeRef={iframeRef} />
      </div>
    </div>
  );
}

type Screen = { name: string; width: number; height: number };

const BUILT_IN: Screen[] = [
  { name: "Desktop", width: 1440, height: 900 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "Mobile", width: 390, height: 844 },
];
const CUSTOM = "__custom";
const MIN_SIZE = 240;
const MAX_SIZE = 3840;
// Per-browser UI preference, so localStorage is enough (single admin).
const STORE_KEY = "admin-preview-screens";

const clampSize = (n: number) => Math.min(MAX_SIZE, Math.max(MIN_SIZE, Math.round(n) || MIN_SIZE));

// Renders the homepage iframe at a real screen size (so its media queries match that device),
// then scales it down to fit the pane.
function PreviewPane({ iframeRef }: { iframeRef: React.RefObject<HTMLIFrameElement | null> }) {
  const [saved, setSaved] = useState<Screen[]>([]);
  const [selected, setSelected] = useState("Desktop");
  const [draft, setDraft] = useState<Screen>({ name: "", width: 1280, height: 800 });
  const [box, setBox] = useState({ width: 0, height: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  // Load saved screens + last selection after mount (localStorage isn't available during SSR).
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORE_KEY) ?? "{}");
      if (Array.isArray(stored.saved)) setSaved(stored.saved);
      if (typeof stored.selected === "string") setSelected(stored.selected);
    } catch {}
  }, []);

  // Written from event handlers only, so a mount can never overwrite stored sizes with defaults.
  function persist(nextSaved: Screen[], nextSelected: string) {
    setSaved(nextSaved);
    setSelected(nextSelected);
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ saved: nextSaved, selected: nextSelected }));
    } catch {}
  }

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setBox({ width: entry.contentRect.width, height: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isCustom = selected === CUSTOM;
  const screen = isCustom
    ? { ...draft, width: clampSize(draft.width), height: clampSize(draft.height) }
    : [...BUILT_IN, ...saved].find((d) => d.name === selected) ?? BUILT_IN[0];
  const { width, height } = screen;
  const scale = box.width ? Math.min(1, box.width / width, box.height / height) : 1;
  const isSaved = saved.some((d) => d.name === selected);

  const draftName = draft.name.trim();
  const nameError = !draftName
    ? "Give it a name"
    : BUILT_IN.some((d) => d.name.toLowerCase() === draftName.toLowerCase())
      ? "Name is taken by a built-in size"
      : "";

  function saveDraft() {
    if (nameError) return;
    const entry = { name: draftName, width, height };
    // Same name overwrites the existing saved size.
    persist([...saved.filter((d) => d.name !== draftName), entry], draftName);
  }

  return (
    <div className="lg:sticky lg:top-8 self-start flex flex-col gap-2 h-[calc(100vh-4rem)] min-h-[400px]">
      <div className="flex flex-wrap items-center gap-2">
        {BUILT_IN.map((d) => (
          <button
            key={d.name}
            type="button"
            onClick={() => persist(saved, d.name)}
            className={`${btnCls} ${selected === d.name ? "bg-primary text-white" : ""}`}
            aria-pressed={selected === d.name}
          >
            {d.name}
          </button>
        ))}
        <select
          value={isSaved || isCustom ? selected : ""}
          onChange={(e) => persist(saved, e.target.value)}
          aria-label="Custom screen size"
          className={`rounded-md border px-3 py-1 text-sm outline-none focus:border-primary [&>option]:bg-backgroundcolor [&>option]:text-fortext ${
            isSaved || isCustom ? "border-primary bg-primary text-white" : "border-primary/30 bg-backgroundcolor text-fortext"
          }`}
        >
          <option value="" disabled>
            Custom sizes…
          </option>
          {saved.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name} ({d.width}×{d.height})
            </option>
          ))}
          <option value={CUSTOM}>+ New custom size</option>
        </select>
        {isSaved && (
          <>
            <IconButton label={`Edit "${selected}"`} hoverCls="hover:bg-green-600 hover:border-green-600" onClick={() => { setDraft(screen); persist(saved, CUSTOM); }}>
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </IconButton>
            <IconButton label={`Delete "${selected}"`} hoverCls="hover:bg-red-600 hover:border-red-600" onClick={() => persist(saved.filter((d) => d.name !== selected), "Desktop")}>
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
            </IconButton>
          </>
        )}
        {/* Reloaded page posts "preview-ready", and AdminTabs re-sends the unsaved form values. */}
        <IconButton label="Reload preview" hoverCls="hover:bg-primary hover:border-primary" onClick={() => iframeRef.current?.contentWindow?.location.reload()}>
          <path d="M21 12a9 9 0 1 1-2.64-6.36L21 8" />
          <path d="M21 3v5h-5" />
        </IconButton>
        <span className="ml-auto text-xs opacity-70">
          {width}×{height} · {Math.round(scale * 100)}%
        </span>
      </div>

      {isCustom && (
        <form
          className="flex flex-wrap items-end gap-2 text-sm"
          onSubmit={(e) => {
            e.preventDefault();
            saveDraft();
          }}
        >
          <label className="flex flex-col gap-1">
            Name
            <input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="e.g. iPad Pro"
              className={`${inputCls} py-1 w-40`}
            />
          </label>
          <label className="flex flex-col gap-1">
            Width
            <input
              type="number"
              min={MIN_SIZE}
              max={MAX_SIZE}
              value={draft.width || ""}
              onChange={(e) => setDraft({ ...draft, width: e.target.valueAsNumber })}
              onBlur={() => setDraft({ ...draft, width: clampSize(draft.width) })}
              className={`${inputCls} py-1 w-24`}
            />
          </label>
          <label className="flex flex-col gap-1">
            Height
            <input
              type="number"
              min={MIN_SIZE}
              max={MAX_SIZE}
              value={draft.height || ""}
              onChange={(e) => setDraft({ ...draft, height: e.target.valueAsNumber })}
              onBlur={() => setDraft({ ...draft, height: clampSize(draft.height) })}
              className={`${inputCls} py-1 w-24`}
            />
          </label>
          <button type="submit" className={`${btnCls} py-2`} disabled={!!nameError}>
            Save size
          </button>
          {draftName && nameError && <span className="text-red-500 text-xs">{nameError}</span>}
        </form>
      )}

      <div ref={boxRef} className="flex-1 min-h-0 flex justify-center overflow-hidden">
        <div style={{ width: width * scale, height: height * scale }}>
          <iframe
            ref={iframeRef}
            src="/?preview=1"
            title="Section preview"
            style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}
            className="rounded-lg border border-primary/30 bg-backgroundcolor"
          />
        </div>
      </div>
    </div>
  );
}

// Icon-only button with a hover/focus tooltip; `label` doubles as the accessible name.
function IconButton({ label, onClick, hoverCls, children }: { label: string; onClick: () => void; hoverCls: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`relative group rounded-md border border-primary/30 p-1.5 hover:text-white transition-colors ${hoverCls}`}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {children}
      </svg>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1 z-10 whitespace-nowrap rounded bg-fortext text-backgroundcolor text-xs px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
      >
        {label}
      </span>
    </button>
  );
}

type Patch = <K extends SectionKey>(key: K, data: Partial<Content[K]>) => void;

function SectionForm({ tab, content, patch }: { tab: SectionKey; content: Content; patch: Patch }) {
  switch (tab) {
    case "home": {
      const c = content.home;
      return (
        <>
          <Field label="Intro text before highlight" value={c.introPrefix} onChange={(v) => patch("home", { introPrefix: v })} />
          <Field label="Highlighted text" value={c.highlight} onChange={(v) => patch("home", { highlight: v })} />
          <Field label="Intro text after highlight" value={c.introSuffix} onChange={(v) => patch("home", { introSuffix: v })} />
          <Field label="Resume URL / path" value={c.resumeUrl} onChange={(v) => patch("home", { resumeUrl: v })} />
          <ImageField label="Hero image" value={c.imageKey} fallback="/image/image.webp" onChange={(k) => patch("home", { imageKey: k })} />
        </>
      );
    }
    case "skills": {
      const c = content.skills;
      return (
        <>
          <Check label="Show section" checked={c.visible} onChange={(v) => patch("skills", { visible: v })} />
          <Field label="Heading" value={c.heading} onChange={(v) => patch("skills", { heading: v })} />
          <ListEditor
            label="Skill groups"
            items={c.groups}
            onChange={(groups) => patch("skills", { groups })}
            newItem={() => ({ title: "New group", visible: true, items: [] })}
            render={(g, set) => (
              <>
                <Check label="Show" checked={g.visible} onChange={(v) => set({ visible: v })} />
                <Field label="Title" value={g.title} onChange={(v) => set({ title: v })} />
                <TagInput label="Skills" value={g.items} onChange={(items) => set({ items })} />
              </>
            )}
          />
        </>
      );
    }
    case "work": {
      const c = content.work;
      return (
        <>
          <Check label="Show section" checked={c.visible} onChange={(v) => patch("work", { visible: v })} />
          <Field label="Heading" value={c.heading} onChange={(v) => patch("work", { heading: v })} />
          <ListEditor
            label="Projects"
            items={c.projects}
            onChange={(projects) => patch("work", { projects })}
            newItem={() => ({ title: "New project", description: "", tech: [], githubUrl: "", liveUrl: "", visible: true })}
            render={(p, set) => (
              <>
                <Check label="Show" checked={p.visible} onChange={(v) => set({ visible: v })} />
                <Field label="Title" value={p.title} onChange={(v) => set({ title: v })} />
                <Field label="Description" textarea value={p.description} onChange={(v) => set({ description: v })} />
                <TagInput label="Tech stack" value={p.tech} onChange={(tech) => set({ tech })} />
                <Field label="GitHub URL" value={p.githubUrl} onChange={(v) => set({ githubUrl: v })} />
                <Field label="Live URL" value={p.liveUrl} onChange={(v) => set({ liveUrl: v })} />
                <ImageField label="Image (optional)" value={p.imageKey} onChange={(k) => set({ imageKey: k })} />
              </>
            )}
          />
        </>
      );
    }
    case "experience": {
      const c = content.experience;
      return (
        <>
          <Check label="Show section" checked={c.visible} onChange={(v) => patch("experience", { visible: v })} />
          <Field label="Heading" value={c.heading} onChange={(v) => patch("experience", { heading: v })} />
          <ListEditor
            label="Positions"
            items={c.items}
            onChange={(items) => patch("experience", { items })}
            newItem={() => ({ role: "", company: "", start: "", end: "", description: "", visible: true })}
            render={(e, set) => (
              <>
                <Check label="Show" checked={e.visible} onChange={(v) => set({ visible: v })} />
                <Field label="Role" value={e.role} onChange={(v) => set({ role: v })} />
                <Field label="Company" value={e.company} onChange={(v) => set({ company: v })} />
                <Field label="Start (e.g. Jan 2025)" value={e.start} onChange={(v) => set({ start: v })} />
                <Field label="End (blank = Present)" value={e.end} onChange={(v) => set({ end: v })} />
                <Field label="Description" textarea value={e.description} onChange={(v) => set({ description: v })} />
              </>
            )}
          />
        </>
      );
    }
    case "about": {
      const c = content.about;
      return (
        <>
          <Check label="Show section" checked={c.visible} onChange={(v) => patch("about", { visible: v })} />
          <Field label="Heading" value={c.heading} onChange={(v) => patch("about", { heading: v })} />
          <ListEditor
            label="Paragraphs"
            items={c.paragraphs}
            onChange={(paragraphs) => patch("about", { paragraphs })}
            newItem={() => ""}
            render={(p, _set, replace) => <Field label="Text" textarea value={p} onChange={replace} />}
          />
          <Field label="Button label" value={c.ctaLabel} onChange={(v) => patch("about", { ctaLabel: v })} />
          <Field label="Button email" value={c.email} onChange={(v) => patch("about", { email: v })} />
        </>
      );
    }
    case "contact": {
      const c = content.contact;
      return (
        <>
          <Check label="Show section" checked={c.visible} onChange={(v) => patch("contact", { visible: v })} />
          <Field label="Heading" value={c.heading} onChange={(v) => patch("contact", { heading: v })} />
          <Field label="Email" value={c.email} onChange={(v) => patch("contact", { email: v })} />
          <Field label="Button label" value={c.buttonLabel} onChange={(v) => patch("contact", { buttonLabel: v })} />
        </>
      );
    }
  }
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      {textarea ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
      )}
    </label>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

// Comma-separated list, committed on blur. Keyed by value so it resyncs after reorder/external changes.
function TagInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label} (comma-separated)
      <input
        key={value.join("\u0000")}
        defaultValue={value.join(", ")}
        onBlur={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        className={inputCls}
      />
    </label>
  );
}

function ListEditor<T>({
  label,
  items,
  onChange,
  newItem,
  render,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  render: (item: T, set: (p: Partial<T>) => void, replace: (v: T) => void) => React.ReactNode;
}) {
  const replaceAt = (i: number, v: T) => onChange(items.map((x, j) => (j === i ? v : x)));
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-semibold mb-2">{label}</legend>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-lg border border-primary/30 p-4">
          <div className="flex gap-2 justify-end">
            <button type="button" className={btnCls} disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
            <button type="button" className={btnCls} disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
            <button type="button" className={btnCls} onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Remove">✕</button>
          </div>
          {render(item, (p) => replaceAt(i, { ...item, ...p }), (v) => replaceAt(i, v))}
        </div>
      ))}
      <button type="button" className={`${btnCls} self-start`} onClick={() => onChange([...items, newItem()])}>
        + Add
      </button>
    </fieldset>
  );
}

function ImageField({
  label,
  value,
  fallback,
  onChange,
}: {
  label: string;
  value?: string;
  fallback?: string;
  onChange: (key: string | undefined) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const src = value ? imageUrl(value) : fallback;

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadImage(fd);
      if ("key" in res) onChange(res.key);
      else setError(res.error);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      {label}
      {src && <img src={src} alt="" className="max-h-40 w-fit rounded-md border border-primary/30" />}
      <div className="flex items-center gap-2">
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        {value && (
          <button type="button" className={btnCls} onClick={() => onChange(undefined)}>
            Remove
          </button>
        )}
        {busy && <span>Uploading…</span>}
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
