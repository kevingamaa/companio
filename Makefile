CURRENT_DIR = ${CURDIR}

.DEFAULT: help
all: help

.PHONY: run
run: ## Run the application
	docker run --rm --name trigger \
		--mount type=bind,src=$(CURRENT_DIR)/,dst=/app/ \
		-e "ENV=dev" \
		-e "LOG_LEVEL=info" \
		node:8.10 \
		node /app/src/index.js

.PHONY: test
test: ## Run unit tests
	docker run --rm --name trigger \
		--mount type=bind,src=$(CURRENT_DIR)/,dst=/app/ \
		-w="/app" \
		-e "ENV=dev" \
		-e "LOG_LEVEL=fatal" \
		node:8.10 \
		npm test

.PHONY: help
help: ## this help
	# Usage:
	#   make <target> [OPTION=value]
	#
	# Targets:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
