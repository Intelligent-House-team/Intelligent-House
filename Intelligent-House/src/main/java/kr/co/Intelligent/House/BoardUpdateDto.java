package kr.co.Intelligent.House;
import java.time.LocalDateTime;

public class BoardUpdateDto {
    private String title;
    private String content;
    private LocalDateTime occurredDate;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getOccurredDate() {
        return occurredDate;
    }

    public void setOccurredDate(LocalDateTime occurredDate) {
        this.occurredDate = occurredDate;
    }
}