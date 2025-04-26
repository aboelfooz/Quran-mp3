document.addEventListener("DOMContentLoaded", function () {
    // عناصر DOM
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector(".menu-btn");
    const closeSidebar = document.querySelector(".close-sidebar");
    const scrollTopBtn = document.querySelector(".scroll-top-btn");
    const progressBar = document.querySelector(".progress-bar");
    const yearSpan = document.getElementById("year");
    
    // فتح/إغلاق القائمة الجانبية
    menuBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        sidebar.classList.add("active");
    });
    
    closeSidebar.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && event.target !== menuBtn) {
            sidebar.classList.remove("active");
        }
    });
    
    // زر العودة للأعلى
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add("active");
        } else {
            scrollTopBtn.classList.remove("active");
        }
        
        // شريط التقدم
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = scrolled + "%";
    });
    
    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // عرض سنة الحقوق
    yearSpan.textContent = new Date().getFullYear();
    
    // تأثيرات عند التمرير
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.reciter, .daily-ayah, .footer-section');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // تهيئة العناصر للتحريك
    document.querySelectorAll('.reciter, .daily-ayah, .footer-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيل مرة أولى عند التحميل
    
    // تأثيرات البحث
    const searchInput = document.querySelector('.search-input');
    const reciters = document.querySelectorAll('.reciter');
    
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.trim().toLowerCase();
        
        reciters.forEach(reciter => {
            const name = reciter.querySelector('h3').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                reciter.style.display = 'block';
            } else {
                reciter.style.display = 'none';
            }
        });
    });
    
    // تحميل آية عشوائية
    function loadRandomAyah() {
        const ayahs = [
            {
                text: "وَذَكِّرْ فَإِنَّ الذِّكْرَى تَنفَعُ الْمُؤْمِنِينَ",
                reference: "الذاريات: 55"
            },
            {
                text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
                reference: "الشرح: 6"
            },
            {
                text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
                reference: "الطلاق: 2"
            },
            {
                text: "رَّبِّ زِدْنِي عِلْمًا",
                reference: "طه: 114"
            },
            {
                text: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ",
                reference: "الفرقان: 58"
            }
        ];
        
        const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
        document.querySelector('.ayah-text').textContent = randomAyah.text;
        document.querySelector('.ayah-reference').textContent = randomAyah.reference;
    }
    
    loadRandomAyah();
});
