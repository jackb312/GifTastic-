var topics = ["cats", "dogs", "elephants", "lions", "bears", "cheetahs", "tigers", 
"monkeys", "sharks", "orcas", "seals", "salmon", "penguins"];
renderButtons();
function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button class='btn-primary'>");
        a.addClass("topicsChar");
        a.attr("data-animals", topics[i]);
        a.text(topics[i]);
        $("#buttons").append(a);
    }
};
$(document).ready(function() {
    $("#buttons").on("click", "animalsChar", function(){
        console.log("button has clicked");
        var topicsChar = $(this).attr("data-animals");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicsChar +
        "&api_key=Rq2jacKO33rCa1wdRmGCC3qQJAWyyrDG&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
    .done(function(response){
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (topics[i].rating !== "r" && topics[i].rating !== "pg-13") {
                var gifDiv = $("<div class = 'gifBucket'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var topicsImage = $("<img>");
                topicsImage.attr("class", "gif");
                topicsImage.attr("src", results[i].images.fixed_height_still.url);
                topicsImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicsImage.attr("data-animate", results[i].images.fixed_height.url);
                topicsImage.attr("data-state", "still")
                gifDiv.append(topicsImage);
                gifDiv.append(p);
                $("#gifs-area").prepend(gifDiv);
            }
        }
    });
    });
    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        console.log("gif clicked state= " + state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate"); 
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            };
    });
    $("gifAdder").on("click", function(){
        console.log("Submit Pressed");
        var newTopics = $("#addGifs").val();
        if (newTopics !== "") {
            topics.push(newTopics);
            renderButtons();
        };
    });
});