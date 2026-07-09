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



// Code for mobile to stop instant part download on click
document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.part-image-wrapper');

    wrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function(e) {
            // Check if the user is using a touchscreen device
            if (window.matchMedia('(pointer: coarse)').matches) {
                
                // If this card hasn't been tapped yet
                if (!this.classList.contains('touch-active')) {
                    // Stop the download from happening immediately
                    e.preventDefault(); 
                    
                    // Close any other open cards so only one overlay shows at a time
                    wrappers.forEach(w => w.classList.remove('touch-active'));
                    
                    // Trigger the CSS transitions safely
                    this.classList.add('touch-active');
                }
                // If it IS already active, the browser handles the click normally 
                // and the download starts on this second tap.
            }
        });
    });

    // Tap anywhere else on the screen to hide the overlay cleanly
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.part-image-wrapper')) {
            wrappers.forEach(w => w.classList.remove('touch-active'));
        }
    });
});