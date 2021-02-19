import { CardsCollection } from "./namedayCardCreator";
import * as Helpers from "./helpers";

export function establishNavigtion(card: CardsCollection) {
    destroyNavigation();
    buildNavigation(card.getNext(), card.getPrevious());
} 

export function buildNavigation(next?: CardsCollection, previous?: CardsCollection): void {
    const cardResultsPresentationBlock = document.querySelector(".snd-nameday-results-block");
    const navigation = document.createElement("div");
    navigation.classList.add("snd-links-wrapper");

    const navigationLink = document.createElement("div");
    navigationLink.classList.add("snd-link-wrapper");

    if(previous) {
        let previousLink = document.createElement("a");
        previousLink.classList.add('.link');
        previousLink.innerHTML = "previous";
        
        previousLink.onclick = event => {
            makeSpaceAndEnterPreviousCards(previous.getCards());
            establishNavigtion(previous);
            event.preventDefault();
        }

        /* If there is a previous link, there also should be next link, therefore we have to make space for these links */
        navigationLink.classList.add(...("layout-flex justify-take-a-breath".split(" ")));
    }

    if(next) {
        let nextLink = document.createElement("a");
        nextLink.classList.add('.link');
        nextLink.innerHTML = "next";

        nextLink.onclick = event => {
            makeSpaceAndEnterNextCards(next.getCards());
            establishNavigtion(next);
            event.preventDefault();
        }

        if(!previous) {
            /* If there was no previous link, space for two links will be unnecessary */
            navigationLink.classList.add(...("layout-flex justify--end snd-pad-from-right-4x".split(" ")));
        }
    }
}

function destroyNavigation(): void {
    const navigation = document.querySelector(".snd-links-wrapper") as HTMLElement;
    if(navigation) {
        Helpers.HTMLElementHelper.leaveParent(navigation);
    }
}

function makeSpaceAndEnterPreviousCards(cards: HTMLElement[]) {
    let presentationNameDaysCardsResultsHolder = (document.querySelector(".snd-nameday-cards") as HTMLElement);
    let cardsTakenBackCoords = takeCardsBackBy(cards.length);
    let firstCardTakenBack = cardsTakenBackCoords[cardsTakenBackCoords.length - 1];
    
    let remainingCards = Array.from(getVisibleCards());

    if(remainingCards.length === 0) {
        setTimeout(() => {
            Helpers.HTMLElementHelper.appendChildren(presentationNameDaysCardsResultsHolder, ...cards);
            // presentationNameDaysCardsResultsHolder.appendChildren(...cards);
            for(let i = 0; i < cards.length; i++) {
                showInAndMoveAwayFromTo(
                    cards[i],
                    `translateX(0)`,
                    'translateX(100%)',    
                )
            }
        })
    }
}

export function makeSpaceAndEnterNextCards(cards: HTMLElement[]) {
    let presentationNameDaysCardsResultsHolder = (document.querySelector(".snd-nameday-cards") as HTMLElement);
    let forwardedCardsCoords = fastForwardCardsBy(cards.length);
    let lastForwardedCardsCoords = forwardedCardsCoords[forwardedCardsCoords.length - 1];

    let remainingCards = Array.from(getVisibleCards());

    if(remainingCards.length === 2) {
        presentationNameDaysCardsResultsHolder.appendChildren(...cards);
        showIn(cards[cards.length-1]);
    }

    if(remainingCards.length === 1) {
        setTimeout(() => {
            Helpers.HTMLElementHelper.appendChildren(presentationNameDaysCardsResultsHolder, ...cards);
            // presentationNameDaysCardsResultsHolder.appendChildren(...cards);
            for(let i = 0; i < cards.length; i++) {
                if(i < cards.length - 1) {
                    showInAndMoveAwayFromTo(
                        cards[i],
                        `translateX(${forwardedCardsCoords[forwardedCardsCoords.length - 1]}px)`,
                        'translateX(0)',    
                    )
                }
                else {
                    showIn(cards[i]);
                }
            }
        });
    }

    if(remainingCards.length === 0) {
        setTimeout(() => {
            Helpers.HTMLElementHelper.appendChildren(presentationNameDaysCardsResultsHolder, ...cards);
            // presentationNameDaysCardsResultsHolder.appendChildren(...cards);
            for(let i = 0; i < cards.length; i++) {
                showInAndMoveAwayFromTo(
                    cards[i],
                    `translateX(100%)`,
                    'translateX(0)',    
                )
            }
        });
    }
}

function fastForwardCardsBy(offset: number): any[] {
    if(offset === 0) {
        return [];
    }

    let cards = getVisibleCards();
    let coordinates = [];

    for(let card of cards) {
        coordinates.push(collectCoordinates(card));
    }

    if(offset === 1) {
        hideAndLeave(cards.slice(0, cards.length -2));
        
        moveAwayFromTo(cards[cards.length -2],
            'translateX(0)',
            `translateX(calc(${(coordinates[coordinates.length-2].x
                - coordinates[0].x) * (-1)}px + 4em))`
        );

        moveAwayFromTo(cards[cards.length -1],
            'translateX(0)',
            `translateX(calc(${(coordinates[coordinates.length-1].x
                - coordinates[0].x) * (-1)}px + 4em))`
        );
    }

    if(offset === 2) {
        hideAndLeave(cards.slice(0, cards.length - 1));
        
        moveAwayFromTo(cards[cards.length -1],
                'translateX(0)',
                `translateX(calc(${(coordinates[coordinates.length-1].x
                    - coordinates[0].x) * (-1)}px + 4em))`
            );
    }

    if(offset === 3) {
        hideAndLeave(cards);
    }

    return coordinates;
}

function takeCardsBackBy(offset: number): any[] {
    if(offset === 0) {
        return [];
    }

    let cards = getVisibleCards();
    let coordinates = [];

    for(let card of cards) {
        coordinates.push(collectCoordinates(card));
    }

    if(offset === 1) {
        hideAndLeave(cards.slice(0, cards.length -2));

        moveAwayFromTo(cards[cards.length -2],
            'translateX(0)',
            `translateX(calc(${(coordinates[coordinates.length-2].x
                - coordinates[0].x) * (-1)}px + 4em))`
        );

        moveAwayFromTo(cards[cards.length -1],
            'translateX(0)',
            `translateX(calc(${(coordinates[coordinates.length-1].x
                - coordinates[0].x) * (-1)}px + 4em))`
        );
    }

    if(offset === 3) {
        hideAndLeave(cards);
    }

    return coordinates;
}   


function showInAndMoveAwayFromTo(card: HTMLElement, from: string, to: string) {
    card.animate({
        opacity: [0, 1],
        transform: [from, to]
    }, {
        delay: 0,
        duration: 500
    })
}

function showIn(card: HTMLElement) {
    const HIDDEN = '1';
    card.style.opacity = HIDDEN; 
    card.animate({
        opacity: [0, 1]
    }, {
        delay: 500,
        duration: 500,
        fill: "forwards"
    })
}

function moveAwayFromTo(card: HTMLElement, from: string, to: string) {
    card.animate([
        {transform: from},
        {transform: to}
    ],
    {
        delay: 100,
        duration: 500,
        fill: 'forwards'
    })
}

function hideAndLeave(cards: HTMLElement[]) {
    for(let card of cards) {
        card.animate(
            {opacity: [1, 0]},  
            {
            duration: 500,
            fill: "forwards"}
            );
        setTimeout(() => {
            card.leaveParent();
        }, 600);
    }
}

function getVisibleCards(): HTMLElement[] {
    return Array.from(document.querySelectorAll(".snd-nameday-card")) as HTMLElement[];
}

function collectCoordinates(card: HTMLElement) {
    let bound = card.getBoundingClientRect();
    return {x: bound.x, y: bound.y}; 
}

