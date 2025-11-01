document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pageSections = document.querySelectorAll('.page-section');
    const contentContainer = document.getElementById('content-container');
    const postListContainer = document.querySelector('.post-list');
    const ctaButtons = document.querySelectorAll('.cta-button');

    // 初始化粒子动画
    // 你可以访问 https://vincentgarreau.com/particles.js/ 获取更多配置
    particlesJS('background-animation', { // 确保这里的ID与HTML中的容器ID匹配
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00bcd4" // 粒子颜色，与主题色匹配
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#673ab7", // 连接线颜色
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab" // 鼠标悬停模式：抓取
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // 鼠标点击模式：推出
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // 模拟文章数据
    const postsData = [
        {
            id: 'post1',
            title: '探索CSS Houdini：前端魔法的新篇章',
            excerpt: 'CSS Houdini 为开发者提供了深入浏览器渲染引擎的能力，创造前所未有的自定义样式和布局效果。',
            date: '2023-10-26'
        },
        {
            id: 'post2',
            title: 'Web Components 实战：构建可复用UI组件',
            excerpt: '了解如何使用 Custom Elements, Shadow DOM 和 HTML Templates 构建独立的、可复用的Web组件。',
            date: '2023-10-20'
        },
        {
            id: 'post3',
            title: 'JavaScript异步编程：从Callback到Async/Await',
            excerpt: '深入理解JavaScript异步编程的演进过程，掌握Promise和Async/Await的最佳实践。',
            date: '2023-10-15'
        }
        // ... 更多文章
    ];

    // 动态生成文章列表
    function generatePostList() {
        if (!postListContainer) return;
        postListContainer.innerHTML = ''; // 清空现有内容

        postsData.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <span>${post.date}</span>
                <a href="posts/${post.id}.html" class="read-more">阅读更多 &rarr;</a>
            `;
            postListContainer.appendChild(postCard);
        });
    }

    // 页面切换逻辑
    function showPage(targetId) {
        // 隐藏当前激活的页面
        const currentActivePage = document.querySelector('.page-section.active');
        if (currentActivePage) {
            currentActivePage.classList.remove('active');
            // 添加一个短暂的类来触发退出动画，然后移除它
            currentActivePage.classList.add('leaving');
            setTimeout(() => {
                currentActivePage.classList.remove('leaving');
            }, 500); // 应该与CSS过渡时间匹配
        }

        // 激活新的页面
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
            // 如果是文章页面，生成文章列表
            if (targetId === 'posts') {
                generatePostList();
            }
        }

        // 更新导航激活状态
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            }
        });

        // 平滑滚动到内容顶部
        contentContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 导航栏点击事件
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('data-target');
            showPage(target);
        });
    });

    // CTA按钮点击事件
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('data-target');
            showPage(target);
        });
    });

    // 联系表单提交事件 (阻止默认提交，可以在这里添加AJAX发送逻辑)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('表单已提交！ (实际应用中会发送到后端)');
            contactForm.reset();
        });
    }

    // 初始加载时显示首页
    showPage('home');
});