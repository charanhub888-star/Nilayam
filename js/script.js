// ================= NILAYAM JAVASCRIPT =================

// ================= ADD PROPERTY =================

const propertyForm = document.getElementById("propertyForm");
const editIndex = localStorage.getItem("editPropertyIndex");

if (propertyForm) {

    // Load property for editing
    if (editIndex !== null) {

        let properties = JSON.parse(localStorage.getItem("properties")) || [];
        let property = properties[editIndex];

        if (property) {

            document.getElementById("title").value = property.title;
            document.getElementById("city").value = property.city;
            document.getElementById("district").value = property.district;
            document.getElementById("rent").value = property.rent;

            if(document.getElementById("bedrooms"))
                document.getElementById("bedrooms").value = property.bedrooms || "";

            if(document.getElementById("bathrooms"))
                document.getElementById("bathrooms").value = property.bathrooms || "";

            if(document.getElementById("contact"))
                document.getElementById("contact").value = property.contact || "";

            if(document.getElementById("description"))
                document.getElementById("description").value = property.description || "";
        }

    }

    propertyForm.addEventListener("submit", function(e){

        e.preventDefault();

        const title = document.getElementById("title").value;
        const city = document.getElementById("city").value;
        const district = document.getElementById("district").value;
        const rent = document.getElementById("rent").value;

        if(title==="" || city==="" || district==="" || rent===""){

            alert("Please fill all required fields.");
            return;

        }

        let properties = JSON.parse(localStorage.getItem("properties")) || [];

        const property = {

            title:title,
            city:city,
            district:district,
            rent:rent,

            bedrooms:document.getElementById("bedrooms")?.value || "",
            bathrooms:document.getElementById("bathrooms")?.value || "",
            contact:document.getElementById("contact")?.value || "",
            description:document.getElementById("description")?.value || "",
            image: imagePreview.src,

        };

        if(editIndex !== null){

            properties[editIndex] = property;
            localStorage.removeItem("editPropertyIndex");
            alert("✅ Property Updated Successfully!");

        }else{

            properties.push(property);
            alert("🎉 Property Added Successfully!");

        }

        localStorage.setItem("properties", JSON.stringify(properties));

        propertyForm.reset();

        if(imagePreview){

            imagePreview.src="";
            imagePreview.style.display="none";

        }

        window.location.href="my-properties.html";

    });

}

// ================= IMAGE PREVIEW =================

const imageInput = document.getElementById("propertyImage");
const imagePreview = document.getElementById("imagePreview");

if(imageInput && imagePreview){

    imageInput.addEventListener("change",function(){

        const file=this.files[0];

        if(file){

            const reader=new FileReader();

            reader.onload=function(e){

                imagePreview.src=e.target.result;
                imagePreview.style.display="block";

            }

            reader.readAsDataURL(file);

        }

    });

}

// ================= MY PROPERTIES =================

const propertyList=document.getElementById("propertyList");

if(propertyList){

    const properties=JSON.parse(localStorage.getItem("properties")) || [];

    if(properties.length===0){

        propertyList.innerHTML="<h3>No Properties Added Yet</h3>";

    }else{

        properties.forEach((property,index)=>{

            propertyList.innerHTML+=`

            <div class="property-card">

<div class="property-image">

<img src="${property.image || 'Images/hero.jpeg'}"
style="width:100%;height:180px;object-fit:cover;">

</div>
                <div class="property-content">

                    <h2>${property.title}</h2>

                    <p>📍 ${property.city}, ${property.district}</p>

                    <p>💰 ₹${property.rent} / Month</p>

                </div>

                <div class="property-buttons">

                    <button class="view-btn"
                    onclick="window.location.href='property-details.html'">

                        👁 View

                    </button>

                    <button class="edit-btn"
                    onclick="editProperty(${index})">

                        ✏ Edit

                    </button>

                    <button class="delete-btn"
                    onclick="deleteProperty(${index})">

                        🗑 Delete

                    </button>

                </div>

            </div>

            `;

        });

    }

}

// ================= DELETE =================

function deleteProperty(index){

    let properties=JSON.parse(localStorage.getItem("properties")) || [];

    if(confirm("Delete this property?")){

        properties.splice(index,1);

        localStorage.setItem("properties",JSON.stringify(properties));

        location.reload();

    }

}

// ================= EDIT =================

function editProperty(index){

    localStorage.setItem("editPropertyIndex",index);

    window.location.href="add-property.html";

}
// ================= SEARCH PAGE =================

const searchPropertyList = document.getElementById("searchPropertyList");

if (searchPropertyList) {

    const properties = JSON.parse(localStorage.getItem("properties")) || [];

    if (properties.length === 0) {

        searchPropertyList.innerHTML = "<h2>No Properties Available</h2>";

    } else {

        properties.forEach(function(property) {

            searchPropertyList.innerHTML += `

            <div class="property-card">

                <div class="property-image">

                    <img src="${property.image || 'Images/hero.jpeg'}"
                    style="width:100%;height:220px;object-fit:cover;">

                </div>

                <div class="property-content">

                    <h2>${property.title}</h2>

                    <p>📍 ${property.city}, ${property.district}</p>

                    <p>💰 ₹${property.rent} / Month</p>

                    <a href="property-details.html" class="dashboard-btn">

                        View Details

                    </a>

                </div>

            </div>

            `;

        });

    }

}
// ================= SEARCH BY CITY =================

function searchProperties(){

    const city = document.getElementById("searchCity").value.toLowerCase();

    const properties = JSON.parse(localStorage.getItem("properties")) || [];

    const propertyList = document.getElementById("searchPropertyList");

    propertyList.innerHTML = "";

    const filtered = properties.filter(property =>
        property.city.toLowerCase().includes(city)
    );

    if(filtered.length === 0){

        propertyList.innerHTML = "<h2>No Properties Found</h2>";

        return;

    }

    filtered.forEach(function(property){

        propertyList.innerHTML += `

        <div class="property-card">

            <div class="property-image">

                <img src="${property.image || 'Images/hero.jpeg'}"
                style="width:100%;height:220px;object-fit:cover;">

            </div>

            <div class="property-content">

                <h2>${property.title}</h2>

                <p>📍 ${property.city}, ${property.district}</p>

                <p>💰 ₹${property.rent} / Month</p>

                <a href="property-details.html"
                class="dashboard-btn">

                    View Details

                </a>

            </div>

        </div>

        `;

    });

}
// ================= WISHLIST BUTTON =================

let wishlistButtons = document.querySelectorAll(".wishlist");


wishlistButtons.forEach(function(button){

    button.addEventListener("click", function(){

        if(button.innerHTML.includes("❤️")){

            button.innerHTML = "💚";

            alert("Property added to wishlist ❤️");

        }

        else{

            button.innerHTML = "❤️";

            alert("Property removed from wishlist");

        }

    });

});
// ================= PROPERTY SEARCH =================

function searchProperties(){


let cityInput = document.getElementById("citySearch");

let budgetInput = document.getElementById("budgetSearch");

let typeInput = document.getElementById("typeSearch");


// Stop if search box is not available

if(!cityInput || !budgetInput || !typeInput){

    return;

}



let city = cityInput.value.toLowerCase();


let budget = budgetInput.value;


let type = typeInput.value;



let cards = document.querySelectorAll(".home-card");



cards.forEach(function(card){


let cardCity = card.dataset.city
? card.dataset.city.toLowerCase()
: "";


let cardBudget = card.dataset.budget;


let cardType = card.dataset.type;



let cityMatch =
city === "" || cardCity.includes(city);



let budgetMatch =
budget === "" || Number(cardBudget) <= Number(budget);



let typeMatch =
type === "" || cardType === type;



if(cityMatch && budgetMatch && typeMatch){

    card.style.display="block";

}

else{

    card.style.display="none";

}


});


}