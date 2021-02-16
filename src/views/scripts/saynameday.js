const removedFromViewCssClass = "snd-pos--removed";
const mainContent = document.getElementById("snd-main-content");

window.onload = () => {
    setupCountriesSelection();
    const api = new SayNameDayApi();
    api.getNameDaysByCountryCode("pl");
};

function setupCountriesSelection() {
    const countrySelectInput = document.getElementById("country-select");
    if(!countrySelectInput) {
        throw new Error("Could not locate country select input. Check your view structure");
    }
    countrySelectInput.addEventListener("click", event => {

        showOrHideAvailableCountries(event);
    })
}

function showOrHideAvailableCountries(event) {
    if(!event) {
        throw new Error("Event has not been set");
    }
    
    const avialableCountryList = document.getElementById("available-countries-list");
    
    if(null !== avialableCountryList) {
        if(avialableCountryList.classList.contains(removedFromViewCssClass)) {
            avialableCountryList.classList.remove(removedFromViewCssClass);
        }
        else {
            avialableCountryList.classList.add(removedFromViewCssClass);
        }
    }
    
    event.preventDefault();
}

class SayNameDayApi {

    static logger = Logger.getInstance("SayNameDayApi");

    constructor(cardCreator) {
        this.cardCreator = new NameDayCardCreator();
    }

    getNameDaysByCountryCode(code) {
        let thatCardCreator = this.cardCreator;

        loading();

        $.ajax({
            url: `http://localhost:3000/namedays/${code}`,
            method: 'GET'
        })

        .done( namedays => {
            SayNameDayApi.logger.info(`Namedays response by country code: ${code}`, namedays);
            const nameDayCardCreator = new NameDayCardCreator(namedays);
            const nameDaysResultBlock = document.querySelector(".snd-nameday-results-block");
            const nameDaysCollectionWrapper = document.querySelector(".snd-nameday-cards");
            let cardResultBlock = nameDayCardCreator.createCardResultBlock();
            nameDaysCollectionWrapper.appendChildren(...(cardResultBlock.getCards()));
            const resultsNavigation = createCardResultNavigation(cardResultBlock);
            nameDaysResultBlock.appendChild(resultsNavigation);
            loading(false);
        })

        .fail(() => {
            SayNameDayApi.logger.error(`Could not fetch countries by code: ${code}`);
        })
    }
}

function loading(pending = true) {
    const loaderContainer = document.querySelector(".snd-loading-container");
    if(pending) {
        if(loaderContainer.classList.contains(removedFromViewCssClass)) {
            loaderContainer.classList.remove(removedFromViewCssClass);
        }
    }
    else {
        if(!loaderContainer.classList.contains(removedFromViewCssClass)) {
            loaderContainer.classList.add(removedFromViewCssClass);
        }
    }
}

function createCardResultNavigation(cardResultBlock) {
    const navigation = document.createElement("div");
    navigation.classList.add(...("snd-nav-links layout-flex".split(" ")));
    navigation.classList.add(cardResultBlock.hasPrevious() ? "justify-take-a-breath" : "justify--end");
    if(cardResultBlock.hasPrevious()) {
        const linkWrapper = createResultsNavigationLinkWrapper();
        const link = createResultsNavigationLink("previous");
        link.addEventListener("click", event => {
            console.log("Loading previous nameday cards: ", cardResultBlock.getPrevious());
            event.preventDefault();
        })
        linkWrapper.appendChild(link);
        navigation.appendChild(linkWrapper);
    }

    if(cardResultBlock.hasNext()) {
        const linkWrapper = createResultsNavigationLinkWrapper();
        const link = createResultsNavigationLink("next");
        link.addEventListener("click", event => {
            console.log("Loading next nameday cards: ", cardResultBlock.getNext());
            event.preventDefault();
        })
        linkWrapper.appendChild(link);
        navigation.appendChild(linkWrapper);
    }

    return navigation;
}

function createResultsNavigationLinkWrapper() {
    const linkWrapper = document.createElement("div");
    linkWrapper.classList.add(...("snd-link-wrapper snd-pos-obj-inline-center".split(" ")));
    return linkWrapper;
}

function createResultsNavigationLink(name) {
    const link = document.createElement("a");
    link.classList.add(...("link snd-typo-til-fam".split(" ")));
    link.innerHTML = name;
    return link;
}

/* Simplified implementation of LinkedList */

class CardResultBlock {
    constructor(cards) {
        this.cards = cards;
        this.next = null;
        this.previous = null;
    }

    getCards() {
        return this.cards;
    }

    getNext() {
        return this.next;
    }

    getPrevious() {
        return this.previous
    }

    setNext(block) {
        this.next = block;
        this.next.setPrevious(this);
    }

    setPrevious(block) {
        this.previous = block;
    }

    hasNext() {
        return null !== this.next;
    }

    hasPrevious() {
        return null !== this.previous;
    }
}

class NameDayCardCreator {

    static logger = Logger.getInstance("NameDayCardCreator");

    static nameDaysCollectionWrapper = document.querySelector(".snd-nameday-cards");

    static nameDaysPerCardResultsBlock = 3;

    constructor(namedays) {
        this.namedays = namedays;
    }

    createCardResultBlock() {
        const totalCardBlocks = this.namedays.length % 3 == 0 ? this.namedays.length % 3 : this.namedays.length + 1;
        const cardGroups = []
        const groupedNameDays = [];
        
        let cardResultBlock = null;
        
        for(let i = 0; i < this.namedays.length; i+=3) {
            groupedNameDays.push(sliceBetter(this.namedays, i, NameDayCardCreator.nameDaysPerCardResultsBlock));
        }
        
        for(let group of groupedNameDays) {
            let cardGroup = [];
            cardGroups.push( group.map(nameday => this.createCard(nameday)) );
        };

        for(let group of cardGroups) {
            if(!cardResultBlock) {
                cardResultBlock = new CardResultBlock(group);
            }
            else {
                cardResultBlock.setNext(new CardResultBlock(group));
            }
        }

        NameDayCardCreator.logger.info("Card result block: ", cardResultBlock);

        return cardResultBlock;
    } 

    createCard(nameday = {}) {
        if(!nameday.name) {
            NameDayCardCreator.logger.error("Could not create nameday card, because name-day data's empty");
            throw new Error("Nameday is empty");
        }

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
        const {meaning} = nameday.meaning;
        cardDescription.classList.add("card_description");
        cardDescription.innerHTML = meaning ? meaning : cardDescription.innerHTML;

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