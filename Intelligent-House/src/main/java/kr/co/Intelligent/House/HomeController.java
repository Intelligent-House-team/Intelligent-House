package kr.co.Intelligent.House;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model; // ✅ 올바른 Model import
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.swing.*;
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

        return "/boardList"; // boardList.html
    }

    /*@GetMapping("/boards/content/{id}")
    public String showBoardDetail(@PathVariable Long id, Model model) {
        Board board = boardService.getBoardById(id);
        if (board == null) return "error/404";
        model.addAttribute("board", board);
        return "content";
    }*/
    @GetMapping("/boards/content/{id}")
    public String showBoardDetail(@PathVariable Long id,
                                  @RequestParam(defaultValue = "0") int page,
                                  Model model) {
        Board board = boardService.getBoardById(id);
        if (board == null) return "error/404";
        model.addAttribute("board", board);

        // 👇 추가된 페이징 처리
        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdDate").descending());
        Page<Board> boardPage = boardService.getBoardList(pageable);

        int currentPage = pageable.getPageNumber(); // 0-based
        int totalPages = boardPage.getTotalPages();
        int startPage = (currentPage / 10) * 10;
        int endPage = Math.min(startPage + 9, totalPages - 1);

        model.addAttribute("boardPage", boardPage);
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "content";
    }
/* 기능시도중이나 비정상동작함
  @GetMapping("/boards/content/{id}")
    public String showBoardDetail(@PathVariable Long id,
                                  @RequestParam(defaultValue = "0") int page,
                                  Model model) {
        Board board = boardService.getBoardById(id);
        if (board == null) return "error/404";

        model.addAttribute("board", board);

        // 현재 페이지 기준으로 전체 페이지 정보 다시 생성
        Pageable pageable = PageRequest.of(page, 10, Sort.by("createdDate").descending());
        Page<Board> boardPage = boardService.getBoardList(pageable);

        int currentPage = pageable.getPageNumber();
        int totalPages = boardPage.getTotalPages();
        int startPage = (currentPage / 10) * 10;
        int endPage = Math.min(startPage + 9, totalPages - 1);

        model.addAttribute("boardPage", boardPage);
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("startPage", startPage);
        model.addAttribute("endPage", endPage);

        return "content"; // content.html
    }*/

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