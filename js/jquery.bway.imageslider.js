(function ( $ ) {

  $.fn.bwayImageSlider = function(options) {

        
    var settings = $.extend({
      axis          : 'x',
      initialCourse : 0,
      speed         : 1500,
      itemMargin    : 10,
      loop          : false
    }, options );


    var container = this,
        body = $('body'),
        course = 0,
        clickTimes = 0,
        nowready = false,
        prevButton = container.find('.buttons.prev'),
        nextButton = container.find('.buttons.next'),
        carouselViewport = container.find('.viewport'),
        carouselListCont = carouselViewport.find('ul'),
        carouselCont = container.find('.overview'),
        totalItems = container.find('ul > li').length;
    
    if (nowready==false) {
      var elementtoload = carouselListCont.find('li > img'),
          counter = 0;
      function imageLoaded(ref,width) {
        if (ref==totalItems) {
          nowready = true;
          initialize(width);
        }
      }
      elementtoload.one('load', function(){
        counter++;
        var width = $(this).width();
        imageLoaded(counter,width);
      });
    }

    function initialize(elwidth) {
      if (settings.axis=='y') {
        var availableMeasure = (carouselViewport.outerHeight() - prevButton.height() - nextButton.height()),
            itemMeasure = container.find('ul > li:first').height();
      }
      if (settings.axis=='x') {
        var availableMeasure = (carouselViewport.outerWidth() - prevButton.width() - nextButton.width()),
            itemMeasure = elwidth,
            maxWithCont = (itemMeasure + settings.itemMargin) * totalItems;
      }


      checkProperties();

      prevButton.on('click', body, function(e){
        e.preventDefault();

        if (settings.loop==true) {
          deActivateButton(prevButton);
          carouselListCont.prepend(carouselListCont.find('li:last'));
          course = course - settings.initialCourse - itemMeasure - settings.itemMargin;
          if (settings.axis=='y') { 
            carouselCont.css('top', course + 'px');
          }
          if (settings.axis=='x') {
            carouselCont.css('left', course + 'px');
          }
        }

        course = course + settings.initialCourse + itemMeasure + settings.itemMargin;
        clickTimes = clickTimes - 1;
        
        if (settings.axis=='y') { 
          carouselCont.animate({ 'top': course},settings.speed);
        }
        if (settings.axis=='x') { 
          carouselCont.animate({ 'left': course},settings.speed);
        }
        checkProperties();

        if (settings.loop==true) {
          setTimeout(function () {
           activateButton(prevButton);
          },settings.speed+100);
        }
      });

      nextButton.on('click', body, function(e){
        e.preventDefault();

        if (settings.loop==true) {
          deActivateButton(nextButton);
          setTimeout(function () {
            carouselListCont.append(carouselListCont.find('li:first'));
            course = course + settings.initialCourse + itemMeasure + settings.itemMargin;
            if (settings.axis=='y') { 
              carouselCont.css('top', course + 'px');
            }
            if (settings.axis=='x') {
              carouselCont.css('left', course + 'px');
            }
            activateButton(nextButton);
          },settings.speed+100);
        }

        course = course - settings.initialCourse - itemMeasure - settings.itemMargin;
        clickTimes = clickTimes + 1;
        if (settings.axis=='y') { 
          carouselCont.animate({ 'top': course},settings.speed);
        }
        if (settings.axis=='x') { 
          carouselCont.animate({ 'left': course},settings.speed);
        }

        checkProperties();
      });


      function checkProperties() {
        if (course >= settings.initialCourse && settings.loop==false) { 
          deActivateButton(prevButton); 
        }else if (course < settings.initialCourse && settings.loop==false) {
          activateButton(prevButton); 
        }

        if (settings.loop==false && ((availableMeasure >= (itemMeasure+settings.itemMargin)*totalItems) || (clickTimes + calculateCapacity() >= totalItems))) { 
          deActivateButton(nextButton); 
        }else if (settings.loop==false && (clickTimes + calculateCapacity() < totalItems)) {
          activateButton(nextButton);
        }
        if (settings.axis=='x') { 
          carouselListCont.width(maxWithCont);
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



  }


}( jQuery ));