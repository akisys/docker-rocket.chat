NAME = akisys/rocket.chat
VERSION = latest

.PHONY: all build run

all: build

build:
	docker build -t $(NAME):$(VERSION) --rm .

deploy: build
	docker push $(NAME):$(VERSION)

service-compose: build
	docker-compose up

