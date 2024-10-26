package com.grtsinry43.grtblog.dto;

import lombok.Data;

/**
 * @author grtsinry43
 * @date 2024/10/9 19:10
 * @description 用于封装提交文章请求的 DTO
 */
@Data
public class ArticleDTO {
    private String title;
    private String content;
    private String cover;
    private String tags;
    private String status;
}