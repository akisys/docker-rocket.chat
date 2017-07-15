NAME = akisys/rocket.chat
VERSION = latest

.PHONY: all build run

all: build

build:
	docker build -t $(NAME):$(VERSION) --rm .

deploy: build
	docker push $(NAME):$(VERSION)

service-up: build
	docker-compose up mongodb&
	sleep 10
	docker-compose up rocket.chat&

service-down:
	docker-compose down

