import $ from "jquery";
import Api from "./api";

const api = new Api();

window.onload = () => {
    api.getNamedaysByCountryCode("pl");
}

