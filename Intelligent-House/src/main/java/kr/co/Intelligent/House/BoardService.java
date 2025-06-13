
package kr.co.Intelligent.House;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    private final BoardRepository boardRepository;

    // Page형식으로 변경 전
    //public List<Board> getAllBoards() { return boardRepository.findAllByOrderByCreatedDateDesc(); }
    public Page<Board> getBoardList(Pageable pageable) {
        return boardRepository.findAllByOrderByCreatedDateDesc(pageable);
    }

    public Board save(Board board) {
        return boardRepository.save(board);
    }

    public Board getBoardById(Long id) {
        return boardRepository.findById(id).orElse(null);
    }
    // 상세, 수정, 삭제 등 추가 가능
}