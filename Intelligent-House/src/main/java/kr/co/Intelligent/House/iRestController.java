package kr.co.Intelligent.House;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class iRestController {
    @RequestMapping("/api")
    public String Map(){
        return "Hello";
    }

}
