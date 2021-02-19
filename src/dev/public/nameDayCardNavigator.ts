import { CardsCollection } from "./namedayCardCreator";

function makeSpaceAndEnterNewCards(cards: HTMLElement[]) {
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
            presentationNameDaysCardsResultsHolder.appendChildren(...cards);
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
            presentationNameDaysCardsResultsHolder.appendChildren(...cards);
            for(let i = 0; i < cards.length; i++) {
                showInAndMoveAwayFromTo(
                    cards[i],
                    `translateX(${forwardedCardsCoords[forwardedCardsCoords.length - 1]}px)`,
                    'translateX(0)',    
                )
            }
        });
    }
}

function buildNavigation() {
    
}

function fastForwardCardsBy(offset: number): any[] {
    if(offset === 0) {
        return [];
    }

    let cards = Array.from(getVisibleCards());
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
        hideAndLeave(Array.from(cards));
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

function getVisibleCards() {
    return Array.from(document.querySelectorAll(".snd-nameday-card")) as HTMLElement[];
}

function collectCoordinates(card: HTMLElement) {
    let bound = card.getBoundingClientRect();
    return {x: bound.x, y: bound.y}; 
}

