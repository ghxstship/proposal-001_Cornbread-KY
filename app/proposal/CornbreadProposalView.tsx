"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CBH_DOC,
  CBH_PRICING_GROUPS,
  CBH_ABBEY_COMPOSITION,
  CBH_ABBEY_TOTALS,
  CBH_SITES,
  CBH_CALENDAR_TOTALS,
  CBH_TAXONOMY,
  CBH_LIFECYCLE,
  CBH_PHASE_DEADLINES,
  CBH_WORKBACK,
  CBH_EXCLUSIONS,
  CBH_TERMS,
  CBH_CHANGE_ORDERS,
  basisLabel,
  fmtMoney,
  pricingLineByNum,
} from "./data";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "pricing", label: "Pricing" },
  { id: "scope", label: "Scope" },
  { id: "sites", label: "Calendar" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "investment", label: "Investment" },
  { id: "sign", label: "Sign" },
];

export function CornbreadProposalView() {
  return (
    <div className="cbh-doc">
      <CBHNav />
      <Hero />
      <ProjectOverview />
      <PricingModel />
      <ScopeOfWork />
      <ActivationSites />
      <LifecycleAndWorkback />
      <InvestmentSummary />
      <PaymentMethod />
      <ChangeOrders />
      <Exclusions />
      <Terms />
      <Authorization />
      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Sticky Nav with active-section highlight
// ─────────────────────────────────────────────────────────────────────────
function CBHNav() {
  const [active, setActive] = useState<string>("overview");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(s.id);
          });
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="cbh-nav print-hide">
      <div className="cbh-nav-inner">
        <span className="cbh-nav-brand" aria-label="AGV Miami x Cornbread Hemp">
          AGV Miami <span className="cbh-x">×</span>{" "}
          <span className="cbh-wordmark">CORNBREAD</span>
        </span>
        <div className="cbh-nav-links" aria-label="Section navigation">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="overview" className="cbh-hero">
      <div className="cbh-hero-inner">
        <span className="cbh-eyebrow">
          <span className="cbh-flame" aria-hidden="true" />
          {CBH_DOC.programWindow}
        </span>
        <h1 className="cbh-western">
          Abbey Road
          <span className="cbh-on">on the River</span>
          <span className="cbh-line2">— and the Calendar Behind It</span>
        </h1>
        <p className="cbh-sub" style={{ marginTop: 28 }}>
          A modular deployment program for the Cornbread Hemp activation — pickup
          in Louisville, install at RiverStage, long-haul return to AGV Miami for
          storage, redeploy to the next event on the calendar. Pricing is
          composed line-by-line: per-activation, per-month, one-time upgrades,
          optional add-ons.
        </p>
        <dl className="cbh-hero-meta">
          <Meta label="Client" value={CBH_DOC.client} />
          <Meta label="Producer" value={CBH_DOC.producerLong} />
          <Meta label="Anchor Venue" value={CBH_DOC.venue} />
          <Meta label="Document" value={`${CBH_DOC.docNumber} · ${CBH_DOC.version}`} />
        </dl>
        <div className="cbh-confidential">
          Confidential · Prepared for {CBH_DOC.contactClient} at {CBH_DOC.client} · {CBH_DOC.validity}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Section heading helper
// ─────────────────────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  accent,
  sub,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
}) {
  return (
    <>
      <div className="cbh-section-eyebrow">
        <span />
        <span>{eyebrow}</span>
      </div>
      <h2 className="cbh-h2">
        {title}
        {accent && (
          <>
            {" "}
            <span className="cbh-h2-accent">{accent}</span>
          </>
        )}
      </h2>
      {sub && <p className="cbh-sub">{sub}</p>}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Project Overview — engagement summary cards
// ─────────────────────────────────────────────────────────────────────────
function ProjectOverview() {
  return (
    <section className="cbh-section">
      <SectionHeader
        eyebrow="Project Overview"
        title="Modular Deployment."
        accent="Built Around Your Calendar."
        sub="Three engagement vectors, designed to compound. Per-activation costs move with each event. Storage runs monthly between deployments. Upgrades land once and amortize across the calendar. Optional add-ons stack on any event when the moment calls for it."
      />
      <div className="cbh-grid-3" style={{ marginTop: 24 }}>
        <div className="cbh-card">
          <span className="cbh-card-accent" />
          <div className="cbh-eyebrow">Per Activation</div>
          <h3 style={{ fontSize: 22, marginTop: 8 }}>Three Lines</h3>
          <dl style={{ marginTop: 12 }}>
            <Detail label="Logistics" value={fmtMoney(4500)} />
            <Detail label="Local Hires" value={fmtMoney(1800)} />
            <Detail label="Travel & Lodging" value={fmtMoney(2500)} />
            <Detail label="Per Event" value={`${fmtMoney(8800)} · out-of-market`} />
          </dl>
        </div>
        <div className="cbh-card">
          <span className="cbh-card-accent" style={{ background: "var(--cbh-cedar)" }} />
          <div className="cbh-eyebrow" style={{ color: "var(--cbh-cedar-deep)" }}>
            Storage
          </div>
          <h3 style={{ fontSize: 22, marginTop: 8 }}>Per Month</h3>
          <dl style={{ marginTop: 12 }}>
            <Detail label="Monthly Hold" value={`${fmtMoney(1500)} / mo`} />
            <Detail label="Locations" value="NYC or Miami" />
            <Detail label="Mobilization" value="48 hours" />
            <Detail label="First Month" value="Bundled in build invoice" />
          </dl>
        </div>
        <div className="cbh-card">
          <span className="cbh-card-accent" style={{ background: "var(--cbh-cannabis)" }} />
          <div className="cbh-eyebrow" style={{ color: "var(--cbh-cannabis)" }}>
            Upgrades & Add-Ons
          </div>
          <h3 style={{ fontSize: 22, marginTop: 8 }}>One-Time + On Request</h3>
          <dl style={{ marginTop: 12 }}>
            <Detail label="Plants" value={`${fmtMoney(1200)} / instance`} />
            <Detail label="Lighting" value={`${fmtMoney(4500)} one-time`} />
            <Detail label="Refresh" value={`from ${fmtMoney(2500)}`} />
            <Detail label="Rebrand" value={`from ${fmtMoney(7500)}`} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="cbh-detail">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Pricing Model — modular per-activation / per-month / upgrades / add-ons
// ─────────────────────────────────────────────────────────────────────────
function PricingModel() {
  return (
    <section id="pricing" className="cbh-section">
      <SectionHeader
        eyebrow="Modular Pricing"
        title="Compose The Engagement."
        accent="Line By Line."
        sub="Every line carries a published rate and a clear basis. For each event we apply only the lines that fit the engagement — nothing bundled, nothing assumed. Same rate card across the 2026 calendar."
      />
      <div className="cbh-pricing-grid" style={{ marginTop: 28 }}>
        {CBH_PRICING_GROUPS.map((group) => (
          <article key={group.id} className="cbh-pricing-card" data-group={group.id}>
            <header className="cbh-pricing-head">
              <span className="cbh-pricing-num">{group.num}</span>
              <div>
                <div className="cbh-pricing-title">{group.title}</div>
                <div className="cbh-pricing-pitch">{group.pitch}</div>
              </div>
            </header>
            <p className="cbh-pricing-fitfor">{group.fitFor}</p>
            <ul className="cbh-pricing-lines">
              {group.lines.map((line) => (
                <li key={line.num} className="cbh-pricing-line">
                  <span className="cbh-rule" />
                  <div>
                    <div className="cbh-name">{line.name}</div>
                    <div className="cbh-desc">{line.description}</div>
                  </div>
                  <div>
                    <span className="cbh-pricing-line-amount">
                      {line.startingAt ? "from " : ""}
                      {fmtMoney(line.price)}
                    </span>
                    <span className="cbh-pricing-line-basis">{basisLabel(line)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Scope of Work — Components × Services taxonomy
// ─────────────────────────────────────────────────────────────────────────
function ScopeOfWork() {
  const components = CBH_TAXONOMY.filter((n) => n.kind === "Components");
  const services = CBH_TAXONOMY.filter((n) => n.kind === "Services");

  return (
    <section id="scope" className="cbh-section">
      <SectionHeader
        eyebrow="Scope of Work"
        title="What's Touched."
        accent="What's Carried."
        sub="Nine scope nodes — four Components, five Services. The Components are the elements that travel with the asset; the Services are the work AGV Miami performs to move them. Each event applies the same nodes at the same standard."
      />
      <div className="cbh-grid-2" style={{ marginTop: 24 }}>
        <ScopeColumn title="Components" nodes={components} />
        <ScopeColumn title="Services" nodes={services} />
      </div>
    </section>
  );
}

function ScopeColumn({
  title,
  nodes,
}: {
  title: string;
  nodes: typeof CBH_TAXONOMY;
}) {
  return (
    <div>
      <div className="cbh-eyebrow" style={{ marginBottom: 12 }}>
        {title}
      </div>
      {nodes.map((n) => (
        <details key={n.id} className="cbh-card" style={{ marginBottom: 10, padding: "16px 20px" }}>
          <summary>
            <span className="cbh-tax-num">{n.num}</span>
            <span style={{ flex: 1 }}>
              <span className="cbh-tax-name">{n.name}</span>
              <span className="cbh-tax-sub">{n.sub}</span>
            </span>
            <span aria-hidden="true" className="cbh-mono" style={{ color: "var(--cbh-muted)" }}>
              +
            </span>
          </summary>
          <p className="cbh-tax-narrative">{n.narrative}</p>
        </details>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Activation Sites — 2026 calendar
// ─────────────────────────────────────────────────────────────────────────
function ActivationSites() {
  return (
    <section id="sites" className="cbh-section">
      <SectionHeader
        eyebrow="2026 Activation Calendar"
        title="Four Events."
        accent="Same Rate Card."
        sub="The calendar AGV Miami runs the asset through in 2026. Each event applies the same per-activation rate card; logistics scales with one-way distance from the AGV Miami warehouse. Storage continues monthly between events."
      />
      <div className="cbh-grid-3" style={{ marginTop: 24 }}>
        {CBH_SITES.map((site) => (
          <article key={site.id} className="cbh-site-card" data-status={site.status}>
            <div className="cbh-site-tag">
              Event · {site.tag}
              <span className="cbh-site-status">{site.status}</span>
            </div>
            <div className="cbh-site-name">{site.name}</div>
            <div className="cbh-site-meta">
              <span>{site.dates}</span>
              <span>·</span>
              <span>{site.city}</span>
              <span>·</span>
              <span>
                {site.oneWayMiles.toLocaleString()} mi · {site.market === "local" ? "local" : "out-of-market"}
              </span>
            </div>
            <p className="cbh-site-body">{site.body}</p>
            <div className="cbh-site-foot">
              <span className="cbh-site-amount">{fmtMoney(site.perEvent + site.plants)}</span>
              <span className="cbh-mono" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cbh-muted)", fontWeight: 700 }}>
                + plants
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Lifecycle + Workback
// ─────────────────────────────────────────────────────────────────────────
function LifecycleAndWorkback() {
  return (
    <>
      <ProductionLifecycle />
      <WorkbackSchedule />
    </>
  );
}

function ProductionLifecycle() {
  return (
    <section id="lifecycle" className="cbh-section">
      <SectionHeader
        eyebrow="Production Lifecycle"
        title="Five Phases."
        accent="Each One Ends In A Sign-Off."
        sub="From brief intake through warehouse intake. Cornbread is execution-only — the lifecycle is logistics-led, with milestone gates between every phase. The same five phases run on every event in the 2026 calendar."
      />
      <div style={{ marginTop: 20 }}>
        {CBH_LIFECYCLE.map((p) => (
          <div key={p.id} className="cbh-phase">
            <div className="cbh-phase-head">
              <span className="cbh-phase-num">{p.num}</span>
              <span className="cbh-phase-name">{p.name}</span>
              <span className="cbh-phase-deadline">{CBH_PHASE_DEADLINES[p.id]}</span>
            </div>
            <p className="cbh-phase-intent">{p.intent}</p>
            <div className="cbh-phase-grid">
              <div>
                <h4>Milestones</h4>
                <ul>
                  {p.milestones.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Deliverables</h4>
                <ul>
                  {p.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Approval Gate</h4>
                <p style={{ fontSize: 12.5, color: "var(--cbh-muted)", margin: 0, lineHeight: 1.55 }}>
                  {p.gate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkbackSchedule() {
  return (
    <section className="cbh-section">
      <SectionHeader
        eyebrow="Workback Schedule · Abbey Road"
        title="Calibrated."
        accent="Against Activation Date."
        sub="Every milestone counts back from the May 21 activation date. Truck departs Miami May 18; build complete and walk-through signed by end of day May 19; activation lit and VIP-ready by sunset Wednesday, May 20."
      />
      <div className="cbh-investment" style={{ marginTop: 20 }}>
        <table>
          <thead>
            <tr>
              <th>Phase</th>
              <th>Milestone</th>
              <th className="right">Date</th>
            </tr>
          </thead>
          <tbody>
            {CBH_WORKBACK.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, fontSize: 13 }}>{r.phase}</td>
                <td style={{ fontSize: 13, color: "var(--cbh-muted)" }}>{r.milestone}</td>
                <td className="right" style={{ fontSize: 12 }}>
                  {r.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Investment Summary — Abbey Road applied composition + 2026 calendar projection
// ─────────────────────────────────────────────────────────────────────────
function InvestmentSummary() {
  return (
    <section id="investment" className="cbh-section">
      <SectionHeader
        eyebrow="Investment Summary"
        title="Abbey Road Applied."
        accent="Plus The Calendar."
        sub="The Abbey Road engagement composed line by line, plus the 2026 calendar projection at the same rate card. Storage runs monthly between deployments at the published rate."
      />
      <div className="cbh-investment" style={{ marginTop: 20 }}>
        <table>
          <tbody>
            <tr className="cbh-row-section">
              <td>Abbey Road · Applied Composition</td>
              <td className="right">Per-Event + Year-1 Upgrade</td>
            </tr>
            {CBH_ABBEY_COMPOSITION.map((c) => {
              const line = pricingLineByNum(c.pricingLineNum);
              if (!line) return null;
              return (
                <tr key={c.pricingLineNum}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{line.name}</div>
                    {c.rationale && (
                      <div style={{ fontSize: 12, color: "var(--cbh-muted)", marginTop: 2, fontStyle: "italic" }}>
                        {c.rationale}
                      </div>
                    )}
                  </td>
                  <td className="right">{fmtMoney(c.amount)}</td>
                </tr>
              );
            })}

            <tr className="cbh-row-section">
              <td>2026 Calendar · Per-Event Projection</td>
              <td className="right">Same Rate Card · Distance-Adjusted</td>
            </tr>
            {CBH_SITES.map((site) => (
              <tr key={site.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{site.name}</div>
                  <div style={{ fontSize: 12, color: "var(--cbh-muted)", marginTop: 2 }}>
                    {site.dates} · {site.city} · {site.oneWayMiles.toLocaleString()} mi {site.market === "local" ? "(local)" : "(out-of-market)"}
                  </div>
                </td>
                <td className="right">{fmtMoney(site.perEvent + site.plants)}</td>
              </tr>
            ))}

            <tr>
              <td>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Year-1 Lighting Upgrade</div>
                <div style={{ fontSize: 12, color: "var(--cbh-muted)", marginTop: 2 }}>
                  One-time fixture purchase · titles to Cornbread on final payment
                </div>
              </td>
              <td className="right">{fmtMoney(4500)}</td>
            </tr>

            <tr>
              <td>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Storage · Monthly</div>
                <div style={{ fontSize: 12, color: "var(--cbh-muted)", marginTop: 2 }}>
                  Bills monthly between deployments · ~11 months across the calendar
                </div>
              </td>
              <td className="right">{fmtMoney(1500)} / mo</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Annual Production · 2026 Calendar</td>
              <td className="right">{fmtMoney(CBH_CALENDAR_TOTALS.productionAnnual)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p style={{ fontSize: 11.5, color: "var(--cbh-muted)", marginTop: 12 }}>
        Storage bills monthly net-15 in addition to the figure above. Calendar bundle discount available as a written change order when 4+ events are committed inside a single 12-month window.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Engagement Bar + Payment Method
// ─────────────────────────────────────────────────────────────────────────
function PaymentMethod() {
  return (
    <section className="cbh-section">
      <div className="cbh-engagement">
        <div className="cbh-card">
          <span className="cbh-card-accent" />
          <div className="cbh-eyebrow">Activation Deposit</div>
          <div className="cbh-engagement-pct">{CBH_DOC.paymentDepositPct}%</div>
          <div style={{ marginTop: 8, fontSize: 12, color: "rgba(250, 245, 232, 0.7)" }}>
            Due on written approval of each activation Statement of Work.
          </div>
        </div>
        <div className="cbh-card balance">
          <span className="cbh-card-accent" style={{ background: "var(--cbh-cedar-deep)" }} />
          <div className="cbh-eyebrow">Balance</div>
          <div className="cbh-engagement-pct">{CBH_DOC.paymentBalancePct}%</div>
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--cbh-muted)" }}>
            Due on or before pre-event walkthrough (May 12, 2026 for Abbey Road). Storage billed separately, monthly net-15.
          </div>
        </div>
      </div>
      <div className="cbh-card" style={{ marginTop: 16 }}>
        <div className="cbh-eyebrow">Payment Method · ACH / Wire</div>
        <div
          style={{
            display: "grid",
            gap: 8,
            marginTop: 10,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            fontSize: 13,
          }}
        >
          <Detail label="Payable To" value="AGV Miami, LLC" />
          <Detail label="Reference" value={CBH_DOC.docNumber} />
          <Detail label="ACH / Wire" value="Banking detail issued with executed contract" />
          <Detail label="Currency" value="USD" />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Change Orders
// ─────────────────────────────────────────────────────────────────────────
function ChangeOrders() {
  return (
    <section className="cbh-section">
      <SectionHeader
        eyebrow="Optional Scope"
        title="Available Change Orders."
        sub="Scope outside the modular rate card — issued individually or stacked into a single activation SOW. Each item is priced to scope before execution."
      />
      <div className="cbh-grid-2" style={{ marginTop: 24 }}>
        {CBH_CHANGE_ORDERS.map((c) => (
          <div key={c.name} className="cbh-co-card">
            <div className="cbh-co-head">
              <div className="cbh-co-name">{c.name}</div>
              <span className="cbh-pill">Available</span>
            </div>
            <div className="cbh-co-body">{c.body}</div>
            <div className="cbh-co-price">{c.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Exclusions
// ─────────────────────────────────────────────────────────────────────────
function Exclusions() {
  return (
    <section className="cbh-section">
      <SectionHeader eyebrow="Scope Boundaries" title="Outside This Engagement." />
      <ul className="cbh-exclusions">
        {CBH_EXCLUSIONS.map((e) => (
          <li key={e.term}>
            <strong>{e.term}.</strong> {e.body}
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Terms
// ─────────────────────────────────────────────────────────────────────────
function Terms() {
  return (
    <section id="terms" className="cbh-section">
      <SectionHeader eyebrow="Terms & Conditions" title="The Operating Agreement." />
      <div className="cbh-grid-2" style={{ marginTop: 24 }}>
        {CBH_TERMS.map((t) => (
          <div key={t.section} className="cbh-card cbh-term-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="cbh-term-section">{t.section}</span>
              <span className="cbh-term-title">{t.title}</span>
            </div>
            <p className="cbh-term-body">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Authorization — signature pad with Draw / Type tabs
// ─────────────────────────────────────────────────────────────────────────
function Authorization() {
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState("");
  const [signerName, setSignerName] = useState("");
  const [signerTitle, setSignerTitle] = useState("");
  const [signed, setSigned] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const hasInkRef = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * ratio;
    c.height = rect.height * ratio;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1f1611";
  }, [mode]);

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current;
    if (!c) return;
    c.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    hasInkRef.current = true;
  };

  const endDraw = () => {
    drawingRef.current = false;
  };

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    hasInkRef.current = false;
  };

  const canSign = useMemo(() => {
    if (!signerName.trim()) return false;
    if (mode === "type") return typedName.trim().length > 0;
    return hasInkRef.current;
  }, [mode, signerName, typedName]);

  const execute = () => {
    if (!canSign) {
      alert("Add your signature and printed name to execute.");
      return;
    }
    setSigned(true);
    setSignedAt(new Date().toISOString());
  };

  return (
    <section id="sign" className="cbh-section">
      <SectionHeader
        eyebrow="Authorization"
        title="Execute The Master Agreement."
        sub="Signing here authorizes the Abbey Road engagement plus the 2026 calendar at the published rate card. Per-event signatures live in each Statement of Work."
      />
      <div className="cbh-sig-card" style={{ marginTop: 24 }}>
        <div className="cbh-sig-tabs print-hide" role="tablist">
          <button role="tab" type="button" data-active={mode === "draw"} onClick={() => setMode("draw")}>
            Draw
          </button>
          <button role="tab" type="button" data-active={mode === "type"} onClick={() => setMode("type")}>
            Type
          </button>
        </div>

        {mode === "draw" ? (
          <canvas
            ref={canvasRef}
            className="cbh-sig-canvas"
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={endDraw}
            onPointerLeave={endDraw}
            aria-label="Draw your signature"
          />
        ) : (
          <div>
            <input
              type="text"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              placeholder="Type your full legal name"
              className="cbh-input"
              style={{ maxWidth: 540 }}
              aria-label="Typed signature"
            />
            <div className="cbh-sig-typed" aria-hidden="true">
              {typedName || " "}
            </div>
          </div>
        )}

        <div className="cbh-sig-fields">
          <input
            className="cbh-input"
            placeholder="Printed name"
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
            aria-label="Printed name"
          />
          <input
            className="cbh-input"
            placeholder="Title"
            value={signerTitle}
            onChange={(e) => setSignerTitle(e.target.value)}
            aria-label="Title"
          />
        </div>

        <div className="cbh-cta-row">
          <button type="button" className="cbh-btn" disabled={signed} onClick={execute}>
            {signed ? "Executed" : "Execute Agreement"}
          </button>
          {mode === "draw" && (
            <button type="button" className="cbh-btn secondary" onClick={clearCanvas} disabled={signed}>
              Clear
            </button>
          )}
        </div>

        {signed && signedAt && (
          <div
            style={{
              marginTop: 16,
              padding: 14,
              background: "rgba(197, 136, 63, 0.08)",
              borderLeft: "3px solid var(--cbh-orange)",
              fontSize: 12.5,
            }}
          >
            <div className="cbh-eyebrow">Execution Receipt</div>
            <div style={{ marginTop: 6, color: "var(--cbh-cedar-deep)" }}>
              <div>
                Executed by <strong>{signerName}</strong>
                {signerTitle ? `, ${signerTitle}` : ""}
              </div>
              <div className="cbh-mono" style={{ fontSize: 11.5, color: "var(--cbh-muted)" }}>
                {signedAt} · Document {CBH_DOC.docNumber} · {CBH_DOC.version}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cbh-cta-row print-hide" style={{ marginTop: 28 }}>
        <a className="cbh-btn danger" href={`mailto:${CBH_DOC.contactProducer}?subject=Cornbread × Abbey Road 2026 — Approved`}>
          Email The Producer
        </a>
        <button type="button" className="cbh-btn secondary" onClick={() => window.print()}>
          Print / Save PDF
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="cbh-footer">
      <div className="cbh-footer-inner">
        <div>
          <h4>Producer</h4>
          <div style={{ fontSize: 18, fontFamily: "var(--font-display, 'Alfa Slab One', serif)", letterSpacing: "0.03em" }}>
            {CBH_DOC.producerLong}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{CBH_DOC.contactProducer}</div>
        </div>
        <div>
          <h4>Project</h4>
          <div className="cbh-mono" style={{ fontSize: 13 }}>
            {CBH_DOC.docNumber}
            <br />
            {CBH_DOC.version}
          </div>
        </div>
        <div>
          <h4>Confidential</h4>
          <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.6 }}>
            Prepared for {CBH_DOC.client}. Pricing and engagement detail are confidential between the parties. ©{" "}
            {new Date().getFullYear()} {CBH_DOC.producerLong}.
          </div>
        </div>
      </div>
    </footer>
  );
}
