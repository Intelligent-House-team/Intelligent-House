package kr.co.Intelligent.House;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // ✅ 올바른 Model import
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {
    private final BoardService boardService;
    private final BoardRepository boardRepository;

    public HomeController(BoardService boardService, BoardRepository boardRepository) {
        this.boardService = boardService;
        this.boardRepository = boardRepository;
    }

    @GetMapping("/boards")
    public String showBoards(Model model, @PageableDefault(size = 10, sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<Board> boardPage = boardService.getBoardList(pageable);

        int currentPage = pageable.getPageNumber(); // 0-based
        int totalPages = boardPage.getTotalPages();
        int startPage = (currentPage / 10) * 10;
        int endPage = Math.min(startPage + 9, totalPages - 1);

        model.addAttribute("boards", boardPage.getContent());
        model.addAttribute("boardPage", boardPage);
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "/boardList"; // boardList.html
    }
    @GetMapping("/boards/content/{id}")
    public String showBoardDetail(@PathVariable Long id,
                                  @RequestParam(defaultValue = "0") int page,
                                  Model model) {
        Board board = boardService.getBoardById(id);
        if (board == null) return "error/404";

        // ✅ 페이지네이션 객체 생성
        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdDate").descending());
        Page<Board> boardPage = boardService.getBoardList(pageable);

        int currentPage = page;
        int totalPages = boardPage.getTotalPages();
        int startPage = (currentPage / 10) * 10;
        int endPage = totalPages == 0 ? 0 : Math.min(startPage + 9, totalPages - 1);

        model.addAttribute("board", board);
        model.addAttribute("boardPage", boardPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);
        model.addAttribute("currentPage", currentPage); // ✅ 현재 페이지 전달

        return "content";
    }
    // 수정
    @PostMapping("/board/save")
    public String saveBoard(@ModelAttribute Board board) {
        System.out.println("=== 컨트롤러 saveBoard 메서드 호출됨 ===");
        System.out.println("받은 board 데이터: " + board.toString());

        Board savedBoard = boardService.save(board);

        System.out.println("=== 저장 완료, 리다이렉트 시작 ===");
        return "redirect:/boards";
    }
    @PostMapping("/boards/update")
    public String updateBoardContent(@RequestParam Long id,
                                     @RequestParam String content,
                                     @RequestParam int page) {
        System.out.println("=== 컨트롤러 updateBoardContent 메서드 호출됨 ===");
        System.out.println("받은 ID: " + id + ", 내용: " + content + ", 페이지: " + page);

        boardService.updateContent(id, content);

        System.out.println("=== 수정 완료, 리다이렉트 시작 ===");
        return "redirect:/boards?page=" + page;
    }
    @PostMapping("/boards/delete")
    public String deleteBoard(@RequestParam Long id,
                              @RequestParam int page) {
        boardService.deleteBoard(id);
        return "redirect:/boards?page=" + page;
    }



    @GetMapping("/")
    public String Main() {
        return "Main";
    }

    @GetMapping("/side")
    public String Test() {
        return "side";
    }

    @GetMapping("/header")
    public String Header() {
        return "header";
    }
}