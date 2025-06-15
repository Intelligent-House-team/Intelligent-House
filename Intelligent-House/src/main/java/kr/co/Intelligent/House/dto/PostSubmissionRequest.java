package kr.co.Intelligent.House.dto;

public class PostSubmissionRequest {

    private boolean unknownDate;
    private String date;       // yyyy-MM-dd 형식의 문자열
    private String country;
    private String address;
    private String content;

    // === Getter & Setter 수동 작성 ===

    public boolean isUnknownDate() {
        return unknownDate;
    }

    public void setUnknownDate(boolean unknownDate) {
        this.unknownDate = unknownDate;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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
