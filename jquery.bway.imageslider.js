(function ( $ ) {

  $.fn.bwayImageSlider = function(options) {

        
    var settings = $.extend({
      axis : 'x',
      initialCourse : 0,
      speed : 1500,
      itemMargin : 10
    }, options );


    var container = this,
        body = $('body'),
        course = 0,
        clickTimes = 0,
        prevButton = container.find('.buttons.prev'),
        nextButton = container.find('.buttons.next'),
        carouselViewport = container.find('.viewport'),
        carouselCont = container.find('.overview'),
        totalItems = container.find('ul > li').length;
        
        
    if (settings.axis=='y') {
      var availableMeasure = (carouselViewport.outerHeight() - prevButton.height() - nextButton.height()),
          itemMeasure = container.find('ul > li:first').height();
    }
    if (settings.axis=='x') {
      var availableMeasure = (carouselViewport.outerWidth() - prevButton.width() - nextButton.width()),
          itemMeasure = container.find('ul > li:first').width();
    }


    checkButtons();

    prevButton.on('click', body, function(e){
      e.preventDefault();

      course = course + settings.initialCourse + itemMeasure + settings.itemMargin;
      clickTimes = clickTimes - 1;
      
      if (settings.axis=='y') { 
        carouselCont.animate({ 'top': course},settings.speed);
      }
      if (settings.axis=='x') { 
        carouselCont.animate({ 'left': course},settings.speed);
      }
      checkButtons();
    });

    nextButton.on('click', body, function(e){
      e.preventDefault();

      course = course - settings.initialCourse - itemMeasure - settings.itemMargin;
      clickTimes = clickTimes + 1;
      if (settings.axis=='y') { 
        carouselCont.animate({ 'top': course},settings.speed);
      }
      if (settings.axis=='x') { 
        carouselCont.animate({ 'left': course},settings.speed);
      }
      checkButtons();
    });

    function checkButtons() {
      if (course >= settings.initialCourse) { 
        deActivateButton(prevButton); 
      }else{
        activateButton(prevButton); 
      }

      if ((availableMeasure >= (itemMeasure+settings.itemMargin)*totalItems) || (clickTimes + calculateCapacity() >= totalItems)) { 
        deActivateButton(nextButton); 
      }else if (clickTimes + calculateCapacity() < totalItems) {
        activateButton(nextButton);
      }
    }

    function calculateCapacity() {
      return (Math.floor(availableMeasure / (itemMeasure + settings.itemMargin)));
    }

    function deActivateButton(key) {
      key.attr("disabled", true);
      key.addClass('inactive');
    }

    function activateButton(key) {
      key.attr("disabled", false);
      key.removeClass('inactive');
    }



  }


}( jQuery ));