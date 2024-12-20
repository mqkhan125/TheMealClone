function showRecipe() {
    // event.preventDefault();
    let data = document.querySelector('#inp').value;
    console.log(data);

    // Using the Ajax API
    let http = new XMLHttpRequest();
    http.open('GET', `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`);
    http.onload = function () {
        console.log(this.responseText);
        let post = JSON.parse(this.response);
        let mealarray = post.meals;

        // Check if mealarray exists and is an array
        if (mealarray && Array.isArray(mealarray)) {
            let container = "";
            mealarray.map(function (items) {
                console.log(items);
                container += `<div class="card" data-id="${items.idMeal}">
                    <img id="RecipeImg" src="${items.strMealThumb}">
                    <a id="title" href="#">${items.strMeal}</a>
                </div>`;
            });
            document.querySelector('.products').innerHTML = container;

            // Add click event listeners to each card
            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', function () {
                    const mealId = this.getAttribute('data-id');
                    window.location.href = `index.html?id=${mealId}`;
                });
            });
        } else {
            // If no meals are found, display a message
            document.querySelector('.products').innerHTML = `<p style="color: #f78205; text-align: center;">No meals found. Please try another search.</p>`;
        }
    };
    http.send();
}

// Get meal ID from URL
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

let container = "";
// Function to fetch meal details
function fetchMealDetails(id) {
    let http = new XMLHttpRequest();
    http.open('GET', `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    http.onload = function () {
        let response = JSON.parse(this.response);
        let mealapi = response.meals;
        
        mealapi.map(function(meal){
            container += ` <div class="meal-recipe-details id=${meal.idMeal}">
            <img src="${meal.strMealThumb}">
           <h2>${meal.strMeal}</h2>
           <p><strong>Category:</strong> ${meal.strCategory}</p>
           <p><strong>Area:</strong> ${meal.strArea}</p>
           <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
           </div>`
        })
        document.querySelector('#mealDetails').innerHTML = container;
    };
    http.send();
}
fetchMealDetails(mealId);
