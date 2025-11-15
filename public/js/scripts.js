/**
 * scripts.js
 * - Cấu hình tương tác cho layout client: HEADER, MAIN (newsletter), FOOTER
 * - Tất cả logic được khởi tạo sau khi DOM đã sẵn sàng
 */

document.addEventListener("DOMContentLoaded", function () {
  /* ========================================================================
     1. HEADER
     - Thêm / bỏ class đổ bóng cho header khi người dùng cuộn trang
     ====================================================================== */

  const headerEl = document.querySelector("header.header");

  /**
   * Xử lý khi cuộn: nếu scrollY > 10 thì thêm class "header-scrolled"
   * giúp header có nền trắng + bóng đổ rõ ràng hơn.
   */
  const handleHeaderScroll = () => {
    if (!headerEl) return;

    if (window.scrollY > 10) {
      headerEl.classList.add("header-scrolled");
    } else {
      headerEl.classList.remove("header-scrolled");
    }
  };

  if (headerEl) {
    // Thiết lập trạng thái ban đầu ngay khi load xong
    handleHeaderScroll();
    // Lắng nghe sự kiện cuộn để cập nhật trạng thái header
    window.addEventListener("scroll", handleHeaderScroll);
  }

  /* ========================================================================
     2. MAIN - FORM NEWSLETTER
     - Validate email và hiển thị thông báo phản hồi cho người dùng
     ====================================================================== */

  const newsletterForm = document.querySelector("#newsletterForm");

  if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[name="email"]');
    const feedbackEl = document.querySelector("#newsletterFeedback");

    /**
     * Kiểm tra email có đúng định dạng cơ bản hay không.
     * @param {string} value - giá trị email người dùng nhập
     * @returns {boolean}
     */
    const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

    // Xử lý khi submit form newsletter
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!emailInput) return;

      const value = emailInput.value.trim();

      // Trường hợp email không hợp lệ
      if (!isValidEmail(value)) {
        emailInput.classList.add("is-invalid");
        if (feedbackEl) {
          feedbackEl.textContent = "Vui lòng nhập địa chỉ email hợp lệ.";
          feedbackEl.classList.remove("text-success");
          feedbackEl.classList.add("text-danger");
        }
        return;
      }

      // Email hợp lệ
      emailInput.classList.remove("is-invalid");
      if (feedbackEl) {
        feedbackEl.textContent = "Cảm ơn bạn đã đăng ký nhận tin!";
        feedbackEl.classList.remove("text-danger");
        feedbackEl.classList.add("text-success");
      }

      // Reset form sau khi gửi thành công
      newsletterForm.reset();

      // Ẩn thông báo sau một thời gian ngắn để giao diện gọn gàng hơn
      if (feedbackEl) {
        setTimeout(() => {
          feedbackEl.textContent = "";
          feedbackEl.classList.remove("text-danger", "text-success");
        }, 3000);
      }
    });

    // Xử lý khi người dùng đang gõ lại email: xóa trạng thái lỗi / thông báo cũ
    if (emailInput) {
      emailInput.addEventListener("input", function () {
        emailInput.classList.remove("is-invalid");
        if (feedbackEl) {
          feedbackEl.textContent = "";
          feedbackEl.classList.remove("text-danger", "text-success");
        }
      });
    }
  }
});
