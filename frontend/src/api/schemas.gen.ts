// This file is auto-generated by @hey-api/openapi-ts

export const UserRegisterDTOSchema = {
    type: 'object',
    properties: {
        nickname: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    }
} as const;

export const ApiResponseUserVOSchema = {
    type: 'object',
    properties: {
        code: {
            type: 'integer',
            format: 'int32'
        },
        msg: {
            type: 'string'
        },
        data: {
            '$ref': '#/components/schemas/UserVO'
        }
    }
} as const;

export const UserVOSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        nickname: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        avatar: {
            type: 'string'
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        oauthProvider: {
            type: 'string'
        }
    }
} as const;

export const ApiResponseTagSchema = {
    type: 'object',
    properties: {
        code: {
            type: 'integer',
            format: 'int32'
        },
        msg: {
            type: 'string'
        },
        data: {
            '$ref': '#/components/schemas/Tag'
        }
    }
} as const;

export const TagSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            format: 'int64'
        },
        name: {
            type: 'string'
        },
        created: {
            type: 'string',
            format: 'date-time'
        },
        updated: {
            type: 'string',
            format: 'date-time'
        },
        deleted: {
            type: 'string',
            format: 'date-time'
        }
    }
} as const;

export const ArticleDTOSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        cover: {
            type: 'string'
        },
        categoryId: {
            type: 'integer',
            format: 'int64'
        },
        tags: {
            type: 'string'
        },
        status: {
            type: 'string'
        }
    }
} as const;

export const ApiResponseArticleVOSchema = {
    type: 'object',
    properties: {
        code: {
            type: 'integer',
            format: 'int32'
        },
        msg: {
            type: 'string'
        },
        data: {
            '$ref': '#/components/schemas/ArticleVO'
        }
    }
} as const;

export const ArticleVOSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        authorName: {
            type: 'string'
        },
        cover: {
            type: 'string'
        },
        views: {
            type: 'integer',
            format: 'int32'
        },
        likes: {
            type: 'integer',
            format: 'int32'
        },
        comments: {
            type: 'integer',
            format: 'int32'
        },
        status: {
            type: 'string',
            enum: ['PUBLISHED', 'DRAFT']
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
        deletedAt: {
            type: 'string',
            format: 'date-time'
        }
    }
} as const;

export const ApiResponseObjectSchema = {
    type: 'object',
    properties: {
        code: {
            type: 'integer',
            format: 'int32'
        },
        msg: {
            type: 'string'
        },
        data: {
            type: 'object'
        }
    }
} as const;

export const ApiResponseArticleViewSchema = {
    type: 'object',
    properties: {
        code: {
            type: 'integer',
            format: 'int32'
        },
        msg: {
            type: 'string'
        },
        data: {
            '$ref': '#/components/schemas/ArticleView'
        }
    }
} as const;

export const ArticleViewSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        authorName: {
            type: 'string'
        },
        cover: {
            type: 'string'
        },
        views: {
            type: 'integer',
            format: 'int32'
        },
        likes: {
            type: 'integer',
            format: 'int32'
        },
        comments: {
            type: 'integer',
            format: 'int32'
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        }
    }
} as const;