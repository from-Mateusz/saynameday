import Logger from './logger';
import NameDay from './nameDay';
import * as Helpers from './helpers';

export class NameDayCardCreator {

    private static readonly LOGGER = Logger.getInstance("NameDayCardCreator");

    createCards(namedays: NameDay[]): CardsCollection {
        const collectionLimit = 3;
        const collection = new CardsCollection( Helpers.ArrayHelper.slice(namedays, collectionLimit).map(nameday => this.createCard(nameday)) );
        if(namedays.length > 3) {
            let nextCollection:CardsCollection = new CardsCollection();
            for(let i = 3; i < namedays.length; i++) {
                if(nextCollection.getCards().length < 3) {
                    nextCollection.addCard( this.createCard(namedays[i] ));
                }
                else {
                    collection.addNext(nextCollection.copy());
                    nextCollection = new CardsCollection();
                }
            }
        }
        return collection;
    }

    createCard(nameday: NameDay): HTMLElement {
        const card = document.createElement("div");
        card.classList.add(...("snd-nameday-card color--light-000 snd-typo-til-fam snd-effect-put-shadow--1".split(" ")));

        const cardTitleWrapper = document.createElement("div");
        cardTitleWrapper.classList.add(...("wrapper snd-pos-spacing--1x-pd-horiz".split(" ")));

        const cardTitle = document.createElement("h1");
        cardTitle.classList.add(...("card__title snd-typo--bold snd-pos-obj-inline-center snd-typo-size--1c25x".split(" ")));
        cardTitle.innerHTML = nameday.name ? nameday.name : cardTitle.innerHTML;

        cardTitleWrapper.appendChild(cardTitle);

        const cardDescriptionWrapper = document.createElement("div");
        cardDescriptionWrapper.classList.add(...("wrapper snd-pos-spacing--1x-pd-horiz".split(" ")));

        const cardDescription = document.createElement("p");
        cardDescription.classList.add("card_description");
        cardDescription.innerHTML = nameday.meaning ? nameday.meaning.meaning : cardDescription.innerHTML;

        cardDescriptionWrapper.appendChild(cardDescription);

        const cardFooterWrapper = document.createElement("div");
        cardFooterWrapper.classList.add(...("wrapper snd-pos-spacing--1x-pd-horiz".split(" ")));

        const cardFooter = document.createElement("p");
        cardFooterWrapper.classList.add(...("card__footer snd-pos-obj-inline-center".split(" ")));

        cardFooterWrapper.appendChild(cardFooter);

        Helpers.HTMLElementHelper.appendChildren(card, cardTitleWrapper, cardDescriptionWrapper, cardFooterWrapper);
        // card.appendChildren(cardTitleWrapper, cardDescriptionWrapper, cardFooterWrapper);
        
        return card;
    }
}

export class CardsCollection {

    constructor(private cards: HTMLElement[] = [], private next?: CardsCollection, private previous?: CardsCollection) {}

    addCard(card: HTMLElement) {
        this.cards.push(card);
    } 

    getCards() {
        return this.cards;
    }

    getNext() {
        return this.next;
    }

    addNext(collection: CardsCollection) {
        this.next = collection;
        this.addPrevious(this);
    }

    getPrevious() {
        return this.previous;
    }

    addPrevious(collection: CardsCollection) {
        this.previous = collection;
    }

    hasNext() {
        return null !== this.next;
    }

    hasPrevious() {
        return null !== this.previous;
    }

    copy() {
        return new CardsCollection(this.cards, this.next, this.previous);
    }

    getSize() {
        return this.cards.length;
    }
}