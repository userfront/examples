# select image
FROM golang:1.22-alpine as builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .
RUN mkdir bin
RUN go mod vendor
RUN go build  -o ./bin/main .

# Command to run the executable
CMD ["./main"]

# select image
FROM alpine
WORKDIR /app
RUN apk update && apk add --no-cache tzdata ca-certificates
COPY --from=builder /app/bin/ ./
CMD ["./main"]
