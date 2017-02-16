/*!
 * Costorage library v1.0.0
 * https://github.com/Nogard7491/costorage
 */
(function (factory) {
    "use strict";

    if (typeof exports === "object") {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(['costorage'], factory);
    } else {
        window.costorage = new factory();
    }
})(function () {

    /**
     * Создаёт объект.
     *
     * @constructor
     */
    var Costorage = function () {

    };

    /**
     * Проверяет включены ли cookies.
     */
    Costorage.prototype.checkEnabled = function () {

        var cookieEnabled;

        try {
            if (document.cookie.indexOf("costoragetest=") != -1) {
                cookieEnabled = true;
            } else {
                document.cookie = "costoragetest=1";
                cookieEnabled = document.cookie.indexOf("costoragetest=") != -1;
                document.cookie = "costoragetest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
            }
        } catch (ex) {
            return false;
        }

        return cookieEnabled;
    };

    /**
     * Проверяет существует ли cookie.
     */
    Costorage.prototype.exists = function (name) {

        return (typeof this.get(name) === "undefined") ? false : true;
    };

    /**
     * Получает cookie.
     *
     * @param name название cookie
     * @return {*}
     */
    Costorage.prototype.get = function (name) {

        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    /**
     * Создаёт cookie.
     *
     * @param name название cookie
     * @param value значение cookie
     * @param options параметры cookie (expires, path, domain, secure)
     */
    Costorage.prototype.set = function (name, value, options) {

        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    };

    /**
     * Удаляет cookie.
     *
     * @param name название cookie
     */
    Costorage.prototype.delete = function (name) {

        this.set(name, "", {
            expires: -1
        });
    };

    return new Costorage();
});