// src/main/java/kr/co/Intelligent/House/controller/UserController.java (새로운 컨트롤러 또는 기존 AuthController에 추가)

package kr.co.Intelligent.House.controller;

import kr.co.Intelligent.House.entity.User;
import kr.co.Intelligent.House.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/api/user/nickname")
    public ResponseEntity<String> getUserNickname() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() && !(authentication.getPrincipal() instanceof String)) {
            // 인증된 사용자이며, Principal이 "anonymousUser"와 같은 문자열이 아닌 경우
            String username = authentication.getName(); // Spring Security의 username (User.username)
            Optional<User> user = userRepository.findByUsername(username);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get().getNickname()); // 닉네임 반환
            }
        }
        return ResponseEntity.status(401).body("Unauthorized"); // 인증되지 않은 경우
    }
}