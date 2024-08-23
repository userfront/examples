package server

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"github.com/golang-jwt/jwt"
)

// Identity represents the identity of a user with JWT claims, access token, refresh token, and user information.

type User struct {
	jwt.StandardClaims
	Authentication struct {
		FirstFactor struct {
			Channel  string `json:"channel"`
			Strategy string `json:"strategy"`
		} `json:"firstFactor"`
	} `json:"authentication"`
	Authorization struct {
		N8Zwd9N struct {
			Roles []string `json:"roles"`
		} `json:"7n8zwd9n"`
	} `json:"authorization"`
	IsConfirmed            bool   `json:"isConfirmed"`
	IsEmailConfirmed       bool   `json:"isEmailConfirmed"`
	IsPhoneNumberConfirmed bool   `json:"isPhoneNumberConfirmed"`
	Mode                   string `json:"mode"`
	SessionId              string `json:"sessionId"`
	TenantId               string `json:"tenantId"`
	UserId                 int    `json:"userId"`
	UserUuid               string `json:"userUuid"`
}
type (
	JWTService interface {
		ParseAndValidate(string) (*User, error)
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
func (j *jwtService) ParseAndValidate(tokenString string) (*User, error) {
	var identity User

	token, err := jwt.ParseWithClaims(tokenString, &identity, func(token *jwt.Token) (interface{}, error) {
		return publicKey([]byte(j.jwtSecret))
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}
	return &identity, nil
}

func publicKey(source []byte) (*rsa.PublicKey, error) {
	pubPem, _ := pem.Decode(source)
	if pubPem == nil {
		return nil, fmt.Errorf("failed to decode PEM")
	}
	parsedKey, err := x509.ParsePKIXPublicKey(pubPem.Bytes)
	if err != nil {
		return nil, err
	}
	pubKey, ok := parsedKey.(*rsa.PublicKey)
	if !ok {
		return nil, fmt.Errorf("failed to parse public key")
	}
	return pubKey, nil
}
