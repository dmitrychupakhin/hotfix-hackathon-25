# SlobodaSoft

**Полный развёрнутый проект**: [slobodasoft.ru](https://slobodasoft.ru)  
**Swagger API**: [https://slobodasoft.ru/api/docs/swagger/](https://slobodasoft.ru/api/docs/swagger/)  
**Дизайн (Figma)**: [https://www.figma.com/design/vM0oUVQP0b4JWkXQYAaY88/SlobodaSoft?node-id=88-4835&t=we2mC3zjGi79YVXc-1](https://www.figma.com/design/vM0oUVQP0b4JWkXQYAaY88/SlobodaSoft?node-id=88-4835&t=we2mC3zjGi79YVXc-1)

> **Важно:**  
> - Для локальной разработки используйте ветку `dev` (docker compose up --build -d). Ветка `main` настроена на автоматический деплой и может содержать изменения, не готовые для локальной проверки.  
> - В ветке `dev` удалены ключи от YandexGPT и пароли для SMTP-сервиса. По этой причине при локальном запуске будет возвращаться заранее сгенерированный план. Проверить реальную работу YandexGPT можно на развёрнутом сайте по адресу выше.

---
## Backend-часть
Django, FastApi, Docker, Nginx, Redis, Rabbit, Postgres

## Frontend-часть

Основная цель — предоставить удобный интерфейс для управления задачами и взаимодействия с бэкендом через REST API (YandexGPT).  
Ветка `hotfix-hackathon-25` содержит актуальный код на React + TypeScript со следующими особенностями:

- **Архитектура FSD (Feature-Sliced Design)**  
- **Material-UI (MUI)** в качестве библиотеки компонентов  
- **Вёрстка и темы** на базе MUI, центральная точка настроек — `src/shared/config/theme/appTheme.ts`  
- **Vite** как сборщик, дополненный собственными конфигурациями и плагинами  
- **React Router** для клиентской маршрутизации:  
  - Константы маршрутов хранятся в `src/shared/const/routes.ts`  
  - Конфигурация маршрутов — `src/app/providers/RouteProvider/config/routeConfig.ts`  
- **Redux Toolkit** для управления глобальным состоянием  
- **ESLint + eslint-plugin-stylistic** для единого кодстайла  
- **i18next** для интернационализации (локализация интерфейса)  
- **react-hook-form** для работы с формами и валидации  

> **Запуск на порте 80** необходим для корректной работы VK-авторизации.

---

## Технологический стек FRONTEND

- **Язык:** TypeScript (React)  
- **Сборщик:** Vite  
- **UI-библиотека:** Material-UI (MUI)  
- **Менеджер состояния:** Redux Toolkit  
- **Маршрутизация:** React Router v6+  
- **Локализация:** i18next  
- **Формы:** react-hook-form  
- **Linting:** ESLint + eslint-plugin-stylistic  
- **CSS-in-JS:** стили MUI (теки, темы)  
- **Инструменты разработки:**  
  - Node.js (рекомендуемая версия ≥ 16)  
  - npm или yarn
---
![Main](https://github.com/user-attachments/assets/84e30ece-0712-468d-b200-a468eef922a1)

