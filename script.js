const fileInput = document.querySelector(".file-input"),
  chooseImgBtn = document.querySelector(".choose-img"),
  previewImg = document.querySelector(".preview-img img"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterSlider = document.querySelector(".slider input"),
  filterValue = document.querySelector(".filter-info .value"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  saveImgBtn = document.querySelector(".save-img");

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
    resetFilterBtn.click(); //clicking reset btn, so the filter value reset if the user selected new img
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

const resetFilter = () => {
  //reset all value to default value
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;

  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;

  filterOptions[0].click(); //clicking brightness btn, so the brightness selected by default

  applyFilters();
};

const saveImage = () => {
  // console.log("button was clicked");
  const canvas = document.createElement("canvas"); //creating canvas element
  const ctx = canvas.getContext("2d"); //canvas.getContext return a drawing on the canvas
  canvas.width = previewImg.naturalWidth; //setting canvas width to actual iamge width
  canvas.height = previewImg.naturalHeight; //setting canvas height to actual image height

  //applying user selected filters to canvas filter
  ctx.filter = `brightness(${brightness}%)  saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2); //translating canva from center
  if (rotate !== 0) {
    //if rotate values isn't 0, rotate the canvas
    ctx.rotate((rotate * Math.PI) / 180);
  }

  ctx.scale(flipHorizontal, flipVertical); // flip canva, horizontaly and verticaly
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  // document.body.appendChild(canvas);

  const link = document.createElement("a"); //creating <a> element
  link.download = "image.jpg"; //passing <a> tag download value to "image.jpg"
  link.href = canvas.toDataURL(); //passing <a> tag href value to canvas data url
  link.click(); //clicking <a> tag so the image download
};

//Select file (image)
fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
