        const menuToggle = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        const filterButtons = document.querySelectorAll(".filter");
        const galleryCards = document.querySelectorAll(".gallery-card");
        const galleryEmpty = document.querySelector(".gallery-empty");

        filterButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter;
                let visibleCount = 0;
                filterButtons.forEach((item) => {
                    const selected = item === button;
                    item.classList.toggle("active", selected);
                    item.setAttribute("aria-pressed", String(selected));
                });
                galleryCards.forEach((card) => {
                    const visible = filter === "all" || card.dataset.category === filter;
                    card.hidden = !visible;
                    if (visible) visibleCount += 1;
                });
                galleryEmpty.style.display = visibleCount ? "none" : "block";
            });
        });

        document.querySelector("#year").textContent = new Date().getFullYear();

        const bookingForm = document.querySelector("#booking-form");
        const formStatus = document.querySelector("#form-status");
        const studioName = "ALPHA Photo & Film";

        function bookingMessage() {
            const values = new FormData(bookingForm);
            const name = String(values.get("name") || "").trim();
            const service = String(values.get("service") || "");
            if (!name || !service) {
                bookingForm.reportValidity();
                return null;
            }
            const details = [
                `Hi ${studioName}! I'd love to enquire about a shoot.`,
                "",
                `Name: ${name}`,
                values.get("email") ? `Email: ${values.get("email")}` : "",
                `Looking for: ${service}`,
                values.get("date") ? `Preferred date: ${values.get("date")}` : "",
                values.get("message") ? `A little more: ${String(values.get("message")).trim()}` : ""
            ].filter(Boolean);
            return details.join("\n");
        }

        document.querySelectorAll("[data-send]").forEach((button) => {
            button.addEventListener("click", () => {
                const message = bookingMessage();
                if (!message) {
                    formStatus.textContent = "Add your name and choose a service first.";
                    return;
                }
                const encodedMessage = encodeURIComponent(message);
                const url = button.dataset.send === "whatsapp"
                    ? `https://wa.me/251966120834?text=${encodedMessage}`
                    : `https://t.me/Zemtegawe?text=${encodedMessage}`;
                const popup = window.open(url, "_blank");
                if (popup) {
                    popup.opener = null;
                    formStatus.textContent = `Your message is ready in ${button.dataset.send === "whatsapp" ? "WhatsApp" : "Telegram"}. Review it there and tap send.`;
                } else {
                    formStatus.textContent = "Your browser blocked the new tab. Allow pop-ups to open your message.";
                }
            });
        });