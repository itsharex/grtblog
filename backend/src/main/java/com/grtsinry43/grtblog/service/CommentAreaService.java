package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.grtsinry43.grtblog.entity.CommentArea;
import com.grtsinry43.grtblog.mapper.CommentAreaMapper;
import org.springframework.stereotype.Service;

/**
 * @author grtsinry43
 * @date 2024/11/19 12:34
 * @description 热爱可抵岁月漫长
 */
@Service
public class CommentAreaService extends ServiceImpl<CommentAreaMapper, CommentArea> {
    public CommentArea createCommentArea(String type, String name) {
        String areaName = type + ":" + name;
        CommentArea commentArea = new CommentArea();
        commentArea.setAreaName(areaName.length() > 40 ? areaName.substring(0, 40) : areaName);
        baseMapper.insert(commentArea);
        return commentArea;
    }

    public void deleteCommentArea(Long id) {
        try {
            baseMapper.deleteById(id);
        } catch (Exception e) {
            System.out.println("未找到" + id + "对应的评论区");
        }
    }

    public boolean isExist(String id) {
        return baseMapper.selectById(id) != null;
    }
}
