package main

import (
	"example/handler"
	"example/server"
	"fmt"
	"log"
	"net/http"
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

	srv := http.Server{}
	srv.Addr = fmt.Sprintf("0.0.0.0:8080")
	srv.Handler = router
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
