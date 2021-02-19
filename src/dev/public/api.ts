import $ from "jquery";

export default class Api {
    getNamedaysByCountryCode(code: string) {
        $.ajax({
            url: `namedays/${code}`,
            method: "get"
        })

        .done((namedays) => {
            console.log('Namedays: ', namedays);
        })

        .fail(() => {
            console.log('Something went wrong ');
        })
    }
}