package kr.co.Intelligent.House;

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
    public String showBoards(Model model) {
        List<Board> boards = boardService.getAllBoards();
        model.addAttribute("boards", boards); // ← 이거 수정됨
        return "boardList";
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