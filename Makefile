# Server

clean:
	rm -rf client/build

install: clean
	npm i && cd client && npm i

build: install
	cd client && npm run build

dev: install
	npm run dev

run: build
	npm run server
