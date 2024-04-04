const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
    const pics = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];

/* Declaring the alternative text for each image file */
    const alts = ["picture of a 1","picture of a 2","picture of a 3","picture of a 4","picture of a 5"];

/* Looping through images */
for (let i =0; i <5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', pics[i]);
    newImage.setAttribute('alt', alts[i]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener("click", () => {
    displayedImage.setAttribute('src', pics[i]);
    displayedImage.setAttribute('alt', alts[i]);
});
}

/* Wiring up the Darken/Lighten button */

    btn.addEventListener('click', () => {
        const button = btn.getAttribute("class");
        if (button == "dark") {
            btn.setAttribute("class", "light");
            btn.textContent = "Lighten";
            overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
        } else {
            btn.setAttribute("class", "dark");
            btn.textContent = "Darken";
            overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
        }
    });