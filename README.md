# LuLinogic — Language Study Room

> A personal academic knowledge space for linguistics, philosophy of language, formal methods, and computational approaches to human communication.

**Language Study Room** is an interactive academic library built with HTML, CSS, and JavaScript. It combines an illustrated study-room interface, a structured bibliography, original reading companions, and an original-source PDF reader.

This document explains how to maintain the book collection and how to add new books without modifying the existing reader infrastructure.

---

## Table of Contents

- [1. Project Architecture](#1-project-architecture)
- [2. Project Structure](#2-project-structure)
- [3. Book Types](#3-book-types)
- [4. Book ID Rules](#4-book-id-rules)
- [5. Preparing Book Resources](#5-preparing-book-resources)
- [6. Registering a Book](#6-registering-a-book)
- [7. Adding an Original PDF](#7-adding-an-original-pdf)
- [8. Adding a Reading Companion](#8-adding-a-reading-companion)
- [9. Adding Language-Specific Resources](#9-adding-language-specific-resources)
- [10. Updating Book Type Labels](#10-updating-book-type-labels)
- [11. Book Detail Identification](#11-book-detail-identification)
- [12. Testing and Verification](#12-testing-and-verification)
- [13. Common Update Scenarios](#13-common-update-scenarios)
- [14. Troubleshooting](#14-troubleshooting)
- [15. Maintenance Checklist](#15-maintenance-checklist)
- [16. Copyright and Deployment](#16-copyright-and-deployment)

---

# 1. Project Architecture

The Language Study Room separates bibliographic data, original source files, reading content, and interface behavior.

The central principle is:

**Add or update data whenever possible. Avoid modifying the reader's core logic for each new book.**

### 1.1 Main components

| Component | Responsibility |
|---|---|
| `language_data.js` | Book catalogue, bibliographic metadata, PDF paths, language resources |
| `language_panels.js` | Bookshelf, knowledge panels, book detail pages |
| `language_reader_data.js` | Original reading companion content |
| `language_reader.js` | Double-page reading companion interface |
| `language_pdf_reader.js` | Original PDF loading and rendering |
| `Language.html` | Page structure and module loading |
| CSS files | Layout and visual presentation |

### 1.2 Data flow

```text
language_data.js
       |
       v
   DATA.books
       |
       v
language_panels.js
       |
       v
 Linguistics Bookshelf
       |
       v
    Book Detail
       |
       +-----------------------+
       |                       |
       v                       v
 Original PDF            Reading Companion
       |                       |
       v                       v
language_pdf_reader.js   language_reader_data.js
                               |
                               v
                       language_reader.js
```

The two reading systems are independent:

- **Original PDF Reader** displays the original document.
- **Reading Companion** displays original educational notes and explanations.

A book can have either one or both.

---

# 2. Project Structure

The recommended project structure is:

```text
LuLinogic/
│
├── index.html
├── Language.html
│
├── language.css
├── language.js
├── language_data.js
│
├── language_panels.css
├── language_panels.js
│
├── language_reader.css
├── language_reader.js
├── language_reader_data.js
│
├── language_pdf_reader.css
├── language_pdf_reader.js
│
├── Language_Steam.png
│
└── assets/
    └── books/
        ├── saussure/
        │   ├── cover.jpg
        │   └── original/
        │       └── saussure-course.pdf
        │
        ├── linguistic-terms/
        │   ├── cover.jpg
        │   └── original/
        │       └── linguistic-terms.pdf
        │
        └── chomsky-aspects/
            ├── cover.jpg
            └── original/
                └── chomsky-aspects.pdf
```

Not every book needs all resource files.

For example, a book may have bibliographic information only, without a cover image or PDF.

---

# 3. Book Types

Before adding a book, identify its bibliographic type.

The `itemType` field determines how the book is labelled in the bookshelf.

| Type | `itemType` | Description |
|---|---|---|
| Book | `book` | Independent academic books and textbooks |
| Article | `article` | Journal articles and individual essays |
| Collected Papers | `collected-papers` | Collections of an author's papers |
| Selected Writings | `selected-writings` | Selected works by an author |
| Reference Dictionary | `reference-dictionary` | Terminological dictionaries and reference works |

### Examples

**Books**

```javascript
itemType: "book"
```

Examples:

- Ferdinand de Saussure — *Course in General Linguistics*
- Noam Chomsky — *Syntactic Structures*
- Leonard Bloomfield — *Language*

**Articles**

```javascript
itemType: "article"
```

Examples:

- Gottlob Frege — *On Sense and Reference*
- Bertrand Russell — *On Denoting*

**Collected papers**

```javascript
itemType: "collected-papers"
```

Example:

- Charles Sanders Peirce — *Collected Papers of Charles Sanders Peirce*

**Selected writings**

```javascript
itemType: "selected-writings"
```

Example:

- Roman Jakobson — *Selected Writings*

**Reference dictionaries**

```javascript
itemType: "reference-dictionary"
```

Example:

- 《语言学名词》

### Choosing the right collection

Not every language-related resource needs to be added to `DATA.books`.

| Resource | Recommended location |
|---|---|
| Linguistic monographs | `DATA.books` |
| Classic linguistic articles | `DATA.books` |
| Linguistic reference dictionaries | `DATA.books` |
| Computational linguistics books | `DATA.books` |
| Grammar textbooks for a specific language | `worldLanguages[].resources` |
| Dictionaries for a specific language | `worldLanguages[].resources` |
| Personal reading notes | `DATA.readingRecords` |
| Personal vocabulary entries | `DATA.vocabulary` |

Avoid creating duplicate book records in multiple collections. Use references to the same book ID when cross-linking is needed.

---

# 4. Book ID Rules

Every book must have a unique ID.

Examples:

| Title | Recommended ID |
|---|---|
| *Course in General Linguistics* | `saussure_course` |
| *Syntactic Structures* | `chomsky_syntactic_structures` |
| *On Denoting* | `russell_on_denoting` |
| *Language* | `bloomfield_language` |
| 《语言学名词》 | `linguistic_terms` |

### Naming conventions

- Use lowercase English letters.
- Use underscores to separate words.
- Do not use spaces.
- Avoid Chinese characters in IDs.
- Do not reuse an existing ID.
- Keep an ID stable after it has been registered.

The ID is used by:

- `language_data.js`
- `language_reader_data.js`
- The original PDF reader
- Local reading progress storage

**Changing a book ID may disconnect its reading companion and saved reading progress.**

For separate editions of the same work, include an edition or publication year in the ID when necessary.

Example:

```javascript
id: "saussure_course_1916"
```

---

# 5. Preparing Book Resources

Before registering a book, decide which resources should be included.

### 5.1 Book cover

Recommended location:

```text
assets/books/book-id/cover.jpg
```

Example:

```text
assets/books/chomsky-aspects/cover.jpg
```

### 5.2 Original PDF

Recommended location:

```text
assets/books/book-id/original/book-id.pdf
```

Example:

```text
assets/books/chomsky-aspects/original/chomsky-aspects.pdf
```

### 5.3 Personal notes

Optional location:

```text
assets/books/book-id/notes/reading-notes.md
```

### Important note about covers

The current `language_data.js` supports a `cover` field. However, the supplied version of `language_panels.js` generates typographic covers and does not yet render `book.cover` as an actual image.

Adding a cover file and registering its path therefore does not automatically display the image.

Real cover-image rendering requires an additional interface implementation.

---

# 6. Registering a Book

This is the main operation required whenever a new book is added.

Open:

```text
language_data.js
```

Find:

```javascript
books: [
```

Add the new book object inside this array.

### 6.1 Standard book template

Use this template for ordinary academic books:

```javascript
{
    id: "chomsky_aspects",

    title: "Aspects of the Theory of Syntax",

    author: "Noam Chomsky",

    itemType: "book",

    publicationInfo:
        "Cambridge, MA: MIT Press, 1965.",

    publisher: "MIT Press",

    publicationYear: 1965,

    category:
        "Syntax / Generative Grammar",

    language: "English",

    description:
        "An influential work on generative grammar, linguistic competence, and the formal structure of language.",

    keywords: [
        "generative grammar",
        "linguistic competence",
        "deep structure",
        "surface structure",
        "transformational grammar"
    ],

    readingGuide:
        "Focus on the distinction between competence and performance, and examine how the proposed grammatical model accounts for sentence structure.",

    cover:
        "./assets/books/chomsky-aspects/cover.jpg",

    pdfUrl:
        "./assets/books/chomsky-aspects/original/chomsky-aspects.pdf",

    pages: []
},
```

### 6.2 Field descriptions

| Field | Purpose | Required |
|---|---|---|
| `id` | Unique identifier | Yes |
| `title` | Book title | Yes |
| `author` | Author or editorial body | Yes |
| `itemType` | Bibliographic type | Yes |
| `publicationInfo` | Publication information | Recommended |
| `publisher` | Publisher | Optional |
| `publicationYear` | Year of publication | Optional |
| `category` | Academic field | Recommended |
| `language` | Language of the work | Recommended |
| `description` | Original book description | Recommended |
| `keywords` | Search terms | Recommended |
| `readingGuide` | Original reading recommendation | Recommended |
| `cover` | Cover image path | Optional |
| `pdfUrl` | Original PDF path | Optional |
| `pages` | Reserved for future use | Optional |

Do not invent publication details. Verify the edition and bibliographic information before entering them.

### 6.3 Reference dictionary template

For professional reference works, add fields such as `entryCount`, `partCount`, and `tableOfContents`.

```javascript
{
    id: "linguistic_terms",

    title: "语言学名词",

    author: "语言学名词审定委员会",

    itemType: "reference-dictionary",

    publicationInfo:
        "北京：商务印书馆，2011",

    publisher: "商务印书馆",

    publicationYear: 2011,

    category:
        "Linguistic Terminology",

    language: "Chinese",

    description:
        "A standardized reference work covering major terminology in linguistics and related fields.",

    entryCount: 2939,

    partCount: 13,

    tableOfContents: linguisticTermsTOC,

    keywords: [
        "语言学名词",
        "理论语言学",
        "语音学",
        "语法学",
        "语义学",
        "计算语言学"
    ],

    cover:
        "./assets/books/linguistics-terms/cover.jpg",

    pdfUrl:
        "./assets/books/linguistics-terms/original/linguistics-terms.pdf",

    pages: []
},
```

The `tableOfContents` field should contain verified bibliographic information. Do not invent chapter titles or page numbers.

---

# 7. Adding an Original PDF

Adding an original PDF is optional.

### 7.1 Place the PDF in the project

Example:

```text
assets/
└── books/
    └── chomsky-aspects/
        └── original/
            └── chomsky-aspects.pdf
```

### 7.2 Register the PDF path

Inside the corresponding book object in `language_data.js`, add:

```javascript
pdfUrl:
    "./assets/books/chomsky-aspects/original/chomsky-aspects.pdf",
```

The path must match the real file location, including capitalization and directory names.

If the book has no PDF, omit `pdfUrl`.

### 7.3 How the PDF reader works

The book detail panel generates an original PDF entry when `book.pdfUrl` exists.

The PDF reader then loads the document using:

```javascript
book.pdfUrl
```

The original PDF reader is responsible for:

- Loading the PDF
- Rendering document pages
- Single-page and double-page display
- Previous and next navigation
- Direct page navigation
- Zoom controls
- Local reading progress

It should not require book-specific JavaScript changes.

### 7.4 PDF.js

The current implementation uses Mozilla PDF.js as an ES module loaded from a CDN.

The current configuration uses a fixed PDF.js version:

```text
pdfjs-dist@6.4.299
```

The module and worker must be available in the browser.

When deploying, test the reader through HTTP or HTTPS rather than opening `Language.html` directly with `file://`.

---

# 8. Adding a Reading Companion

A Reading Companion is an original educational guide written separately from the original book.

It may include:

- Theoretical background
- Chapter introductions
- Key concepts
- Explanations
- Examples
- Critical questions
- Cross-references
- Further reading

It should not reproduce the complete copyrighted text of the original book.

### 8.1 Open `language_reader_data.js`

Find:

```javascript
books: {
```

Add an entry whose key matches the book ID in `language_data.js`.

Example:

```javascript
"chomsky_aspects": {

    chapters: [

        {
            title: "Introduction",
            page: 0
        },

        {
            title: "The Independence of Syntax",
            page: 2
        },

        {
            title: "The Structure of Grammar",
            page: 4
        }

    ],

    pages: [

        {
            section: "INTRODUCTION",

            title: "The Problem of Grammatical Theory",

            paragraphs: [
                "Write an original introduction to the theoretical problems addressed by the work.",

                "Explain the intellectual background and the questions that motivate the author's argument."
            ],

            bullets: [
                "Identify the central research question.",
                "Distinguish the author's assumptions from the conclusions."
            ],

            note:
                "This is an original reading note."
        },

        {
            section: "INTRODUCTION",

            title: "The Goals of Linguistic Analysis",

            paragraphs: [
                "Develop the second page of your original study guide."
            ],

            bullets: [],

            note: ""
        },

        {
            section: "CHAPTER ONE",

            title: "Theoretical Background",

            paragraphs: [
                "Introduce the theoretical background of the chapter."
            ],

            bullets: [],

            note: ""
        },

        {
            section: "CHAPTER ONE",

            title: "Key Concepts",

            paragraphs: [
                "Explain the principal concepts and their relations."
            ],

            bullets: [],

            note: ""
        }

    ]

}
```

This is a structural example. The actual content should be written and verified for the specific book.

### 8.2 Reading Companion fields

| Field | Purpose |
|---|---|
| `chapters` | Table of contents |
| `chapters[].title` | Chapter title |
| `chapters[].page` | Starting page index in the companion |
| `pages` | Companion page content |
| `pages[].section` | Section label |
| `pages[].title` | Page title |
| `pages[].paragraphs` | Original explanatory paragraphs |
| `pages[].bullets` | Key points |
| `pages[].note` | Additional note |

**Important:** `chapters[].page` uses a zero-based array index, not the original PDF page number.

For example:

```javascript
{
    title: "Theoretical Background",
    page: 2
}
```

refers to:

```javascript
pages[2]
```

The current reader displays two companion pages per spread. For clean chapter navigation, use even-numbered starting indices where possible:

```text
0, 2, 4, 6, ...
```

### 8.3 Companion availability

A book should only display the Reading Companion button when companion data exists.

The `enhanceBookDetail()` function in `language_reader.js` should check:

```javascript
const book = findBookFromDetail(detail);

if (!book) return;

const companion = getCompanion(book.id);

if (
    !companion ||
    !Array.isArray(companion.pages) ||
    companion.pages.length === 0
) {
    return;
}
```

This prevents empty reading buttons from appearing for books that only have an original PDF.

---

# 9. Adding Language-Specific Resources

Some resources are better organized under a specific language rather than the main Linguistics Bookshelf.

Examples:

- Japanese grammar textbooks
- Latin dictionaries
- Ancient Greek classical texts
- German phonetics textbooks

Open `language_data.js` and locate:

```javascript
worldLanguages: [
```

Find the relevant language entry.

For example:

```javascript
{
    id: "japanese",

    name: "Japanese",

    nativeName: "日本語",

    family: "Japonic",

    script: "Kanji, Hiragana, and Katakana",

    focus: "...",

    resources: []
}
```

Add a resource:

```javascript
resources: [

    {
        type: "grammars",

        title: "A Japanese Grammar Reference",

        creator: "Author Name",

        description:
            "A reference grammar of Japanese syntax and morphology.",

        access: "BOOK",

        url: ""
    }

]
```

The `type` field must match one of the registered resource categories:

```text
grammars
dictionaries
classical-texts
linguistic-research
open-resources
```

These resources are displayed in World Languages and do not automatically become entries in `DATA.books`.

---

# 10. Updating Book Type Labels

When a new `itemType` is introduced, update the label mapping in `language_panels.js`.

Find:

```javascript
function formatItemType(type) {

    const labels = {

        book: "BOOK",

        article: "ESSAY / ARTICLE",

        "collected-papers": "COLLECTED PAPERS",

        "selected-writings": "SELECTED WRITINGS"

    };

    return labels[type] || "BIBLIOGRAPHIC RECORD";

}
```

The current mapping should include:

```javascript
"reference-dictionary": "REFERENCE DICTIONARY"
```

For example:

```javascript
function formatItemType(type) {

    const labels = {

        book: "BOOK",

        article: "ESSAY / ARTICLE",

        "collected-papers": "COLLECTED PAPERS",

        "selected-writings": "SELECTED WRITINGS",

        "reference-dictionary": "REFERENCE DICTIONARY"

    };

    return labels[type] || "BIBLIOGRAPHIC RECORD";

}
```

This is a one-time configuration for each new type, not a change required for each new book.

---

# 11. Book Detail Identification

The current reader can identify books by matching their title and author.

For more reliable identification, especially when multiple editions exist, use the book ID directly.

In `language_panels.js`, inside `renderBookDetail(book)`, add:

```javascript
detail.dataset.bookId = book.id;
```

Then update `findBookFromDetail(detail)` in `language_reader.js`:

```javascript
function findBookFromDetail(detail) {

    if (!detail) return null;

    const bookId = detail.dataset.bookId;

    if (bookId) {
        return getBook(bookId);
    }

    const titleElement = detail.querySelector(
        ".knowledge-detail-title"
    );

    const authorElement = detail.querySelector(
        ".knowledge-detail-author"
    );

    if (!titleElement || !authorElement) {
        return null;
    }

    const title = titleElement.textContent.trim();

    const author = authorElement.textContent.trim();

    return LIBRARY.books.find(
        book =>
            book.title === title &&
            book.author === author
    ) || null;

}
```

This is a recommended one-time improvement. It avoids ambiguity when different editions share the same title and author.

---

# 12. Testing and Verification

After adding a book, test the following functions.

### 12.1 Verify the book database

Open the browser console:

```javascript
window.LANGUAGE_STUDY_DATA.books
```

Find the new book:

```javascript
window.LANGUAGE_STUDY_DATA.books.find(
    book => book.id === "chomsky_aspects"
)
```

The result should be the complete book object.

### 12.2 Verify the book detail page

Navigate to:

```text
Study Room
    ↓
Linguistics Bookshelf
    ↓
Select the new book
```

Check:

- Title
- Author
- Publication information
- Book type
- Academic category
- Description
- Keywords
- Reading guide

### 12.3 Verify the original PDF

If `pdfUrl` is registered:

1. Open the PDF URL directly in the browser.
2. Confirm that the file is accessible.
3. Return to the book detail page.
4. Select `Open Original PDF`.
5. Test page navigation and zoom.
6. Close the reader.
7. Reopen it and check saved progress.

### 12.4 Verify the Reading Companion

If companion data is registered:

- Open the Reading Companion.
- Check the cover page.
- Check the table of contents.
- Open each chapter.
- Test previous and next navigation.
- Confirm that reading progress is saved.

### 12.5 Verify the JavaScript modules

Run the following commands in the browser console:

```javascript
typeof window.LANGUAGE_STUDY_DATA
```

```javascript
typeof window.LANGUAGE_KNOWLEDGE_PANELS
```

```javascript
typeof window.LANGUAGE_BOOK_READER
```

```javascript
typeof window.LANGUAGE_PDF_READER
```

Expected result:

```text
"object"
```

Also check for:

- `ReferenceError`
- `TypeError`
- `404 Not Found`
- PDF worker errors
- PDF loading failures

After modifying files, use `Ctrl + Shift + R` to force a browser refresh.

---

# 13. Common Update Scenarios

Use this table to decide which files need to be modified.

| Task | Files to modify |
|---|---|
| Add a new book | `language_data.js` |
| Change a book's title or author | `language_data.js` |
| Change publication information | `language_data.js` |
| Change description and keywords | `language_data.js` |
| Add an original PDF | Resource directory + `language_data.js` |
| Add a Reading Companion | `language_reader_data.js` |
| Add a new book type | `language_panels.js` |
| Add a language-specific resource | `language_data.js` |
| Change the original PDF rendering logic | `language_pdf_reader.js` |
| Change the companion reading logic | `language_reader.js` |
| Change the page structure or module loading | `Language.html` |
| Add actual cover-image rendering | `language_panels.js` + CSS |
| Add terminology and original-page mapping | A future terminology data module |

For ordinary book additions, these files should not need to be changed:

```text
language.js
language_pdf_reader.js
language_reader.js
Language.html
index.html
```

The main rule is:

**Modify data, not interface logic, whenever possible.**

---

# 14. Troubleshooting

| Problem | Possible cause | Suggested check |
|---|---|---|
| A book does not appear | Book object was not added correctly | Inspect `DATA.books` |
| Book detail cannot be opened | Invalid or duplicate ID | Check the book ID |
| PDF button does not appear | `pdfUrl` is missing | Check the book object |
| PDF returns 404 | Incorrect relative path | Check folder name and capitalization |
| PDF opens directly but embedded reader fails | PDF.js or Worker loading issue | Check Console and network requests |
| Reading Companion button is missing | No matching companion data | Check `READER_DATA.books[bookId]` |
| Reading Companion opens incorrectly | ID mismatch or invalid page structure | Compare both data files |
| Search does not find a book | Keywords or metadata are missing | Add relevant search terms |
| A module is unavailable | Script failed to initialize | Inspect the first Console error |

### Important path convention

These two directory names are different:

```text
linguistic-terms
linguistics-terms
```

Make sure the registered path matches the actual directory.

GitHub Pages paths are case-sensitive.

### Script loading

`Language.html` must load the relevant data before the modules that consume it.

Keep the dependencies consistent:

```text
language_data.js
       ↓
language_reader_data.js
       ↓
language.js
       ↓
language_panels.js
       ↓
language_reader.js
       ↓
language_pdf_reader.js
```

The PDF reader uses an ES module and is loaded separately using `type="module"`.

---

# 15. Maintenance Checklist

Use this checklist whenever a new book is added.

## A. Bibliographic information

- [ ] Confirm the title and author.
- [ ] Verify the edition and publication year.
- [ ] Determine the `itemType`.
- [ ] Assign a unique ID.
- [ ] Write an original description.
- [ ] Add relevant keywords.
- [ ] Write a reading recommendation.

## B. Resources

- [ ] Create the book resource directory if needed.
- [ ] Add a cover image if available.
- [ ] Add an original PDF if available and authorized.
- [ ] Verify all relative paths.
- [ ] Check copyright and publication permissions.

## C. Database registration

- [ ] Add the book to `DATA.books`.
- [ ] Register `pdfUrl` if a PDF is available.
- [ ] Add `entryCount`, `partCount`, or `tableOfContents` where appropriate.
- [ ] Check that the ID is unique.
- [ ] Check the book type label if a new type was introduced.

## D. Reading content

- [ ] Decide whether the book needs a Reading Companion.
- [ ] Add the matching book ID to `language_reader_data.js`.
- [ ] Add the companion chapter list.
- [ ] Write original explanatory content.
- [ ] Verify chapter page indices.

## E. Testing

- [ ] Confirm that the book appears on the bookshelf.
- [ ] Confirm the bibliographic details.
- [ ] Test the PDF reader if available.
- [ ] Test the Reading Companion if available.
- [ ] Check the browser console.
- [ ] Test the deployed GitHub Pages version.

---

# 16. Copyright and Deployment

LuLinogic is designed as a personal academic knowledge space.

Before placing a full book PDF in a public repository, verify that the file is legally available for redistribution.

A book that you personally own or have access to is not automatically authorized for public distribution.

When redistribution is not permitted:

- Keep the personal PDF outside the public repository.
- Load it locally for personal study where appropriate.
- Publish only bibliographic information and original notes.
- Link to legally accessible external sources when available.

For GitHub Pages deployment, remember:

- The project uses relative paths.
- Paths and capitalization must match the repository.
- The PDF reader requires HTTP or HTTPS.
- External PDF.js CDN resources must be reachable.
- Public repository files may be accessible to anyone.

---

## Final Maintenance Principle

The book system follows three separate layers:

### 1. Bibliographic Database

```text
language_data.js
```

Stores what the book is.

### 2. Original Sources

```text
assets/books/
```

Stores or references the original materials.

### 3. Knowledge Layer

```text
language_reader_data.js
```

Stores original explanations, reading guides, and educational notes.

These layers should remain connected through a stable book ID, but their responsibilities should not be mixed.

The long-term goal is to develop LuLinogic from a personal digital bookshelf into a structured academic knowledge system with bibliographic management, original-source reading, terminology indexing, page references, and theoretical cross-references.