package kr.co.Intelligent.House.controller;

import kr.co.Intelligent.House.dto.SignupRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        System.out.println("회원가입 요청: " + request.getUsername());

        // TODO: DB 저장, 중복 체크 등 처리
        return ResponseEntity.ok("회원가입 성공");
    }
}
