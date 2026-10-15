// 点击作品卡片，在新窗口中打开对应的作品页面
const worksEl = document.querySelector(".works");

worksEl.addEventListener("click", (e) => {
  // 图片本身是链接，交给浏览器默认行为处理，避免重复开窗
  if (e.target.closest(".work-media")) return;

  const workEl = e.target.closest(".work");
  if (!workEl) return;

  const url = workEl.getAttribute("data-url");
  if (url) {
    window.open(url, "_blank");
  }
});

// 入场动画：元素进入视口后再上移淡入（参考站的效果）
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

// 滚动时高亮左侧导航当前所在的分区
const navLinks = Array.from(document.querySelectorAll(".side-nav a[data-nav]"));
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.nav))
  .filter(Boolean);

function highlightNav() {
  const line = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= line) {
      current = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === current.id);
  });
}

window.addEventListener("scroll", highlightNav, { passive: true });
highlightNav();
