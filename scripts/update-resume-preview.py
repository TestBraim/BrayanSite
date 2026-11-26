"""Run with python3 to refresh the résumé preview using PyMuPDF and Pillow."""

import json
from pathlib import Path
from urllib.parse import urlsplit

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "Assets"
PREVIEW_WIDTHS = (480, 1224)


def preview_links(page):
    words = page.get_text("words", sort=True)
    links = []

    for annotation in sorted(page.get_links(), key=lambda link: (link["from"].y0, link["from"].x0)):
        href = annotation.get("uri", "")
        destination = urlsplit(href)
        if destination.scheme not in {"http", "https"} or not destination.hostname:
            continue

        bounds = annotation["from"] & page.rect
        if bounds.is_empty:
            continue

        label_words = []
        for word in words:
            word_bounds = fitz.Rect(word[:4]) * page.rotation_matrix
            center = (word_bounds.tl + word_bounds.br) / 2
            if bounds.contains(center):
                label_words.append(word[4])

        label = " ".join(label_words).strip("()")
        links.append({
            "href": href,
            "label": label or destination.hostname,
            "position": {
                "left": f"{100 * bounds.x0 / page.rect.width:.5f}%",
                "top": f"{100 * bounds.y0 / page.rect.height:.5f}%",
                "width": f"{100 * bounds.width / page.rect.width:.5f}%",
                "height": f"{100 * bounds.height / page.rect.height:.5f}%",
            },
        })

    return links


def main():
    with fitz.open(ROOT / "public" / "cv_brayan_aragao_pletsch.pdf") as document:
        page = document[0]
        widths = {}
        for width in PREVIEW_WIDTHS:
            scale = width / page.rect.width
            pixmap = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
            image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
            image.save(ASSETS / f"resume-preview-{width}.webp", quality=90, method=6)
            widths[width] = {"width": image.width, "height": image.height}

        metadata = {"sizes": widths, "links": preview_links(page)}
        (ASSETS / "resume-preview.json").write_text(
            json.dumps(metadata, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )


if __name__ == "__main__":
    main()
