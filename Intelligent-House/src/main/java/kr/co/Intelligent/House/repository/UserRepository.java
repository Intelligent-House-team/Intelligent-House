// 위치: kr/co/Intelligent/House/repository/UserRepository.java
package kr.co.Intelligent.House.repository;

import kr.co.Intelligent.House.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
