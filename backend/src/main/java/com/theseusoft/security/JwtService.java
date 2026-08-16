package com.theseusoft.security;
import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys; import java.nio.charset.StandardCharsets; import java.util.*; import javax.crypto.SecretKey; import org.springframework.beans.factory.annotation.Value; import org.springframework.stereotype.Service;
@Service public class JwtService {
 private final SecretKey key; private final long expiration;
 public JwtService(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration-ms}") long expiration){this.key=Keys.hmacShaKeyFor(Base64.getDecoder().decode(secret));this.expiration=expiration;}
 public String generate(String username, Collection<String> roles){return Jwts.builder().subject(username).claim("roles",roles).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis()+expiration)).signWith(key).compact();}
 public String subject(String token){return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();}
 @SuppressWarnings("unchecked") public Collection<String> roles(String token){Object roles=Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().get("roles"); return roles instanceof Collection<?> values ? values.stream().map(String::valueOf).toList() : List.of();}
 public boolean valid(String token){try { subject(token); return true; } catch (JwtException | IllegalArgumentException e) { return false; }}
}
