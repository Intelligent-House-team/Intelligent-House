package kr.co.Intelligent.House.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/login", "/logout", "/favicon.ico",
                                "/js/**", "/css/**", "/images/**", "/sidebar/**",
                                "/api/signup", "/api/user/nickname",
                                "/side", "/header",
                                "/boards", "/boardList.html", "/pageGuide.html", "/pageGuide",
                                "/update/**", "/delete/**", "/content.html", "/boards/content/**", "/content/**"
                        ).permitAll()
                        .anyRequest().permitAll()
                )
                .formLogin(login -> login
                        .loginPage("/")                      // 로그인 폼 위치
                        .loginProcessingUrl("/login")        // 로그인 요청 처리 URL
                        .defaultSuccessUrl("/", true)        // 성공 시 이동
                        .failureHandler((request, response, exception) -> {
                            // 로그인 실패 시 401 상태코드로 응답 (AJAX 처리 가능)
                            response.setStatus(401);
                            response.setContentType("text/plain;charset=UTF-8");
                            response.getWriter().write("아이디 또는 비밀번호가 올바르지 않습니다.");
                        })
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
