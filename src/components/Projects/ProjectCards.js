import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards({ imgPath, title, description, ghLink, demoLink }) {
  return (
    <article className="project-card">
      <img src={imgPath} width="756" height="462" alt="" loading="lazy" decoding="async" />
      <div className="project-card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="action-links">
          <a className="action-link" href={ghLink} target="_blank" rel="noopener noreferrer">
            <BsGithub aria-hidden="true" focusable="false" /> GitHub
            <span className="visually-hidden"> de {title} (abre em nova aba)</span>
          </a>
          {demoLink && (
            <a className="action-link" href={demoLink} target="_blank" rel="noopener noreferrer">
              <CgWebsite aria-hidden="true" focusable="false" /> Demo
              <span className="visually-hidden"> de {title} (abre em nova aba)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCards;
