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
                .csrf(csrf -> csrf.disable()) // 개발 편의상 비활성화 (프로덕션에서는 활성화 권장)
                .authorizeHttpRequests(auth -> auth
                        // 메인 페이지, 모든 정적 리소스(js, css, images, sidebar), favicon, API 회원가입은 인증 없이 접근 허용
                        .requestMatchers(
                                "/", // 메인 페이지
                                "/js/**", "/css/**", "/images/**", "/sidebar/**", "/favicon.ico", // 정적 리소스
                                "/api/signup", // 회원가입 API 엔드포인트
                                "/side", "/header", // HomeController에서 매핑한 페이지들도 인증 없이 접근 허용
                                "/api/user/nickname" // <-- 이 줄 추가
                        ).permitAll()
                        // /login 경로는 스프링 시큐리티의 폼 로그인 처리를 위해 permitAll (UI가 아닌 백엔드 처리 URL)
                        .requestMatchers("/login").permitAll()
                        // /logout 경로는 스프링 시큐리티의 로그아웃 처리를 위해 permitAll
                        .requestMatchers("/logout").permitAll()
                        // 그 외 모든 요청은 인증 필요
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                                // loginPage()를 명시적으로 지정하지 않음으로써,
                                // Spring Security가 자체 로그인 페이지로 리다이렉트하는 것을 방지합니다.
                                // 대신, /login URL을 로그인 처리 백엔드 엔드포인트로만 사용합니다.
                                .loginProcessingUrl("/login") // 로그인 처리할 백엔드 URL (이 URL로 POST 요청이 오면 Spring Security가 인증 처리)
                                .defaultSuccessUrl("/", true) // 로그인 성공 시 리다이렉트할 URL (메인 페이지)
                                .failureUrl("/?error")       // 로그인 실패 시 리다이렉트할 URL (메인 페이지로 돌아가 에러 파라미터 확인)
                        // .permitAll() // loginProcessingUrl을 사용하면 이 부분은 명시적으로 필요하지 않을 수 있지만, 안전하게 포함
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // 로그아웃 처리할 URL
                        .logoutSuccessUrl("/") // 로그아웃 성공 시 리다이렉트할 URL
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}