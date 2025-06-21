FROM maven:3.6.3-openjdk-17-slim AS build
ENV MAVEN_OPTS="-XX:+TieredCompilation -XX:TieredStopAtLevel=1"

COPY . /src
WORKDIR /src

RUN mvn clean package -DskipTests=true -Dmaven.repo.local=/.m2 -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true -Dmaven.wagon.http.ssl.ignore.validity.dates=true

FROM openjdk:17-alpine
RUN apk update && apk add make curl

COPY --from=build /src/target/*.jar  ./app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]