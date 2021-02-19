"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsCollection = exports.NameDayCardCreator = void 0;
const logger_1 = __importDefault(require("./logger"));
const Helpers = __importStar(require("./helpers"));
class NameDayCardCreator {
    createCards(namedays) {
        const collectionLimit = 3;
        const collection = new CardsCollection(Helpers.ArrayHelper.slice(namedays, collectionLimit));
        if (namedays.length > 3) {
            let nextCollection = new CardsCollection();
            for (let i = 3; i < namedays.length; i++) {
                if (nextCollection.getCards().length < 3) {
                    nextCollection.addCard(this.createCard(namedays[i]));
                }
                else {
                    collection.addNext(nextCollection.copy());
                    nextCollection = new CardsCollection();
                }
            }
        }
        return collection;
    }
    createCard(nameday) {
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
        cardDescription.innerHTML = nameday.meaning ? nameday.meaning : cardDescription.innerHTML;
        cardDescriptionWrapper.appendChild(cardDescription);
        const cardFooterWrapper = document.createElement("div");
        cardFooterWrapper.classList.add(...("wrapper snd-pos-spacing--1x-pd-horiz".split(" ")));
        const cardFooter = document.createElement("p");
        cardFooterWrapper.classList.add(...("card__footer snd-pos-obj-inline-center".split(" ")));
        cardFooterWrapper.appendChild(cardFooter);
        card.appendChildren(cardTitleWrapper, cardDescriptionWrapper, cardFooterWrapper);
        return card;
    }
}
exports.NameDayCardCreator = NameDayCardCreator;
NameDayCardCreator.LOGGER = logger_1.default.getInstance("NameDayCardCreator");
class CardsCollection {
    constructor(cards = [], next, previous) {
        this.cards = cards;
        this.next = next;
        this.previous = previous;
    }
    addCard(card) {
        this.cards.push(card);
    }
    getCards() {
        return this.cards;
    }
    getNext() {
        return this.next;
    }
    addNext(collection) {
        this.next = collection;
        this.addPrevious(this);
    }
    getPrevious() {
        return this.previous;
    }
    addPrevious(collection) {
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
exports.CardsCollection = CardsCollection;
