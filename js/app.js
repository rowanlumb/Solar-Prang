document.getElementById("currentYear").textContent = new Date().getFullYear();

const wrapper = document.querySelector(".bom-wrapper");
const button = document.getElementById("bomToggle");

button.addEventListener("click", () => {

    wrapper.classList.toggle("expanded");
    wrapper.classList.toggle("collapsed");

    button.textContent = wrapper.classList.contains("expanded")
        ? "Collapse Bill of Materials"
        : "Show Full Bill of Materials";

});


const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVideo = document.getElementById("lightboxVideo");
const lightboxCaption = document.getElementById("lightboxCaption");

function closeLightbox() {

    lightbox.classList.remove("open");

    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();
    lightboxVideo.style.display = "none";

    lightboxImage.style.display = "block";

}

// Images
document.querySelectorAll(".lightbox-trigger").forEach(image => {

    image.addEventListener("click", () => {

        lightboxVideo.pause();
        lightboxVideo.style.display = "none";

        lightboxImage.style.display = "block";
        lightboxImage.src = image.dataset.full || image.src;
        lightboxImage.alt = image.alt;

        lightboxCaption.textContent = image.dataset.caption || "";

        lightbox.classList.add("open");

    });

});

// Videos
document.querySelectorAll(".video-placeholder").forEach(video => {

    video.addEventListener("click", () => {

        lightboxImage.style.display = "none";

        lightboxVideo.style.display = "block";
        lightboxVideo.src = video.dataset.video;
        lightboxVideo.play();

        lightboxCaption.textContent = video.dataset.caption || "";

        lightbox.classList.add("open");

    });

});

// Close button
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

// Click outside image/video
lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});

// Escape key
document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeLightbox();

    }

});