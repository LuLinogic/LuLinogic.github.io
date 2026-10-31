
/*
 * LuLinogic — Original PDF Reader
 * Version: 1.0.0
 *
 * Features:
 * - Original PDF document rendering
 * - Responsive single-page / double-page layout
 * - Previous / Next navigation
 * - Direct page navigation
 * - Zoom in / Zoom out / Fit width
 * - Local reading progress
 * - Escape key to return
 * - Integration with Phase 3 Knowledge Panels
 * - Independent from Reading Companion
 *
 * PDF engine: Mozilla PDF.js 6.4.299
 */

// =========================================
// 1. IMPORT PDF.JS
// =========================================

import * as pdfjsLib from
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299/build/pdf.mjs";


const PDFJS_BASE =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  PDFJS_BASE + "/build/pdf.worker.mjs";


// =========================================
// 2. INITIALIZATION
// =========================================

(function (global) {

  "use strict";

  const STORAGE_KEY =
    "lulinogic.original-pdf.progress.v1";


  const state = {

    active: false,

    book: null,

    pdf: null,

    loadingTask: null,

    returnDetail: null,

    pageNumber: 1,

    zoomFactor: 1,

    doublePage: false,

    renderToken: 0,

    renderTasks: [],

    resizeTimer: null

  };


  // =======================================
  // 3. DOM HELPERS
  // =======================================

  function make(tag, className, text) {

    const node = document.createElement(tag);

    if (className) {
      node.className = className;
    }

    if (text !== undefined && text !== null) {
      node.textContent = String(text);
    }

    return node;

  }


  function makeButton(text, className, callback) {

    const node = make(
      "button",
      className,
      text
    );

    node.type = "button";

    node.addEventListener(
      "click",
      callback
    );

    return node;

  }


  function getContent() {

    return document.getElementById(
      "knowledge-workspace-content"
    );

  }


  function getLayout() {

    return document.getElementById(
      "study-exploration-layout"
    );

  }


  function getBook(bookId) {

    const library = global.LANGUAGE_STUDY_DATA;

    if (!library || !Array.isArray(library.books)) {
      return null;
    }

    return library.books.find(
      item => item.id === bookId
    ) || null;

  }


  // =======================================
  // 4. READING PROGRESS
  // =======================================

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
      ) ? parsed : {};

    } catch (error) {

      console.warn(
        "[LuLinogic PDF] Cannot read progress.",
        error
      );

      return {};

    }

  }


  function getSavedProgress(bookId) {

    const all = readProgress();

    return all[bookId] || {
      pageNumber: 1,
      zoomFactor: 1
    };

  }


  function saveProgress() {

    if (!state.book || !state.pdf) {
      return;
    }

    try {

      const all = readProgress();

      all[state.book.id] = {

        pageNumber: state.pageNumber,

        zoomFactor: state.zoomFactor,

        totalPages: state.pdf.numPages,

        updatedAt: new Date().toISOString()

      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(all)
      );

    } catch (error) {

      console.warn(
        "[LuLinogic PDF] Progress could not be saved.",
        error
      );

    }

  }


  // =======================================
  // 5. READER STATUS
  // =======================================

  function setStatus(message) {

    const status = document.getElementById(
      "pdf-reader-status"
    );

    if (status) {
      status.textContent = message;
    }

  }


  // =======================================
  // 6. BUILD READER INTERFACE
  // =======================================

  function renderReaderShell() {

    const content = getContent();

    if (!content) {
      return false;
    }


    content.replaceChildren();

    content.classList.add(
      "is-pdf-reading"
    );


    const layout = getLayout();

    if (layout) {

      layout.classList.add(
        "is-pdf-reader-mode"
      );

    }


    const app = make(
      "section",
      "pdf-reader-app"
    );

    app.id = "language-original-pdf-reader";

    app.setAttribute(
      "aria-label",
      "Original PDF book reader"
    );


    // -------------------------------
    // Header
    // -------------------------------

    const header = make(
      "header",
      "pdf-reader-header"
    );


    const identity = make(
      "div",
      "pdf-reader-identity"
    );


    const copy = make(
      "div",
      "pdf-reader-identity-copy"
    );

    copy.append(
      make(
        "span",
        "pdf-reader-kicker",
        "LU L I N O G I C · ORIGINAL TEXT"
      ),

      make(
        "strong",
        "pdf-reader-book-title",
        state.book.title
      ),

      make(
        "span",
        "pdf-reader-book-author",
        state.book.author
      )
    );


    const back = makeButton(
      "← Book Record",
      "pdf-reader-back-button",
      closeReader
    );

    back.setAttribute(
      "aria-label",
      "Return to book details"
    );


    identity.appendChild(copy);

    header.append(
      identity,
      back
    );


    // -------------------------------
    // Toolbar
    // -------------------------------

    const toolbar = make(
      "div",
      "pdf-reader-toolbar"
    );


    const navigation = make(
      "div",
      "pdf-reader-page-controls"
    );


    const previous = makeButton(
      "←",
      "pdf-reader-control-button",
      () => movePage("previous")
    );

    previous.id = "pdf-reader-previous";

    previous.setAttribute(
      "aria-label",
      "Previous page"
    );


    const pageInput = document.createElement("input");

    pageInput.type = "number";

    pageInput.min = "1";

    pageInput.value = String(state.pageNumber);

    pageInput.id = "pdf-reader-page-input";

    pageInput.className = "pdf-reader-page-input";

    pageInput.setAttribute(
      "aria-label",
      "Enter page number"
    );


    const pageCount = make(
      "span",
      "pdf-reader-page-count",
      "/ ..."
    );

    pageCount.id = "pdf-reader-page-count";


    const jump = makeButton(
      "Go",
      "pdf-reader-control-button pdf-reader-go-button",
      jumpToPage
    );


    pageInput.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {
          jumpToPage();
        }

      }
    );


    const next = makeButton(
      "→",
      "pdf-reader-control-button",
      () => movePage("next")
    );

    next.id = "pdf-reader-next";

    next.setAttribute(
      "aria-label",
      "Next page"
    );


    navigation.append(
      previous,
      pageInput,
      pageCount,
      jump,
      next
    );


    // -------------------------------
    // Zoom controls
    // -------------------------------

    const zoomControls = make(
      "div",
      "pdf-reader-zoom-controls"
    );


    const zoomOut = makeButton(
      "−",
      "pdf-reader-control-button",
      () => changeZoom(-0.15)
    );

    zoomOut.setAttribute(
      "aria-label",
      "Zoom out"
    );


    const zoomLabel = make(
      "span",
      "pdf-reader-zoom-label",
      "100%"
    );

    zoomLabel.id = "pdf-reader-zoom-label";


    const zoomIn = makeButton(
      "+",
      "pdf-reader-control-button",
      () => changeZoom(0.15)
    );

    zoomIn.setAttribute(
      "aria-label",
      "Zoom in"
    );


    const fit = makeButton(
      "Fit",
      "pdf-reader-control-button pdf-reader-fit-button",
      fitPage
    );


    zoomControls.append(
      zoomOut,
      zoomLabel,
      zoomIn,
      fit
    );


    toolbar.append(
      navigation,
      zoomControls
    );


    // -------------------------------
    // Loading / status
    // -------------------------------

    const status = make(
      "div",
      "pdf-reader-status",
      "Preparing original document..."
    );

    status.id = "pdf-reader-status";

    status.setAttribute(
      "role",
      "status"
    );

    status.setAttribute(
      "aria-live",
      "polite"
    );


    // -------------------------------
    // PDF viewport
    // -------------------------------

    const viewport = make(
      "div",
      "pdf-reader-viewport"
    );

    viewport.id = "pdf-reader-viewport";


    // -------------------------------
    // Footer
    // -------------------------------

    const footer = make(
      "footer",
      "pdf-reader-footer"
    );

    footer.append(
      make(
        "span",
        "",
        "ORIGINAL PDF EDITION"
      ),

      make(
        "span",
        "",
        "Reading progress is stored in this browser."
      )
    );


    app.append(
      header,
      toolbar,
      status,
      viewport,
      footer
    );


    content.appendChild(app);

    return true;

  }


  // =======================================
  // 7. RENDER PDF DOCUMENT
  // =======================================

  async function renderSpread() {

    if (!state.active || !state.pdf) {
      return;
    }


    const viewer = document.getElementById(
      "pdf-reader-viewport"
    );

    if (!viewer) return;


    // Cancel unfinished page renders.

    state.renderTasks.forEach(task => {

      try {
        task.cancel();
      } catch (error) {
        // A completed task does not need cancellation.
      }

    });

    state.renderTasks = [];


    const token = ++state.renderToken;


    viewer.replaceChildren();


    const width = viewer.clientWidth || 1000;

    state.doublePage =
      width >= 960 &&
      state.pdf.numPages > 1;


    const pageNumbers = state.doublePage

      ? [
          state.pageNumber,
          state.pageNumber + 1
        ].filter(
          number => number <= state.pdf.numPages
        )

      : [state.pageNumber];


    const spread = make(
      "div",
      state.doublePage
        ? "pdf-reader-spread is-double-page"
        : "pdf-reader-spread is-single-page"
    );


    viewer.appendChild(spread);


    updateControls();


    setStatus(
      "Rendering original pages..."
    );


    const availableWidth = Math.max(
      260,
      width - 64
    );


    const slotWidth = state.doublePage

      ? Math.max(
          260,
          (availableWidth - 28) / 2
        )

      : availableWidth;


    const jobs = pageNumbers.map(
      async number => {

        const sheet = make(
          "article",
          "pdf-reader-sheet"
        );

        sheet.dataset.pageNumber = number;

        const label = make(
          "div",
          "pdf-reader-sheet-label",
          "PAGE " + number
        );

        const canvas = document.createElement("canvas");

        canvas.className = "pdf-reader-canvas";

        canvas.setAttribute(
          "aria-label",
          "PDF page " + number
        );


        sheet.append(
          label,
          canvas
        );

        spread.appendChild(sheet);


        const page = await state.pdf.getPage(number);

        if (token !== state.renderToken) return;


        const originalViewport = page.getViewport({
          scale: 1
        });


        const fitScale =
          slotWidth / originalViewport.width;


        const scale =
          fitScale * state.zoomFactor;


        const pdfViewport = page.getViewport({
          scale
        });


        const outputScale = Math.min(
          window.devicePixelRatio || 1,
          2
        );


        canvas.width = Math.floor(
          pdfViewport.width * outputScale
        );

        canvas.height = Math.floor(
          pdfViewport.height * outputScale
        );


        canvas.style.width =
          Math.floor(pdfViewport.width) + "px";

        canvas.style.height =
          Math.floor(pdfViewport.height) + "px";


        sheet.style.width =
          Math.floor(pdfViewport.width) + "px";


        const context = canvas.getContext(
          "2d",
          { alpha: false }
        );


        if (!context) {
          throw new Error(
            "Unable to create PDF canvas context."
          );
        }


        const transform = outputScale !== 1

          ? [
              outputScale,
              0,
              0,
              outputScale,
              0,
              0
            ]

          : null;


        const renderTask = page.render({

          canvasContext: context,

          transform,

          viewport: pdfViewport

        });


        state.renderTasks.push(renderTask);


        try {

          await renderTask.promise;

        } catch (error) {

          if (
            error &&
            error.name === "RenderingCancelledException"
          ) {
            return;
          }

          throw error;

        }


        if (token !== state.renderToken) {
          return;
        }

      }
    );


    try {

      await Promise.all(jobs);

      if (token !== state.renderToken) {
        return;
      }


      setStatus(
        "Original document loaded · " +
        state.pdf.numPages +
        " pages"
      );


      updateControls();

      saveProgress();


    } catch (error) {

      if (token !== state.renderToken) {
        return;
      }

      console.error(
        "[LuLinogic PDF] Page rendering failed.",
        error
      );

      setStatus(
        "Unable to render this page. Check the browser console for details."
      );

    }

  }


  // =======================================
  // 8. NAVIGATION CONTROLS
  // =======================================

  function updateControls() {

    if (!state.pdf) return;


    const total = state.pdf.numPages;

    const step = state.doublePage ? 2 : 1;


    const previous = document.getElementById(
      "pdf-reader-previous"
    );

    const next = document.getElementById(
      "pdf-reader-next"
    );

    const input = document.getElementById(
      "pdf-reader-page-input"
    );

    const count = document.getElementById(
      "pdf-reader-page-count"
    );

    const zoom = document.getElementById(
      "pdf-reader-zoom-label"
    );


    if (previous) {
      previous.disabled =
        state.pageNumber <= 1;
    }


    if (next) {
      next.disabled =
        state.pageNumber + step > total;
    }


    if (input) {

      input.value = String(
        state.pageNumber
      );

      input.max = String(total);

    }


    if (count) {

      const lastPage = Math.min(
        total,
        state.pageNumber +
        (state.doublePage ? 1 : 0)
      );

      count.textContent =
        "/ " + total +
        (state.doublePage
          ? " · " + state.pageNumber + "–" + lastPage
          : "");

    }


    if (zoom) {

      zoom.textContent =
        Math.round(state.zoomFactor * 100) + "%";

    }

  }


  function movePage(direction) {

    if (!state.pdf) return;


    const step = state.doublePage ? 2 : 1;

    let target = state.pageNumber;


    if (direction === "next") {

      if (target + step > state.pdf.numPages) {
        return;
      }

      target += step;

    } else {

      if (target <= 1) {
        return;
      }

      target = Math.max(
        1,
        target - step
      );

    }


    state.pageNumber = target;

    saveProgress();

    renderSpread();

  }


  function jumpToPage() {

    if (!state.pdf) return;


    const input = document.getElementById(
      "pdf-reader-page-input"
    );

    if (!input) return;


    const requested = Number(input.value);


    if (
      !Number.isInteger(requested) ||
      requested < 1 ||
      requested > state.pdf.numPages
    ) {

      input.value = String(state.pageNumber);

      return;

    }


    state.pageNumber = requested;

    saveProgress();

    renderSpread();

  }


  // =======================================
  // 9. ZOOM
  // =======================================

  function changeZoom(amount) {

    if (!state.pdf) return;


    state.zoomFactor = Math.max(
      0.5,
      Math.min(
        2.5,
        state.zoomFactor + amount
      )
    );


    updateControls();

    renderSpread();

  }


  function fitPage() {

    state.zoomFactor = 1;

    updateControls();

    renderSpread();

  }


  // =======================================
  // 10. OPEN ORIGINAL PDF
  // =======================================

  async function openReader(bookId) {

    const book = getBook(bookId);


    if (!book) {

      console.warn(
        "[LuLinogic PDF] Book not found:",
        bookId
      );

      return false;

    }


    if (!book.pdfUrl) {

      console.warn(
        "[LuLinogic PDF] No PDF URL registered:",
        bookId
      );

      return false;

    }


    const content = getContent();

    if (!content) {
      return false;
    }


    if (state.active) {
      await closeReader({
        restore: false
      });
    }


    const detail = content.querySelector(
      ".knowledge-detail-page"
    );


    state.returnDetail = detail

      ? detail.cloneNode(true)

      : null;


    state.book = book;

    state.pdf = null;

    state.pageNumber = 1;

    state.zoomFactor = 1;

    state.doublePage = false;

    state.active = true;


    const saved = getSavedProgress(book.id);

    const savedPage = Number(saved.pageNumber);

    if (Number.isInteger(savedPage) && savedPage > 0) {
      state.pageNumber = savedPage;
    }

    const savedZoom = Number(saved.zoomFactor);

    if (
      Number.isFinite(savedZoom) &&
      savedZoom >= 0.5 &&
      savedZoom <= 2.5
    ) {
      state.zoomFactor = savedZoom;
    }


    if (!renderReaderShell()) {

      state.active = false;

      return false;

    }


    setStatus(
      "Loading " + book.title + "..."
    );


    try {

      const loadingTask = pdfjsLib.getDocument({

        url: book.pdfUrl,

        cMapUrl: PDFJS_BASE + "/cmaps/",

        cMapPacked: true,

        standardFontDataUrl:
          PDFJS_BASE + "/standard_fonts/"

      });


      state.loadingTask = loadingTask;


      const pdf = await loadingTask.promise;


      if (
        !state.active ||
        !state.book ||
        state.book.id !== bookId
      ) {

        await pdf.destroy();

        return false;

      }


      state.pdf = pdf;


      state.pageNumber = Math.min(
        state.pageNumber,
        pdf.numPages
      );


      if (state.pageNumber < 1) {
        state.pageNumber = 1;
      }


      setStatus(
        "Document loaded · " +
        pdf.numPages +
        " pages"
      );


      await renderSpread();


      console.info(
        "[LuLinogic PDF] Opened:",
        book.title,
        "Pages:",
        pdf.numPages
      );


      return true;


    } catch (error) {

      console.error(
        "[LuLinogic PDF] Document loading failed.",
        error
      );


      setStatus(
        "The PDF could not be loaded. Check the file path, file availability, and browser console."
      );


      const viewer = document.getElementById(
        "pdf-reader-viewport"
      );


      if (viewer) {

        const fallback = make(
          "div",
          "pdf-reader-error"
        );

        fallback.append(
          make(
            "strong",
            "",
            "PDF loading failed"
          ),

          make(
            "p",
            "",
            "You can try opening the original PDF directly in a new browser tab."
          )
        );


        const link = document.createElement("a");

        link.href = book.pdfUrl;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.textContent = "Open PDF directly ↗";


        fallback.appendChild(link);

        viewer.replaceChildren(fallback);

      }


      return false;

    }

  }


  // =======================================
  // 11. CLEAN UP
  // =======================================

  function destroyResources() {

    state.renderToken += 1;


    state.renderTasks.forEach(task => {

      try {
        task.cancel();
      } catch (error) {
        // Ignore completed render tasks.
      }

    });

    state.renderTasks = [];


    if (state.loadingTask) {

      const task = state.loadingTask;

      state.loadingTask = null;

      task.destroy().catch(() => {});

    } else if (state.pdf) {

      state.pdf.destroy().catch(() => {});

    }


    state.pdf = null;

  }


  // =======================================
  // 12. CLOSE READER
  // =======================================

  async function closeReader(options) {

    options = options || {};

    if (!state.active) return;


    saveProgress();


    const restore =
      options.restore !== false;


    destroyResources();


    const content = getContent();

    const layout = getLayout();


    if (content) {

      content.classList.remove(
        "is-pdf-reading"
      );


      if (
        restore &&
        state.returnDetail
      ) {

        const restored =
          state.returnDetail.cloneNode(true);


        /*
         * A cloned button has no original event listener.
         * Remove the old companion launch button and its flag.
         * The existing MutationObserver in language_reader.js
         * will recreate it after this node is inserted.
         */

        restored.removeAttribute(
          "data-reader-enhanced"
        );


        const oldActions = restored.querySelector(
          ".reader-launch-actions"
        );

        if (oldActions) {
          oldActions.remove();
        }


        content.replaceChildren(restored);

      } else if (restore) {

        content.replaceChildren();

      }

    }


    if (layout) {

      layout.classList.remove(
        "is-pdf-reader-mode"
      );

    }


    state.active = false;

    state.book = null;

    state.returnDetail = null;

    state.pageNumber = 1;

    state.zoomFactor = 1;

    state.doublePage = false;


    if (state.resizeTimer) {

      window.clearTimeout(
        state.resizeTimer
      );

      state.resizeTimer = null;

    }


    console.info(
      "[LuLinogic PDF] Reader closed."
    );

  }


  // =======================================
  // 13. KEYBOARD NAVIGATION
  // =======================================

  function handleKeyboard(event) {

    if (!state.active) return;


    const target = event.target;

    const editing =
      target &&
      (
        target.isContentEditable ||
        /INPUT|TEXTAREA|SELECT/.test(
          target.tagName
        )
      );


    if (event.key === "Escape") {

      event.preventDefault();

      closeReader();

      return;

    }


    if (editing) return;


    if (event.key === "ArrowRight") {

      event.preventDefault();

      movePage("next");

    }


    if (event.key === "ArrowLeft") {

      event.preventDefault();

      movePage("previous");

    }

  }


  // =======================================
  // 14. RESPONSIVE RESIZING
  // =======================================

  function handleResize() {

    if (!state.active || !state.pdf) {
      return;
    }


    if (state.resizeTimer) {

      window.clearTimeout(
        state.resizeTimer
      );

    }


    state.resizeTimer = window.setTimeout(
      function () {

        renderSpread();

      },
      180
    );

  }


  // =======================================
  // 15. EVENT CONNECTION
  // =======================================

  function initialize() {

    if (!global.LANGUAGE_STUDY_DATA) {

      console.error(
        "[LuLinogic PDF] Knowledge database is unavailable."
      );

      return;

    }


    /*
     * Event delegation allows the PDF button to keep
     * working even when book detail pages are cloned
     * and restored by another reading module.
     */

    document.addEventListener(
      "click",
      function (event) {

        const trigger = event.target.closest(
          "[data-pdf-reader-open]"
        );

        if (!trigger) return;


        if (
          global.LANGUAGE_PDF_READER &&
          typeof global.LANGUAGE_PDF_READER.open === "function"
        ) {

          event.preventDefault();

          openReader(
            trigger.dataset.pdfReaderOpen
          );

        }

      }
    );


    document.addEventListener(
      "keydown",
      handleKeyboard
    );


    window.addEventListener(
      "resize",
      handleResize,
      { passive: true }
    );


    /*
     * Switching to another collection closes the PDF reader
     * without restoring the old book detail page.
     */

    document.addEventListener(
      "language:collectionchange",
      function () {

        if (state.active) {

          closeReader({
            restore: false
          });

        }

      }
    );


    /*
     * Closing the entire knowledge workspace also
     * releases the PDF document and worker resources.
     */

    document.addEventListener(
      "click",
      function (event) {

        if (
          event.target.closest(
            ".knowledge-close-button"
          ) &&
          state.active
        ) {

          closeReader({
            restore: false
          });

        }

      }
    );


    global.LANGUAGE_PDF_READER = Object.freeze({

      open: openReader,

      close: closeReader,

      get active() {
        return state.active;
      },

      get bookId() {
        return state.book
          ? state.book.id
          : null;
      },

      get pageNumber() {
        return state.pageNumber;
      }

    });


    console.info(
      "[LuLinogic PDF] Original PDF reader initialized."
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


})(window);
