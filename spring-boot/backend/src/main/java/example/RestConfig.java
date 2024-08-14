package example;

import java.io.ByteArrayInputStream;

import java.security.interfaces.RSAPublicKey;
import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.converter.RsaKeyConverters;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
public class RestConfig {

  ByteArrayInputStream key_bytes = new ByteArrayInputStream(System.getenv("USERFRONT_JWT_PUBLIC_KEY").getBytes());
  RSAPublicKey key =  RsaKeyConverters.x509().convert(key_bytes);

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .cors(Customizer.withDefaults())
      .requiresChannel((channel) -> channel.anyRequest().requiresSecure())
      .authorizeHttpRequests((authorize) -> authorize.anyRequest().authenticated())
      .csrf(Customizer.withDefaults())
      .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))
      .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .exceptionHandling((exceptions) -> exceptions
          .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
          .accessDeniedHandler(new BearerTokenAccessDeniedHandler())
      );

    return http.build();
  }

  @Bean
  JwtDecoder jwtDecoder() {
    return NimbusJwtDecoder.withPublicKey(this.key).build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type"));
    configuration.setAllowedOrigins(Arrays.asList("https://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
