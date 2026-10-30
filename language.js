/*
 * LuLinogic — Language Study Room interactions
 * Version: 2.1.0
 *
 * Responsibilities:
 * 1. Connect SVG hotspots to the knowledge catalogue.
 * 2. Handle mouse, touch and keyboard interaction.
 * 3. Display contextual tooltips.
 * 4. Update the collection information panel.
 * 5. Publish custom events for future knowledge windows.
 * 6. Expose a public interface for Phase 3.
 *
 * Dependencies:
 * - language_data.js
 * - Language.html
 *
 * No framework or external library required.
 */

(function () {
    "use strict";

    /* =========================================
       1. DOM SELECTORS
    ========================================= */

    const SELECTORS = {
        hotspot: ".hotspot[data-hotspot-id]",
        tooltip: "#hotspot-tooltip",
        panel: "#selection-panel",
        overline: "#selection-overline",
        title: "#selection-title",
        description: "#selection-description",
        state: "#selection-state",
        announcer: "#interaction-announcer",
        scene: ".scene-image-wrap",
        image: ".study-room-image"
    };

    const ACTIVATION_CLASS = "is-activated";

    const ACTIVATION_DURATION = 480;

    const TOOLTIP_GAP = 14;

    const TOOLTIP_MARGIN = 12;


    /* =========================================
       2. INITIALIZATION
    ========================================= */

    function ready(callback) {

        if (document.readyState === "loading") {

            document.addEventListener(
                "DOMContentLoaded",
                callback,
                { once: true }
            );

        } else {

            callback();

        }

    }


    ready(function initLanguageStudyRoom() {

        const data = window.LANGUAGE_STUDY_DATA;

        const hotspots = Array.from(
            document.querySelectorAll(
                SELECTORS.hotspot
            )
        );

        const tooltip = document.querySelector(
            SELECTORS.tooltip
        );

        const selectionPanel = document.querySelector(
            SELECTORS.panel
        );

        const selectionOverline = document.querySelector(
            SELECTORS.overline
        );

        const selectionTitle = document.querySelector(
            SELECTORS.title
        );

        const selectionDescription = document.querySelector(
            SELECTORS.description
        );

        const selectionState = document.querySelector(
            SELECTORS.state
        );

        const announcer = document.querySelector(
            SELECTORS.announcer
        );

        const scene = document.querySelector(
            SELECTORS.scene
        );

        const sceneImage = document.querySelector(
            SELECTORS.image
        );


        /* =========================================
           3. DATA VALIDATION
        ========================================= */

        if (
            !data ||
            !data.collections ||
            !data.hotspotLabels
        ) {

            console.error(
                "[LuLinogic] language_data.js did not expose a valid LANGUAGE_STUDY_DATA object."
            );

            return;

        }


        if (!hotspots.length) {

            console.warn(
                "[LuLinogic] No SVG hotspots were found. Check data-hotspot-id attributes in Language.html."
            );

            return;

        }


        const missingElements = [];

        if (!selectionPanel) {
            missingElements.push(SELECTORS.panel);
        }

        if (!selectionOverline) {
            missingElements.push(SELECTORS.overline);
        }

        if (!selectionTitle) {
            missingElements.push(SELECTORS.title);
        }

        if (!selectionDescription) {
            missingElements.push(SELECTORS.description);
        }

        if (!selectionState) {
            missingElements.push(SELECTORS.state);
        }

        if (!tooltip) {
            missingElements.push(SELECTORS.tooltip);
        }


        if (missingElements.length) {

            console.error(
                "[LuLinogic] Required interface elements are missing:",
                missingElements.join(", ")
            );

            return;

        }


        /* =========================================
           4. INTERNAL STATE
        ========================================= */

        let activeHotspot = null;

        let tooltipFrame = 0;

        const activationTimers = new WeakMap();


        /* =========================================
           5. HOTSPOT DATA FUNCTIONS
        ========================================= */

        function getHotspotId(hotspot) {

            return (
                hotspot &&
                hotspot.dataset
            )
                ? hotspot.dataset.hotspotId
                : "";

        }


        function getCollection(hotspot) {

            const id = getHotspotId(hotspot);

            return id
                ? data.collections[id] || null
                : null;

        }


        function getHotspotLabel(hotspot) {

            const id = getHotspotId(hotspot);

            return (
                data.hotspotLabels[id] ||
                (
                    getCollection(hotspot) &&
                    getCollection(hotspot).title
                ) ||
                "Explore this object"
            );

        }


        /* =========================================
           6. TOOLTIP POSITIONING
        ========================================= */

        function setTooltipPosition(clientX, clientY) {

            if (!tooltip) return;

            tooltip.style.left = "0px";

            tooltip.style.top = "0px";


            const rect = tooltip.getBoundingClientRect();

            const maxLeft = Math.max(
                TOOLTIP_MARGIN,
                window.innerWidth -
                rect.width -
                TOOLTIP_MARGIN
            );

            const maxTop = Math.max(
                TOOLTIP_MARGIN,
                window.innerHeight -
                rect.height -
                TOOLTIP_MARGIN
            );


            const left = Math.min(
                maxLeft,
                Math.max(
                    TOOLTIP_MARGIN,
                    clientX + TOOLTIP_GAP
                )
            );

            const top = Math.min(
                maxTop,
                Math.max(
                    TOOLTIP_MARGIN,
                    clientY + TOOLTIP_GAP
                )
            );


            tooltip.style.left = left + "px";

            tooltip.style.top = top + "px";

        }


        function showTooltip(hotspot, clientX, clientY) {

            if (!tooltip) return;

            tooltip.textContent = getHotspotLabel(hotspot);

            tooltip.setAttribute(
                "aria-hidden",
                "false"
            );

            tooltip.classList.add("is-visible");

            setTooltipPosition(
                clientX,
                clientY
            );

        }


        function showTooltipForFocusedHotspot(hotspot) {

            const bounds = hotspot.getBoundingClientRect();

            const x =
                bounds.left +
                Math.min(bounds.width / 2, 90);

            const y =
                bounds.top +
                Math.min(bounds.height / 2, 50);


            showTooltip(
                hotspot,
                x,
                y
            );

        }


        function hideTooltip() {

            if (!tooltip) return;

            tooltip.classList.remove("is-visible");

            tooltip.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        function scheduleTooltipPosition(hotspot, event) {

            if (
                event.pointerType === "touch" ||
                !tooltip ||
                !tooltip.classList.contains("is-visible")
            ) {

                return;

            }


            if (tooltipFrame) {

                cancelAnimationFrame(tooltipFrame);

            }


            tooltipFrame = requestAnimationFrame(function () {

                showTooltip(
                    hotspot,
                    event.clientX,
                    event.clientY
                );

                tooltipFrame = 0;

            });

        }


        /* =========================================
           7. HOTSPOT CLICK ANIMATION
        ========================================= */

        function pulseHotspot(hotspot) {

            const previousTimer =
                activationTimers.get(hotspot);


            if (previousTimer) {

                window.clearTimeout(previousTimer);

            }


            hotspot.classList.remove(
                ACTIVATION_CLASS
            );


            // Force reflow so repeated clicks replay the animation.
            void hotspot.getBoundingClientRect();


            hotspot.classList.add(
                ACTIVATION_CLASS
            );


            const timer = window.setTimeout(function () {

                hotspot.classList.remove(
                    ACTIVATION_CLASS
                );

                activationTimers.delete(hotspot);

            }, ACTIVATION_DURATION);


            activationTimers.set(
                hotspot,
                timer
            );

        }


        /* =========================================
           8. SELECTED HOTSPOT STATE
        ========================================= */

        function updatePressedState(selectedHotspot) {

            hotspots.forEach(function (hotspot) {

                const selected =
                    hotspot === selectedHotspot;


                hotspot.setAttribute(
                    "aria-pressed",
                    selected ? "true" : "false"
                );


                if (selected) {

                    hotspot.setAttribute(
                        "data-selected",
                        "true"
                    );

                } else {

                    hotspot.removeAttribute(
                        "data-selected"
                    );

                }

            });

        }


        /* =========================================
           9. ACCESSIBILITY ANNOUNCEMENT
        ========================================= */

        function announceSelection(collection) {

            if (!announcer) return;

            announcer.textContent =
                collection.title +
                ". " +
                collection.description;

        }


        /* =========================================
           10. CUSTOM EVENT
        ========================================= */

        function publishCollectionChange(collection, hotspot) {

            const event = new CustomEvent(
                "language:collectionchange",
                {
                    bubbles: true,

                    detail: {
                        id: collection.id,

                        collection: collection,

                        hotspotId: hotspot.id || null,

                        label: getHotspotLabel(hotspot)
                    }
                }
            );


            document.dispatchEvent(event);

        }


        /* =========================================
           11. SELECT COLLECTION
        ========================================= */

        function selectHotspot(hotspot) {

            const collection = getCollection(hotspot);


            if (!collection) {

                console.warn(
                    "[LuLinogic] No collection data matches hotspot:",
                    getHotspotId(hotspot)
                );

                return;

            }


            activeHotspot = hotspot;


            pulseHotspot(hotspot);

            updatePressedState(hotspot);


            /* Update information panel */

            selectionPanel.classList.add(
                "has-selection"
            );

            selectionPanel.dataset.collectionId =
                collection.id;


            selectionOverline.textContent =
                collection.category || "COLLECTION";


            selectionTitle.textContent =
                collection.title;


            selectionDescription.textContent =
                collection.description;


            selectionState.textContent =
                collection.status ||
                "Collection selected";


            /* Update global page state */

            document.documentElement.dataset.currentLocation =
                data.page.defaultLocation ||
                "Linguistics Study Room";


            document.documentElement.dataset.currentCollection =
                collection.id;


            /* Accessibility */

            announceSelection(collection);


            /* Notify future interface modules */

            publishCollectionChange(
                collection,
                hotspot
            );

        }


        /* =========================================
           12. POINTER EVENTS
        ========================================= */

        function onHotspotPointerEnter(hotspot, event) {

            if (event.pointerType === "touch") return;

            showTooltip(
                hotspot,
                event.clientX,
                event.clientY
            );

        }


        function onHotspotPointerLeave() {

            hideTooltip();

        }


        /* =========================================
           13. KEYBOARD EVENTS
        ========================================= */

        function onHotspotFocus(hotspot) {

            showTooltipForFocusedHotspot(hotspot);

        }


        function onHotspotKeyDown(hotspot, event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                selectHotspot(hotspot);

            }

        }


        /* =========================================
           14. REGISTER SVG HOTSPOTS
        ========================================= */

        hotspots.forEach(function configureHotspot(hotspot) {

            const id = getHotspotId(hotspot);

            const collection = data.collections[id];


            if (!collection) {

                hotspot.setAttribute(
                    "aria-disabled",
                    "true"
                );

                hotspot.setAttribute(
                    "tabindex",
                    "-1"
                );

                console.warn(
                    "[LuLinogic] Hotspot has no matching collection data:",
                    id
                );

                return;

            }


            hotspot.setAttribute(
                "role",
                "button"
            );

            hotspot.setAttribute(
                "tabindex",
                "0"
            );

            hotspot.setAttribute(
                "focusable",
                "true"
            );

            hotspot.setAttribute(
                "aria-label",
                getHotspotLabel(hotspot)
            );

            hotspot.setAttribute(
                "aria-pressed",
                "false"
            );

            hotspot.setAttribute(
                "aria-describedby",
                tooltip ? "hotspot-tooltip" : ""
            );


            hotspot.addEventListener(
                "pointerenter",
                onHotspotPointerEnter.bind(
                    null,
                    hotspot
                )
            );


            hotspot.addEventListener(
                "pointermove",
                function (event) {

                    scheduleTooltipPosition(
                        hotspot,
                        event
                    );

                }
            );


            hotspot.addEventListener(
                "pointerleave",
                onHotspotPointerLeave
            );


            hotspot.addEventListener(
                "focus",
                onHotspotFocus.bind(
                    null,
                    hotspot
                )
            );


            hotspot.addEventListener(
                "blur",
                hideTooltip
            );


            hotspot.addEventListener(
                "click",
                function () {

                    selectHotspot(hotspot);

                }
            );


            hotspot.addEventListener(
                "keydown",
                onHotspotKeyDown.bind(
                    null,
                    hotspot
                )
            );

        });


        /* =========================================
           15. SCENE EVENTS
        ========================================= */

        if (scene) {

            scene.addEventListener(
                "pointerleave",
                function () {

                    if (
                        !activeHotspot ||
                        document.activeElement !== activeHotspot
                    ) {

                        hideTooltip();

                    }

                }
            );

        }


        /* =========================================
           16. RESIZE AND SCROLL
        ========================================= */

        window.addEventListener(
            "resize",
            function () {

                if (
                    !tooltip ||
                    !tooltip.classList.contains("is-visible")
                ) {

                    return;

                }


                if (
                    activeHotspot &&
                    document.activeElement === activeHotspot
                ) {

                    showTooltipForFocusedHotspot(
                        activeHotspot
                    );

                } else {

                    hideTooltip();

                }

            },
            { passive: true }
        );


        window.addEventListener(
            "scroll",
            function () {

                if (
                    !tooltip ||
                    !tooltip.classList.contains("is-visible")
                ) {

                    return;

                }


                if (
                    document.activeElement !== activeHotspot
                ) {

                    hideTooltip();

                }

            },
            { passive: true }
        );


        /* =========================================
           17. IMAGE ERROR HANDLING
        ========================================= */

        if (sceneImage) {

            sceneImage.addEventListener(
                "error",
                function () {

                    console.error(
                        "[LuLinogic] Could not load Language_Steam.png. Check the file name and relative path."
                    );

                },
                { once: true }
            );

        }


        /* =========================================
           18. PUBLIC API
        ========================================= */

        window.LANGUAGE_STUDY_APP = Object.freeze({

            version: data.version,


            get activeCollectionId() {

                return activeHotspot
                    ? getHotspotId(activeHotspot)
                    : null;

            },


            selectCollection: function (collectionId) {

                const target = hotspots.find(
                    function (hotspot) {

                        return (
                            getHotspotId(hotspot) ===
                            collectionId
                        );

                    }
                );


                if (target) {

                    selectHotspot(target);

                }


                return Boolean(target);

            }

        });


        /* =========================================
           19. INITIALIZATION COMPLETE
        ========================================= */

        console.info(
            "[LuLinogic] Study room interactions initialized:",
            hotspots.length,
            "SVG hotspots."
        );

    });

})();