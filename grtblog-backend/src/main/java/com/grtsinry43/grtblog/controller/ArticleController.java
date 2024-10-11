package com.grtsinry43.grtblog.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author grtsinry43
 * @since 2024-10-09
 */
@Controller
@RequestMapping("/article")
public class ArticleController {
    @PostMapping("/add")
    public String addArticle() {
        return "add article";
    }

}
