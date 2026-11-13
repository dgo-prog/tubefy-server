.PHONY: dev db build up down restart logs ps shell db-shell migrate

# Локальная разработка NestJS
dev:
	npm run start:dev

# Запустить только PostgreSQL
db:
	docker compose up -d db

# Собрать Docker-образы
build:
	docker compose build

# Запустить весь проект в Docker
up:
	docker compose up -d --build

# Остановить контейнеры
down:
	docker compose down

# Перезапустить контейнеры
restart:
	docker compose restart

# Смотреть логи
logs:
	docker compose logs -f

# Статус контейнеров
ps:
	docker compose ps

# Войти в контейнер приложения
shell:
	docker compose exec app sh

# Подключиться к PostgreSQL
db-shell:
	docker compose exec db sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'

# Выполнить миграции Sequelize
migrate:
	docker compose exec app npx sequelize-cli --options-path ./.sequelizerc.cjs db:migrate
