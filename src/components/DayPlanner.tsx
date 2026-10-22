"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { images, type ImageKey } from "@/content/images";
import { TEMP_LABEL } from "./Photo";

type Moment = {
  time: string;
  /** Hour (Scarborough time) from which this moment is "now". */
  from: number;
  title: string;
  text: string;
  image: ImageKey;
  link?: { href: string; label: string };
};

const moments: Moment[] = [
  {
    time: "07:30",
    from: 5,
    title: "Coffee with the view",
    text: "The kitchen upstairs looks out over the reserve and the ocean. Make the first pot, take it to the window, decide nothing yet.",
    image: "seaMorning",
  },
  {
    time: "10:00",
    from: 9,
    title: "Down to Scarborough Beach",
    text: "A long, quiet stretch of white sand below the village. Walk it end to end, or don't. The outdoor shower is waiting when you get back.",
    image: "scarboroughBeachPath",
    link: { href: "/explore#scarborough", label: "More about Scarborough" },
  },
  {
    time: "13:00",
    from: 12,
    title: "Lunch in Kalk Bay",
    text: "Cross the peninsula to the False Bay side: the harbour, the boats coming in, a long seafood lunch, a wander along Main Road.",
    image: "kalkBayQuay",
    link: { href: "/explore#kalk-bay", label: "Plan a Kalk Bay day" },
  },
  {
    time: "18:30",
    from: 17,
    title: "Back to the house",
    text: "Light the braai on the porch or fire up the pizza oven out back. Someone opens a bottle; nobody needs to drive anywhere.",
    image: "dinnerTable",
  },
  {
    time: "22:00",
    from: 22,
    title: "The village goes quiet",
    text: "Scarborough keeps its nights dark and still: quiet hours start at ten and the lights stay low. A fire inside, a last glass, the sound of the sea.",
    image: "seaDusk",
  },
];

/** Which moment matches the current hour in Scarborough (Africa/Johannesburg). */
function currentIndex(hour: number) {
  if (hour < 5) return moments.length - 1;
  let idx = 0;
  moments.forEach((m, i) => {
    if (hour >= m.from) idx = i;
  });
  return idx;
}

function scarboroughNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Johannesburg",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
  return { hour, label: `${String(hour).padStart(2, "0")}:${minute}` }; // taste-skill-ignore: a clock
}

export function DayPlanner() {
  const [active, setActive] = useState(0);
  const [now, setNow] = useState<{ label: string; index: number } | null>(null);
  const id = useId();

  useEffect(() => {
    const tick = () => {
      const n = scarboroughNow();
      setNow({ label: n.label, index: currentIndex(n.hour) });
      return currentIndex(n.hour);
    };
    setActive(tick());
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, []);

  const m = moments[active];
  const img = images[m.image];

  return (
    <div className="day">
      <div className="day-photo" aria-hidden="false">
        {moments.map((mo, i) => {
          const im = images[mo.image];
          return (
            <div key={mo.time} className="day-frame" data-active={i === active}>
              <Image
                src={im.src}
                alt={i === active ? im.alt : ""}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: im.focus ?? "50% 50%" }}
              />
            </div>
          );
        })}
        <p className="photo-label">
          {img.isTemporary ? TEMP_LABEL : `${img.subject}. Photo: ${img.credit?.creator}, ${img.credit?.license}`}
        </p>
      </div>

      <div className="day-text">
        <h2 className="t-1">Your day, your pace.</h2>
        <p className="day-intro">
          Nothing on the agenda, unless you want one. Here is how a day could go.
          {now ? (
            <>
              {" "}
              It is <strong>{now.label}</strong> in Scarborough right now.
            </>
          ) : null}
        </p>

        <div className="day-list" role="tablist" aria-label="Moments in a day at Orange Cliffs" aria-orientation="vertical">
          {moments.map((mo, i) => (
            <button
              key={mo.time}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              className="day-tab"
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  const n = (i + 1) % moments.length;
                  setActive(n);
                  document.getElementById(`${id}-tab-${n}`)?.focus();
                }
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const n = (i - 1 + moments.length) % moments.length;
                  setActive(n);
                  document.getElementById(`${id}-tab-${n}`)?.focus();
                }
              }}
            >
              <span className="day-time">{mo.time}</span>
              <span className="day-title">{mo.title}</span>
              {now?.index === i ? <span className="day-now">now</span> : null}
            </button>
          ))}
        </div>

        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="day-panel" aria-live="polite">
          <p key={m.time} className="day-panel-text">
            {m.text}
          </p>
          {m.link ? (
            <Link href={m.link.href} className="link">
              {m.link.label} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
