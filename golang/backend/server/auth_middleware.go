package server

import (
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

// ContextParamUser is a constant representing the key used to store user identity
// information in the request context.
const ContextParamUser = "CONTEXT_USER"

// AuthMiddleware is a middleware that performs authentication for incoming requests.
type AuthMiddleware struct {
	jwtService JWTService
}

// NewAuthMiddleware creates a new AuthMiddleware with the given JWTService and UserRepository.
// Parameters:
// - jwtService: service for JWT operations
// Returns:
// - *AuthMiddleware: the new AuthMiddleware instance
func NewAuthMiddleware(jwtService JWTService) *AuthMiddleware {
	return &AuthMiddleware{jwtService: jwtService}
}

// RequireAuth requires authentication for the given request.
func (m *AuthMiddleware) RequireAuth(c *gin.Context) {

	//Get the  bearer Token
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, JsonErrorResponse{Status: http.StatusUnauthorized, Error: "Authorization token is required"})
		c.Abort()
		return
	}

	extractedToken := strings.Split(tokenString, "Bearer ")

	if len(extractedToken) != 2 {
		c.JSON(http.StatusUnauthorized, JsonErrorResponse{Status: http.StatusUnauthorized, Error: "Incorrect format of authorization token"})
		c.Abort()
		return
	}

	claims, err := m.jwtService.ParseAndValidate(strings.TrimSpace(extractedToken[1]))
	if err != nil {
		c.JSON(http.StatusUnauthorized, JsonErrorResponse{Status: http.StatusUnauthorized, Error: "Token is not valid"})
		c.Abort()
		return
	}

	c.Request = c.Request.WithContext(context.WithValue(
		c.Request.Context(), ContextParamUser, claims))
	c.Next()
}
