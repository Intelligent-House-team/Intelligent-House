package kr.co.Intelligent.House;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String Main() {
        return "Main";
    }

    @GetMapping("/side")
    public String Test() {
        return "side";
    }

    @GetMapping("/header")
    public String Header() {
        return "header";
    }
}
