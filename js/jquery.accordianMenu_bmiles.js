;(function( $, window, undefined ) {
    
    'use strict';
    
    $.AccordianMenu = function( options, element ) {
        
      this.$menuDiv = $( element );
      this._init( options );
        
    };

    $.AccordianMenu.defaults = {
    
      speed: 250,
      easing: 'ease',
      defaultItem: 0,
      menuWidth: '415px',
      sliceWidth: '90px'
    
    };
    
    $.AccordianMenu.prototype = {
        
        _init: function( options ) {

            this.options = $.extend( $.AccordianMenu.defaults, options );
            this.$menu = this.$menuDiv.children( 'ul' );
            this.$menuItems = this.$menu.children( 'li' );
            this.$imgWrapper = this.$menuItems.children( 'a' );
            this.$menuItemsPreview = this.$imgWrapper.children( '.menuPreview' );
            this.$totalItems = this.$menuItems.length;
            this.currentIndex = -1;
            this._clickHandler();
            this._openItem( this.options.defaultItem );
            
        },
        
        _validCurrent : function() {
            
            return this.currentIndex >= 0 && this.currentIndex < this.$totalItems ? true : false;
            
        },
           
        _openItem: function( openedIndex ) {
            
            this.$imgWrapper.eq( openedIndex ).click();
            
        },
        /**/ 
        _clickHandler: function() {

          var self = this;
          this.$imgWrapper.click( function() { 
            
            var $parentLi = $( this ).parent();
            var clickedIndex = $parentLi.index();

            if ( self.currentIndex === clickedIndex ) {
              
              self._slideItem( $parentLi, false, 1500, 'easeOutQuint' );
              self.currentIndex = -1;

            } else {
              
              if ( self._validCurrent() ) {

                self._slideItem( self.$menuItems.eq( self.currentIndex ), false, 250, 'jswing' ); 

              }

              self.currentIndex = clickedIndex;
              self._slideItem( $parentLi, true, 250, 'jswing' );

            }

            return false;

          });
          
      },
        
        _slideItem: function( $panelSlice, state, speed, easing, allClosed ) {
  
          var bwOption;
          var colorOption;
          var $colorImage = $panelSlice.find( 'span.menuImage' );    

          if ( state ) {

            bwOption = { width: this.options.menuWidth  };
            colorOption = { left: '0px' };

          } else {

            bwOption = { width: this.options.sliceWidth };
            colorOption = { left: this.options.sliceWidth };
          }
          
          if ( state ) {

            $colorImage.stop( true ).animate( colorOption, speed, easing );
            this.$menuItemsPreview.stop().animate( { opacity: 0.1 }, 10000 );
          
          } else {

            this.$menuItemsPreview.stop().animate( { opacity: 1 }, 15000 );

          }

          $panelSlice.stop( true ).animate( bwOption, speed , easing );
          $colorImage.stop( true ).animate( colorOption, speed, easing );

          if ( state ) {

            $colorImage.animate( {opacity: 1}, 2000 );

          } else {

            $colorImage.css( {opacity: .2} );

          }
             
        }

    };
      
  $.fn.accordianMenu = function( options ) {
      
      if ( typeof options === 'string' ) {
          
      } else { 
        
          this.each( function() {

              var instance = $.data( this, 'accordianMenu' );
              
              if ( instance ) {

                  instance._init();

              }
              else {
            
                  instance = $.data( this, 'accordianMenu', new $.AccordianMenu( options, this ) );
                  
              }
              
          });
          
      }

      return this;  
      
  }; 

} )( jQuery, window );