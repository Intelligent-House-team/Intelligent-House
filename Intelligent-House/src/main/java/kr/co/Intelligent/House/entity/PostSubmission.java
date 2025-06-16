package kr.co.Intelligent.House.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "post_submission")
public class PostSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "writer_username", nullable = false)
    private String writerUsername;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(name = "date")
    private LocalDate occurredDate;  // 사건 발생일

    @Column(name = "is_unknown_date", nullable = false)
    private boolean unknownDate;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }

    // === Getter & Setter ===

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getWriterUsername() { return writerUsername; }
    public void setWriterUsername(String writerUsername) { this.writerUsername = writerUsername; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDate getOccurredDate() { return occurredDate; }
    public void setOccurredDate(LocalDate occurredDate) { this.occurredDate = occurredDate; }

    public boolean isUnknownDate() { return unknownDate; }
    public void setUnknownDate(boolean unknownDate) { this.unknownDate = unknownDate; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
}