build:
	docker build -t dreamgravity-web .

run: build
	docker run -d --rm -p 8080:8080 dreamgravity-web
