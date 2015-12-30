# bway-image-slider
Nice jQuery image slider with option for Horizontal or Vertical axis.


### Requires
jQuery


### Example

#### Load JS

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="jquery.bway.imageslider.min.js"></script>


#### Markup

<div id="your-gallery">
  <div class="viewport">
    <input type="button" class="buttons prev" value="&lt;">
    <ul class="overview">
      <li><img src="path-to-your-image"></li>
      <li><img src="path-to-your-image"></li>
      <li><img src="path-to-your-image"></li>
      <li><img src="path-to-your-image"></li>
    </ul>
    <input type="button" class="buttons next" value="&gt;">
  </div>
</div>


#### Call bway-image-slider

Simple usage:

$('#your-gallery').bwayImageSlider();


Or add some options:
$('#your-gallery').bwayImageSlider({
  axis       : 'y',  // default 'x'
  itemMargin : 16,   // margin between items, default 10
  speed      : 500   // miliseconds, default 1500
});



