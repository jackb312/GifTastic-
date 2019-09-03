$(document).ready(function() {
    var topics = ["lion", "tiger", "bear", "falcon", "seahawk", "salmon", "orca", "dolphin", 
    "elephant", "monkey", "snake", "shark"];
    function displayImg(){
        $("#animal-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=Rq2jacKO33rCa1wdRmGCC3qQJAWyyrDG";   
        $.ajax({url: queryURL, method: "GET"})
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
                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)
                $("#animal-images").append(displayDiv);
            }
        });
    }
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
    $("#add-animal").on("click", function(){
        var newTopic = $("#animal-input").val().trim();
        form.reset();
        topics.push(newTopic);
        renderButtons();
        return false;
    })
    renderButtons();
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});