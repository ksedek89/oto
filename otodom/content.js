const GREEN_COLOR = '#C9E265';
const BLUE_COLOR = '#5CE1E6';
const RED_COLOR = '#FFBECF';
const TRANSPARENT_COLOR = 'transparent';



// $(".offer-item__title").addClass("tooltip").each(function( index ) {
//     var linkId = $(this).find(".offer-title__link").attr("data-ad-id")
//
//
//     var element = this;
//     chrome.storage.sync.get([linkId], function(result) {
//         var comment = result[linkId];
//         if(comment != null && comment.length != 0){
//             $(element).append( $( "<span class='tooltiptext tooltip-top'>" + comment + "</span>" ) );
//         }
//     });
//     chrome.storage.sync.get([linkId + "-val"], function(result) {
//         var value = result[linkId + "-val"];
//         if(value == 3){
//             $(element).closest("article").attr("style", "background-color:"+GREEN_COLOR+"!important");
//         }
//         if(value == 2){
//             $(element).closest("article").attr("style", "background-color:"+BLUE_COLOR+"!important");
//         }
//         if(value == 1){
//             $(element).closest("article").attr("style", "background-color:"+RED_COLOR+"!important");
//         }
//         if(value == 0){
//             $(element).closest("article").attr("style", "background-color:"+TRANSPARENT_COLOR);
//         }
//     });
//
//
// }); $('a').attr('data-cy')

$(document).ready(function() {
    setTimeout(function() {
        $('a[data-cy=listing-item-link]').each(function(index){
            $(this).before("<div class='wrapperDiv'></div>");
            $(this).prev().append("<div class='editDiv boxInvisibility'></div>");
            $(this).prev().append("<div class='previewDiv boxVisibility'></div>");
            $(this).prev().find(".editDiv").append("<textarea  class='textAreaClass'  rows='4' cols='50'></textarea>");
            $(this).prev().find(".editDiv").append("<input class='confirmButton' type='button' id='btnShow' value='Zatwierdź' />");

            $(this).prev().find(".editDiv").append("<div><input type='radio'  id='dobry"+index+"' name='poziom"+index+"' value='3' ><label for='dobry"+index+"'>dobry</label></div>");
            $(this).prev().find(".editDiv").append("<div><input type='radio' id='sredni"+index+"' name='poziom"+index+"' value='2' ><label for='sredni"+index+"'>sredni</label></div>");
            $(this).prev().find(".editDiv").append("<div><input type='radio' id='slaby"+index+"' name='poziom"+index+"' value='1' ><label for='slaby"+index+"'>slaby</label></div>");
            $(this).prev().find(".editDiv").append("<div><input type='radio'  id='wyczysc"+index+"' name='poziom"+index+"' value='0' ><label for='wyczysc"+index+"'>wyczysc</label></div>");

            $(this).prev().find(".previewDiv").append("<input class='editButton' type='button' id='btnShow' value='Edytuj' />");
        });


        $( ".editButton" ).click(function() {
            $(this).parent().parent().find(".editDiv").addClass("boxVisibility").removeClass("boxInvisibility");
            $(this).parent().parent().find(".previewDiv").addClass("boxInvisibility").removeClass("boxVisibility");
            $(this).parent().parent().find(".textAreaClass").focus()

            var linkId = $(this).parent().parent().next().find(".offer-title__link").attr("data-ad-id")

        });

        $( ".confirmButton" ).click(function() {
            var linkId = $(this).parent().parent().next().attr("href")

            var save = {};
            var comment = $(this).parent().find(".textAreaClass").val();
            var value = $(this).parent().parent().find(".editDiv").find("input[name^=poziom]:checked").val();

            save[linkId] = comment;
            save[linkId + "-val"] = value;

            chrome.storage.sync.set(save, function() {});

            if(value == 3){
                $(this).parent().parent().next().find("article").attr("style", "background-color:"+GREEN_COLOR+"!important");
            }
            if(value == 2){
                $(this).parent().parent().next().find("article").attr("style", "background-color:"+BLUE_COLOR+"!important");
            }
            if(value == 1){
                $(this).parent().parent().next().find("article").attr("style", "background-color:"+RED_COLOR+"!important");
            }
            if(value == 0){
                $(this).parent().parent().next().find("article").attr("style", "background-color:"+TRANSPARENT_COLOR);
            }


            if($(this).parent().parent().next().find(".tooltiptext").length == 0){
                $(this).parent().parent().next().find(".offer-item__title").append( $( "<span class='tooltiptext tooltip-top'>" + comment + "</span>" ) );
            }else{
                $(this).parent().parent().next().find(".tooltiptext").text(comment)
            }

            $(this).parent().parent().find(".editDiv").addClass("boxInvisibility").removeClass("boxVisibility");
            $(this).parent().parent().find(".previewDiv").addClass("boxVisibility").removeClass("boxInvisibility");

        });

        $(".wrapperDiv").each(function( index ) {
            var element = this;
            var linkId = $(this).next().attr("href");
            if(linkId == null){
                return;
            }
            chrome.storage.sync.get([linkId], function(result) {
                var comment = result[linkId];
                $(element).val(comment);
            });
        });

    }, 5000);

});





