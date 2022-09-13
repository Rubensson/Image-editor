const fileInput = document.querySelector(".file-input"),
  chooseImgBtn = document.querySelector(".choose-img"),
  previewImg = document.querySelector(".preview-img img"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterSlider = document.querySelector(".slider input"),
  filterValue = document.querySelector(".filter-info .value"),
  rotateOptions = document.querySelectorAll(".rotate button");

//initial filters
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%)  saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

//Load file
const loadImage = () => {
  let file = fileInput.files[0]; //getting user selected files.
  if (!file) return; //return if user hasn't selected file.
  previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
  previewImg.addEventListener("load", () => {
    //when de file load->
    document.querySelector(".container").classList.remove("disable"); //remove class ".disable"
  });
};

//activate each control button and change name in slider
filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding click event listener to all filter buttons
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    //keeping values of each filter
    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "200";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "200";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});

//udate value of slider input
const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active"); //getting selected filter btn

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding click event listener to all rotate/flip buttons
    if (option.id === "left") {
      rotate -= 90; //if clicked btn is left rotate, decrement rotate value by -90
    } else if (option.id === "right") {
      rotate += 90; //if clicked btn is left rotate, increment rotate value by 90
    } else if (option.id === "vertical") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1; //if fliphorizontal value is 1, set this value to -1 else set 1
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1; //if flipVertical value is 1, set this value to -1 else set 1
    }
    applyFilters();
  });
});

//Select file (image)
fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
