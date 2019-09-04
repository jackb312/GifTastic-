$(document).ready(function() {
    //array that has preloaded buttons in it//
    var topics = ["lion", "tiger", "bear", "falcon", "seahawk", "salmon", "orca", "dolphin", 
    "elephant", "monkey", "snake", "shark"];
    //function that get image from Giphy using API
    function displayImg(){
        //links to location of animal images in browser
        $("#animal-images").empty();
        //links the topics to the API search
        var input = $(this).attr("data-name");
        //limit on number of returns from API
        var limit = 10;
        //this is the query ro the API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=Rq2jacKO33rCa1wdRmGCC3qQJAWyyrDG";   
        $.ajax({url: queryURL, method: "GET"})
        //function that loops through return pics and links them to browser
        .done(function(response) {
            for(var j = 0; j < limit; j++) {    
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);
                //gets the pic rating from the API
                var rating = response.data[j].rating;
                console.log(response);
                //links the pic rating to the browser
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)
                $("#animal-images").append(displayDiv);
            }
        });
    }
    //links the topics array to the browser and creates buttons for them
    function renderButtons(){ 
        $("#animal-buttons").empty();
        for (var i = 0; i < topics.length; i++){
            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", topics[i]); 
            newButton.text(topics[i]); 
            $("#animal-buttons").append(newButton); 
        }
    }
    //function that allows the pics to be still or animated
    function imageChangeState() {          
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }
    //function that adds a new button if the user types in a new value
    $("#add-animal").on("click", function(){
        var newTopic = $("#animal-input").val().trim();
        form.reset();
        topics.push(newTopic);
        renderButtons();
        return false;
    })
    /*allows the pics to change state when clicked and allows the images 
    to display when the topics button is clicked*/
    renderButtons();
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});