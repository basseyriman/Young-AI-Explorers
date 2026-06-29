"""Split KDP cover spread PDF into front and back cover PNGs."""
from __future__ import annotations

import sys
from pathlib import Path

import fitz  # PyMuPDF

SPREAD_WIDTH_IN = 16.886
SPINE_WIDTH_IN = 0.096
COVER_WIDTH_IN = (SPREAD_WIDTH_IN - SPINE_WIDTH_IN) / 2
DPI = 200


def main() -> None:
    pdf_path = Path(
        sys.argv[1]
        if len(sys.argv) > 1
        else Path.home() / "Downloads" / "Cover Spread - Young AI Explorers.pdf"
    )
    out_dir = Path(
        sys.argv[2]
        if len(sys.argv) > 2
        else Path(__file__).resolve().parent.parent / "public" / "assets"
    )
    out_dir.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf_path)
    page = doc[0]
    w, h = page.rect.width, page.rect.height

    spine_w = w * (SPINE_WIDTH_IN / SPREAD_WIDTH_IN)
    cover_w = (w - spine_w) / 2

    # Layout: Back (left) | Spine | Front (right)
    back = fitz.Rect(0, 0, cover_w, h)
    front = fitz.Rect(cover_w + spine_w, 0, w, h)

    zoom = DPI / 72
    mat = fitz.Matrix(zoom, zoom)

    back_pix = page.get_pixmap(matrix=mat, clip=back, alpha=False)
    front_pix = page.get_pixmap(matrix=mat, clip=front, alpha=False)

    back_path = out_dir / "book_back_cover.png"
    front_path = out_dir / "book_front_cover.png"
    back_pix.save(str(back_path))
    front_pix.save(str(front_path))

    print(f"Saved back cover: {back_path} ({back_pix.width}x{back_pix.height})")
    print(f"Saved front cover: {front_path} ({front_pix.width}x{front_pix.height})")
    doc.close()


if __name__ == "__main__":
    main()
