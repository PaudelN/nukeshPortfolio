// Select elements__________(MOBILE_NAVBAR)___________________
const toggleBtn = document.getElementById("toggle-btn");
const btnClose = document.getElementById("btn-close");
const menuItems = document.querySelector(".menu_items");

toggleBtn.addEventListener("click", () => {
  menuItems.classList.add("show");
  btnClose.classList.add("show");
  toggleBtn.style.display = "none";
});

btnClose.addEventListener("click", () => {
  menuItems.classList.remove("show");
  btnClose.classList.remove("show");
  toggleBtn.style.display = "inline-block";
});

//social media icons color
// const socialMedia = document.querySelector(".social_media");
// const socialIcons = document.querySelectorAll(".social_icon");

// const socialMediaBgColor = getComputedStyle(socialMedia).background;

// const primaryColor = " hsl(250, 69%, 61%)";

// if (socialMediaBgColor === primaryColor) {
//   socialIcons.forEach((icon) => {
//     icon.style.background = "white";
//   });
// }

//_____________________ACCORDIAN FLASH (Skills)______________________________________

const skillsList = document.querySelectorAll(".skills_list");
const skillsArrow = document.querySelectorAll(".skills_arrow");

skillsArrow.forEach((arrow, index) =>
  arrow.addEventListener("click", () => {
    skillsList[index].classList.toggle("show");
    arrow.classList.toggle("rotate");
  })
);

//______________________QUALIFICATION TAB___________________________________

// const tabs = document.querySelectorAll("[data-target]");
// const tabsContent = document.querySelectorAll("[data-content]");

// tabs.forEach((tab) => {
//   tab.addEventListener("click", () => {
//     const target = document.querySelector(tab.dataset.target);

//     tabsContent.forEach((tabContent) => {
//       tabContent.classList.remove("qualification_active");
//     });

//     target.classList.add("qualification_active");

//     tabs.forEach((tab) => {
//       tab.classList.remove("qualification_active");
//     });
//     tab.classList.add("qualification_active");
//   });
// });

//Services modal seen on click

const modalViews = document.querySelectorAll(".services_modal");
const modalBtns = document.querySelectorAll(".services_button");
const modalCloses = document.querySelectorAll(".services_modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

//Portfolio section__________________________________________________slider
const slider = document.querySelector(".portfolio-slider");
const leftArrow = document.querySelector(".portfolio-arrow-left");
const rightArrow = document.querySelector(".portfolio-arrow-right");

let currentIndex = 0;

// Update slider position
const updateSliderPosition = () => {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Disable left arrow if at the first item
  if (currentIndex === 0) {
    leftArrow.disabled = true;
  } else {
    leftArrow.disabled = false;
  }

  // Disable right arrow if at the last item
  if (currentIndex === slider.children.length - 1) {
    rightArrow.disabled = true;
  } else {
    rightArrow.disabled = false;
  }
};

// Initial state
updateSliderPosition();

// Left arrow event
leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    updateSliderPosition();
  }
});

// Right arrow event
rightArrow.addEventListener("click", () => {
  if (currentIndex < slider.children.length - 1) {
    currentIndex += 1;
    updateSliderPosition();
  }
});
