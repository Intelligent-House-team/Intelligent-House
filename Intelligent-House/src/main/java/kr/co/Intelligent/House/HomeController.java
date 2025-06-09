package kr.co.Intelligent.House;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // ✅ 올바른 Model import
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {
    private final BoardService boardService;

    public HomeController(BoardService boardService) {
        this.boardService = boardService;
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

        return "boardList"; // boardList.html
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