/*!
 * Cookie Storage Library v1.0.0
 * https://github.com/Nogard7491/cookie-storage
 */
(function (global, factory) {
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("Для работы с библиотекой Cookie Storage требуется наличие " +
                        "объектов window и document.");
                }
                return factory(w);
            };
    } else {
        factory(global, false);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    /**
     * Создаёт объект.
     *
     * @constructor
     */
    var CookieStorage = function () {};

    /**
     * Получает cookie.
     *
     * @param name название cookie
     * @return {*}
     */
    CookieStorage.prototype.get = function (name) {

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
    CookieStorage.prototype.set = function (name, value, options) {

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
    CookieStorage.prototype.delete = function (name) {
        this.set(name, "", {
            expires: -1
        });
    };

    if (!noGlobal) {
        window.cstorage = new CookieStorage();
    }

    return CookieStorage;
});