import React, {useEffect, useState} from 'react';
import {useTheme} from 'next-themes';
import {motion, AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import {Avatar, IconButton} from '@radix-ui/themes';
import {GitHubLogoIcon, HamburgerMenuIcon, MagnifyingGlassIcon, MoonIcon, SunIcon} from '@radix-ui/react-icons';
import styles from '@/styles/NavBarMobile.module.scss';
import {UserRoundPlusIcon} from 'lucide-react';
import {clsx} from 'clsx';
import emitter from "@/utils/eventBus";
import {TitleEvent} from "@/components/article/ArticleScrollSync";
import {article_font} from "@/app/fonts/font";

const NavBarMobile = ({items}: {
    items: { name: string; href: string; children?: { name: string; href: string }[] }[]
}) => {
    const {resolvedTheme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [titleInfo, setTitleInfo] = useState({title: '', categoryName: '', type: ''});

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const showTitleHandler = (config: TitleEvent) => {
            setIsTitleVisible(true);
            setTitleInfo({...config});
        };

        const hideTitleHandler = () => {
            setIsTitleVisible(false);
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        emitter.on('showTitle', showTitleHandler);
        emitter.on('hideTitle', hideTitleHandler);

        return () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            emitter.off('showTitle', showTitleHandler);
            emitter.off('hideTitle', hideTitleHandler);
        };
    }, []);

    const navItems = items;

    const togglePanel = () => {
        setShowPanel(!showPanel);
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed w-full z-10">
            <motion.div
                initial={{y: -100}}
                animate={{y: 0}}
                transition={{type: 'spring', stiffness: 120, damping: 20}}
            >
                <nav className={clsx(styles.navbar, scrolled ? styles.scrolled : '')}>
                    <div className={styles.navbarContainer}>
                        <IconButton variant={'ghost'} onClick={togglePanel}>
                            <HamburgerMenuIcon className="w-5 h-5"/>
                        </IconButton>
                        {isTitleVisible ? (
                            <motion.div initial={{y: 10, opacity: 0}}
                                        style={{width: '100%'}}
                                        animate={{y: 0, opacity: 1}}
                                        transition={{type: 'spring', stiffness: 260, damping: 20}}>
                                <div className={clsx(article_font.className, "w-full")} style={{
                                    paddingLeft: '2rem',
                                }}>
                                    <div className="text-[0.75em]">
                                        <span className="font-bold mr-1">{titleInfo.type}</span>
                                        <span>/</span>
                                        <span className="ml-1">{titleInfo.categoryName}</span>
                                    </div>
                                    <div style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>{titleInfo.title}</div>
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div initial={{scale: 0}} animate={{scale: 1}}
                                            transition={{type: 'spring', stiffness: 260, damping: 20}}>
                                    <Avatar
                                        size="3"
                                        radius="large"
                                        src="https://dogeoss.grtsinry43.com/img/author.jpeg"
                                        fallback="A"
                                        className={styles.avatar}
                                    />
                                </motion.div>
                                <div className={styles.navbarContent}>
                                    <div className={styles.searchWrapper}>
                                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.95}}>
                                            <div className={styles.search}>
                                                <MagnifyingGlassIcon className={styles.searchIcon}/>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className={styles.githubWrapper}>
                                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.95}}>
                                            <a
                                                href="https://github.com/grtsinry43"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.githubLink}
                                            >
                                                <GitHubLogoIcon/>
                                            </a>
                                        </motion.div>
                                    </div>
                                    <div className={styles.themeToggleWrapper}>
                                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.95}}>
                                            {mounted && (
                                                <div
                                                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                                                    className={styles.themeToggle}
                                                >
                                                    {resolvedTheme === 'dark' ? <SunIcon/> : <MoonIcon/>}
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                    <div className={styles.loginButtonWrapper}>
                                        <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                            <IconButton variant="ghost" radius={'full'} color={'gray'}
                                                        className={styles.loginButton}>
                                                <UserRoundPlusIcon width={16} height={16}/>
                                            </IconButton>
                                        </motion.div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </motion.div>
            <AnimatePresence>
                {showPanel && (
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.2}}
                    >
                        <div
                            className="fixed inset-x-0 bg-background/95 backdrop-blur-md shadow-lg rounded-b-lg overflow-hidden z-20">
                            <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4">
                                {navItems.map((item) => (
                                    <div key={item.name} className="space-y-2">
                                        <Link href={item.href}
                                              className="block text-lg font-medium text-foreground hover:text-primary transition-colors duration-200">
                                            {item.name}
                                        </Link>
                                        {item.children && item.children.length > 0 && (
                                            <div className="pl-4 space-y-2">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block text-muted-foreground hover:text-primary transition-colors duration-200 pl-2"
                                                        onClick={() => setShowPanel(false)}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}}
                        transition={{type: 'spring', stiffness: 100, damping: 10, delay: 0.2}}>
                <div
                    className="fixed inset-0 bg-gradient-radial from-primary/10 to-background/10 -z-10 pointer-events-none"></div>
            </motion.div>
        </div>
    );
};

export default NavBarMobile;
