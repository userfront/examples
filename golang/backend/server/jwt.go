package server

import (
	"fmt"
	"github.com/golang-jwt/jwt"
)

// Identity represents the identity of a user with JWT claims, access token, refresh token, and user information.
type (
	Identity struct {
		jwt.StandardClaims
		Payload
	}

	Payload struct {
		Mode          string                 `json:"mode"`
		TenantId      string                 `json:"tenantId"`
		UserId        int64                  `json:"userId"`
		UserUuid      string                 `json:"userUuid"`
		IsConfirmed   bool                   `json:"isConfirmed"`
		Authorization map[string]interface{} `json:"authorization"`
		Iss           string                 `json:"iss"`
		SessionId     string                 `json:"sessionId"`
		Iat           int64                  `json:"iat"`
		Exp           int64                  `json:"exp"`
	}

	JWTService interface {
		ParseAndValidate(string) (*Identity, error)
	}
	jwtService struct {
		jwtSecret string `json:"jwt_secret"`
	}
)

func NewJWTService(jwtSecret string) JWTService {
	return &jwtService{jwtSecret: jwtSecret}
}

// ParseAndValidate takes a token string and parses it into an Identity struct.
// It also validates the token using the jwt.ParseWithClaims function,
// and returns the parsed Identity if the token is valid.
//
// Parameters:
// - tokenString: a string representing the token to be parsed and validated.
//
// Returns:
// - *Identity: a pointer to the parsed Identity if the token is valid.
// - error: an error if parsing or validation fails.
func (j *jwtService) ParseAndValidate(tokenString string) (*Identity, error) {
	var identity Identity
	token, err := jwt.ParseWithClaims(tokenString, &identity, func(token *jwt.Token) (interface{}, error) {
		return []byte(j.jwtSecret), nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return &identity, nil
}
