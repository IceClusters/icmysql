const { ParseError } = require('../errors/Parser.js');
const Translations = require('./List.js');

const supportedLanguages = ["en", "es", "fr", "pt-BR"];
const defaultLanguage = "en";

function ParseLocalisations() {
    if (!LanguageSpecified()) {
        return ParseError("language_undefined");
    }

    if (!LanguageSupported()) {
        return ParseError("language_unsupported", [supportedLanguages.join(", ")]);
    }
}

function LanguageSpecified() {
    return Config.Language && Config.Language != "";
}

function LanguageSupported() {
    return typeof Config.Language == "string" && supportedLanguages.includes(Config.Language);
}

function GetLanguage(replaceUnknown = true) {
    return (!LanguageSpecified() || !LanguageSupported()) && replaceUnknown ? defaultLanguage : Config.Language;
}

function GetKey(index) {
    return Translations[index][GetLanguage()] || "Can't find localisation: " + index + ", with language id: " + GetLanguage(false);
}

module.exports = { ParseLocalisations, GetKey, GetLanguage }