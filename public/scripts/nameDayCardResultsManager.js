"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSpaceAndEnterNextCards = exports.buildNavigation = exports.establishNavigtion = exports.clearNameDayCardsResults = void 0;
const logger_1 = __importDefault(require("./logger"));
HTMLElement.prototype.appendChildren = function (...children) {
    for (let child of children) {
        this.appendChild(child);
    }
};
HTMLElement.prototype.leaveParent = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
        return this;
    }
    return null;
};
HTMLElement.prototype.clear = function () {
    this.innerHTML = "";
};
const logger = logger_1.default.getInstance("NameDayCardCreator");
function clearNameDayCardsResults() {
    let presentationNameDaysCardsResultsHolder = document.querySelector(".snd-nameday-cards");
    presentationNameDaysCardsResultsHolder.clear();
}
exports.clearNameDayCardsResults = clearNameDayCardsResults;
function establishNavigtion(card) {
    destroyNavigation();
    logger.info("Next cards' collection: ", card.getNext());
    buildNavigation(card.getNext(), card.getPrevious());
}
exports.establishNavigtion = establishNavigtion;
function buildNavigation(next, previous) {
    const cardResultsPresentationBlock = document.querySelector(".snd-nameday-results-block");
    const navigation = document.createElement("div");
    navigation.classList.add("snd-links-wrapper");
    if (!cardResultsPresentationBlock) {
        throw new Error("Could not locate name-day cards' result block");
    }
    if (previous) {
        let navigationLink = document.createElement("div");
        navigationLink.classList.add("snd-link-wrapper");
        let link = document.createElement("a");
        link.classList.add('.link');
        link.innerHTML = "previous";
        link.onclick = event => {
            makeSpaceAndEnterPreviousCards(previous.getCards());
            establishNavigtion(previous);
            event.preventDefault();
        };
        /* If there is a previous link, there also should be next link, therefore we have to make space for these links */
        navigation.classList.add(...("layout-flex justify-take-a-breath".split(" ")));
        navigationLink.appendChildren(link);
        navigation.appendChild(navigationLink);
    }
    if (next) {
        let navigationLink = document.createElement("div");
        navigationLink.classList.add("snd-link-wrapper");
        let link = document.createElement("a");
        link.classList.add('.link');
        link.innerHTML = "next";
        link.onclick = event => {
            logger.info("Next cards navigation: ", next.getCards());
            makeSpaceAndEnterNextCards(next.getCards());
            establishNavigtion(next);
            event.preventDefault();
        };
        if (!previous) {
            /* If there was no previous link, space for two links will be unnecessary */
            navigation.classList.add(...("layout-flex justify--end snd-pad-from-right-4x".split(" ")));
        }
        navigationLink.appendChildren(link);
        navigation.appendChild(navigationLink);
    }
    cardResultsPresentationBlock.appendChild(navigation);
}
exports.buildNavigation = buildNavigation;
function destroyNavigation() {
    const navigation = document.querySelector(".snd-links-wrapper");
    if (navigation) {
        // Helpers.HTMLElementHelper.leaveParent(navigation);
        navigation.leaveParent();
    }
}
function makeSpaceAndEnterPreviousCards(cards) {
    let presentationNameDaysCardsResultsHolder = document.querySelector(".snd-nameday-cards");
    let cardsTakenBackCoords = takeCardsBackBy(cards.length);
    if (cardsTakenBackCoords.length > 0) {
        setTimeout(() => {
            EnterPreviousCards(cardsTakenBackCoords, cards);
        }, 700);
    }
    else {
        EnterPreviousCards(cardsTakenBackCoords, cards);
    }
}
function EnterPreviousCards(cardsTakenBackCoords, cards) {
    let presentationNameDaysCardsResultsHolder = document.querySelector(".snd-nameday-cards");
    let firstCardTakenBack = cardsTakenBackCoords[cardsTakenBackCoords.length - 1];
    let remainingCards = Array.from(getVisibleCards());
    if (remainingCards.length === 0) {
        presentationNameDaysCardsResultsHolder.appendChildren(...cards);
        for (let i = 0; i < cards.length; i++) {
            showInAndMoveAwayFromTo(cards[i], 'translateX(100%)', `translateX(0)`);
        }
    }
    if (remainingCards.length === 1) {
        presentationNameDaysCardsResultsHolder.appendChildren(...cards);
        for (let i = 0; i < cards.length; i++) {
            if (i < cards.length - 1) {
                showInAndMoveAwayFromTo(cards[i], 'translateX(0)', `translateX(${cardsTakenBackCoords[cardsTakenBackCoords.length - 1]}px)`);
            }
            else {
                showIn(cards[i]);
            }
        }
    }
    if (remainingCards.length === 2) {
        presentationNameDaysCardsResultsHolder.appendChildren(...cards);
        for (let i = 0; i < cards.length; i++) {
            if (i < cards.length - 1) {
                showInAndMoveAwayFromTo(cards[i], 'translateX(0)', `translateX(${cardsTakenBackCoords[cardsTakenBackCoords.length - 1]}px)`);
            }
            else {
                showIn(cards[i]);
            }
        }
    }
}
function makeSpaceAndEnterNextCards(cards) {
    if (getVisibleCards().length === 0) {
        EnterNextCards([], cards);
    }
    else {
        let forwardedCardsCoords = fastForwardCardsBy(cards.length);
        if (forwardedCardsCoords.length > 0) {
            setTimeout(() => {
                EnterNextCards(forwardedCardsCoords, cards);
            }, 700);
        }
        else {
            EnterNextCards(forwardedCardsCoords, cards);
        }
    }
}
exports.makeSpaceAndEnterNextCards = makeSpaceAndEnterNextCards;
function EnterNextCards(forwardedCardsCoords, cards) {
    let presentationNameDaysCardsResultsHolder = document.querySelector(".snd-nameday-cards");
    let lastForwardedCardsCoords = forwardedCardsCoords[forwardedCardsCoords.length - 1];
    let remainingCards = getVisibleCards();
    if (remainingCards.length === 2) {
        presentationNameDaysCardsResultsHolder.appendChildren(...cards);
        showIn(cards[cards.length - 1]);
    }
    if (remainingCards.length === 1) {
        // Helpers.HTMLElementHelper.appendChildren(presentationNameDaysCardsResultsHolder, ...cards);
        presentationNameDaysCardsResultsHolder.appendChildren(...cards);
        for (let i = 0; i < cards.length; i++) {
            if (i < cards.length - 1) {
                showInAndMoveAwayFromTo(cards[i], `translateX(${forwardedCardsCoords[forwardedCardsCoords.length - 1]}px)`, 'translateX(0)');
            }
            else {
                showIn(cards[i]);
            }
        }
    }
    if (remainingCards.length === 0) {
        logger.info("Adding new cards");
        // Helpers.HTMLElementHelper.appendChildren(presentationNameDaysCardsResultsHolder, ...cards);
        presentationNameDaysCardsResultsHolder.appendChildren(...cards);
        for (let i = 0; i < cards.length; i++) {
            showInAndMoveAwayFromTo(cards[i], `translateX(100%)`, 'translateX(0)');
        }
    }
}
function fastForwardCardsBy(offset) {
    if (offset === 0) {
        return [];
    }
    let cards = getVisibleCards();
    let coordinates = [];
    for (let card of cards) {
        coordinates.push(collectCoordinates(card));
    }
    if (offset === 1) {
        hideAndLeave(cards.slice(0, cards.length - 2));
        moveAwayFromTo(cards[cards.length - 2], 'translateX(0)', `translateX(calc(${(coordinates[coordinates.length - 2].x
            - coordinates[0].x) * (-1)}px + 4em))`);
        moveAwayFromTo(cards[cards.length - 1], 'translateX(0)', `translateX(calc(${(coordinates[coordinates.length - 1].x
            - coordinates[0].x) * (-1)}px + 4em))`);
    }
    if (offset === 2) {
        hideAndLeave(cards.slice(0, cards.length - 1));
        moveAwayFromTo(cards[cards.length - 1], 'translateX(0)', `translateX(calc(${(coordinates[coordinates.length - 1].x
            - coordinates[0].x) * (-1)}px + 4em))`);
    }
    if (offset === 3) {
        hideAndLeave(cards);
    }
    return coordinates;
}
function takeCardsBackBy(offset) {
    if (offset === 0) {
        return [];
    }
    let cards = getVisibleCards();
    let coordinates = [];
    for (let card of cards) {
        coordinates.push(collectCoordinates(card));
    }
    if (offset === 1) {
        hideAndLeave(cards.slice(0, cards.length - 2));
        moveAwayFromTo(cards[cards.length - 2], 'translateX(0)', `translateX(calc(${(coordinates[coordinates.length - 2].x
            - coordinates[0].x) * (-1)}px + 4em))`);
        moveAwayFromTo(cards[cards.length - 1], 'translateX(0)', `translateX(calc(${(coordinates[coordinates.length - 1].x
            - coordinates[0].x) * (-1)}px + 4em))`);
    }
    if (offset === 3) {
        hideAndLeave(cards);
    }
    return coordinates;
}
function showInAndMoveAwayFromTo(card, from, to) {
    card.animate({
        opacity: [0, 1],
        transform: [from, to]
    }, {
        delay: 0,
        duration: 500
    });
}
function showIn(card) {
    const HIDDEN = '1';
    card.style.opacity = HIDDEN;
    card.animate({
        opacity: [0, 1]
    }, {
        delay: 500,
        duration: 500,
        fill: "forwards"
    });
}
function moveAwayFromTo(card, from, to) {
    card.animate([
        { transform: from },
        { transform: to }
    ], {
        delay: 100,
        duration: 500
    });
}
function hideAndLeave(cards) {
    for (let card of cards) {
        card.animate({ opacity: [1, 0] }, {
            duration: 500,
            fill: "forwards"
        });
        setTimeout(() => {
            card.leaveParent();
        }, 600);
    }
}
function getVisibleCards() {
    return Array.from(document.querySelectorAll(".snd-nameday-card"));
}
function collectCoordinates(card) {
    let bound = card.getBoundingClientRect();
    return { x: bound.x, y: bound.y };
}
