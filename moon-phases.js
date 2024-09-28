(function() {

    // init vars
    var datMoonPhase = '';
    var dblTz = 0;	
    
    // get handle to script container 
    var scriptTag = document.scripts[document.scripts.length - 1];
    var strScriptTag = scriptTag.id;
    
    
    // core functions  ##################################################################################################################
    function changeMoonPhaseDay(intDay) {
        theDate = moment(datMoonPhase, 'YYYY-MM-DD');
        theDate.add(intDay, 'days');
        datMoonPhase = theDate.format('YYYY-MM-DD');
        getMoonPhase();
    }
    
    function getTimeZone(lat, lng) { 
    
        jQuery.ajax({
          url: 'http://api.geonames.org/findNearbyPlaceNameJSON',
          dataType: 'json',
          async: false,
          data: { 
                      lat: lat, 
                      lng: lng, 
                      style: "full", 
                      username: "adam"
                },
          success: function(data) {
                                    dblTz =  data.geonames[0].timezone.gmtOffset + data.geonames[0].timezone.dstOffset;
                                  }
        });
    
    //	$.getJSON(
    //				'http://api.geonames.org/findNearbyPlaceNameJSON', 
    //				{ 
    //					lat: lat, 
    //					lng: lng, 
    //					style: "full", 
    //					username: "adam"
    //				}
    //			)
    //			.done(
    //					function(data) {
    //						//setLocation(null, null, null, data.geonames[0].timezone.gmtOffset*60, '1');
    //						dblTz =  data.geonames[0].timezone.gmtOffset + data.geonames[0].timezone.dstOffset;
    //					}
    //				);
    }
    
    function getMoonPhase() {
        
        theDate = moment(datMoonPhase, 'YYYY-MM-DD');
        
        if(!theDate.isValid()) {
            theDate = moment();
            datMoonPhase = theDate.format('YYYY-MM-DD');
        }
        
        if(theDate.isValid()) {
        
            strDate = theDate.format('ddd Do MMM');
            
    //		if(moment().isSame(theDate, 'day')) {
    //			strDate = 'Today, ' + strDate;
    //		}
    
            if(!moment().isSame(theDate, 'year')) {
                strDate = strDate + ' ' + theDate.format('YYYY');
            }
            jQuery('.moonphases_date_text').text(strDate);
        
            theDay = theDate.format("D");
            theMonth = theDate.format("M");
            theYear = theDate.format("YYYY");
            
            theLat = (jQuery('#' + strScriptTag).attr('lat') != '') ? jQuery('#' + strScriptTag).attr('lat') : '51.4809181';
            theLng = (jQuery('#' + strScriptTag).attr('lng') != '') ? jQuery('#' + strScriptTag).attr('lng') : '-0.0207105';
            
            theTz = (jQuery('#' + strScriptTag).attr('tz') != '') ? jQuery('#' + strScriptTag).attr('tz') : ''; 
            
            if(theTz == '' || theTz == undefined) {
                getTimeZone(theLat, theLng); 
                theTz = dblTz
            }
            
            jQuery('.moonphases_launch').attr('href', 'https://moonphases.co.uk/moon-calendar/' + theYear + '/' + theMonth + '/' + theDay);
        
            jQuery.getJSON(
                            'https://moonphases.co.uk/service/getMoonDetails.php', 
                            { 
                                day: theDay, 
                                month: theMonth, 
                                year: theYear, 
                                lat: theLat, 
                                lng: theLng, 
                                tz: theTz, 
                                len: 1
                            }
                        )
                        .done(
                                function(data) {
                                    
                                    jQuery('.moonphases_text').text(data.days[0].phase_name);
                                    jQuery('.moonphases_img').attr('alt', data.days[0].phase_name);
                                    jQuery('.moonphases_img').attr('src', 'https://moonphases.co.uk/images/moons/' + data.days[0].phase_img);
                                    jQuery('.moonphases_illum_text').text(data.days[0].illumination + '% / ' + data.days[0].diameter);
                                    
                                    jQuery(".moonphases_img").css("-webkit-transform", "rotate(" + data.days[0].tilt + "deg)");
                                    jQuery(".moonphases_img").css("-moz-transform", "rotate(" + data.days[0].tilt + "deg)");
                                    jQuery(".moonphases_img").css("-ms-transform", "rotate(" + data.days[0].tilt + "deg)");
                                    jQuery(".moonphases_img").css("-o-transform", "rotate(" + data.days[0].tilt + "deg)");
                                    jQuery(".moonphases_img").css("transform", "rotate(" + data.days[0].tilt + "deg)");
                                    
                                    if (jQuery('.moonphases_rise_time').length) {
                                        jQuery('.moonphases_rise_time').html(moment(data.days[0].moonrise).format('HH') + '<span>:</span>' + moment(data.days[0].moonrise).format('mm'));
                                        jQuery('.moonphases_set_time').html(moment(data.days[0].moonset).format('HH') + '<span>:</span>' + moment(data.days[0].moonset).format('mm'));
                                    }
                                                                
                                }
                            );
        }
    }
    
    
    function moonPhaseCheckScript(){
        if(!window.jQuery){
           var script = document.createElement('script');
           script.type = "text/javascript";
           script.src = "https://code.jquery.com/jquery-2.1.1.min.js";
           script.onload = function(){moonPhaseCheckScript();};
           document.getElementsByTagName('head')[0].appendChild(script);
        }
        else {
            moonPhaseCheckScript2();
        }
    }
    
    function moonPhaseCheckScript2(){
        if(!window.moment){
           var script = document.createElement('script');
           script.type = "text/javascript";
           script.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js";
           script.onload = function(){moonPhaseCheckScript2();};
           document.getElementsByTagName('head')[0].appendChild(script);
        }
        else {
            moonPhaseBuildWidget();
        }
    }
    
    function moonPhaseBuildWidget(){	
    
        strWidget = jQuery('#' + strScriptTag).attr('widget');
        
        if (strWidget == 'tall') {
            strWidgetCode =  '<div class="moonphases">' + 
                             '	<div class="moonphases_logo"></div>' + 
                             '	<div class="moonphases_phase">' + 
                             '		<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '		<p class="moonphases_illum_text">99% / 0.5</p>' + 
                             '	</div>' + 
                             '	<div>' + 
                             '		<h3>Moonrise</h3><br>' + 
                             '		<div class="moonphases_rise_time" style="width: 195px;">15<span>:</span>49</div>' + 
                             '		<br>' + 
                             '		<h3>Moonset</h3><br>' + 
                             '		<div class="moonphases_set_time" style="width: 195px;">06<span>:</span>18</div>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'wide') {
            strWidgetCode =  '<div class="moonphases_wide">' + 
                             '	<div class="moonphases_logo">' + 
                             '  </div>' + 
                             '	<div class="moonphases_phase">' + 
                             '		<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '		<p class="moonphases_illum_text">99% / 0.5</p>' + 
                             '	</div>' + 
                             '	<div class="moonphase_right">' + 
                             '		<h3>Moonrise</h3><br>' + 
                             '		<div class="moonphases_rise_time" style="width: 95px;">15<span>:</span>49</div>' + 
                             '		<br>' + 
                             '		<h3>Moonset</h3><br>' + 
                             '		<div class="moonphases_set_time" style="width: 95px;">06<span>:</span>18</div>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'thin') {
            strWidgetCode =  '<div class="moonphases_thin">' + 
                             '	<div class="moonphases_logo_small">' + 
                             '  </div>' + 
                             '	<div class="moonphases_phase">' + 
                             '		<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '	</div>' + 
                             '	<div class="moonphase_right">' + 
                             '		<h3>Moonrise</h3><br>' + 
                             '		<div class="moonphases_rise_time_tiny" style="width: 80px;">15<span>:</span>49</div>' + 
                             '		<br>' + 
                             '		<h3>Moonset</h3><br>' + 
                             '		<div class="moonphases_set_time_tiny" style="width: 80px;">06<span>:</span>18</div>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'times') {
            strWidgetCode =  '<div class="moonphases">' + 
                             '	<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '	<div>' + 
                             '		<h3>Moonrise</h3><br>' + 
                             '		<div class="moonphases_rise_time" style="width: 95px;">15<span>:</span>49</div>' + 
                             '		<br>' + 
                             '		<h3>Moonset</h3><br>' + 
                             '		<div class="moonphases_set_time" style="width: 95px;">06<span>:</span>18</div>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'times-nodate') {
            strWidgetCode =  '<div class="moonphases">' + 
                             '	<div>' + 
                             '		<h3>Moonrise</h3><br>' + 
                             '		<div class="moonphases_rise_time" style="width: 95px;">15<span>:</span>49</div>' + 
                             '		<br>' + 
                             '		<h3>Moonset</h3><br>' + 
                             '		<div class="moonphases_set_time" style="width: 95px;">06<span>:</span>18</div>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'small') {
            strWidgetCode =  '<div class="moonphases">' + 
                             '	<div class="moonphases_phase">' + 
                             '		<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '		<p class="moonphases_illum_text">99% / 0.5</p>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'small-nodate') {
            strWidgetCode =  '<div class="moonphases">' + 
                             '	<div class="moonphases_phase">' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '		<p class="moonphases_illum_text">99% / 0.5</p>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'tiny') {
            strWidgetCode =  '<div class="moonphases_tiny">' + 
                             '	<div class="moonphases_phase">' + 
                             '		<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'tiny-nodate') {
            strWidgetCode =  '<div class="moonphases_tiny">' + 
                             '	<div class="moonphases_phase">' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'tiny-times') {
            strWidgetCode =  '<div class="moonphases_tiny">' + 
                             '	<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '	<div>' + 
                             '		<h3>Moonrise</h3><br>' + 
                             '		<div class="moonphases_rise_time_tiny" style="width: 80px;">15<span>:</span>49</div>' + 
                             '		<br>' + 
                             '		<h3>Moonset</h3><br>' + 
                             '		<div class="moonphases_set_time_tiny" style="width: 80px;">06<span>:</span>18</div>' + 
                             '	</div>' + 
                             '</div>';
        }
        else if (strWidget == 'tiny-times-nodate') {
            strWidgetCode =  '<div class="moonphases_tiny">' + 
                             '	<div>' + 
                             '		<h3>Moonrise</h3><br>' + 
                             '		<div class="moonphases_rise_time_tiny" style="width: 80px;">15<span>:</span>49</div>' + 
                             '		<br>' + 
                             '		<h3>Moonset</h3><br>' + 
                             '		<div class="moonphases_set_time_tiny" style="width: 80px;">06<span>:</span>18</div>' + 
                             '	</div>' + 
                             '</div>';
        }
        else {
            strWidgetCode =  '<div class="moonphases">' + 
                             '	<div class="moonphases_logo"></div>' + 
                             '	<div class="moonphases_phase">' + 
                             '		<h2 class="moonphases_date_text">Mon 2nd Feb</h2>' + 
                             '		<a href="https://moonphases.co.uk/" class="moonphases_launch">' + 
                             '			<img class="moonphases_img" src="https://moonphases.co.uk/images/moons/0.png" alt="Full Moon">' + 
                             '		</a>' + 
                             '		<h2 class="moonphases_text">Full Moon</h2>' + 
                             '		<p class="moonphases_illum_text">99% / 0.5</p>' + 
                             '	</div>' + 
                             '</div>';
        }
        
        if(!jQuery('#moonphase_styles').length) {
            var css = jQuery("<link>", { 
                                    rel: "stylesheet", 
                                    type: "text/css", 
                                    id: "moonphase_styles", 
                                    href: "moon-current.css" 
                                });
            css.appendTo('head'); 
        }
        
        jQuery('#' + strScriptTag).after(strWidgetCode);
    
        datMoonPhase = jQuery('#' + strScriptTag).attr('date');
        
        getMoonPhase();
    }
    
    
    // main running
    moonPhaseCheckScript();
    
    })();