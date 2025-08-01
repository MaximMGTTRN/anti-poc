# Развертывание на GitHub Pages

## Подготовка к деплою

### 1. Обновите конфигурацию

Перед деплоем необходимо обновить следующие файлы:

#### package.json
Замените `[your-username]` и `[your-repo-name]` на ваши реальные данные:
```json
"homepage": "https://your-username.github.io/your-repo-name"
```

#### vite.config.ts
Замените `[your-repo-name]` на имя вашего репозитория:
```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/'
```

### 2. Установите зависимости

```bash
npm install
```

## Способы деплоя

### Способ 1: Автоматический деплой через GitHub Actions (Рекомендуется)

1. Убедитесь, что ваш код находится в ветке `main`
2. Запушьте изменения в репозиторий:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```
3. GitHub Actions автоматически соберет и развернет ваш проект

### Способ 2: Ручной деплой

1. Соберите проект:
   ```bash
   npm run build
   ```

2. Разверните на GitHub Pages:
   ```bash
   npm run deploy
   ```

## Настройка GitHub Pages

1. Перейдите в настройки вашего репозитория на GitHub
2. Найдите раздел "Pages" в боковом меню
3. В разделе "Source" выберите "Deploy from a branch"
4. Выберите ветку `gh-pages` и папку `/ (root)`
5. Нажмите "Save"

## Проверка деплоя

После успешного деплоя ваш сайт будет доступен по адресу:
`https://your-username.github.io/your-repo-name`

## Устранение проблем

### Проблема с роутингом
Если у вас есть проблемы с роутингом на GitHub Pages, убедитесь что:
- В `vite.config.ts` правильно настроен `base` path
- Используется `HashRouter` вместо `BrowserRouter` для React Router

### Проблема с 404 ошибками
GitHub Pages может показывать 404 ошибки для SPA. Создайте файл `public/404.html` с редиректом на `index.html`.

## Обновление сайта

Для обновления сайта просто запушьте изменения в ветку `main`:
```bash
git add .
git commit -m "Update site"
git push origin main
```

GitHub Actions автоматически пересоберет и развернет обновленную версию. 