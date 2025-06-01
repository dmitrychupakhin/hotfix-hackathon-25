Развёрнутый проект: slobodasoft.ru
swagger: https://slobodasoft.ru/api/docs/swagger/
figma: https://www.figma.com/design/vM0oUVQP0b4JWkXQYAaY88/SlobodaSoft?node-id=88-4835&t=we2mC3zjGi79YVXc-1
Для запуска используйте dev ветку (main настроена на деплой)
Удалены ключи на YandexGPT и пароли от почты для подключения через smtp
Поэтому ветка dev будет возвращать заранее сгенерированный план, проверить работу YandexGPT можно на развёрнутом сайте.
Пользователи по умолчанию:
admin - админ
password

staff - менеджер
password

leader - тимлид
password

user - заказчик
password

### hotfix-hackathon-25

React + TypeScript
Архитектура - FSD https://mui.com/material-ui/getting-started/ 
Material-UI (MUI) в качестве библиотеки компонентов
Конфигурация MUI src/shared/config/theme/appTheme.ts
Vite как сборщик (конфигурация, плагины, запуск)
React Router для маршрутизации
Константы маршрутов: src/shared/const/routes.ts
Конфигурация маршрутов: src/app/providers/RouteProvider/config/routeConfig.ts
Redux Toolkit для управления состоянием
ESLint + плагин eslint-plugin-stylistic для поддержания единых правил кодирования
i18next для интернационализации (локализации)
react-hook-form для работы с формами

Запуск на порте 80 для работы ВК авторизации!

MacOs: sudo npm run dev
Windows: npm run dev


