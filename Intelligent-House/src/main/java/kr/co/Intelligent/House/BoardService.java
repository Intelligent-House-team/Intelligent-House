
package kr.co.Intelligent.House;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional() // 기본적으로 읽기 전용 트랜잭션
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    // 페이지네이션을 위한 게시판 목록 조회
    public Page<Board> getBoardList(Pageable pageable) {
        return boardRepository.findAllByOrderByCreatedDateDesc(pageable);
    }



    // ID로 게시글 조회
    public Board getBoardById(Long id) {
        System.out.println("조회 요청된 게시글 ID: " + id);
        return boardRepository.findById(id).orElse(null);
    }

    // 페이지네이션 조회
    public Page<Board> getPaginated(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    // 게시글 저장 (쓰기 작업이므로 @Transactional 재정의)
    @Transactional
    public Board save(Board board) {
        System.out.println("save 메서드 호출됨: " + board.toString());
        Board savedBoard = boardRepository.save(board);
        System.out.println("저장된 게시글: " + savedBoard.toString());
        return savedBoard;
    }

    // 게시글 내용 수정 (쓰기 작업이므로 @Transactional 재정의)
    @Transactional
    public void updateContent(Long id, String content) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다. ID: " + id));
        board.setContent(content);
        // JPA의 Dirty Checking으로 인해 save() 호출이 필요하지 않을 수 있음
        // 하지만 명시적으로 호출하는 것이 안전함
        boardRepository.save(board);
    }

    // 게시글 삭제 (쓰기 작업이므로 @Transactional 재정의)
    @Transactional
    public void deleteBoard(Long id) {
        if (!boardRepository.existsById(id)) {
            throw new RuntimeException("삭제할 게시글을 찾을 수 없습니다. ID: " + id);
        }
        boardRepository.deleteById(id);
    }
}