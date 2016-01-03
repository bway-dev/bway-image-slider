# bway-image-slider
Nice jQuery image slider with option for Horizontal or Vertical axis.


### Requires
jQuery


### Examples
You can check our examples in our product page by [clicking here](http://bway.pt/opensource/plugins/js/bway-image-slider).


### Setup...

#### Load jQuery and include bway-image-slider plugin

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="jquery.bway.imageslider.min.js"></script>
```


#### Place your HTML markup
```
<div id="your-gallery">
  <div class="viewport">
    <input type="button" class="buttons prev" value="<">
    <ul class="overview">
      <li><img src="path-to-your-image"></li>
      <li><img src="path-to-your-image"></li>
      <li><img src="path-to-your-image"></li>
      <li><img src="path-to-your-image"></li>
    </ul>
    <input type="button" class="buttons next" value=">">
  </div>
</div>
```


#### Initialization

Simple initialization:

```javascript
$('#your-gallery').bwayImageSlider();
```

initializing with some options
```javascript
$('#your-gallery').bwayImageSlider({
  axis       : 'y',  // default 'x'
  itemMargin : 14,   // margin between items, default 10
  speed      : 500,  // miliseconds, default 1500
  loop       : true
});
```

#### CSS

The following lines are the css essencial code, all the rest like #your-gallery dimensions, or additional button styles were not included.

```
#example1 {
  padding: 0;
  position: relative;
  overflow: hidden;
}
#example1 .viewport {
  position: relative;
  width: 100%;
  height: 150px;  /* you can define the height you want */
  overflow: hidden;
}

#example1 .buttons {
  display: block;
  position: absolute;
  line-height: 150px; /* in this case we use some height of viewport */
  width: 30px;
  top: 0; 
  text-align: center;
  z-index: 1;
  background-color: #FFF;
  border: 0;
  font-family: 'fontawesome';
}

#example1 .buttons i {
  font-size: 18px;
  color: #000;
  line-height: 150px;
}

#example1 .buttons:hover {
  background-color: #F3F3F3;
}

#example1 .overview {
  position: absolute;
  padding: 0 35px;
  margin: 0;
  left: 0;
  top: 0;
}

#example1 .overview ul {
  clear: both;
  list-style: none;
  height: 150px;
  padding: 0;
}

#example1 li {
  display: inline-block;
  float: left;
  margin: 0 7px;
}

#example1 .buttons.prev {
  left: 0;     /* if you're using 'x' axis */
}
#example1 .buttons.next {
  right: 0;    /* if you're using 'x' axis */
}


/* COMMON ELEMENTS */
.examples .buttons.inactive {
  color: rgba(0,0,0,.1);
}
.examples .buttons.inactive:hover {
  background-color: #fff !important;
}
.examples .buttons:active, .examples .buttons:focus { 
  outline: none
}
```


