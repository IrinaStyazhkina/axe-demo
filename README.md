# axe-demo
Примеры тестирования доступности с использвованием библиотеки axe

1. axe-playwright-example содержит пример теста на Typescript + Playwright

Чтобы запустить тесты, необходимо:
 - перейти в консоли в папку axe-playwright-example 
```cd axe-playwright-example```
 - установить зависимости проекта
```
    npm i
```
 - выполнить команду:
```
    npx playwright test
```
- Для формирования отчета нужно выполнить команду 
```
    npx allure serve allure-results
```

2. axe-storybook содержит пример Storybook с аддоном a11y. Для просмотра необходимо:

- перейти в папку axe-storybook

```
cd axe-storybook
```
- установить зависимости проекта
```
    npm i
```
- выполнить команду:
```
    npm run storybook
```

3. axe-selenide содержит пример тестирования доступности при помощи Java + Selenide
Для запуска теста:
- В IDE в файле TestExample.java запустить тест
- Для формирования отчета перейти в консоли в папку axe-selenide
```
cd axe-selenide
```
- выполнить команду
```
./gradlew allureServe
```
