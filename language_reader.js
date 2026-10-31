/*
 * LuLinogic — Phase 4 Interactive Book Reader
 * Version: 1.0.0
 *
 * Features:
 * - Double-page reading layout
 * - Previous / Next page
 * - Mouse click page navigation
 * - Keyboard left/right navigation
 * - Touch swipe
 * - Contents and chapter navigation
 * - Designed book cover
 * - Reading progress
 * - Local progress persistence
 * - Original educational reading companions
 *
 * No third-party libraries.
 */

(function () {

  "use strict";


  /* =========================================
     1. DEPENDENCIES
  ========================================= */

  const LIBRARY =
    window.LANGUAGE_STUDY_DATA;

  const READER_DATA =
    window.LANGUAGE_READER_DATA;


  if (!LIBRARY || !LIBRARY.books) {

    console.error(
      "[LuLinogic Reader] Book catalogue is unavailable."
    );

    return;

  }


  if (!READER_DATA || !READER_DATA.books) {

    console.error(
      "[LuLinogic Reader] Reader companion data is unavailable."
    );

    return;

  }


  const STORAGE_KEY =
    READER_DATA.storageKey ||
    "lulinogic.reader.progress.v1";


  /* =========================================
     2. STATE
  ========================================= */

  const state = {

    active: false,

    book: null,

    companion: null,

    pageIndex: 0,

    mode: "pages",

    animating: false,

    animationClass: "",

    returnDetail: null,

    touchStartX: null,

    ignoreNextPageClick: false

  };


  /* =========================================
     3. HELPERS
  ========================================= */

  function el(tag, className, text) {

    const node = document.createElement(tag);

    if (className) {

      node.className = className;

    }

    if (
      text !== undefined &&
      text !== null
    ) {

      node.textContent = String(text);

    }

    return node;

  }


  function button(text, className, handler) {

    const node = el(
      "button",
      className,
      text
    );

    node.type = "button";

    node.addEventListener(
      "click",
      handler
    );

    return node;

  }


  function getReaderElements() {

    return {

      content: document.getElementById(
        "knowledge-workspace-content"
      ),

      layout: document.getElementById(
        "study-exploration-layout"
      )

    };

  }


  function getBook(bookId) {

    return LIBRARY.books.find(
      book => book.id === bookId
    ) || null;

  }


  function getCompanion(bookId) {

    return READER_DATA.books[bookId] || null;

  }


  function totalPages() {

    return state.companion.pages.length;

  }


  function clampPage(index) {

    const max = Math.max(
      0,
      totalPages() - 2
    );

    let value = Math.max(
      0,
      Math.min(max, index)
    );

    // A spread begins on an even-numbered array index.
    value = Math.floor(value / 2) * 2;

    return value;

  }


  /* =========================================
     4. LOCAL READING PROGRESS
  ========================================= */

  function readProgress() {

    try {

      const raw = localStorage.getItem(
        STORAGE_KEY
      );

      if (!raw) return {};

      const parsed = JSON.parse(raw);

      return (
        parsed &&
        typeof parsed === "object"
      )
        ? parsed
        : {};

    } catch (error) {

      console.warn(
        "[LuLinogic Reader] Cannot read local progress.",
        error
      );

      return {};

    }

  }


  function getSavedPage(bookId) {

    const all = readProgress();

    const item = all[bookId];

    if (!item) return 0;

    const page = Number(item.pageIndex);

    return Number.isFinite(page)
      ? Math.max(0, page)
      : 0;

  }


  function saveProgress() {

    if (!state.book) return;

    try {

      const all = readProgress();

      all[state.book.id] = {

        pageIndex: state.pageIndex,

        totalPages: totalPages(),

        updatedAt: new Date().toISOString()

      };


      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(all)
      );

    } catch (error) {

      console.warn(
        "[LuLinogic Reader] Progress could not be saved.",
        error
      );

    }

  }


  function getProgressPercent() {

    const total = totalPages();

    if (!total) return 0;

    const completed = Math.min(
      total,
      state.pageIndex + 2
    );

    return Math.round(
      completed / total * 100
    );

  }


  /* =========================================
     5. FIND BOOK DETAIL PAGE
  ========================================= */

  function findBookFromDetail(detail) {

    if (!detail) return null;


    const titleElement = detail.querySelector(
      ".knowledge-detail-title"
    );

    const authorElement = detail.querySelector(
      ".knowledge-detail-author"
    );


    if (!titleElement || !authorElement) {
      return null;
    }


    const title =
      titleElement.textContent.trim();

    const author =
      authorElement.textContent.trim();


    return LIBRARY.books.find(
      book =>
        book.title === title &&
        book.author === author
    ) || null;

  }


  /* =========================================
     6. ADD READER BUTTON TO BOOK DETAILS
  ========================================= */

    /* =========================================
     6. ADD READER BUTTON TO BOOK DETAILS
  ========================================= */

  function enhanceBookDetail(detail) {

    if (
      !detail ||
      detail.dataset.readerEnhanced === "true"
    ) {
      return;
    }

    /*
     * Only enhance actual book detail pages.
     */

    if (
      !detail.querySelector(".knowledge-book-cover")
    ) {
      return;
    }

    const book = findBookFromDetail(detail);

    if (!book) {
      return;
    }

    /*
     * A companion button should only be displayed
     * when original companion pages exist.
     */

    const companion = getCompanion(book.id);

    if (
      !companion ||
      !Array.isArray(companion.pages) ||
      companion.pages.length === 0
    ) {
      return;
    }

    const originalNotice = detail.querySelector(
      ".knowledge-phase-notice"
    );

    const actions = el(
      "div",
      "reader-launch-actions"
    );

    const openButton = button(
      "Open Reading Companion →",
      "reader-launch-button",
      function () {

        openReader(book.id);

      }
    );

    openButton.dataset.readerOpen = book.id;

    const savedPage = getSavedPage(book.id);

    const resumeLabel = savedPage > 0
      ? "Saved progress available"
      : "Start with the introduction";

    actions.append(
      openButton,
      el(
        "span",
        "reader-progress-hint",
        resumeLabel
      )
    );

    if (originalNotice) {

      originalNotice.insertAdjacentElement(
        "afterend",
        actions
      );

    } else {

      detail.appendChild(actions);

    }

    detail.dataset.readerEnhanced = "true";

  }


  function scanBookDetails() {

    const container = document.getElementById(
      "knowledge-workspace-content"
    );

    if (!container) return;


    const details = container.querySelectorAll(
      ".knowledge-detail-page"
    );


    details.forEach(enhanceBookDetail);

  }


  /* =========================================
     7. OBSERVE PHASE 3 INTERFACE
  ========================================= */

  function startDetailObserver() {

    const observer = new MutationObserver(
      function () {

        scanBookDetails();

      }
    );


    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true
      }
    );


    scanBookDetails();

  }


  /* =========================================
     8. READER HEADER
  ========================================= */

function renderHeader(reader) {

  const header = el(
    "div",
    "book-reader-header"
  );

  const identity = el(
    "div",
    "book-reader-identity"
  );

  const monogram = el(
    "div",
    "book-reader-monogram",
    "L"
  );

  const identityCopy = el(
    "div",
    "book-reader-identity-copy"
  );

  identityCopy.append(
    el(
      "span",
      "reader-kicker",
      "LU L I N O G I C · DIGITAL LIBRARY"
    ),

    el(
      "strong",
      "reader-book-title",
      state.book.title
    ),

    el(
      "span",
      "reader-book-author",
      state.book.author
    )
  );

  identity.append(
    monogram,
    identityCopy
  );

  const toolbar = el(
    "div",
    "book-reader-toolbar"
  );

  const returnButton = button(
    "← Book record",
    "reader-toolbar-button reader-return-button",
    closeReader
  );

  const coverButton = button(
    "Cover",
    "reader-toolbar-button",
    function () {
      state.mode = "cover";
      renderCurrentView();
    }
  );

  const tocButton = button(
    "Contents",
    "reader-toolbar-button",
    function () {
      state.mode = "contents";
      renderCurrentView();
    }
  );

  const pagesButton = button(
    "Read",
    "reader-toolbar-button",
    function () {
      state.mode = "pages";
      renderCurrentView();
    }
  );

  coverButton.dataset.readerMode = "cover";
  tocButton.dataset.readerMode = "contents";
  pagesButton.dataset.readerMode = "pages";

  toolbar.append(
    returnButton,
    coverButton,
    tocButton,
    pagesButton
  );

  header.append(
    identity,
    toolbar
  );

  reader.appendChild(header);
}

  /* =========================================
     9. BOOK COVER VIEW
  ========================================= */

  function renderCoverView(viewport) {

    const cover = el(
      "section",
      "reader-cover-view"
    );


    const savedPage = getSavedPage(
      state.book.id
    );


    const coverArt = el(
      "div",
      "reader-designed-cover"
    );


    coverArt.append(
      el(
        "span",
        "reader-cover-series",
        "LU L I N O G I C"
      ),

      el(
        "span",
        "reader-cover-edition",
        "A READER'S COMPANION"
      ),

      el(
        "strong",
        "reader-cover-book-title",
        state.book.title
      ),

      el(
        "span",
        "reader-cover-book-author",
        state.book.author
      ),

      el(
        "span",
        "reader-cover-footer",
        state.book.category
      )
    );


    const actions = el(
      "div",
      "reader-cover-actions"
    );


    const resume = button(
      savedPage > 0
        ? "Continue reading"
        : "Open reading companion",

      "reader-primary-button",

      function () {

        state.mode = "pages";

        if (savedPage > 0) {

          state.pageIndex = clampPage(savedPage);

        } else {

          state.pageIndex = 0;

        }

        renderCurrentView();

      }
    );


    const beginning = button(
      "Start from the beginning",
      "reader-secondary-button",
      function () {

        state.pageIndex = 0;

        saveProgress();

        state.mode = "pages";

        renderCurrentView();

      }
    );


    const toc = button(
      "View contents",
      "reader-secondary-button",
      function () {

        state.mode = "contents";

        renderCurrentView();

      }
    );


    actions.append(
      resume,
      beginning,
      toc
    );


    cover.append(
      coverArt,
      actions
    );


    viewport.appendChild(cover);

  }


  /* =========================================
     10. TABLE OF CONTENTS
  ========================================= */

  function renderContentsView(viewport) {

    const container = el(
      "section",
      "reader-contents-view"
    );


    container.append(
      el(
        "span",
        "reader-kicker",
        "TABLE OF CONTENTS"
      ),

      el(
        "h3",
        "reader-contents-title",
        "A guide to this reading companion"
      ),

      el(
        "p",
        "reader-contents-description",
        "Select a chapter to jump to its opening spread."
      )
    );


    const list = el(
      "div",
      "reader-toc-list"
    );


    state.companion.chapters.forEach(
      (chapter, index) => {

        const row = button(
          "",
          "reader-toc-item",
          function () {

            state.pageIndex = clampPage(
              chapter.page
            );

            state.mode = "pages";

            saveProgress();

            renderCurrentView();

          }
        );


        const number = el(
          "span",
          "reader-toc-number",
          String(index + 1).padStart(2, "0")
        );


        const copy = el(
          "span",
          "reader-toc-copy"
        );

        copy.append(
          el(
            "strong",
            "",
            chapter.title
          ),

          el(
            "small",
            "",
            "Beginning on page " +
            (chapter.page + 1)
          )
        );


        row.append(
          number,
          copy,
          el(
            "span",
            "reader-toc-arrow",
            "→"
          )
        );


        list.appendChild(row);

      }
    );


    container.appendChild(list);

    viewport.appendChild(container);

  }


  /* =========================================
     11. PAGE CONTENT
  ========================================= */

  function renderOnePage(page, pageIndex, side) {

    const article = el(
      "article",
      "reader-page reader-page-" + side
    );


    article.dataset.pageIndex = pageIndex;

    article.dataset.pageSide = side;


    /* Page header */

    const top = el(
      "div",
      "reader-page-top"
    );


    top.append(
      el(
        "span",
        "reader-page-section",
        page.section
      ),

      el(
        "span",
        "reader-page-series",
        "LANGUAGE STUDIES"
      )
    );


    /* Page body */

    const body = el(
      "div",
      "reader-page-body"
    );


    body.appendChild(
      el(
        "h3",
        "reader-page-title",
        page.title
      )
    );


    (page.paragraphs || []).forEach(
      paragraph => {

        body.appendChild(
          el(
            "p",
            "reader-page-paragraph",
            paragraph
          )
        );

      }
    );


    if (
      page.bullets &&
      page.bullets.length
    ) {

      const list = el(
        "ul",
        "reader-page-list"
      );


      page.bullets.forEach(item => {

        list.appendChild(
          el("li", "", item)
        );

      });


      body.appendChild(list);

    }


    if (page.note) {

      body.appendChild(
        el(
          "div",
          "reader-page-note",
          page.note
        )
      );

    }


    /* Page footer */

    const footer = el(
      "div",
      "reader-page-footer"
    );


    footer.append(
      el(
        "span",
        "",
        "LU L I N O G I C"
      ),

      el(
        "span",
        "",
        String(pageIndex + 1).padStart(2, "0")
      )
    );


    article.append(
      top,
      body,
      footer
    );


    article.setAttribute(
      "aria-label",
      "Page " + (pageIndex + 1) + ": " + page.title
    );


    return article;

  }


  /* =========================================
     12. DOUBLE-PAGE SPREAD
  ========================================= */

  function renderPageSpread(viewport) {

    const spread = el(
      "div",
      "reader-spread"
    );


    if (state.animationClass) {

      spread.classList.add(
        state.animationClass
      );

    }


    const pages = state.companion.pages;

    const leftIndex = state.pageIndex;

    const rightIndex = leftIndex + 1;


    const leftPage = pages[leftIndex];

    const rightPage = pages[rightIndex];


    if (leftPage) {

      spread.appendChild(
        renderOnePage(
          leftPage,
          leftIndex,
          "left"
        )
      );

    }


    if (rightPage) {

      spread.appendChild(
        renderOnePage(
          rightPage,
          rightIndex,
          "right"
        )
      );

    } else {

      const blank = el(
        "article",
        "reader-page reader-page-right reader-page-blank"
      );

      blank.append(
        el(
          "span",
          "reader-blank-mark",
          "✦"
        ),

        el(
          "span",
          "reader-blank-label",
          "END OF COMPANION"
        )
      );

      spread.appendChild(blank);

    }


    /* Mouse click on the left/right page */

    spread.addEventListener(
      "click",
      function (event) {

        if (state.ignoreNextPageClick) {

          state.ignoreNextPageClick = false;

          return;

        }


        if (window.getSelection &&
            String(window.getSelection())) {

          return;

        }


        const target = event.target.closest(
          ".reader-page"
        );

        if (!target) return;


        if (
          target.classList.contains(
            "reader-page-left"
          )
        ) {

          turnPage("previous");

        } else {

          turnPage("next");

        }

      }
    );


    /* Touch swipe */

    spread.addEventListener(
      "pointerdown",
      function (event) {

        state.touchStartX = event.clientX;

      }
    );


    spread.addEventListener(
      "pointerup",
      function (event) {

        if (state.touchStartX === null) return;


        const distance =
          event.clientX - state.touchStartX;


        state.touchStartX = null;


        if (Math.abs(distance) < 45) return;


        state.ignoreNextPageClick = true;


        window.setTimeout(function () {

          state.ignoreNextPageClick = false;

        }, 450);


        if (distance < 0) {

          turnPage("next");

        } else {

          turnPage("previous");

        }

      }
    );


    viewport.appendChild(spread);


    if (state.animationClass) {

      window.setTimeout(function () {

        const currentSpread = viewport.querySelector(
          ".reader-spread"
        );

        if (currentSpread) {

          currentSpread.classList.remove(
            state.animationClass
          );

        }

        state.animationClass = "";

        state.animating = false;

        updateNavigation();

      }, 390);

    }

  }


  /* =========================================
     13. NAVIGATION
  ========================================= */

  function updateNavigation() {

    const previous = document.getElementById(
      "reader-previous"
    );

    const next = document.getElementById(
      "reader-next"
    );

    const counter = document.getElementById(
      "reader-page-counter"
    );

    const progress = document.getElementById(
      "reader-progress-fill"
    );

    const progressText = document.getElementById(
      "reader-progress-text"
    );


    if (!previous || !next) return;


    previous.disabled =
      state.pageIndex <= 0 ||
      state.animating;


    next.disabled =
      state.pageIndex + 2 >= totalPages() ||
      state.animating;


    const first = state.pageIndex + 1;

    const last = Math.min(
      state.pageIndex + 2,
      totalPages()
    );


    counter.textContent =
      first + "–" + last +
      " / " + totalPages();


    const percent = getProgressPercent();


    progress.style.width =
      percent + "%";


    progressText.textContent =
      percent + "% completed";


  }


  function turnPage(direction) {

    if (
      !state.active ||
      state.mode !== "pages" ||
      state.animating
    ) {

      return;

    }


    let target = state.pageIndex;


    if (direction === "next") {

      if (
        state.pageIndex + 2 >= totalPages()
      ) {

        return;

      }

      target += 2;

    } else {

      if (state.pageIndex <= 0) {

        return;

      }

      target -= 2;

    }


    state.animating = true;

    state.pageIndex = clampPage(target);

    state.animationClass =
      direction === "next"
        ? "reader-turn-next"
        : "reader-turn-previous";


    saveProgress();

    renderCurrentView();

  }


  /* =========================================
     14. PAGE NAVIGATION BAR
  ========================================= */

  function createNavigationBar(reader) {

    const nav = el(
      "div",
      "reader-navigation"
    );


    const previous = button(
      "← Previous Page",
      "reader-navigation-button",
      function () {

        turnPage("previous");

      }
    );


    previous.id = "reader-previous";


    const center = el(
      "div",
      "reader-navigation-center"
    );


    const counter = el(
      "span",
      "reader-page-counter",
      "1–2 / 6"
    );

    counter.id = "reader-page-counter";


    const progressTrack = el(
      "div",
      "reader-progress-track"
    );


    const progressFill = el(
      "div",
      "reader-progress-fill"
    );

    progressFill.id = "reader-progress-fill";

    progressTrack.appendChild(progressFill);


    const progressText = el(
      "span",
      "reader-progress-text",
      "0% completed"
    );

    progressText.id =
      "reader-progress-text";


    center.append(
      counter,
      progressTrack,
      progressText
    );


    const next = button(
      "Next Page →",
      "reader-navigation-button reader-navigation-next",
      function () {

        turnPage("next");

      }
    );


    next.id = "reader-next";


    nav.append(
      previous,
      center,
      next
    );


    reader.appendChild(nav);


    return nav;

  }


  /* =========================================
     15. VIEWPORT
  ========================================= */

  function renderCurrentView() {

    const viewport = document.getElementById(
      "reader-viewport"
    );

    if (!viewport) return;


    viewport.replaceChildren();


    const navigation = document.querySelector(
      ".reader-navigation"
    );


    if (state.mode === "cover") {

      renderCoverView(viewport);

      if (navigation) navigation.hidden = true;

      updateModeButtons();

      return;

    }


    if (state.mode === "contents") {

      renderContentsView(viewport);

      if (navigation) navigation.hidden = true;

      updateModeButtons();

      return;

    }


    renderPageSpread(viewport);

    if (navigation) navigation.hidden = false;

    updateNavigation();

    updateModeButtons();

    saveProgress();

  }


  function updateModeButtons() {

    document.querySelectorAll(
      ".reader-toolbar-button"
    ).forEach(button => {

      const active =
        button.dataset.readerMode ===
        state.mode;


      button.setAttribute(
        "aria-pressed",
        active ? "true" : "false"
      );

    });

  }


  /* =========================================
     16. READER INTERFACE
  ========================================= */

  function renderReaderInterface() {

    const { content, layout } =
      getReaderElements();


    if (!content) {

      console.error(
        "[LuLinogic Reader] Knowledge workspace content not found."
      );

      return false;

    }


    content.replaceChildren();

    content.classList.add("is-book-reading");


    if (layout) {

      layout.classList.add(
        "is-reader-mode"
      );

    }


    const reader = el(
      "section",
      "book-reader-app"
    );


    reader.id = "language-book-reader";

    reader.setAttribute(
      "aria-label",
      "Interactive book reader"
    );


    renderHeader(reader);


    const notice = el(
      "div",
      "reader-content-notice",
      READER_DATA.contentNotice
    );


    const viewport = el(
      "div",
      "reader-viewport"
    );

    viewport.id = "reader-viewport";


    reader.append(
      notice,
      viewport
    );


    createNavigationBar(reader);


    const footnote = el(
      "p",
      "reader-bottom-note",
      "Progress is saved locally in this browser. The original study-room illustration remains visible beside the reader."
    );


    reader.appendChild(footnote);

    content.appendChild(reader);


    return true;

  }


  /* =========================================
     17. OPEN READER
  ========================================= */

  function openReader(bookId) {

    const book = getBook(bookId);

    const companion = getCompanion(bookId);


    if (!book || !companion) {

      console.warn(
        "[LuLinogic Reader] Missing reader content for:",
        bookId
      );

      return false;

    }


    const { content } = getReaderElements();

    if (!content) return false;


    const detail = content.querySelector(
      ".knowledge-detail-page"
    );


    if (detail) {

      state.returnDetail =
        detail.cloneNode(true);

    } else {

      state.returnDetail = null;

    }


    state.book = book;

    state.companion = companion;

    state.pageIndex = clampPage(
      getSavedPage(bookId)
    );

    state.mode = "pages";

    state.animating = false;

    state.animationClass = "";

    state.active = true;


    if (!renderReaderInterface()) {

      state.active = false;

      return false;

    }


    renderCurrentView();


    console.info(
      "[LuLinogic Reader] Opened:",
      book.title
    );


    return true;

  }


  /* =========================================
     18. RETURN TO BOOK DETAIL
  ========================================= */

function closeReader() {

  if (!state.active) return;

  const { content, layout } =
    getReaderElements();

  saveProgress();

  if (content) {

    content.classList.remove(
      "is-book-reading"
    );

    if (state.returnDetail) {

      const restored =
        state.returnDetail.cloneNode(true);

      restored.removeAttribute(
        "data-reader-enhanced"
      );

      const oldActions =
        restored.querySelector(
          ".reader-launch-actions"
        );

      if (oldActions) {
        oldActions.remove();
      }

      content.replaceChildren(restored);

      // Recreate the launch button and its event listener.
      enhanceBookDetail(restored);

    } else {

      content.replaceChildren();

    }

  }

  if (layout) {

    layout.classList.remove(
      "is-reader-mode"
    );

  }

  state.active = false;
  state.mode = "pages";
  state.animating = false;
  state.animationClass = "";

  state.book = null;
  state.companion = null;
  state.pageIndex = 0;

  state.returnDetail = null;

  window.setTimeout(function () {

    const restoredButton =
      content &&
      content.querySelector(
        "[data-reader-open]"
      );

    if (restoredButton) {

      restoredButton.focus({
        preventScroll: true
      });

    }

  }, 0);

}
  /* =========================================
     19. KEYBOARD NAVIGATION
  ========================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (!state.active) return;


      const target = event.target;

      const editing =
        target &&
        (
          target.isContentEditable ||
          /INPUT|TEXTAREA|SELECT/.test(target.tagName)
        );


      if (editing) return;


      if (event.key === "ArrowRight") {

        event.preventDefault();

        turnPage("next");

      }


      if (event.key === "ArrowLeft") {

        event.preventDefault();

        turnPage("previous");

      }


      if (event.key === "Escape") {

        event.preventDefault();

        closeReader();

      }

    }
  );


  /* =========================================
     20. PUBLIC API
  ========================================= */

  window.LANGUAGE_BOOK_READER = Object.freeze({

    open: openReader,

    close: closeReader,

    next: function () {
      turnPage("next");
    },

    previous: function () {
      turnPage("previous");
    },

    get active() {
      return state.active;
    },

    get bookId() {
      return state.book
        ? state.book.id
        : null;
    },

    get pageIndex() {
      return state.pageIndex;
    }

  });

document.addEventListener(
  "language:collectionchange",
  function () {

    if (state.active) {

      saveProgress();

      state.active = false;

      state.animating = false;

      state.book = null;

      state.companion = null;

      state.returnDetail = null;

    }

  }
);

document.addEventListener(
  "click",
  function (event) {

    if (
      event.target.closest(
        ".knowledge-close-button"
      )
    ) {

      if (state.active) {

        saveProgress();

        state.active = false;

        state.book = null;

        state.companion = null;

        state.returnDetail = null;

      }

    }

  }
);
  /* =========================================
     21. INITIALIZATION
  ========================================= */

  function initialize() {

    startDetailObserver();

    console.info(
      "[LuLinogic Reader] Reader module initialized."
    );

  }


  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );

  } else {

    initialize();

  }


})();