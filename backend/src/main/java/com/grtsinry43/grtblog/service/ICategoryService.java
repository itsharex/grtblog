package com.grtsinry43.grtblog.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.grtsinry43.grtblog.entity.Category;
import com.grtsinry43.grtblog.vo.CategoryVO;

import java.util.List;

/**
 * @author grtsinry43
 * @date 2024/11/12 16:11
 * @description 热爱可抵岁月漫长
 */
public interface ICategoryService extends IService<Category> {
    Boolean isCategoryExist(Long categoryId);

    Category addNewCategory(String categoryName);

    String removeCategory(Long categoryId);

    List<CategoryVO> listAllCategories();
}
