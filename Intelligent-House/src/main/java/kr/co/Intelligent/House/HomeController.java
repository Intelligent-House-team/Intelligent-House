package kr.co.Intelligent.House;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String Main() {
        return "index";  // templates/index.html 을 렌더링
    }

    @GetMapping("/side")
    public String Test() {
        return "side";  // templates/side.html 을 렌더링
    }
}
