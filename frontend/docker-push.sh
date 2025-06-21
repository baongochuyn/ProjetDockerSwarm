docker build -t "front-end:latest" .

docker tag front-end:latest baongochuynh/front-end:latest

docker push "baongochuynh/front-end:latest"
