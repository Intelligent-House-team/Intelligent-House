package kr.co.Intelligent.House.controller;

import kr.co.Intelligent.House.entity.PostSubmission;
import kr.co.Intelligent.House.dto.PostSubmissionRequest;
import kr.co.Intelligent.House.repository.PostSubmissionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/post")
public class PostSubmissionController {

    @Autowired
    private PostSubmissionRepository repository;

    @PostMapping
    public void submitPost(@RequestBody PostSubmissionRequest request,
                           @AuthenticationPrincipal UserDetails userDetails) {
        try {
            PostSubmission post = new PostSubmission();

            // 작성자 정보
            String username = userDetails.getUsername();
            post.setWriterUsername(username);

            // 사건 발생일
            if (!request.isUnknownDate() && request.getDate() != null && !request.getDate().isEmpty()) {
                try {
                    LocalDate parsedDate = LocalDate.parse(request.getDate());
                    post.setOccurredDate(parsedDate);
                } catch (Exception e) {
                    System.err.println("❌ 날짜 파싱 오류: " + request.getDate());
                    return;
                }
            }

            // 기타 필드
            post.setUnknownDate(request.isUnknownDate());
            post.setTitle(request.getTitle());
            post.setCountry(request.getCountry());
            post.setAddress(request.getAddress());
            post.setContent(request.getContent());

            // 저장
            repository.save(post);
            System.out.println("✅ 게시글 등록 성공: " + post.getTitle());

        } catch (Exception e) {
            System.err.println("❌ 게시글 등록 중 예외 발생:");
            e.printStackTrace();
        }
    }
}

