/**
 * @fileoverview Система инвентаря с использованием функций-конструкторов.
 * Реализует базовый предмет (Item) и оружие (Weapon) с наследованием через прототипы.
 * Создаёт предмет инвентаря.
 * @constructor
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета в килограммах.
 * @param {"common"|"uncommon"|"rare"|"legendary"} rarity - Редкость предмета.
 */
function Item(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

/**
 * Возвращает строку с основной информацией о предмете.
 * @returns {string} Информация о предмете.
 */
Item.prototype.getInfo = function () {
    return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: [${this.rarity}]`;
};

/**
 * Изменяет вес предмета и выводит сообщение об изменении.
 * @param {number} newWeight - Новый вес предмета в килограммах.
 */
Item.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
    console.log(`Вес предмета "${this.name}" изменен на ${this.weight}`);
};

// Функция-конструктор Weapon (наследует Item)
/**
 * Создаёт оружие, наследуя свойства предмета инвентаря.
 * @constructor
 * @param {string} name - Название оружия.
 * @param {number} weight - Вес оружия в килограммах.
 * @param {"common"|"uncommon"|"rare"|"legendary"} rarity - Редкость оружия.
 * @param {number} damage - Урон оружия.
 * @param {number} durability - Прочность оружия (от 0 до 100).
 */
function Weapon(name, weight, rarity, damage, durability) {
    Item.call(this, name, weight, rarity); // вызов конструктора родителя
    this.damage = damage;
    this.durability = durability;
}

// Настройка цепочки прототипов
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

/**
 * Возвращает расширенную информацию об оружии, включая урон и прочность.
 * Переопределяет метод родительского класса Item.
 * @returns {string} Информация об оружии.
 */
Weapon.prototype.getInfo = function () {
    return `${Item.prototype.getInfo.call(this)} | Урон: ${this.damage} | Прочность: ${this.durability}%`;
};

/**
 * Применяет оружие: уменьшает прочность на 10 единиц.
 * Если прочность уже равна 0, выводит сообщение о поломке.
 * Прочность не может опуститься ниже 0.
 */
Weapon.prototype.use = function () {
    if (this.durability > 0) {
        this.durability -= 10;
        if (this.durability < 0) this.durability = 0;
        console.log(`Вы использовали ${this.name}. Прочность снижена до ${this.durability}%`);
    } else {
        console.log(`${this.name} сломано и не может быть использовано!`);
    }
};

/**
 * Восстанавливает прочность оружия до максимального значения (100).
 */
Weapon.prototype.repair = function () {
    this.durability = 100;
    console.log(`${this.name} полностью отремонтировано.`);
};


// Тестирование с опциональной цепочкой (?.)
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(bow.durability);
bow.repair();
console.log(bow.getInfo());

/**
 * Массив предметов инвентаря для демонстрации опциональной цепочки.
 * Намеренно содержит null и undefined для проверки защитного поведения.
 * @type {Array<Item|null|undefined>}
 */
const items = [sword, bow, null, undefined];

items.forEach((item, index) => {
    // Без ?. — item.getInfo() на null выбросило бы TypeError
    const info = item?.getInfo?.();
    console.log(`items[${index}]: ${info ?? "предмет отсутствует"}`);
});

// Обращение к вложенным свойствам несуществующего объекта
const unknownItem = null;
console.log(unknownItem?.name ?? "имя неизвестно");
console.log(unknownItem?.getInfo?.() ?? "информация недоступна");