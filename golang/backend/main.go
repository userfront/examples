package main

import (
	"example/handler"
	"example/server"
	"log"
	"os"
)

func main() {
	jwtSecret := os.Getenv("USERFRONT_JWT_PUBLIC_KEY")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET environment variable not set")
	}
	router := server.NewRouter()
	jwtService := server.NewJWTService(jwtSecret)
	authMiddleware := server.NewAuthMiddleware(jwtService)
	router.Use(authMiddleware.RequireAuth)
	router.GET("/", handler.RootHandler)

	if err := router.RunTLS("0.0.0.0:8080", "/code/certificates/localhost.pem", "/code/certificates/localhost-key.pem"); err != nil {
		log.Fatal(err)
	}

}
