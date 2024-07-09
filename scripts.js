document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var rollNoSearch = document.getElementById("rollNoSearch").value;

    // Show loading indicator
    showLoading();

    console.log("Fetching data for roll number:", rollNoSearch); // Debugging line

    fetch(`https://script.google.com/macros/s/AKfycbzQZXCzcYdmb-084JXJaW1-0DMWC5yvOm8YJR2oHAndrhrEih4wXsTCv8Gpndrd127P/exec?rollNo=${rollNoSearch}`)
        .then(response => response.json())
        .then(data => {
            // Hide loading indicator
            hideLoading();

            console.log("Data received:", data); // Debugging line

            if (data.result === "success") {
                // Display search results
                document.getElementById("topic").value = data.topic;
                document.getElementById("description").value = data.description;
                document.getElementById("groupMembers").value = data.groupMembers;
                document.getElementById("rollNo1").value = data.member1.rollNo;
                document.getElementById("name1").value = data.member1.name;

                if (data.groupMembers == "2") {
                    document.getElementById("member2").style.display = "block";
                    document.getElementById("rollNo2").value = data.member2.rollNo;
                    document.getElementById("name2").value = data.member2.name;
                } else {
                    document.getElementById("member2").style.display = "none";
                }

                document.getElementById("searchResults").style.display = "block";
            } else {
                alert("No data found for the given roll number.");
                document.getElementById("searchResults").style.display = "none";
            }
        })
        .catch(error => {
            // Hide loading indicator
            hideLoading();
            console.error("Error fetching data:", error); // Debugging line
            alert("There was a network error. Please try again.");
            document.getElementById("searchResults").style.display = "none";
        });
});

// Function to show loading spinner
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// Function to hide loading spinner
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}


// Function to clear form
function clearForm() {
    document.getElementById("searchForm").reset();
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("member2").style.display = "none";
}