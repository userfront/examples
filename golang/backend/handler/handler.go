package handler

import (
	"example/server"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RootHandler(c *gin.Context) {
	c.JSON(200, gin.H{"data": "root request"})
}

func AuthHandler(c *gin.Context) {

	claims, ok := c.Request.Context().Value(server.ContextParamUser).(*server.User)
	if !ok {
		c.JSON(http.StatusUnauthorized, server.JsonErrorResponse{Status: http.StatusUnauthorized, Error: "Token is not valid"})
		return
	}
	c.JSON(http.StatusOK, claims)
	return
}
