docker build -t "back-end:latest" .

docker tag back-end:latest baongochuynh/back-end:latest

docker push "baongochuynh/back-end:latest"
