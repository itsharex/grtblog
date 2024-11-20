import CategoryController from '@/services/category/CategoryController';
import { useDispatch, useSelector } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface ArticleFormProps {
  type: 'add' | 'edit';
  articleInfo: any;
  setArticleInfo: (info: any) => void;
  submitHandle: (content: string) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  type,
  articleInfo,
  setArticleInfo,
  submitHandle,
}) => {
  const editorRef = useRef<Editor>(null);
  const formRef = useRef<any>(null);
  const { list } = useSelector((state: any) => state.category);
  const dispatch = useDispatch();
  const [firstIn, setFirstIn] = useState(true); // 用于标记是否为第一次渲染

  useEffect(() => {
    if (formRef.current && articleInfo && firstIn) {
      formRef.current.setFieldsValue(articleInfo);
      // 回填 markdown 编辑器内容
      editorRef.current?.getInstance().setMarkdown(articleInfo?.content);
      // 回填类别，因为类别是 id，所以需要单独处理，在数据仓库中进行查找，得到 name
      setFirstIn(false);
    }
  }, [articleInfo, firstIn]);

  useEffect(() => {
    if (list.length === 0) {
      dispatch({
        type: 'category/initCategoryList',
      });
    }
  }, []);

  const [addCategoryForm, setAddCategoryForm] = useState({
    name: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onValueChange = (key: string, value: any) => {
    setArticleInfo({
      ...articleInfo,
      [key]: value,
    });
  };

  function addHandle() {
    const content = editorRef.current?.getInstance().getHTML();
    submitHandle(content);
  }

  const handleAddCategory = () => {
    if (!addCategoryForm.name) {
      message.error('请输入分类名称');
      return;
    }
    CategoryController.addCategoryApi(addCategoryForm).then((res) => {
      if (res) {
        message.success('分类添加成功');
        setIsModalVisible(false);
        setAddCategoryForm({ name: '' });
        dispatch({
          type: 'category/initCategoryList',
        });
      } else {
        message.error('分类添加失败');
      }
    });
  };

  return (
    <div>
      <Form
        title={type === 'add' ? '添加文章' : '编辑文章'}
        size="large"
        ref={formRef}
        style={{ marginBottom: '20px' }}
        onFinish={addHandle}
      >
        {type === 'add' ? (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(0, 0, 0, 0.45)',
              marginBottom: '20px',
            }}
          >
            {' '}
            今天想写点什么呢 ٩(๑˃̵ᴗ˂̵๑)۶{' '}
          </span>
        ) : (
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(0, 0, 0, 0.45)',
              marginBottom: '20px',
            }}
          >
            {' '}
            每一次的雕琢都是成就完美的作品哇{' '}
          </span>
        )}
        <Form.Item
          label="选择分类"
          name="category"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择文章的分类"
            optionFilterProp="children"
            onChange={(value) => onValueChange('categoryId', value)}
          >
            {list.map((item: any) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button type="link" onClick={() => setIsModalVisible(true)}>
            <span
              style={{
                fontSize: '0.8rem',
              }}
            >
              {' '}
              没有合适的分类？新建一个叭{' '}
            </span>
          </Button>
        </Form.Item>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input
            value={articleInfo?.title}
            placeholder="标题"
            onChange={(e) => onValueChange('title', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={'内容'}
          name="content"
          rules={[{ required: true, message: '文章内容不能为空' }]}
        >
          <Editor
            previewStyle="vertical"
            height="600px"
            useCommandShortcut={true}
            initialEditType="markdown"
            initialValue=""
            ref={editorRef}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ marginTop: '20px', marginRight: '20px' }}>
            {' '}
            当然，你也可以选择从本地 markdown 文件导入
          </div>
          <Upload
            action="/api/upload"
            onChange={(e) => {
              if (e.file.status === 'done') {
                const url = e.file.response.data;
                editorRef.current?.getInstance().setMarkdown(url);
              }
            }}
          >
            <a> 点击上传 </a>
          </Upload>
        </Form.Item>
        <Form.Item label="上传封面">
          <Upload
            listType="picture-card"
            maxCount={1}
            action="/api/upload"
            onChange={(e) => {
              if (e.file.status === 'done') {
                const url = e.file.response.data;
                onValueChange('cover', url);
              }
            }}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: '8px' }}> 封面可选</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="标签"
          name="tags"
          rules={[{ required: true, message: '请输入标签' }]}
        >
          <Input
            placeholder="请输入标签，使用英文逗号分隔"
            onChange={(e) => onValueChange('tags', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="是否发布呢"
          name="isPublished"
          rules={[{ required: true, message: '请选择文章状态' }]}
        >
          <Select
            style={{ width: 200 }}
            placeholder="选择文章的状态"
            onChange={(value) => onValueChange('isPublished', value)}
          >
            <Select.Option value={false}> 草稿 </Select.Option>
            <Select.Option value={true}> 发布 </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {type === 'add' ? '添加' : '修改'}
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="新建分类"
        open={isModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form.Item label="分类名称" required>
          <Input
            placeholder="请输入分类名称"
            value={addCategoryForm.name}
            onChange={(e) => setAddCategoryForm({ name: e.target.value })}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default ArticleForm;
