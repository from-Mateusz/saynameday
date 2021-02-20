import Logger from './logger';
import NameDay from './nameDay';
import * as Helpers from './helpers';
import { timeStamp } from 'console';

export class NameDayCardCreator {

    private static readonly LOGGER = Logger.getInstance("NameDayCardCreator");

    createCards(namedays: NameDay[]): CardsCollection {
        const collectionLimit = 3;
        const collection = new CardsCollection( Helpers.ArrayHelper.slice(namedays, collectionLimit).map(nameday => this.createCard(nameday)) );
        if(namedays.length > 3) {
            let lastNameDayIndx = namedays.length - 1;
            let nextCollection:CardsCollection = new CardsCollection();
            for(let i = 3; i < namedays.length; i++) {
                if(nextCollection.getCards().length < collectionLimit) {
                    NameDayCardCreator.LOGGER.info("Adding Nameday: ", namedays[i]);
                    nextCollection.addCard( this.createCard(namedays[i] ));
                }
                else {
                    NameDayCardCreator.LOGGER.info("Add next collection: ", nextCollection);
                    collection.addNext(nextCollection.copy());
                    nextCollection = new CardsCollection();
                }

                if(nextCollection.getSize() < collectionLimit && i === lastNameDayIndx) {
                    NameDayCardCreator.LOGGER.info("Add next collection: ", nextCollection);
                    collection.addNext(nextCollection.copy());
                    nextCollection = new CardsCollection();
                }
            }
        }
        NameDayCardCreator.LOGGER.info("Created Name-Day cards' collection: ", collection);
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
        cardDescription.innerHTML = "undefined" !== nameday.meaning.meaning ? nameday.meaning.meaning : "No meaning found for that name";

        cardDescriptionWrapper.appendChild(cardDescription);

        const cardFooterWrapper = document.createElement("div");
        cardFooterWrapper.classList.add(...("wrapper snd-pos-spacing--1x-pd-horiz".split(" ")));

        const cardFooter = document.createElement("p");
        cardFooterWrapper.classList.add(...("card__footer snd-pos-obj-inline-center".split(" ")));

        cardFooterWrapper.appendChild(cardFooter);

        // Helpers.HTMLElementHelper.appendChildren(card, cardTitleWrapper, cardDescriptionWrapper, cardFooterWrapper);
        card.appendChildren(cardTitleWrapper, cardDescriptionWrapper, cardFooterWrapper);
        
        return card;
    }
}

export class CardsCollection {

    private static readonly LOGGER = Logger.getInstance("CardsCollection");

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
        if(!this.hasNext()) {
            this.next = collection;
            this.next.addPrevious(this);
        }
        else {
            let nextCollection = this.getNext();
            while(nextCollection?.hasNext()) {
                CardsCollection.LOGGER.info("Looking for next card", nextCollection);
                nextCollection = nextCollection.getNext();
            }
            CardsCollection.LOGGER.info("Adding next cards' collection", nextCollection);
            nextCollection?.addNext(collection);
            nextCollection?.getNext()?.addPrevious(nextCollection);
        }
    }

    getPrevious() {
        return this.previous;
    }

    addPrevious(collection: CardsCollection) {
        this.previous = collection;
    }

    hasNext() {
        return undefined !== this.next;
    }

    hasPrevious() {
        return undefined !== this.previous;
    }

    copy(): CardsCollection {
        return new CardsCollection([...this.cards], this.next?.copy(), this.previous?.copy());
    }

    getSize() {
        return this.cards.length;
    }
}