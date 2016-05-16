(function ( $ ) {

  $.fn.bwayImageSlider = function(options) {

        
    var settings = $.extend({
      axis          : 'x',
      initialCourse : 0,
      speed         : 1500,
      itemMargin    : 10,
      loop          : false,
      keyboard      : false,
      loader        : false
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
        totalCont = container.find('.image-total'),     //this container will display de total images
        realTotalCourseWidth = 0;

    startLoader();
    
    if (nowready==false) {
      var elementtoload = carouselListCont.find('li > *'),
          counter = 0;

      function imageLoaded(width,height,totalWidth) {
        counter++;
        if (counter==totalItems) {
          nowready = true;
          initialize(width,height,totalWidth);
          endLoader();
        }
      }
      elementtoload.each(function(){
        
        if ($(this).width()!=0 && $(this).outerHeight()!=0) {
          var elementwidth = $(this).width();
          var elementheight = $(this).outerHeight();
          realTotalCourseWidth += $(this).width();
          imageLoaded(elementwidth,elementheight,realTotalCourseWidth);
        }else{
          $(this).one('load', function(){
            var elementwidth = $(this).width();
            var elementheight = $(this).outerHeight();
            realTotalCourseWidth += $(this).width();
            imageLoaded(elementwidth,elementheight,realTotalCourseWidth);
          });
        }

        
      });
    }

    function startLoader(el) {
      if (carouselViewport.find('.loader-overlay') && settings.loader==true) {
        carouselViewport.find('.loader-overlay').show();
      }
    }

    function endLoader() {
      if (carouselViewport.find('.loader-overlay') && settings.loader==true) {
        carouselViewport.find('.loader-overlay').hide();
      }
    }

    function initialize(elwidth,elheight,totalWidth) {
      if (settings.axis=='y') {
        var availableMeasure = (carouselViewport.outerHeight() - prevButton.height() - nextButton.height()),
            itemMeasure = elheight;
      }
      if (settings.axis=='x') {
        var availableMeasure = (carouselViewport.outerWidth() - prevButton.width() - nextButton.width()),
            itemMeasure = elwidth,
            maxWithCont = totalWidth + (settings.itemMargin*totalItems);
      }

      updateCounter(0);
      checkProperties();
      carouselListCont.find('li').eq(0).addClass('selected');

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

          if (axis=='y') { 
            course = course - settings.initialCourse - itemMeasure - settings.itemMargin;
            carouselCont.css('top', course + 'px');
          }
          if (axis=='x') {
            course = course - calculateNextItem(axis,'prev') - settings.itemMargin;
            carouselCont.css('left', course + 'px');
          }
        }


        clickTimes = clickTimes - 1;
        
        if (axis=='y') { 
          course = course + settings.initialCourse + itemMeasure + settings.itemMargin;
          carouselCont.animate({ 'top': course},settings.speed);
        }
        if (axis=='x') {
          course = course + calculateNextItem(axis,'prev') + settings.itemMargin;
          carouselCont.animate({ 'left': course},settings.speed);
        }
        
        updateCounter(-1);
        carouselCont.find('li.selected').removeClass('selected').prev().addClass('selected');

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

            if (axis=='y') {
              course = course + settings.initialCourse + itemMeasure + settings.itemMargin;
              carouselCont.css('top', course + 'px');
            }
            if (axis=='x') {
              course = 0;
              carouselCont.css('left', course + 'px');
            }
          },settings.speed+100);
        }

        clickTimes = clickTimes + 1;
        if (axis=='y') { 
          course = course - settings.initialCourse - itemMeasure - settings.itemMargin;
          carouselCont.animate({ 'top': course},settings.speed);
        }
        if (axis=='x') { 
          course = course - calculateNextItem(axis,'next') - settings.itemMargin;
          carouselCont.animate({ 'left': course},settings.speed);
        }

        updateCounter(1);
        carouselCont.find('li.selected').removeClass('selected').next().addClass('selected');

        setTimeout(function () {
          activateButton(nextButton);
          checkProperties();
        },settings.speed+100);
      }

      function calculateNextItem(axis,movement) {
        var actual = carouselCont.find('.selected');
        if (axis=='x') {
          if (movement=='prev') {
            newCourse = actual.prev().width();
          }
          if (movement=='next') {
            newCourse = actual.width();
          }
        }
        return newCourse;
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

      // KEYBOARD ACTIONS
      if (settings.axis=='y' && settings.keyboard == true) { 
        body.keyup(function(e) {
          if (e.keyCode == 38) {
            $(this).find('.prev:not(.inactive)').trigger('click');
          }

          if (e.keyCode == 40) {
            $(this).find('.next:not(.inactive)').trigger('click');
          }
        });
      }
      

      if (settings.axis=='x' && settings.keyboard == true) { 
        body.keyup(function(e) {
          if (e.keyCode == 37) {
            $(this).find('.prev:not(.inactive)').trigger('click');
          }

          if (e.keyCode == 39) {
            $(this).find('.next:not(.inactive)').trigger('click');
          }
        });
      }
      // end of KEYBOARD ACTIONS

    }
    


  }


}( jQuery ));