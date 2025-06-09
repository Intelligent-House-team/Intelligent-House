package kr.co.Intelligent.House;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import java.time.LocalDateTime;

@SpringBootApplication
public class IntelligentHouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntelligentHouseApplication.class, args);
	}

	// DB 테스트용 코드
	/*@Bean
	public CommandLineRunner initData(BoardRepository repository) {
		return args -> {
			Board b1 = new Board();
			b1.setTitle("제목3");
			b1.setContent("내용22222222222222222222222222222");
			b1.setWriter("작성자1");
			b1.setOccurredDate(LocalDateTime.of(2025, 3, 24, 0, 0)); // ✅ 추가
			b1.setCreatedDate(LocalDateTime.now());
			repository.save(b1);
		};
	} */
	/*@Bean
	public CommandLineRunner initData(BoardRepository repository) {
		return args -> {
			Board b1 = new Board();
			b1.setTitle("제목1");
			b1.setContent("내용1");
			b1.setWriter("작성자1");
			b1.setCreatedDate(LocalDateTime.now());
			repository.save(b1);
		};
	}*/
}
