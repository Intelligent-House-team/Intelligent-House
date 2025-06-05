package kr.co.Intelligent.House;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    private final BoardRepository boardRepository;

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board save(Board board) {
        return boardRepository.save(board);
    }

    // 상세, 수정, 삭제 등 추가 가능
}
