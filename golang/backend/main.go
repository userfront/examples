package main

import (
	"crypto/tls"
	"example/handler"
	"example/server"
	"log"
	"net/http"
	"os"
)

const (
	CertFilePath = "/code/certificates/localhost.pem"
	KeyFilePath  = "/code/certificates/localhost-key.pem"
)

func main() {
	jwtSecret := os.Getenv("USERFRONT_JWT_PUBLIC_KEY")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET environment variable not set")
	}
	router := server.NewRouter()
	jwtService := server.NewJWTService(jwtSecret)
	authMiddleware := server.NewAuthMiddleware(jwtService)
	router.GET("/", handler.RootHandler)
	router.Use(authMiddleware.RequireAuth)
	router.GET("/api/data", handler.AuthHandler)

	serverTLSCert, err := tls.LoadX509KeyPair(CertFilePath, KeyFilePath)
	if err != nil {
		log.Fatalf("Error loading certificate and key file: %v", err)
	}
	server := http.Server{
		Addr:    "0.0.0.0:8080",
		Handler: router,
		TLSConfig: &tls.Config{
			Certificates: []tls.Certificate{serverTLSCert},
		},
	}
	if err := server.ListenAndServeTLS(CertFilePath, KeyFilePath); err != nil {
		log.Fatal(err)
	}

}
