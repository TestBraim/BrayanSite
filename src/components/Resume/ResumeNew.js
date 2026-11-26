import { AiOutlineDownload, AiOutlineFilePdf } from "react-icons/ai";
import preview from "../../Assets/resume-preview-1224.webp";
import previewSmall from "../../Assets/resume-preview-480.webp";
import previewMetadata from "../../Assets/resume-preview.json";

const pdfFilename = "cv_brayan_aragao_pletsch.pdf";
const pdf = `${process.env.PUBLIC_URL || ""}/${pdfFilename}`;

function ResumeNew() {
  return (
    <div className="page-section resume-page">
      <div className="container resume-content">
        <h1 className="visually-hidden">Currículo de Brayan Aragão Pletsch</h1>
        <a className="action-link resume-link" href={pdf} type="application/pdf" target="_blank" rel="noopener noreferrer">
          <AiOutlineFilePdf aria-hidden="true" focusable="false" /> Exibir PDF Completo
          <span className="visually-hidden"> (abre em nova aba)</span>
        </a>
        <div className="resume-preview">
          <img
            src={preview}
            srcSet={`${previewSmall} ${previewMetadata.sizes[480].width}w, ${preview} ${previewMetadata.sizes[1224].width}w`}
            sizes="(min-width: 66rem) 1040px, calc(100vw - 1.5rem)"
            width={previewMetadata.sizes[1224].width}
            height={previewMetadata.sizes[1224].height}
            alt="Prévia da primeira página do currículo"
            decoding="async"
          />
          {previewMetadata.links.map(({ href, label, position }) => (
            <a
              key={`${href}-${position.left}-${position.top}`}
              className="resume-preview-link"
              href={href}
              aria-label={label}
              style={position}
            />
          ))}
        </div>
        <a className="action-link resume-link" href={pdf} type="application/pdf" download={pdfFilename}>
          <AiOutlineDownload aria-hidden="true" focusable="false" /> Download
          <span className="visually-hidden"> do currículo em PDF</span>
        </a>
      </div>
    </div>
  );
}

export default ResumeNew;
