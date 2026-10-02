# K12 Hunar - Scholarship CRM Demo

A small frontend demo of a Scholarship Management CRM for K12 Hunar employees. It is built with **React (JavaScript)**, **Vite** and **Tailwind CSS v4**. There is no backend and no login. Data comes from a local JSON file, and changes are saved in the browser's `localStorage`.

## Features

- **Summary cards**: Total Scholarships, Published, Draft and Expired. Clicking a card filters the list by that status.
- **State filter**: All states / Bihar / Haryana / Jharkhand. There is also a status dropdown and a text search.
- **Scholarship list**: a table on desktop and stacked cards on mobile.
- **Status change**: an inline dropdown on every row switches between Published, Draft and Expired. The change is saved straight away and a confirmation message appears.
- **Add / Edit form**: covers all nine required fields, with validation and a "Student preview" tab.
- **Preview**: shows how a scholarship would look to students, with the benefit, eligibility, deadline countdown and an Apply button.
- **Reset demo data**: restores the original nine records.

## How to run the project

### 1. Prerequisites

- **Node.js 18 or newer** (tested with Node 22). Download it from https://nodejs.org if you don't have it.
- npm comes with Node.js.

Check your versions:

```bash
node -v
npm -v
```

### 2. Get the code

Clone the repository, or download and unzip the ZIP file, then open a terminal in the project folder:

```bash
git clone https://github.com/iashutoshyadav/Dashboard-Assignment.git
cd Dashboard-Assignment
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser. The page reloads automatically when you edit a file. Press `Ctrl + C` in the terminal to stop the server.

### 5. (Optional) Build for production

```bash
npm run build      # creates an optimised build in dist/
npm run preview    # serves the built app at http://localhost:4173
```

### Available scripts

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Starts the dev server with hot reload            |
| `npm run build`   | Builds the production version into `dist/`       |
| `npm run preview` | Serves the production build locally for checking |

### Troubleshooting

- **Port 5173 is already in use**: Vite picks the next free port automatically. Use the URL printed in the terminal.
- **You want the original sample data back**: click **Reset demo data** in the top-right corner. Edits are kept in `localStorage`, so they survive a page refresh.
- **`npm install` fails**: make sure `node -v` shows version 18 or newer, then delete `node_modules` and `package-lock.json` and run `npm install` again.

### Deploying

Push the repo to GitHub and import it into **Vercel** or **Netlify**. Both detect Vite automatically:

- Build command: `npm run build`
- Output folder: `dist`

## Project structure

```
src/
  App.jsx                      Page layout, filter state, modal state, event handlers
  constants.js                 States, statuses, status colours, empty form values
  data/scholarships.json       The 9 sample records
  hooks/useScholarships.js     Scholarship list state + localStorage persistence
  utils/date.js                Deadline formatting and "days left"
  utils/validate.js            Form validation rules
  components/
    SummaryCards.jsx           4 count cards (clickable)
    Filters.jsx                State chips, search, status dropdown
    ScholarshipList.jsx        Desktop table + mobile cards
    StatusSelect.jsx           Inline status dropdown
    ScholarshipForm.jsx        Add/Edit form with validation + preview tab
    StudentPreviewCard.jsx     Student-facing scholarship card
    Modal.jsx                  Reusable dialog (Esc / backdrop to close)
    Toast.jsx                  Auto-hiding confirmation message
```

## How the key parts work

**Data and state.** `useScholarships` loads the records from `localStorage`. If nothing is saved yet, it uses `scholarships.json` instead. It saves the list again whenever it changes. The hook exposes `addScholarship`, `updateScholarship`, `updateStatus` and `resetToSampleData`. Each one updates the list immutably with `setState`.

**State filter.** `stateFilter` lives in `App`. The list is filtered in two steps:

1. `inScope` keeps only records that match the selected state and the search text. The summary cards count this set, so they always describe the chosen state.
2. `visible` then applies the status filter, and that is what the table shows.

Both values are derived from the current state on each render and are never stored separately, so they can't fall out of sync.

**Status change.** `StatusSelect` calls `onStatusChange(id, newStatus)`. `App` passes that to `updateStatus`, which replaces only the matching record. React then re-renders the cards, the list and the counts together, and a toast confirms the change.

**Form.** `ScholarshipForm` is a controlled form whose values live in local state. `validateScholarship(values)` returns an `{ field: message }` object and runs on every render. Errors appear once a field has been touched, or for every field after a submit attempt. When a submit fails, the first invalid field gets focus. The same component handles Add (empty values) and Edit (values pre-filled from the record).

Validation rules:

- Name: required, at least 5 characters.
- State: one of the three states.
- Provider, class and benefit: required.
- Eligibility: required, at least 20 characters.
- Link: a valid `http(s)` URL.
- Deadline: optional (empty means "Not stated"), but a **Published** scholarship cannot have a deadline that has already passed.

**Preview.** `StudentPreviewCard` takes a single scholarship object and renders it the way a student would see it. The **Preview** button on a row opens it in a modal. Inside the form, the "Student preview" tab renders the same component with the unsaved form values. Draft and Expired scholarships show a notice, and their Apply button is disabled.

## Notes on sample data

The nine records (name, state, class, deadline, status) come from the assessment brief. The provider names, eligibility text, benefits and links are **illustrative placeholders** I added so the form and preview have realistic content. They should be checked against official sources before any real use.

## AI tools and references

- **Claude (Anthropic) via Claude Code**: used to scaffold the project and draft components, validation and this README. I reviewed the code and can explain every part.
- **References**: the K12 Hunar scholarships page (https://www.k12hunar.com/scholarships) for card layout and content, plus the React, Vite and Tailwind CSS documentation.
