/*
 * LuLinogic — Phase 3 Knowledge Panels
 * Version: 1.0.0
 *
 * Features:
 * 1. Linguistics Bookshelf
 * 2. Computational Linguistics Laboratory
 * 3. Linguistics Notes
 * 4. World Languages
 * 5. Reading Records
 * 6. My Vocabulary
 *
 * No framework or external library required.
 */

(function () {
  "use strict";

  const DATA = window.LANGUAGE_STUDY_DATA;
  const ROOT_ID = "language-knowledge-workspace";
  const ANCHOR_ID = "selection-panel";

  if (!DATA || !DATA.collections) {
    console.error(
      "[LuLinogic Phase 3] LANGUAGE_STUDY_DATA is unavailable."
    );
    return;
  }

  const state = {
    collectionId: null,
    query: "",
    selectedLanguageId: null,
    selectedResourceType: null,
    returnFocus: null
  };

  const byId = (id) => document.getElementById(id);


  /* =========================================
     1. DOM HELPERS
  ========================================= */

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


  function makeButton(text, className, onClick) {
    const button = make("button", className, text);

    button.type = "button";

    button.addEventListener("click", onClick);

    return button;
  }


  function makeChipList(items) {
    const list = make("div", "knowledge-chip-list");

    (items || []).forEach((item) => {
      list.appendChild(
        make("span", "knowledge-chip", item)
      );
    });

    return list;
  }


  function makeMeta(label, value) {
    const wrapper = make("div", "knowledge-meta-item");

    wrapper.append(
      make("span", "knowledge-meta-label", label),
      make("span", "knowledge-meta-value", value || "Not specified")
    );

    return wrapper;
  }


  function makeEmptyState(title, description) {
    const empty = make("div", "knowledge-empty-state");

    empty.append(
      make("span", "knowledge-empty-mark", "✦"),
      make("h4", "", title),
      make("p", "", description)
    );

    return empty;
  }


  function makeSectionHeading(kicker, title, description) {
    const header = make("div", "knowledge-section-heading");

    header.append(
      make("p", "knowledge-kicker", kicker),
      make("h3", "", title),
      make("p", "knowledge-section-description", description)
    );

    return header;
  }


  /* =========================================
     2. KNOWLEDGE WORKSPACE
  ========================================= */

  function ensureWorkspace() {

    let root = byId(ROOT_ID);

    if (root) return root;

    root = make("section", "knowledge-workspace");

    root.id = ROOT_ID;

    root.hidden = true;

    root.setAttribute(
      "aria-label",
      "Language knowledge collection"
    );

    root.setAttribute(
      "aria-live",
      "polite"
    );


    const studyRoom = byId("study-room");

    const sceneFrame = studyRoom &&
      studyRoom.querySelector(".scene-frame");

    const caption = studyRoom &&
      studyRoom.querySelector(".scene-caption-row");

    const selectionPanel = byId(ANCHOR_ID);


    /*
     * Desktop:
     * Place the knowledge panel beside the image.
     *
     * Mobile:
     * CSS automatically changes the layout to one column.
     *
     * The original image and SVG are moved as DOM elements.
     * They are never redrawn, cropped, or replaced.
     */

    if (
      studyRoom &&
      sceneFrame &&
      caption &&
      selectionPanel
    ) {

      const layout = make(
        "div",
        "study-exploration-layout"
      );

      const sceneColumn = make(
        "div",
        "study-scene-column"
      );

      layout.id = "study-exploration-layout";

      sceneColumn.append(
        sceneFrame,
        caption,
        selectionPanel
      );

      layout.append(
        sceneColumn,
        root
      );

      studyRoom.appendChild(layout);

    } else if (
      selectionPanel &&
      selectionPanel.parentNode
    ) {

      selectionPanel.insertAdjacentElement(
        "afterend",
        root
      );

    } else if (studyRoom) {

      studyRoom.appendChild(root);

    } else {

      document.body.appendChild(root);

    }

    return root;
  }


  /* =========================================
     3. COMMON COLLECTION HEADER
  ========================================= */

  function renderShell(collectionId) {

    const collection = DATA.collections[collectionId];

    const root = ensureWorkspace();

    root.replaceChildren();

    root.hidden = false;

    root.dataset.collectionId = collectionId;


    const layout = root.closest(
      ".study-exploration-layout"
    );

    if (layout) {
      layout.classList.add("has-knowledge-panel");
    }


    /* Header */

    const header = make(
      "div",
      "knowledge-workspace-header"
    );

    const headingCopy = make(
      "div",
      "knowledge-workspace-heading-copy"
    );

    headingCopy.append(
      make(
        "p",
        "knowledge-kicker",
        collection.category || "KNOWLEDGE COLLECTION"
      ),

      make(
        "h2",
        "knowledge-workspace-title",
        collection.title
      ),

      make(
        "p",
        "knowledge-workspace-description",
        collection.description
      )
    );


    const close = makeButton(
      "Close collection",
      "knowledge-close-button",
      closeWorkspace
    );

    close.setAttribute(
      "aria-label",
      "Close this knowledge collection and return to the study room"
    );

    close.appendChild(
      make(
        "span",
        "knowledge-close-symbol",
        "×"
      )
    );

    header.append(
      headingCopy,
      close
    );


    /* Toolbar */

    const toolbar = make(
      "div",
      "knowledge-toolbar"
    );

    const location = make(
      "p",
      "knowledge-location"
    );

    location.append(
      make(
        "span",
        "knowledge-location-label",
        "CURRENT LOCATION"
      ),

      make(
        "strong",
        "",
        "Linguistics Study Room"
      ),

      make(
        "span",
        "knowledge-location-separator",
        "/"
      ),

      make(
        "span",
        "knowledge-current-collection",
        collection.title
      )
    );


    /* Search */

    const searchWrap = make(
      "label",
      "knowledge-search-wrap"
    );

    const searchIcon = make(
      "span",
      "knowledge-search-icon",
      "⌕"
    );

    searchIcon.setAttribute(
      "aria-hidden",
      "true"
    );

    const search = document.createElement("input");

    search.type = "search";

    search.className = "knowledge-search";

    search.placeholder = "Search this collection";

    search.setAttribute(
      "aria-label",
      "Search this collection"
    );

    search.value = state.query;


    search.addEventListener("input", () => {

      state.query = search.value
        .trim()
        .toLocaleLowerCase();

      const grid = root.querySelector(
        ".knowledge-card-grid"
      );

      if (grid) {
        filterCards(grid, state.query);
      }

    });


    searchWrap.append(
      searchIcon,
      search
    );

    toolbar.append(
      location,
      searchWrap
    );


    /* Content */

    const content = make(
      "div",
      "knowledge-workspace-content"
    );

    content.id = "knowledge-workspace-content";


    /* Footer */

    const footer = make(
      "div",
      "knowledge-workspace-footer"
    );

    footer.append(
      make(
        "span",
        "",
        "LU L I N O G I C · LANGUAGE COLLECTIONS"
      ),

      make(
        "span",
        "",
        "Original study notes · Curated references"
      )
    );


    root.append(
      header,
      toolbar,
      content,
      footer
    );


    return {
      root,
      content,
      search
    };

  }


  /* =========================================
     4. SEARCH
  ========================================= */

  function filterCards(grid, query) {

    const cards = Array.from(
      grid.querySelectorAll("[data-search-text]")
    );

    let visible = 0;


    cards.forEach((card) => {

      const matches =
        !query ||
        card.dataset.searchText.includes(query);

      card.hidden = !matches;

      if (matches) visible += 1;

    });


    let empty = grid.parentElement.querySelector(
      ".knowledge-filter-empty"
    );


    if (!empty) {

      empty = make(
        "p",
        "knowledge-filter-empty",
        "No entries match your search."
      );

      grid.insertAdjacentElement(
        "afterend",
        empty
      );

    }

    empty.hidden = visible !== 0;

  }


  /* =========================================
     5. CLOSE WORKSPACE
  ========================================= */

  function closeWorkspace() {

    const root = byId(ROOT_ID);

    if (!root) return;


    root.hidden = true;

    root.replaceChildren();

    root.removeAttribute(
      "data-collection-id"
    );


    const layout = root.closest(
      ".study-exploration-layout"
    );

    if (layout) {
      layout.classList.remove("has-knowledge-panel");
    }


    state.collectionId = null;

    state.query = "";

    state.selectedLanguageId = null;

    state.selectedResourceType = null;


    if (
      state.returnFocus &&
      document.contains(state.returnFocus)
    ) {

      state.returnFocus.focus({
        preventScroll: true
      });

    }

  }


  function showDetail(content, detailNode) {

    content.replaceChildren(detailNode);

  }


  function makeBackButton(label, callback) {

    return makeButton(
      "← " + label,
      "knowledge-back-button",
      callback
    );

  }


  /* =========================================
     6. LINGUISTICS BOOKSHELF
  ========================================= */

  function renderBookCollection(content) {

    const books = DATA.books || [];

    const page = make(
      "div",
      "knowledge-list-page"
    );


    page.appendChild(
      makeSectionHeading(
        "THE CLASSICAL SHELF",

        "Works that shaped the study of language",

        "Browse foundational books, essays, and collected writings. Each record includes bibliographic context and an original reading guide."
      )
    );


    const grid = make(
      "div",
      "knowledge-card-grid knowledge-book-grid"
    );


    books.forEach((book, index) => {

      const card = make(
        "article",
        "knowledge-card knowledge-book-card"
      );


      card.dataset.searchText = [
        book.title,
        book.author,
        book.category,
        book.description,
        ...(book.keywords || [])
      ]
        .join(" ")
        .toLocaleLowerCase();


      /* Typographic book cover */

      const cover = make(
        "div",
        "knowledge-book-cover"
      );

      cover.append(
        make(
          "span",
          "knowledge-cover-series",
          "LU L I N O G I C · LIBRARY"
        ),

        make(
          "span",
          "knowledge-cover-number",
          String(index + 1).padStart(2, "0")
        ),

        make(
          "strong",
          "knowledge-cover-title",
          book.title
        ),

        make(
          "span",
          "knowledge-cover-author",
          book.author
        )
      );


      /* Book information */

      const body = make(
        "div",
        "knowledge-card-body"
      );

      body.append(
        make(
          "span",
          "knowledge-item-type",
          formatItemType(book.itemType)
        ),

        make(
          "h4",
          "knowledge-card-title",
          book.title
        ),

        make(
          "p",
          "knowledge-card-byline",
          book.author
        ),

        make(
          "p",
          "knowledge-card-description",
          book.description
        )
      );


      const action = makeButton(
        "Explore bibliographic record",
        "knowledge-card-action",
        () => renderBookDetail(book)
      );

      body.appendChild(action);

      card.append(
        cover,
        body
      );

      grid.appendChild(card);

    });


    page.appendChild(grid);

    content.appendChild(page);

  }


  function formatItemType(type) {

    const labels = {

      book: "BOOK",

      article: "ESSAY / ARTICLE",

      "collected-papers": "COLLECTED PAPERS",

      "selected-writings": "SELECTED WRITINGS"

    };

    return labels[type] || "BIBLIOGRAPHIC RECORD";

  }


  /* =========================================
     7. BOOK DETAIL
  ========================================= */

  function renderBookDetail(book) {

    const root = byId(ROOT_ID);

    const content = byId(
      "knowledge-workspace-content"
    );

    if (!root || !content) return;


    const detail = make(
      "article",
      "knowledge-detail-page"
    );


    const back = makeBackButton(
      "Back to the bookshelf",
      () => {

        renderBookCollection(content);

        restoreSearch(root);

      }
    );


    /* Book cover and main information */

    const hero = make(
      "div",
      "knowledge-detail-hero"
    );

    const cover = make(
      "div",
      "knowledge-book-cover knowledge-book-cover-large"
    );

    cover.append(
      make(
        "span",
        "knowledge-cover-series",
        "LU L I N O G I C · LIBRARY"
      ),

      make(
        "span",
        "knowledge-cover-number",
        "SELECTED WORK"
      ),

      make(
        "strong",
        "knowledge-cover-title",
        book.title
      ),

      make(
        "span",
        "knowledge-cover-author",
        book.author
      )
    );


    const intro = make(
      "div",
      "knowledge-detail-intro"
    );

    intro.append(
      make(
        "span",
        "knowledge-item-type",
        formatItemType(book.itemType)
      ),

      make(
        "h3",
        "knowledge-detail-title",
        book.title
      ),

      make(
        "p",
        "knowledge-detail-author",
        book.author
      ),

      make(
        "p",
        "knowledge-detail-description",
        book.description
      )
    );


    hero.append(
      cover,
      intro
    );


    /* Bibliographic information */

    const metadata = make(
      "div",
      "knowledge-metadata-grid"
    );

    metadata.append(
      makeMeta(
        "Publication information",
        book.publicationInfo
      ),

      makeMeta(
        "Academic field",
        book.category
      ),

      makeMeta(
        "Language",
        book.language
      )
    );


    /* Keywords */

    const keywords = make(
      "section",
      "knowledge-detail-section"
    );

    keywords.append(
      make(
        "h4",
        "knowledge-detail-section-title",
        "KEYWORDS"
      )
    );

    keywords.appendChild(
      makeChipList(book.keywords)
    );


    /* Reading guide */

    const guide = make(
      "section",
      "knowledge-reading-guide"
    );

    guide.append(
      make(
        "p",
        "knowledge-kicker",
        "SUGGESTED READING APPROACH"
      ),

      make(
        "p",
        "knowledge-reading-guide-text",
        book.readingGuide
      )
    );


    /* Copyright notice */

    const note = make(
      "div",
      "knowledge-copyright-note"
    );

    note.textContent =
      "This catalogue entry contains original editorial notes, not a reproduced copy of the copyrighted work. Full-text reading pages will be added only from original notes or legally accessible sources.";


    /* Phase 4 placeholder */

    const readerNotice = make(
      "div",
      "knowledge-phase-notice"
    );

    readerNotice.append(
      make(
        "strong",
        "",
        "Reading interface: Phase 4"
      ),

      make(
        "span",
        "",
        "The in-page double-page reader and page navigation will be connected in the next development phase."
      )
    );


    detail.append(
      back,
      hero,
      metadata,
      keywords,
      guide,
      note,
      readerNotice
    );


    showDetail(content, detail);

  }


  function restoreSearch(root) {

    const input = root.querySelector(
      ".knowledge-search"
    );

    if (!input) return;

    input.value = state.query;

    const grid = root.querySelector(
      ".knowledge-card-grid"
    );

    if (grid) {
      filterCards(grid, state.query);
    }

  }


  /* =========================================
     8. COMPUTATIONAL TOPICS AND NOTES
  ========================================= */

  function renderTopicCollection(content, items, config) {

    const page = make(
      "div",
      "knowledge-list-page"
    );

    page.appendChild(
      makeSectionHeading(
        config.kicker,
        config.title,
        config.description
      )
    );


    const grid = make(
      "div",
      "knowledge-card-grid knowledge-topic-grid"
    );


    items.forEach((item, index) => {

      const card = make(
        "article",
        "knowledge-card knowledge-topic-card"
      );

      card.dataset.searchText = [
        item.title,
        item.description,
        ...(item.keywords || []),
        ...(item.keyQuestions || []),
        item.example || ""
      ]
        .join(" ")
        .toLocaleLowerCase();


      const number = make(
        "span",
        "knowledge-card-number",
        String(index + 1).padStart(2, "0")
      );


      const body = make(
        "div",
        "knowledge-card-body"
      );

      body.append(
        make(
          "span",
          "knowledge-item-type",
          config.itemLabel
        ),

        make(
          "h4",
          "knowledge-card-title",
          item.title
        ),

        make(
          "p",
          "knowledge-card-description",
          item.description
        )
      );


      const action = makeButton(
        "Open topic",
        "knowledge-card-action",
        () => renderTopicDetail(item, config)
      );

      body.appendChild(action);

      card.append(
        number,
        body
      );

      grid.appendChild(card);

    });


    page.appendChild(grid);

    content.appendChild(page);

  }


  /* =========================================
     9. TOPIC DETAIL
  ========================================= */

  function renderTopicDetail(item, config) {

    const root = byId(ROOT_ID);

    const content = byId(
      "knowledge-workspace-content"
    );

    if (!root || !content) return;


    const detail = make(
      "article",
      "knowledge-detail-page"
    );


    const back = makeBackButton(
      config.backLabel,
      () => {

        if (config.kind === "computational") {

          renderComputationalCollection(content);

        } else {

          renderNotesCollection(content);

        }

        restoreSearch(root);

      }
    );


    const header = make(
      "div",
      "knowledge-topic-detail-header"
    );

    header.append(
      make(
        "span",
        "knowledge-item-type",
        config.itemLabel
      ),

      make(
        "h3",
        "knowledge-detail-title",
        item.title
      ),

      make(
        "p",
        "knowledge-detail-description",
        item.description
      )
    );


    const lower = make(
      "div",
      "knowledge-detail-columns"
    );


    /* Left column */

    const left = make(
      "section",
      "knowledge-detail-section"
    );

    left.appendChild(
      make(
        "h4",
        "knowledge-detail-section-title",
        config.primaryHeading
      )
    );


    if (config.kind === "computational") {

      const list = make(
        "ul",
        "knowledge-question-list"
      );

      (item.keyQuestions || []).forEach((question) => {

        list.appendChild(
          make("li", "", question)
        );

      });

      left.appendChild(list);

    } else {

      left.appendChild(
        make(
          "p",
          "knowledge-example-text",
          item.example || "No example has been added yet."
        )
      );

    }


    /* Right column */

    const right = make(
      "section",
      "knowledge-detail-section"
    );

    right.appendChild(
      make(
        "h4",
        "knowledge-detail-section-title",
        "KEY CONCEPTS"
      )
    );

    right.appendChild(
      makeChipList(item.keywords)
    );


    lower.append(
      left,
      right
    );


    const note = make(
      "div",
      "knowledge-phase-notice"
    );

    note.append(
      make(
        "strong",
        "",
        "Research note"
      ),

      make(
        "span",
        "",
        config.note
      )
    );


    detail.append(
      back,
      header,
      lower,
      note
    );


    showDetail(content, detail);

  }


  /* =========================================
     10. COMPUTATIONAL LINGUISTICS
  ========================================= */

  function renderComputationalCollection(content) {

    renderTopicCollection(
      content,
      DATA.computationalTopics || [],
      {

        kind: "computational",

        kicker:
          "COMPUTATION · LANGUAGE · MODELS",

        title:
          "Computational Linguistics Laboratory",

        description:
          "Explore computational methods for representing, processing, interpreting, and generating language. Select a research area to inspect its guiding questions and key concepts.",

        itemLabel:
          "RESEARCH AREA",

        primaryHeading:
          "QUESTIONS TO EXPLORE",

        backLabel:
          "Back to the laboratory",

        note:
          "These topic records are conceptual entry points. Research papers, datasets, implementations, and reproducible experiments can be linked to each topic in a later content pass."

      }
    );

  }


  /* =========================================
     11. LINGUISTICS NOTES
  ========================================= */

  function renderNotesCollection(content) {

    renderTopicCollection(
      content,
      DATA.linguisticsTopics || [],
      {

        kind: "notes",

        kicker:
          "THE STRUCTURE OF LANGUAGE",

        title:
          "Linguistics Notes",

        description:
          "A guided notebook through the major domains of linguistic inquiry. Each entry introduces a field, gives an illustrative example, and identifies concepts for further study.",

        itemLabel:
          "LINGUISTIC FIELD",

        primaryHeading:
          "ILLUSTRATIVE EXAMPLE",

        backLabel:
          "Back to the notebook",

        note:
          "The examples are concise teaching illustrations, not substitutes for full theoretical argument. Each topic can later be expanded with lecture notes, diagrams, readings, and citations."

      }
    );

  }


  /* =========================================
     12. WORLD LANGUAGES
  ========================================= */

  function renderWorldLanguages(content) {

    state.selectedLanguageId = null;

    const page = make(
      "div",
      "knowledge-list-page"
    );


    page.appendChild(
      makeSectionHeading(
        "A MULTILINGUAL COLLECTION",

        "World Languages",

        "Explore eleven language collections. Each language is organized around grammar, dictionaries, classical texts, linguistic research, and open learning resources."
      )
    );


    const grid = make(
      "div",
      "knowledge-card-grid knowledge-language-grid"
    );


    (DATA.worldLanguages || []).forEach(
      (language, index) => {

        const card = make(
          "article",
          "knowledge-card knowledge-language-card"
        );

        card.dataset.searchText = [
          language.name,
          language.nativeName,
          language.family,
          language.script,
          language.focus
        ]
          .join(" ")
          .toLocaleLowerCase();


        const number = make(
          "span",
          "knowledge-card-number",
          String(index + 1).padStart(2, "0")
        );


        const body = make(
          "div",
          "knowledge-card-body"
        );

        body.append(
          make(
            "span",
            "knowledge-item-type",
            language.family
          ),

          make(
            "h4",
            "knowledge-card-title",
            language.name
          ),

          make(
            "p",
            "knowledge-language-native",
            language.nativeName
          ),

          make(
            "p",
            "knowledge-card-description",
            language.focus
          )
        );


        body.appendChild(
          makeButton(
            "Explore resources",
            "knowledge-card-action",
            () => renderLanguageDetail(language)
          )
        );


        card.append(
          number,
          body
        );

        grid.appendChild(card);

      }
    );


    page.appendChild(grid);

    content.appendChild(page);

  }


  /* =========================================
     13. LANGUAGE DETAIL
  ========================================= */

  function renderLanguageDetail(language) {

    const root = byId(ROOT_ID);

    const content = byId(
      "knowledge-workspace-content"
    );

    if (!root || !content) return;


    state.selectedLanguageId = language.id;


    const detail = make(
      "article",
      "knowledge-detail-page"
    );


    const back = makeBackButton(
      "Back to World Languages",
      () => {

        renderWorldLanguages(content);

        restoreSearch(root);

      }
    );


    const header = make(
      "div",
      "knowledge-language-detail-header"
    );


    const monogram = make(
      "div",
      "knowledge-language-monogram",
      language.nativeName.slice(0, 2)
    );

    monogram.setAttribute(
      "aria-hidden",
      "true"
    );


    const copy = make(
      "div",
      "knowledge-language-detail-copy"
    );

    copy.append(
      make(
        "span",
        "knowledge-item-type",
        "LANGUAGE COLLECTION"
      ),

      make(
        "h3",
        "knowledge-detail-title",
        language.name
      ),

      make(
        "p",
        "knowledge-language-native-large",
        language.nativeName
      ),

      make(
        "p",
        "knowledge-detail-description",
        language.focus
      )
    );


    header.append(
      monogram,
      copy
    );


    /* Language family and script */

    const metadata = make(
      "div",
      "knowledge-metadata-grid"
    );

    metadata.append(
      makeMeta(
        "Language family",
        language.family
      ),

      makeMeta(
        "Writing system",
        language.script
      )
    );


    /* Resource categories */

    const resourcesHeading = make(
      "div",
      "knowledge-resource-heading"
    );

    resourcesHeading.append(
      make(
        "h4",
        "knowledge-detail-section-title",
        "RESOURCE CATEGORIES"
      ),

      make(
        "p",
        "",
        "Choose a category to inspect its curated materials."
      )
    );


    const resourceGrid = make(
      "div",
      "knowledge-resource-grid"
    );


    (DATA.worldLanguageResourceTypes || []).forEach(
      (resourceType) => {

        const resourceCard = make(
          "article",
          "knowledge-resource-card"
        );

        resourceCard.append(
          make(
            "span",
            "knowledge-resource-index",
            resourceType.id.toUpperCase()
          ),

          make(
            "h5",
            "",
            resourceType.title
          ),

          make(
            "p",
            "",
            resourceType.description
          )
        );


        resourceCard.appendChild(
          makeButton(
            "View category",
            "knowledge-resource-action",
            () => renderLanguageResourceDetail(
              language,
              resourceType
            )
          )
        );


        resourceGrid.appendChild(resourceCard);

      }
    );


    detail.append(
      back,
      header,
      metadata,
      resourcesHeading,
      resourceGrid
    );


    showDetail(content, detail);

  }


  /* =========================================
     14. LANGUAGE RESOURCE DETAIL
  ========================================= */

  function renderLanguageResourceDetail(
    language,
    resourceType
  ) {

    const root = byId(ROOT_ID);

    const content = byId(
      "knowledge-workspace-content"
    );

    if (!root || !content) return;


    const detail = make(
      "article",
      "knowledge-detail-page"
    );


    const back = makeBackButton(
      "Back to " + language.name,
      () => renderLanguageDetail(language)
    );


    const heading = make(
      "div",
      "knowledge-topic-detail-header"
    );

    heading.append(
      make(
        "span",
        "knowledge-item-type",
        language.name.toUpperCase() +
        " · " +
        resourceType.id.toUpperCase()
      ),

      make(
        "h3",
        "knowledge-detail-title",
        resourceType.title
      ),

      make(
        "p",
        "knowledge-detail-description",
        resourceType.description
      )
    );


    /* Retrieve only resources belonging to this category. */

    const entries = (
      language.resources || []
    ).filter(
      (resource) => resource.type === resourceType.id
    );


    const list = make(
      "div",
      "knowledge-resource-entry-list"
    );


    if (!entries.length) {

      list.appendChild(
        makeEmptyState(
          "This shelf is waiting for its first resource.",

          "No verified resource has been added to this category yet. You can later add grammar books, dictionary records, classical editions, research papers, or open-access learning materials to language_data.js."
        )
      );

    } else {

      entries.forEach((resource) => {

        const item = make(
          "article",
          "knowledge-resource-entry"
        );

        item.append(
          make(
            "span",
            "knowledge-item-type",
            resource.access || "RESOURCE"
          ),

          make(
            "h4",
            "",
            resource.title
          ),

          make(
            "p",
            "",
            resource.description || ""
          )
        );


        if (resource.creator) {

          item.appendChild(
            make(
              "p",
              "knowledge-resource-creator",
              resource.creator
            )
          );

        }


        if (resource.url) {

          const link = document.createElement("a");

          link.className =
            "knowledge-card-action knowledge-resource-link";

          link.href = resource.url;

          link.target = "_blank";

          link.rel = "noopener noreferrer";

          link.textContent = "Open resource ↗";

          item.appendChild(link);

        }


        list.appendChild(item);

      });

    }


    detail.append(
      back,
      heading,
      list
    );


    showDetail(content, detail);

  }


  /* =========================================
     15. READING RECORDS / VOCABULARY
  ========================================= */

  function renderPersonalCollection(content, collectionId) {

    const collection = DATA.collections[collectionId];

    const isReading =
      collectionId === "reading-records";

    const entries = isReading
      ? (DATA.readingRecords || [])
      : (DATA.vocabulary || []);


    const page = make(
      "div",
      "knowledge-list-page"
    );


    page.appendChild(
      makeSectionHeading(

        isReading
          ? "PERSONAL READING ARCHIVE"
          : "PERSONAL WORD COLLECTION",

        collection.title,

        collection.description

      )
    );


    if (!entries.length) {

      page.appendChild(
        makeEmptyState(

          isReading
            ? "Your reading archive begins here."
            : "Your vocabulary collection begins here.",

          isReading

            ? "No reading records have been added yet. The archive is ready for titles, reading dates, progress, and personal reflections."

            : "No vocabulary entries have been added yet. This collection is ready for words, definitions, example sentences, and semantic notes."

        )
      );

    }


    content.appendChild(page);

  }


  /* =========================================
     16. COLLECTION ROUTER
  ========================================= */

  function renderCollection(collectionId, focusTarget) {

    if (!DATA.collections[collectionId]) {

      console.warn(
        "[LuLinogic Phase 3] Unknown collection:",
        collectionId
      );

      return;

    }


    state.collectionId = collectionId;

    state.returnFocus =
      focusTarget || document.activeElement;

    state.query = "";

    state.selectedLanguageId = null;

    state.selectedResourceType = null;


    const shell = renderShell(collectionId);

    const content = shell.content;


    switch (collectionId) {

      case "linguistics-bookshelf":

        renderBookCollection(content);

        break;


      case "computational-linguistics-lab":

        renderComputationalCollection(content);

        break;


      case "linguistics-notes":

        renderNotesCollection(content);

        break;


      case "world-languages":

        renderWorldLanguages(content);

        break;


      case "reading-records":

      case "my-vocabulary":

        renderPersonalCollection(
          content,
          collectionId
        );

        break;


      default:

        content.appendChild(
          makeEmptyState(
            "Collection unavailable",
            "This collection has not been configured yet."
          )
        );

    }


    shell.root.classList.remove(
      "knowledge-workspace-enter"
    );

    void shell.root.offsetWidth;

    shell.root.classList.add(
      "knowledge-workspace-enter"
    );

  }


  /* =========================================
     17. EVENT CONNECTION
  ========================================= */

  document.addEventListener(
    "language:collectionchange",
    function (event) {

      const detail = event.detail || {};

      const collectionId = detail.id;

      const focusTarget = detail.hotspotId
        ? byId(detail.hotspotId)
        : document.activeElement;


      renderCollection(
        collectionId,
        focusTarget
      );

    }
  );


  /* =========================================
     18. PUBLIC API
  ========================================= */

  window.LANGUAGE_KNOWLEDGE_PANELS = Object.freeze({

    open: renderCollection,

    close: closeWorkspace,

    get activeCollectionId() {
      return state.collectionId;
    }

  });


  console.info(
    "[LuLinogic Phase 3] Knowledge panel module loaded."
  );

})();