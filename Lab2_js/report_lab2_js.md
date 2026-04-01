# Лабораторная работа №2
## Тема: Регулярные выражения. Обработка файлов данных и регулярные выражения
**Дисциплина:** JavaScript 
**Студент:** Петровская Арина  
**Группа:** IA2504  
**Преподаватель:** Nartea N.  
**Год:** 2026

---

### Описание лабораторной работы  
#### Цель  
Изучение принципов работы функций высшего порядка в JavaScript и освоение механизма использования функций-колбэков при обработке массивов без применения встроенных методов массива.
#### Задачи
* изучить понятие функции-колбэка (callback);
* понять принцип работы функций высшего порядка;
* реализовать собственные аналоги методов массивов JavaScript;
* научиться выполнять проверку входных параметров функций;
* закрепить навыки работы с циклами и функциями;
* реализовать функции:
* forEach (выполнение колбэка для каждого элемента);  
map;
filter;
find;
some;
every;
reduce;
* проверить корректность работы функций на тестовых примерах.

---

### Выполнение лабораторной работы
Перед выполнением создаем новую директорию `Lab2_js`, в которой будет храниться содержание второй лабораторной работы.  
В директории `Lab_2` создаем нужные файлы:  
- `function1_1.js`
- `function1_2.js`
- `function2.js`
- `function3.js`
- `function4.js`
- `function5.js`
- `function6.js`
- `function7.js`
- `report_lab2_js.md`
##### Во всех программах реализуем проверки  
```javascript
// Проверка, что передан массив
if (!Array.isArray(array)) {
    return;
}
```
```javascript
// Проверка, что callback является функцией
if (typeof callback !== "function") {
    return;
}
```
##### Задача 1.1 Вывод массива в консоль  
Выводим двумя способами массив. Способ первый.  
```javascript
// Итерация по массиву и вызов callback
for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
}
```  
Функция `callback` обеспечивает вывод элементов в консоль
```javascript
const callback = function(element, index, _array) {
    console.log(`Element ${index}: value ${element}`);
};
```
Вывод в консоли
```
Element 0: value x
Element 1: value y
Element 2: value z
```
Способ второй
```javascript
// Перебор массива
for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
}
```
Функция `callback` обеспечивает вывод элементов в консоль
```javascript
const callback = function(element, index, _array) {
    console.log(`${index}:  ${element}`);
};
```
Вывод в консоли
```
0:  x
1:  y
2:  z
```
##### Задача 1.2 Функция выполняет переданный колбэк для каждого элемента массива. 
Для начала проверяем что `callback` является функцией  
`if (typeof callback !== "function") return;`  
Далее перебираем массив и вызов callback  
```javascript
 for (let i = 0; i < array.length; i++) {
 callback(array[i], i, array);
 }
```
- `element` — текущий элемент массива
- `index` — его позиция в массиве
- `_array` — сам массив (не используется)  
Вывод в консоли
```
Element: 1, Index: 0
Element: 2, Index: 1
Element: 3, Index: 2
```
##### Задача 2. Функция создает новый массив, содержащий результаты вызова колбэка для каждого элемента исходного массива.  
Создаем функцию `mapArr`, которая принимает два аргумента `array` `callback`. Создаем пустой массив `const result = [];`.  
Проходит по каждому элементу массива и создаёт новый массив, заполняя его результатами функции `callback`.
```javascript
    for (let i = 0; i < array.length; i++) {
    result[i] = callback(array[i], i, array);
}
```  
Пример использования
```javascript
const numbers = [1, 2, 3];
const squared = mapArr(numbers, (element) => element * element); // создаёт новый массив, где каждое число возводится в квадрат
console.log(squared);
```  
Вывод в консоли `[ 1, 4, 9 ]`  
##### Задача 3. Создать фукнцию `filter` с параметрами `array` `callback`. Позволяет отфильтровать элементы массива на основе логики, определенной в колбэке.
```javascript
    for (let i = 0; i < array.length; i++) {
       if (callback(array[i], i, array)) {
           result.push(array[i]);
       }
}
```  
Перебираем каждый элемент массива array. `Callback` возвращает логическое значение: `true` или `false`. Если `callback` возвращает true, то элемент добавляется `push()` в массив `result`.
Если `false` — элемент пропускается.
Пример использования
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filter(numbers, (element) => element % 2 === 0);
console.log(evenNumbers);
```  
Вывод в консоли `[ 2, 4 ]` 
##### Задача 4. Создать фукнцию `find` с параметрами `array` `callback`. Функция возвращает первый элемент массива, удовлетворяющий условию.  
```javascript
    for (let i = 0; i < array.length; i++) {
       if (callback(array[i], i, array)) {
           return array[i];
       }
    }
    
   return undefined;
}
```  
Если callback возвращает true, функция немедленно возвращает текущий элемент `array[i]` и цикл прерывается.
Если ни один элемент не удовлетворяет условию, функция ничего не вернёт (будет `undefined`).  
Пример использования
```javascript
const numbers = [1, 2, 3, 4, 5];
const firstEven = find(numbers, (element) => element % 2 === 0);
console.log(firstEven); 
```  
Вывод в консоли `[2]` 
##### Задача 5. Создать фукнцию `some` с параметрами `array` `callback`. Функция проверяет, существует ли хотя бы один элемент массива, удовлетворяющий условию.  
```javascript
    for (let i = 0; i < array.length; i++) {
       if (callback(array[i], i, array)) {
           return true;
       }
   }
   
   return false;
}
```  
Если текущий элемент удовлетворяет условию (`callback` вернул `true`), функция немедленно возвращает `true`.
Цикл останавливается, остальные элементы не проверяются `return false;`.
Если цикл закончился, и ни один элемент не подошёл, функция возвращает `false`.  
Пример использования
```javascript
const numbers1 = [1, 2, 3, 4, 5];
const hasEvenNumbers1 = some(numbers1, (element) => element % 2 === 0);

const numbers2 = [1, 3, 5];
const hasEvenNumbers2 = some(numbers2, (element) => element % 2 === 0);

console.log(hasEvenNumbers1); 
console.log(hasEvenNumbers2);  
```  
Вывод в консоли 
```javascript
true
false
```  
##### Задача 6. Создать фукнцию `every` с параметрами `array` `callback`. Функция проверяет, удовлетворяют ли все элементы массива заданному условию.  
```javascript
    for (let i = 0; i < array.length; i++) {
       if (!callback(array[i], i, array)) {
           return false;
       }
   }
   
   return true;
}
```  
Если хотя бы один элемент НЕ проходит проверку (`callback` вернул `false`), функция сразу возвращает `false`.
Цикл останавливается при первом несоответствующем элементе `return true;`.
Если цикл прошёл все элементы и не встретил ни одного несоответствующего, значит все элементы удовлетворяют условию. Функция возвращает `true`.  
Пример использования
```javascript
const numbers1 = [2, 4, 6];
const hasEvenNumbers1 = every(numbers1, (element) => element % 2 === 0);

const numbers2 = [2, 4, 6, 3, 7];
const hasEvenNumbers2 = every(numbers2, (element) => element % 2 === 0);

console.log(hasEvenNumbers1); // true
console.log(hasEvenNumbers2); // false
```  
Вывод в консоли
```javascript
true
false
```  
##### Задача 7. Создать фукнцию `reduce` с параметрами `array` `callback` `initialValue`. Функция последовательно обрабатывает элементы массива, накапливая результат в аккумуляторе.  
В первую очередь выполняем проверку. Если длина массива нулевая или параметр `initialValue` не определен, то выводится `undefined`  
```javascript
 if (array.length === 0 && initialValue === undefined) {
 return undefined;
}
```  
Далее объявляем переменные с пустыми значениями  
```javascript
let accumulator; // аккумулятор
let startIndex; // начальное значение
```  
Определяем начальные значения аккумулятора.  
`initialValue` - это значение, с которого начинаем аккумуляцию (суммирование, умножение и т. д.) в reduce (метод массива, который сводит массив к одному элементу).
Иногда оно не передано, тогда его значение — `undefined`.
Далее проверяем: пользователь передал начальное значение?
Если да (`initialValue` существует), используем его. Если `initialValue` не передан, то берём первый элемент массива как стартовое значение аккумулятора.
```javascript
 if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
} else {
    accumulator = array[0];
    startIndex = 1;
}
```  
Перебираем массив по элементам. `callback` принимает 4 параметра `accumulator` `array[i]` `i` `array`.  
```javascript
    for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
   }
   
   return accumulator;
}
```  
Пример использования
```javascript
const numbers1 = [1, 2, 3, 4, 5];
const sum1 = reduce(numbers1, (acc, el) => acc + el, 0);

console.log(sum1); 

// сумма без initialValue
const numbers2 = [1, 2, 3];
const sum2 = reduce(numbers2, (acc, el) => acc + el);

console.log(sum2); 
```  
Вывод в консоли
```javascript
15
6
```  
### Контрольные вопросы 
**В чем преимущества использования колбэков при работе с массивами?**  
- Один и тот же метод (`map`, `filter`, `reduce`) может работать с разными функциями-колбэками.  
- Колбэки позволяют не писать циклы вручную каждый раз, код становится компактнее и читабельнее.  
- Удобно комбинировать: можно писать цепочки array.filter(...).map(...).reduce(...).
- Логика обработки элемента не привязывается к основной функции — её можно менять отдельно.  

**Какие проблемы могут возникать при использовании колбэков и как их избежать?**
- Сложность чтения кода при глубокой вложенности. Можно разбивать цепочку на несколько строк и использовать именованные функции.  
- При передаче метода объекта как колбэка контекст может потеряться. Можно использовать стрелочные функции или `bind` (метод функций, который создаёт новую функцию с привязанным значением `this`).
- Ошибки, если колбэк не возвращает значение. Необходимо всегда явно возвращать значение.
- 
**Как реализовать функции `map`, `filter`, `find`, `some`, `every` и `reduce` без использования встроенных методов массивов показано в заданиях 2-7**
### [Официальная документация JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


