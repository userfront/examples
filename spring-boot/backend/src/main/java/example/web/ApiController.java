package example.web;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.converter.json.MappingJacksonValue;


@RestController
public class ApiController {

  @CrossOrigin(origins = "https://localhost:8080")
  @GetMapping("/api/data")
  public MappingJacksonValue index(Authentication authentication) {
    Jwt details = (Jwt) authentication.getCredentials();
    return new MappingJacksonValue(details.getClaims());
  }

}
