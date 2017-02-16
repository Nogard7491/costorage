# Библиотека для удобной работы с cookies

Для чтения и записи cookie используется свойство document.cookie.
Однако, оно представляет собой не объект, а строку в специальном формате,
для удобной манипуляций с которой нужны дополнительные функции.

Данная библиотека предназначена для удобной работы с cookie.

## Подключение библиотеки

```javascript
    // подключение с помощью тега script
    <script src="node_modules/costorage/dist/costorage.min.js"></script>
```

```javascript
    // подключение с помощью Webpack
    window.costorage = require("costorage");
```

```javascript
    // подключение с помощью RequireJS
    requirejs(
        ["costorage"],
        function(costorage){
            // ...
        }
    );
```

## Примеры

```javascript
    // проверка включены ли cookies
    var checkEnabled = costorage.checkEnabled();
    console.log(checkEnabled);
```

```javascript
    // проверка на существование cookie
    costorage.exists("cookie_name");
```

```javascript
    // установка значения cookie
    costorage.set("cookie_name", "cookie_value");

    // установка значения cookie с дополнительными параметрами
    costorage.set("cookie_name", "cookie_value", {
        expires: 3600, // время истечения cookie
        path: "/", // путь для cookie
        domain: "localhost", // домен для cookie.
        secure: false // использование только при защищённом соединении
    });
```

```javascript
    // получение значения cookie
    costorage.get("cookie_name");
```

```javascript
    // удаление cookie
    costorage.delete("cookie_name");
```