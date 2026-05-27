document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. LOCALSTORAGE (ІНФОРМАЦІЯ ПРО ОС ТА БРАУЗЕР)
    // ==========================================
    const infoContainer = document.getElementById("footer-os-info");
    
    localStorage.setItem("user_system_info", navigator.userAgent);
    const savedInfo = localStorage.getItem("user_system_info");
    
    if (infoContainer && savedInfo) {
        infoContainer.textContent = savedInfo;
    }

    // ==========================================
    // 2. FETCH API КОМЕНТАРІ (ВАРІАНТ №9)
    // ==========================================
    async function loadComments() {
        const commentsContainer = document.getElementById('comments-container');
        const url = 'https://jsonplaceholder.typicode.com/posts/9/comments';

        try {
            const response = await fetch(url);
            const comments = await response.json();

            if (commentsContainer) {
                commentsContainer.innerHTML = ''; 

                comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment-card');

                    commentElement.innerHTML = `
                        <h4 style="margin: 0 0 4px 0; font-size: 13px;">${comment.name}</h4>
                        <p style="margin: 0 0 6px 0; color: #5b8a5b; font-size: 10px;"><strong>Email:</strong> ${comment.email}</p>
                        <p style="margin: 0; font-style: italic; font-size: 11px;">"${comment.body}"</p>
                    `;
                    commentsContainer.appendChild(commentElement);
                });
            }
        } catch (error) {
            console.error('Помилка:', error);
            if (commentsContainer) {
                commentsContainer.textContent = 'Не вдалося завантажити коментарі.';
            }
        }
    }
    
    loadComments();

    // ==========================================
    // 3. МОДАЛЬНЕ ВІКНО ФОРМИ (ТАЙМЕР 1 ХВИЛИНА)
    // ==========================================
    const modal = document.getElementById("contactModal");
    const closeBtn = document.getElementById("closeModal");

    // Показ через 60000 мс (1 хвилина). Для тестів можна тимчасово змінити на 3000 (3 сек)
    setTimeout(function() {
        if (modal) {
            modal.style.display = "flex";
        }
    }, 60000); 

    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // ==========================================
    // 4. ДЕННИЙ / НІЧНИЙ РЕЖИМ
    // ==========================================
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    function checkTimeAndSetTheme() {
        const currentHour = new Date().getHours(); 

        // Денна тема від 07:00 до 21:00, в інший час — нічна
        if (currentHour >= 7 && currentHour < 21) {
            body.classList.remove("dark-theme");
        } else {
            body.classList.add("dark-theme");
        }
    }

    checkTimeAndSetTheme();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            body.classList.toggle("dark-theme");
        });
    }
});