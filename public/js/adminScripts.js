document.addEventListener('DOMContentLoaded', function () {
    var currentPath = window.location.pathname;
    
    // Highlight active menu item in admin sidebar
    var sidebarLinks = document.querySelectorAll('.admin-sidebar .nav-link[href]');

    sidebarLinks.forEach(function (link) {
        try {
            var linkUrl = new URL(link.href, window.location.origin);
            var linkPath = linkUrl.pathname;

            if (currentPath === linkPath || currentPath.startsWith(linkPath + '/')) {
                link.classList.add('active');
            }
        } catch (e) {
            // Ignore invalid URLs
        }
    });

    // Confirm before logging out from admin
    var logoutLink = document.querySelector('.header-admin a[href="/admin/logout"], .admin-sidebar a[href="/admin/logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            var ok = window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?');
            if (!ok) {
                e.preventDefault();
            }
        });
    }
});


