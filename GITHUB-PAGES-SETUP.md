# MedStudentHub GitHub Pages deployment

This is a Vite + React project configured for:
https://tahseen-nazir.github.io/medstudenthub/

## Upload
Upload the contents of this folder to the ROOT of the `medstudenthub` repository. Make sure the entire `src/` folder is uploaded.

Keep your existing `pyqbank.js` if you already have it; this design does not delete it.

## GitHub Pages
In Settings -> Pages, set **Source** to **GitHub Actions**.

The workflow in `.github/workflows/main.yml` installs dependencies, runs `npm run build`, uploads `dist`, and deploys it to Pages.
