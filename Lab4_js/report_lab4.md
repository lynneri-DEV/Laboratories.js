# Лабораторная работа №4
## Тема: Продвинутые объекты в JavaScript
**Дисциплина:** JavaScript  
**Студент:** Петровская Арина  
**Группа:** IA2504  
**Преподаватель:** Nartea N.  
**Год:** 2026
---
### Цель работы

Познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, 
а также реализовать наследование. Изучить прототипную модель JavaScript и функции-конструкторы.
---

### Выполнение лабораторной работы
# Классы
Перед выполнением создаем новую директорию `Lab4_js`, в которой будет храниться содержание четвертой лабораторной работы.  
В директории `Lab_4` создаем файл `item_weapon.js`.  

Класс `Item`, который представляет предмет в инвентаре.  
**Поля класса:**
* `name` – название предмета
* `weight` – вес предмета
* `rarity` - редкость предмета  
**Методы:**
* `getInfo()` – возвращает строку с информацией о предмете.
* `setWeight(newWeight)` – изменяет вес предмета.

**Вывод в консоли**
```
Предмет: Steel Sword, Вес: 3.5, Редкость: [rare]
Вес предмета "Steel Sword" изменен на 4
```  
**Дополнительные поля:**
* `damage` – урон оружия.
* ``durability`` – прочность (от 0 до 100).  

**Методы:**
* `use()` – уменьшает `durability` на 10 (если `durability` > 0).
* `repair()` – восстанавливает `durability` до 100.  

`extends` - ключевое слово, используемое для создания дочернего класса на основе родительского класса.   
`super()` конструктор, позволяет вызывать методы родителя.  

# Прототипы
### Что такое прототип?
Каждый объект в JavaScript имеет скрытое свойство `[[Prototype]]` — ссылку на другой объект, называемый **прототипом**. 
Когда происходит обращение к свойству объекта и оно не найдено, JavaScript автоматически ищет его в прототипе, затем в 
прототипе прототипа — и так далее. Это называется **цепочкой прототипов**.

### Где хранятся прототипы?
Прототипы — это обычные объекты, хранящиеся в **куче (heap)** — области памяти для динамически создаваемых данных. 
Экземпляры объектов не копируют прототип, а хранят **ссылку** на него. Это означает, что все экземпляры смотрят на один 
и тот же объект-прототип в памяти.

### Шаг 1. Класс `Item`

Класс `Item` представляет базовый предмет инвентаря с полями `name`, `weight`, `rarity` и методами `getInfo()`, `setWeight()`.

```javascript
class Item {
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }
 
    getInfo() {
        return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: [${this.rarity}]`;
    }
 
    setWeight(newWeight) {
        if (typeof newWeight !== 'number' || newWeight <= 0) {
            console.log('Некорректный вес!');
            return;
        }
        this.weight = newWeight;
        console.log(`Вес предмета "${this.name}" изменен на ${this.weight}`);
    }
}
```

### Шаг 2. Класс `Weapon`

Класс `Weapon` расширяет `Item`, добавляя поля `damage` и `durability`, а также методы `use()` и `repair()`. Метод `getInfo()` переопределён с использованием `super.getInfo()`.

```javascript
class Weapon extends Item {
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }
 
    getInfo() {
        return `${super.getInfo()} | Урон: ${this.damage} | Прочность: ${this.durability}%`;
    }
 
    use() {
        if (this.durability > 0) {
            this.durability -= 10;
            if (this.durability < 0) this.durability = 0;
            console.log(`Вы использовали ${this.name}. Прочность снижена до ${this.durability}%`);
        } else {
            console.log(`${this.name} сломано и не может быть использовано!`);
        }
    }
 
    repair() {
        this.durability = 100;
        console.log(`${this.name} полностью отремонтировано.`);
    }
}
```

### Шаг 3. Функции-конструкторы

Классы `Item` и `Weapon` переписаны с использованием функций-конструкторов и явной настройки цепочки прототипов.

```javascript
function Item(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}
 
Item.prototype.getInfo = function () {
    return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: [${this.rarity}]`;
};
 
Item.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
    console.log(`Вес предмета "${this.name}" изменен на ${this.weight}`);
};
 
function Weapon(name, weight, rarity, damage, durability) {
    Item.call(this, name, weight, rarity); // вызов конструктора родителя
    this.damage = damage;
    this.durability = durability;
}
 
Weapon.prototype = Object.create(Item.prototype);
// Восстанавливаем constructor, сбитый после Object.create()
Weapon.prototype.constructor = Weapon;
```  
### Шаг 4. Опциональная цепочка `?.`

Опциональная цепочка позволяет безопасно обращаться к свойствам и методам объекта, который может быть `null` или `undefined`, не получая `TypeError`.

```javascript
const items = [sword, bow, null, undefined];
 
items.forEach((item, index) => {
    // Без ?. — item.getInfo() на null выбросило бы TypeError
    const info = item?.getInfo?.();
 
    // ?? — нулевое объединение: правая часть, если левая null/undefined
    console.log(`items[${index}]: ${info ?? "предмет отсутствует"}`);
});
 
const unknownItem = null;
console.log(unknownItem?.name ?? "имя неизвестно");           // "имя неизвестно"
console.log(unknownItem?.getInfo?.() ?? "информация недоступна"); // "информация недоступна"
```
## Контрольные вопросы
### 1. Какое значение имеет `this` в методах класса?
`this` в методе класса — это **ссылка на объект**, который вызвал метод. То есть `this` указывает на конкретный экземпляр 
класса, через который был вызван метод.  
### 2. Как работает модификатор доступа `#` в JavaScript?
`#` перед именем поля или метода делает его **приватным** — недоступным снаружи класса. Обратиться к такому полю можно 
только внутри самого класса.  
### 3. В чём разница между классами и функциями-конструкторами?
По сути — **никакой**. Классы в JavaScript — это синтаксический сахар над функциями-конструкторами. Под капотом оба 
подхода используют прототипы. Разница только в синтаксе и нескольких поведенческих деталях.
















