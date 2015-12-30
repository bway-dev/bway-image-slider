# bway-image-slider
Nice jQuery image slider with option for Horizontal or Vertical axis.


### Requires
jQuery


### Example

#### Load JS

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="jquery.bway.imageslider.min.js"></script>
```


#### Markup
```
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
```


#### Call bway-image-slider

Simple usage:

```javascript
$('#your-gallery').bwayImageSlider();
```

Or add some options:
```javascript
$('#your-gallery').bwayImageSlider({
  axis       : 'y',  // default 'x'
  itemMargin : 16,   // margin between items, default 10
  speed      : 500   // miliseconds, default 1500
});
```


#### CSS

The following lines are the css essencial code, all the rest like #your-gallery dimensions, or additional button styles were not included.

```
#your-gallery .viewport {
  position: relative;
  width: 100%;
  height: 200px;  /* you can define the height you want */
  overflow: hidden;
}

#your-gallery .buttons {
  display: block;
  position: absolute;
  line-height: 25px;
  width: 100%;
  left: 0; 
  text-align: center;
  z-index: 1;
  background-color: #FFF;
  border: 0;
}

#your-gallery .overview {
  list-style: none;
  position: absolute;
  padding: 0;
  margin: 0;
  width: 100% !important;
  left: 0;
  top: 0;
}

#your-gallery .buttons.prev {
  top: 0;      /* if you're using 'y' axis */
  left: 0;     /* if you're using 'x' axis */
}
#your-gallery .buttons.next {
  bottom: 0;   /* if you're using 'y' axis */
  right: 0;    /* if you're using 'x' axis */
}
```


