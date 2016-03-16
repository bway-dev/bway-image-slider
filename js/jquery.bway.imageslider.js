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
        totalItems = container.find('ul > li').length,
        currentImage = 1,
        currentCont = container.find('.image-current'), //this container will display de actual image index
        totalCont = container.find('.image-total');     //this container will display de total images
    
    if (nowready==false) {
      var elementtoload = carouselListCont.find('li > *'),
          counter = 0;

      function imageLoaded(width,height) {
        counter++;
        if (counter==totalItems) {
          nowready = true;
          initialize(width,height);
        }
      }
      elementtoload.each(function(){
        
        if ($(this).width()!=0 && $(this).outerHeight()!=0) {
          var elementwidth = $(this).width();
          var elementheight = $(this).outerHeight();
          imageLoaded(elementwidth,elementheight);
        }else{
          $(this).one('load', function(){
            var elementwidth = $(this).width();
            var elementheight = $(this).outerHeight();
            imageLoaded(elementwidth,elementheight);
          });
        }

        
      });
    }

    function initialize(elwidth,elheight) {
      if (settings.axis=='y') {
        var availableMeasure = (carouselViewport.outerHeight() - prevButton.height() - nextButton.height()),
            itemMeasure = elheight;
      }
      if (settings.axis=='x') {
        var availableMeasure = (carouselViewport.outerWidth() - prevButton.width() - nextButton.width()),
            itemMeasure = elwidth,
            maxWithCont = (itemMeasure + settings.itemMargin) * totalItems;
      }

      updateCounter(0);

      checkProperties();

      prevButton.on('click', body, function(e){
        e.preventDefault();

        prevAction(settings.axis,settings.loop)
      });

      nextButton.on('click', body, function(e){
        e.preventDefault();

        nextAction(settings.axis,settings.loop);
      });


      function prevAction(axis,loop) {
        deActivateButton(prevButton);

        if (loop==true) {
          carouselListCont.prepend(carouselListCont.find('li:last'));
          course = course - settings.initialCourse - itemMeasure - settings.itemMargin;
          if (axis=='y') { 
            carouselCont.css('top', course + 'px');
          }
          if (axis=='x') {
            carouselCont.css('left', course + 'px');
          }
        }

        course = course + settings.initialCourse + itemMeasure + settings.itemMargin;
        clickTimes = clickTimes - 1;
        
        if (axis=='y') { 
          carouselCont.animate({ 'top': course},settings.speed);
        }
        if (axis=='x') { 
          carouselCont.animate({ 'left': course},settings.speed);
        }
        
        updateCounter(-1);

        setTimeout(function () {
          activateButton(prevButton);
          checkProperties();
        },settings.speed+100);

      }

      function nextAction(axis,loop) {
        deActivateButton(nextButton);

        if (loop==true) {
          setTimeout(function () {
            carouselListCont.append(carouselListCont.find('li:first'));
            course = course + settings.initialCourse + itemMeasure + settings.itemMargin;
            if (axis=='y') { 
              carouselCont.css('top', course + 'px');
            }
            if (axis=='x') {
              carouselCont.css('left', course + 'px');
            }
          },settings.speed+100);
        }

        course = course - settings.initialCourse - itemMeasure - settings.itemMargin;
        clickTimes = clickTimes + 1;
        if (axis=='y') { 
          carouselCont.animate({ 'top': course},settings.speed);
        }
        if (axis=='x') { 
          carouselCont.animate({ 'left': course},settings.speed);
        }

        updateCounter(1);

        setTimeout(function () {
          activateButton(nextButton);
          checkProperties();
        },settings.speed+100);
      }

      function updateCounter(value) {
        if (currentImage==1 && value==-1) {
          currentImage = totalItems;
        } else if (currentImage==totalItems && value==+1) { 
          currentImage = 1;
        } else {
          currentImage = currentImage + value;
        }
        currentCont.text(currentImage);
        totalCont.text(totalItems);
      }

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

      // TOUCH ACTIONS (if hammer.js is loaded)
      if(typeof Hammer != 'undefined') {

        if (settings.axis=='y') { 
          carouselListCont.bind("touchstart", function(e){
            e.preventDefault();
          });

          carouselListCont.bind("touchmove", function(e){
            e.preventDefault();
          });

          carouselViewport.hammer().on('pandown', function() {
            $(this).find('.prev:not(.inactive)').trigger('click');
          });

          carouselViewport.hammer().on('panup', function() {
            $(this).find('.next:not(.inactive)').trigger('click');
          });
        }
        

        if (settings.axis=='x') { 
          carouselViewport.hammer().on('swiperight', function() {
            $(this).find('.prev:not(.inactive)').trigger('click');
          });

          carouselViewport.hammer().on('swipeleft', function() {
            $(this).find('.next:not(.inactive)').trigger('click');
          });
        }
      }
      // end of TOUCH ACTIONS

    }
    


  }


}( jQuery ));