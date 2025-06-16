package kr.co.Intelligent.House.controller;

import kr.co.Intelligent.House.entity.PostSubmission;
import kr.co.Intelligent.House.entity.User;
import kr.co.Intelligent.House.repository.PostSubmissionRepository;
import kr.co.Intelligent.House.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/post")
public class ViewPostController {

    @Autowired
    private PostSubmissionRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 목록 페이지
    @GetMapping
    public String postList(@RequestParam(defaultValue = "0") int page, Model model) {
        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdDate").descending());
        Page<PostSubmission> postPage = repository.findAll(pageable);

        int currentPage = page;
        int totalPages = postPage.getTotalPages();
        int startPage = (currentPage / 10) * 10;
        int endPage = totalPages == 0 ? 0 : Math.min(startPage + 9, totalPages - 1);

        model.addAttribute("posts", postPage.getContent());
        model.addAttribute("postPage", postPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        model.addAttribute("currentPage", currentPage);

        return "boardList";
    }

    // 상세 페이지
    @GetMapping("/content/{id}")
    public String content(@PathVariable Long id,
                          @RequestParam(defaultValue = "0") int page,
                          @AuthenticationPrincipal UserDetails userDetails,
                          Model model) {

        System.out.println("=== DEBUG: content 메서드 시작 ===");
        System.out.println("id: " + id + ", page: " + page);

        try {
            PostSubmission post = repository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

            System.out.println("POST 데이터: " + post.getTitle());

            // ✅ 페이지네이션 객체 생성 (기존 방식과 동일)
            Pageable pageable = PageRequest.of(page, 10, Sort.by("createdDate").descending());
            Page<PostSubmission> postPage = repository.findAll(pageable);

            int currentPage = page;
            int totalPages = postPage.getTotalPages();
            int startPage = (currentPage / 10) * 10;
            int endPage = totalPages == 0 ? 0 : Math.min(startPage + 9, totalPages - 1);

            boolean isAuthor = userDetails != null &&
                    post.getWriterUsername().equals(userDetails.getUsername());

            model.addAttribute("post", post);
            model.addAttribute("postPage", postPage);
            model.addAttribute("startPage", startPage);
            model.addAttribute("endPage", endPage);
            model.addAttribute("currentPage", currentPage);
            model.addAttribute("isAuthor", isAuthor);

            System.out.println("=== DEBUG: 모델 설정 완료 ===");
            return "content";

        } catch (Exception e) {
            System.out.println("ERROR: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // 수정 처리 - 비밀번호 검증 추가
    @PostMapping("/update")
    public String updatePost(@RequestParam Long id,
                             @RequestParam String content,
                             @RequestParam int page,
                             @RequestParam String password,
                             @AuthenticationPrincipal UserDetails userDetails,
                             RedirectAttributes redirectAttributes) {

        try {
            PostSubmission post = repository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

            // 1. 작성자 본인인지 확인
            if (userDetails == null || !post.getWriterUsername().equals(userDetails.getUsername())) {
                redirectAttributes.addFlashAttribute("error", "작성자만 수정할 수 있습니다.");
                return "redirect:/post/content/" + id + "?page=" + page;
            }

            // 2. 비밀번호 검증
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

            if (!passwordEncoder.matches(password, user.getPassword())) {
                redirectAttributes.addFlashAttribute("error", "비밀번호가 일치하지 않습니다.");
                return "redirect:/post/content/" + id + "?page=" + page;
            }

            // 3. 수정 실행
            post.setContent(content);
            repository.save(post);

            redirectAttributes.addFlashAttribute("success", "게시글이 수정되었습니다.");
            return "redirect:/post/content/" + id + "?page=" + page;

        } catch (Exception e) {
            System.out.println("수정 중 오류: " + e.getMessage());
            redirectAttributes.addFlashAttribute("error", "수정 중 오류가 발생했습니다.");
            return "redirect:/post/content/" + id + "?page=" + page;
        }
    }

    // 삭제 처리 - 비밀번호 검증 추가
    @PostMapping("/delete")
    public String deletePost(@RequestParam Long id,
                             @RequestParam int page,
                             @RequestParam String password,
                             @AuthenticationPrincipal UserDetails userDetails,
                             RedirectAttributes redirectAttributes) {

        try {
            PostSubmission post = repository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다."));

            // 1. 작성자 본인인지 확인
            if (userDetails == null || !post.getWriterUsername().equals(userDetails.getUsername())) {
                redirectAttributes.addFlashAttribute("error", "작성자만 삭제할 수 있습니다.");
                return "redirect:/post/content/" + id + "?page=" + page;
            }

            // 2. 비밀번호 검증
            User user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

            if (!passwordEncoder.matches(password, user.getPassword())) {
                redirectAttributes.addFlashAttribute("error", "비밀번호가 일치하지 않습니다.");
                return "redirect:/post/content/" + id + "?page=" + page;
            }

            // 3. 삭제 실행
            repository.delete(post);

            redirectAttributes.addFlashAttribute("success", "게시글이 삭제되었습니다.");
            return "redirect:/post?page=" + page;

        } catch (Exception e) {
            System.out.println("삭제 중 오류: " + e.getMessage());
            redirectAttributes.addFlashAttribute("error", "삭제 중 오류가 발생했습니다.");
            return "redirect:/post/content/" + id + "?page=" + page;
        }
    }
}