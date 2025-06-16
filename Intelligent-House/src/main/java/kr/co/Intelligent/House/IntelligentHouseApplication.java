package kr.co.Intelligent.House;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableTransactionManagement  // 이 어노테이션 추가
public class IntelligentHouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntelligentHouseApplication.class, args);
	}
}
