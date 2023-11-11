# Прогнозирование отправления вагонов в ремонт

Проект подготовлен в рамках хакатона DataWagon 2023.

Ноутбуки с исследованиями представлены в папке research.

## Запуск приложения

-   Склонировать репозиторий:

```
git clone https://github.com/erikgab01/rutube_hack.git
```

Есть два способа запуска приложения: локально и через докер

Локально:

-   Перейти в директорию frontend

```
cd frontend
```

-   Установить зависимости

```
npm install
```

-   Запустить клиентское приложение, приложение запустится на http://localhost:5173

```
npm run dev
```

-   Перейти в директорию backend

```
cd backend
```

-   Установить зависимости

```
pip install -r requirements.txt
```

-   Запустить серверное приложение, сервер запустится на http://localhost:8000

```
uvicorn main:app
```

Через докер:

-   В корне проекта запустить docker-compose

```
docker-compose up
```
