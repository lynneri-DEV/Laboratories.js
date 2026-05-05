class Item {
    /**
     * Создаёт предмет инвентаря.
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета в килограммах.
     * @param {"common"|"uncommon"|"rare"|"legendary"} rarity - Редкость предмета.
     */
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Возвращает строку с основной информацией о предмете.
     * @returns {string} Информация о предмете.
     */
    getInfo() {
        return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: [${this.rarity}]`;
    }

    /**
     * Изменяет вес предмета.
     * Если передано некорректное значение — выводит сообщение об ошибке.
     * @param {number} newWeight - Новый вес предмета в килограммах (должен быть больше 0).
     */
    // Изменение веса
    setWeight(newWeight) {
        if (typeof newWeight !== 'number' || newWeight <= 0) {
            console.log('Некорректный вес!');
            return;
        }
        this.weight = newWeight;
        console.log(`Вес предмета "${this.name}" изменен на ${this.weight}`);
    }
}

// ============================================
// Тестирование Item
// ============================================

const sword = new Item("Steel Sword", 3.5, "rare");

console.log(sword.getInfo());
sword.setWeight(4.0);

/**
 * Класс, представляющий оружие.
 * Наследует базовые свойства и методы класса Item.
 * @extends Item
 */
class Weapon extends Item {
    /**
     * Создаёт оружие.
     * @param {string} name - Название оружия.
     * @param {number} weight - Вес оружия в килограммах.
     * @param {"common"|"uncommon"|"rare"|"legendary"} rarity - Редкость оружия.
     * @param {number} damage - Урон оружия.
     * @param {number} durability - Прочность оружия (от 0 до 100).
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);

        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Возвращает расширенную информацию об оружии.
     * Переопределяет метод родительского класса Item.
     * @returns {string} Информация об оружии, включая урон и прочность.
     */
    getInfo() {
        return `${super.getInfo()} | Урон: ${this.damage} | Прочность: ${this.durability}%`;
    }

    /**
     * Применяет оружие: уменьшает прочность на 10 единиц.
     * Если прочность уже равна 0 — выводит сообщение о поломке.
     * Прочность не может опуститься ниже 0.
     */
    use() {
        if (this.durability > 0) {
            this.durability -= 10;
            // Проверка, чтобы прочность не стала отрицательной
            if (this.durability < 0) this.durability = 0;

            console.log(`Вы использовали ${this.name}. Прочность снижена до ${this.durability}%`);
        } else {
            console.log(`${this.name} сломано и не может быть использовано!`);
        }
    }

    /**
     * Восстанавливает прочность оружия до максимального значения (100).
     */
    repair() {
        this.durability = 100;
        console.log(`${this.name} полностью отремонтировано.`);
    }
}

// ============================================
// Тестирование Weapon
// ============================================

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);

console.log(bow.getInfo());
bow.use();
console.log(bow.durability);

bow.repair();
console.log(bow.getInfo());
