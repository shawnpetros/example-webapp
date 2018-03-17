# Server

clean:
	rm -rf client/build

build: clean
	cd client && npm run build

run: build
	npm run server
