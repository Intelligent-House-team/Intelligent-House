package kr.co.Intelligent.House.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "post_submission")
public class PostSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "writer_username", nullable = false)
    private String writerUsername;

    @Column(name = "date") // ✅ DB의 date 컬럼과 매핑
    private LocalDate postDate;

    @Column(name = "is_unknown_date", nullable = false)
    private boolean unknownDate;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 1000)
    private String content;

    // === Getter & Setter 수동 작성 ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWriterUsername() {
        return writerUsername;
    }

    public void setWriterUsername(String writerUsername) {
        this.writerUsername = writerUsername;
    }

    public LocalDate getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDate postDate) {
        this.postDate = postDate;
    }

    public boolean isUnknownDate() {
        return unknownDate;
    }

    public void setUnknownDate(boolean unknownDate) {
        this.unknownDate = unknownDate;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
