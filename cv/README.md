# CV — LaTeX Project

## Requirements

- A LaTeX distribution:
  - **Windows**: [MiKTeX](https://miktex.org/) or [TeX Live](https://tug.org/texlive/)
  - **macOS**: [MacTeX](https://tug.org/mactex/)
  - **Linux**: `sudo apt install texlive-full` (or equivalent)
- The **moderncv** package (included in MiKTeX/TeX Live; can also be compiled on [Overleaf](https://overleaf.com) without any local install)

## Compile locally

Run `pdflatex` **twice** to ensure correct layout (moderncv needs two passes):

```bash
pdflatex cv.tex
pdflatex cv.tex
```

This produces `cv.pdf` in the same directory.

### Using latexmk (recommended)

```bash
latexmk -pdf cv.tex
```

`latexmk` automatically runs as many passes as needed.

To clean auxiliary files afterwards:

```bash
latexmk -c
```

## Compile on Overleaf

1. Go to [overleaf.com](https://overleaf.com) and create a new project.
2. Upload `cv.tex`.
3. Set the compiler to **pdfLaTeX** (Project menu → Compiler).
4. Click **Recompile** — done.

## Customisation

| What                        | Where in `cv.tex`                      |
|-----------------------------|----------------------------------------|
| Name, title, contact        | Personal data block (top of file)      |
| Experience entries          | `\cventry` under `\section{Experience}` |
| Education entries           | `\cventry` under `\section{Education}`  |
| Publications                | `\cvitem` under `\section{Publications}` |
| Skills                      | `\cvitem` under `\section{Skills}`      |
| Style (classic/banking/…)   | `\moderncvstyle{…}` line               |
| Accent colour               | `\moderncvcolor{…}` line               |
