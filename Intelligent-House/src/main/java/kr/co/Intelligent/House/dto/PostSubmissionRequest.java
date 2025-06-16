package kr.co.Intelligent.House.dto;

public class PostSubmissionRequest {

    private boolean unknownDate;
    private String date;       // 사건 발생일 (yyyy-MM-dd)
    private String country;
    private String address;
    private String title;
    private String content;

    // === Getter & Setter ===

    public boolean isUnknownDate() { return unknownDate; }
    public void setUnknownDate(boolean unknownDate) { this.unknownDate = unknownDate; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
