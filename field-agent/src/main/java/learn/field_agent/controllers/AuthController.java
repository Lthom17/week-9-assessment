package learn.field_agent.controllers;

import learn.field_agent.domain.Result;
import learn.field_agent.domain.ResultType;
import learn.field_agent.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/security")
public class AuthController {

    AuthenticationManager authManager;
    JwtConverter converter;


    @PostMapping("/authenticate")
    public ResponseEntity authenticate(@RequestBody Map<String, String> credentials) {
        Result result = new Result();
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(
                        credentials.get("username"),
                        credentials.get("password"));
        try {
            Authentication authResult = authManager.authenticate(token);

            if (authResult.isAuthenticated()) {
                String jwt = converter.getTokenFromUser((User) authResult.getPrincipal());

                Map<String, String> tokenWrapper = new HashMap<>();
                tokenWrapper.put("jwt_token", jwt);

                return ResponseEntity.ok(tokenWrapper);
            }
        } catch (AuthenticationException e) {

            result.addMessage(e.getMessage(), ResultType.FORBIDDEN);

        }

        return ErrorResponse.build(result);
    }
}