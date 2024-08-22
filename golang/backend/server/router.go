package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// JsonErrorResponse represents a JSON response format for reporting errors.
//
// It has the following fields:
// - Status: An integer indicating the HTTP status code.
// - Error: A string describing the error.
// - OriginalError: A string providing additional information about the error.
type JsonErrorResponse struct {
	Status int    `json:"status,omitempty"`
	Error  string `json:"error,omitempty"`
}

func NewRouter() *gin.Engine {
	router := gin.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.CustomSchemas = cors.DefaultSchemas
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowCredentials = true
	corsConfig.AllowWildcard = true
	router.Use(cors.New(corsConfig))
	return router
}
