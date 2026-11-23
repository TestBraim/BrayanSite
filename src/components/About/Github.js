import { cloneElement, useLayoutEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { githubProfile } from "../SocialLinks";

const labels = {
  months: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  totalCount: "Total de {{count}} contribuições nos últimos 12 meses",
  legend: { less: "Menos", more: "Mais" },
};
const dateFormat = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" });
const theme = { dark: ["#342744", "#8351aa", "#ad6eda", "#ce94f6", "#ebc5ff"] };

function renderDay(block, { date, count }) {
  const day = dateFormat.format(new Date(date));
  const contributions = count === 1 ? "1 contribuição" : `${count} contribuições`;

  return cloneElement(block, {}, <title>{day} · {contributions}</title>);
}

function Github() {
  const scroller = useRef(null);
  const [calendar, setCalendar] = useState(null);

  useLayoutEffect(() => {
    if (!calendar) return;

    const viewport = scroller.current;
    let previousEnd = 0;

    function keepLatestInView() {
      const end = viewport.scrollWidth - viewport.clientWidth;
      // Preserve earlier months when the reader has scrolled away from the end.
      if (viewport.scrollLeft >= Math.min(previousEnd, end) - 1) {
        viewport.scrollLeft = end;
      }
      previousEnd = end;
    }

    keepLatestInView();
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(keepLatestInView);
    observer.observe(viewport);
    observer.observe(calendar);
    return () => observer.disconnect();
  }, [calendar]);

  return (
    <section className="about-group" aria-labelledby="github-title">
      <h2 id="github-title">Dias em que <strong className="purple">programo</strong></h2>
      <p><a href={githubProfile}>Consultar contribuições no perfil do GitHub</a></p>
      <div ref={scroller} className="calendar-scroller" role="region" aria-label="Calendário de contribuições, com rolagem horizontal" tabIndex={0}>
        <div className="calendar-plot">
          <GitHubCalendar
            ref={setCalendar}
            username="BrayanPletsch"
            blockSize={15}
            blockMargin={5}
            fontSize={16}
            colorScheme="dark"
            theme={theme}
            labels={labels}
            renderBlock={renderDay}
            errorMessage="O calendário está indisponível no momento. As contribuições podem ser consultadas no perfil do GitHub."
          />
        </div>
      </div>
    </section>
  );
}

export default Github;
