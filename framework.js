ffw = function(selector){
    // Регулярка проверяющая селектор (.class или #id)
    var rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        checkAttr=/\[.*\]/g,
        coin = rquickExpr.exec(selector),
        attrMatch = selector.match(checkAttr);

    // Проверка, если селектор — строка
    if (typeof selector === "string"){

        // Поиск по селектору
        if(attrMatch == null){
            // В случае с #id
            if(coin[0] && coin[1]){
                var context = document.getElementById(coin[1]);
                context = new Array(context);
                console.log(context);
            }

            // В случае с .class
            if (coin[0] && coin[3]){
                var context = document.getElementsByClassName(coin[3]);
                console.log(context);
            }

            // В случае с tag
            if(coin[0] && coin[2]){
                var context = document.querySelectorAll(coin[2]);
                console.log(context);
            }
        } else {
            // Поиск если указан аттрибут
            // Вырезаем [значение] из селектора
            selector = selector.replace(attrMatch,'');
            var context = document.querySelectorAll(selector + attrMatch);
            console.log(context);
        }
    }

    //  Аксессоры и методы
    FfwObj = function(){
        var _data = null;

//      Аксессоры
        this.setData = function(context){
            _data = context;
        };

        this.getData = function(){
            return _data;
        };


//      Методы
        // Берем/меняем аттрибут
        this.attr = function(attr, value){
            var data = this.getData();

            if(value != undefined){
                for (var i = 0; i<data.length; i++){
                    data[i].setAttribute(attr, value);
                }
            } else {
                for (var i = 0; i<data.length; i++){
                    return data[i].getAttribute(attr);
                }
            }

            return this;
        };

        // Удаляем аттрибут(ы)
        this.removeAttr = function(value){
            var data = this.getData();

            for (var i = 0; i<data.length; i++){
                data[i].removeAttribute(value);
            }

            return this;
        };

        // А это просто так
        this.newAlert = function () {
            alert(_data);
            console.log(_data);

            return this;
        };
    }

    // Объявляем новый объект на основе класса FfwObj
    NewFfwObj = new FfwObj();

    // Получаем массив элементов
    NewFfwObj.setData(context);

    // Возвращаем объект
    return NewFfwObj;
}

// Делаем выборку селекторов через $. Типа крутой и взрослый фреймворк))
if ( typeof window === "object" && typeof window.document === "object" ) {
    window.ffw = window.$ = ffw;
}








