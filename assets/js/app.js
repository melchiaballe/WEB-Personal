// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const headers = ['title', 'year', 'duration'];
const { reviews } = window;

document.addEventListener("DOMContentLoaded", () => {
  displayReviews();
});

function createReviewCard(value, parent){
    // Create an "div" node:
    const sub_parent = document.createElement("div");
    sub_parent.setAttribute("class", "col-sm-4 mb-5");

    // Create an "client card" node:
    const child = document.createElement("div");
    child.setAttribute("class", "testimonial-item");

    // Create paragraph element
    const para = document.createElement("p");
    para.innerHTML = "<i class='bx bxs-quote-alt-left quote-icon-left'></i>" + value.content + "<i class='bx bxs-quote-alt-right quote-icon-right'></i>";
    child.appendChild(para);

    // Create image element
    const img_ = document.createElement("img");
    img_.src = "assets/img/avatar.png";
    img_.setAttribute("class", "testimonial-img");
    child.appendChild(img_);

    // Create header element
    const name = document.createElement("h3");
    name.innerHTML = value.name;
    child.appendChild(name);

    // Create rating element
    let render = "";
    const stars = document.createElement("h4");
    for (let i = 1; i <= 5; i++) {
        (i <= parseInt(value.rating)) ? render += "<span class='bx bxs-star checked'></span>" : render += "<span class='bx bxs-star'></span>";
    }
    stars.innerHTML = render;
    child.appendChild(stars);

    // Create date element
    const date_ = document.createElement("h4");
    date_.innerHTML = value.date;
    child.appendChild(date_);

    // Append the child element to the subparent node
    sub_parent.appendChild(child);

    // Append the sub parent element to the parent node
    parent.appendChild(sub_parent);
}

function displayReviews() {
    let section = document.querySelector("#section-reviews");
    const parent = document.createElement("div");
    parent.setAttribute("class", "row");
    parent.setAttribute("id", "section-list");

    // Loop through the review list to create menu list items
    reviews.forEach(review => {
        createReviewCard(review, parent)
    });

    // Append the parent element to the menu div
    section.appendChild(parent);
}

function removeAlerts() {
    const elems = document.querySelectorAll('.alert');
    for (const e of elems) {
      setTimeout(function() {e.remove();}, 1000);
    }
  }

function displayAlert(text, type){
    let parent = document.querySelector("#section-alert");
    const alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-"+ type);
    alert.setAttribute("role", "alert")
    alert.innerHTML = text;
    parent.appendChild(alert);
    removeAlerts();
}

function addReview(event){
    event.preventDefault();
    try {
        let parent = document.querySelector("#section-list");
        const today = new Date().toLocaleDateString();
        const form = document.querySelector('form');
        const data = Object.fromEntries(new FormData(form).entries());
        data['date'] = today;
        data['rating'] = document.querySelector('input[name="rating"]:checked').value;
        reviews.push(data);
        createReviewCard(data, parent);
        displayAlert('Thank you for your review!', 'success');
        form.reset();
    } catch (error) {
        displayAlert('Fill out all the fields.', 'danger');
    }
}