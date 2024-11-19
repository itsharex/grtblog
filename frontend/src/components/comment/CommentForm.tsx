'use client';

import React, {useRef, useState} from 'react';
import {addNewComment} from '@/api/comment';
import {Button, Flex, TextArea, TextField} from '@radix-ui/themes';
import styles from '@/styles/comment/CommentForm.module.scss';
import {clsx} from 'clsx';
import {EnvelopeOpenIcon} from '@radix-ui/react-icons';
import emitter from "@/utils/eventBus";

const CommentForm = ({id, parentId}: { id: string, parentId?: string }) => {
    const [form, setForm] = useState({
        content: '',
        userName: '',
        email: '',
        website: '',
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const rippleRef = useRef<HTMLSpanElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', form);
        addNewComment({
            areaId: id,
            content: form.content,
            userName: form.userName,
            email: form.email,
            website: form.website,
            parentId: parentId || '',
        }).then((res) => {
            if (res) {
                console.log('Comment submitted successfully!');
                // 使用事件总线触发评论列表的刷新
                emitter.emit('refreshCommentList');
            }
        });
        setForm({...form, content: ''});
    };

    const handleRipple = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current && rippleRef.current) {
            const textarea = textareaRef.current;
            const ripple = rippleRef.current;
            const rect = textarea.getBoundingClientRect();

            const size = Math.max(textarea.clientWidth, textarea.clientHeight);
            ripple.style.width = ripple.style.height = `${size * 2}px`;
            ripple.style.left = `${e.clientX - rect.left - size}px`;
            ripple.style.top = `${e.clientY - rect.top - size}px`;

            ripple.classList.remove(styles.animateRipple);
            void ripple.offsetWidth; // 触发强制重绘，使得动画可以重新播放
            ripple.classList.add(styles.animateRipple);
        }
    };

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 20}px`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form} style={{
            maxWidth: '70%',
        }}>
            <Flex direction="row" gap="4" className={styles.flex}>
                <TextField.Root
                    value={form.userName}
                    required={true}
                    style={{
                        backgroundColor: 'rgba(var(--background), 0.3)',
                        flex: '1',
                    }}
                    onChange={(e) => setForm({...form, userName: e.target.value})}
                    placeholder="昵称"
                />
                <TextField.Root
                    value={form.email}
                    required={true}
                    style={{
                        backgroundColor: 'rgba(var(--background), 0.3)',
                        height: '2rem',
                        flex: '1',
                    }}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="邮箱"
                />
                <TextField.Root
                    value={form.website}
                    required={true}
                    style={{
                        backgroundColor: 'rgba(var(--background), 0.3)',
                        flex: '1',
                    }}
                    onChange={(e) => setForm({...form, website: e.target.value})}
                    placeholder="网站"
                />
            </Flex>
            <div className={styles.textareaContainer}>
                <TextArea
                    required={true}
                    variant={'soft'}
                    ref={textareaRef}
                    className={styles.textarea}
                    value={form.content}
                    onChange={(e) => {
                        if (e.target.value.length <= 3000) {
                            setForm({...form, content: e.target.value});
                        }
                    }}
                    onInput={handleInput}
                    onMouseDown={handleRipple}
                    placeholder="看到你的评论我会很开心哒~"
                />
                <span className={styles.markdownSupport}> 支持 Markdown 语法 </span>
                <span className={styles.charCount}> {form.content.length} / 3000 </span>
                <span className={styles.emojiPanel}> 表情面板 </span>
                <span
                    ref={rippleRef}
                    className={clsx(styles.ripple, 'absolute rounded-full bg-gray-400 opacity-30 pointer-events-none')}
                />
            </div>
            <Button style={{
                alignSelf: 'flex-end',
            }} type="submit"><EnvelopeOpenIcon/> 发送 ~~ </Button>
        </form>
    );
};

export default CommentForm;
