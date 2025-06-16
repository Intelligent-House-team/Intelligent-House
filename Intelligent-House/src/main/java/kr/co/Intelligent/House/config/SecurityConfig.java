package kr.co.Intelligent.House.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                })
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/", "/login", "/logout", "/favicon.ico",
                                "/js/**", "/css/**", "/images/**", "/sidebar/**",
                                "/api/signup", "/api/user/nickname",
                                "/side", "/header",
                                "/boards", "/boardList.html", "/pageGuide.html", "/pageGuide",
                                "/post", "/update/**", "/delete/**", "/content.html", "/post/content/**", "/content/**"
                        ).permitAll()
                        .anyRequest().permitAll()
                )
                .formLogin(login -> login
                        .loginPage("/")                      // 로그인 폼 위치
                        .loginProcessingUrl("/login")        // 로그인 요청 처리 URL
                        .loginProcessingUrl("/login")  // ✅ 이게 있어야 POST /login 받음
                        .usernameParameter("username")   // 명시적으로 설정
                        .passwordParameter("password")   // 명시적으로 설정

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

    // ✅ CORS 설정 추가
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // ✅ 쿠키 인증 허용
        //config.setAllowedOriginPatterns(Arrays.asList("http://localhost:8081")); // ✅ 포트까지 명시
        config.setAllowedOrigins(Arrays.asList("http://localhost:8081"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
