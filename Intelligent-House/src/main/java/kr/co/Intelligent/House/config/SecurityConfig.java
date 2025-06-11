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
                .csrf(csrf -> csrf.disable()) // 개발 단계에서는 비활성화
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",                        // 메인 페이지
                                "/js/**", "/css/**", "/images/**", "/sidebar/**", "/favicon.ico", // 정적 리소스
                                "/api/signup",             // 회원가입 API
                                "/side", "/header",        // 헤더/사이드 동적 로딩용
                                "/api/user/nickname",       // 중복 체크용 API
                                "/boards", "/boardList.html"
                        ).permitAll()
                        .requestMatchers("/login", "/logout").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .loginPage("/")                      // 커스텀 로그인 폼 위치 (메인 페이지)
                        .loginProcessingUrl("/login")        // 로그인 처리 URL
                        .defaultSuccessUrl("/", true)        // 로그인 성공 후 리다이렉트
                        .failureUrl("/?error")               // 로그인 실패 시 메인으로 리다이렉트
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
