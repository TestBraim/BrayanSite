import { AiOutlineDownload, AiOutlineFilePdf } from "react-icons/ai";
import preview from "../../Assets/resume-preview-1224.webp";
import previewSmall from "../../Assets/resume-preview-480.webp";
import pdf from "../../Assets/Brayan-Pletsch_curriculo.pdf";

function ResumeNew() {
  return (
    <div className="page-section resume-page">
      <div className="container resume-content">
        <h1 className="visually-hidden">Currículo de Brayan Aragão Pletsch</h1>
        <a className="action-link resume-link" href={pdf} type="application/pdf" target="_blank" rel="noopener noreferrer">
          <AiOutlineFilePdf aria-hidden="true" focusable="false" /> Exibir PDF Completo
          <span className="visually-hidden"> (abre em nova aba)</span>
        </a>
        <img
          className="resume-preview"
          src={preview}
          srcSet={`${previewSmall} 480w, ${preview} 1224w`}
          sizes="(min-width: 66rem) 1040px, calc(100vw - 1.5rem)"
          width="1224"
          height="1584"
          alt="Prévia da primeira página do currículo"
          decoding="async"
        />
        <a className="action-link resume-link" href={pdf} type="application/pdf" download="Brayan-Pletsch-Currículo.pdf">
          <AiOutlineDownload aria-hidden="true" focusable="false" /> Download
          <span className="visually-hidden"> do currículo em PDF</span>
        </a>
      </div>
    </div>
  );
}

export default ResumeNew;
