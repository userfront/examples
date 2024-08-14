FROM amazoncorretto:22

RUN yum install -y unzip findutils

WORKDIR /opt
RUN curl -LO https://services.gradle.org/distributions/gradle-8.9-bin.zip
RUN unzip gradle-8.9-bin.zip
RUN mv gradle-8.9 gradle
COPY ./profiled_gradle.sh /etc/profile.d/gradle.sh

COPY . /code

WORKDIR /code
RUN source /etc/profile.d/gradle.sh && gradle assemble
# TODO we have two copies of gradle in the image.
# RUN ./gradlew build

# TODO could we use class files instead?
CMD ["java", "-jar", "build/libs/code-6.1.1.jar"]