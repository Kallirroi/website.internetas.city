import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import $ from 'jquery';
import ScreensaverItem from './ScreensaverItem'
import {fragments} from '../pages/fragments'
import "../styles/posts.css";

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    var screensaver = (function() {

      var 
        _durationBeforeSlide = 5000, //3000,
        _durationBeforeActivateSS = 6000, //60000,
        _durationFade = 2000,
        _timeoutSlide = false,
        _timeoutTracking = false;
      
      function start() {
        // console.log('Screensaver.start()');


        var $cont = $('#screensaver');
        
        //$cont.addClass('active');
        $cont
          .addClass('starting')
          .fadeIn(0);

        $cont
            .find('.item')
            .first()
            .addClass('active');

        setTimeout(function() {

          $cont
            .addClass('active')
            .removeClass('starting');
        }, 3000);

        stopMouseTracking();

        clearTimeout(_timeoutSlide);
        _timeoutSlide = setTimeout(gotoNext, _durationBeforeSlide);
      }

      function stop() {
        // console.log('  stop()');

      
        var $ss = $('#screensaver');

        $ss.fadeOut(_durationFade, function() {

          $ss
            .removeClass('active')
            .find('.item.active')
            .removeClass('active');

        });   

        clearTimeout(_timeoutSlide);

        initMouseTracking();
      }

      function mouseMoving() {
        // console.log('  mouseMoving()');

        clearTimeout(_timeoutTracking);
        
        _timeoutTracking = setTimeout(function() {

          start();

        }, _durationBeforeActivateSS);
      }

      function initMouseTracking() {
        // console.log('  initMouseTracking()');

        var $cont = $('#screensaver');

        if($cont.length > 0) {

          $('body').mousemove(function(){
            throttle( mouseMoving() ,1000);
          });

          $(window).scroll(function(){
            throttle( mouseMoving() ,600);
          });

          mouseMoving();
        }   
      }

      function stopMouseTracking() {
        // console.log('  stopMouseTracking()');

        $('body').unbind('mousemove');
        clearTimeout(_timeoutTracking);
      }

      function gotoNext() {
        // console.log('  gotoNext()');

        var 
          $cont = $('#screensaver'),
          $active = $cont.find('.item.active'),
          $next = $active.next();

        $active.removeClass('active');

        if($next.length > 0) {

          $next.addClass('active')
            .css('right', Math.random() * 80 + 'vw')
            .css('top', Math.random() * 90 + 'vh');

        } else {
          
          $cont.find('.item').first().addClass('active');
        }

        _timeoutSlide = setTimeout(gotoNext, _durationBeforeSlide);
      }

      function throttle (callback, limit) {

        var wait = false;
        return function () {
          if (!wait) {

            callback.apply(null, arguments);
            wait = true;
            setTimeout(function () {
              wait = false;
            }, limit);
          }
        }
      }


      return {
        init: function() {

          var $ss = $('#screensaver');

          _durationBeforeSlide = $ss.data('duration-scroll');
          _durationBeforeActivateSS = $ss.data('duration-start');

          $ss.click(function() {
            // console.log('Screensaver.click()');

            stop();
          });

          $(document).keydown(function(e) {

            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            // console.log(key);

            if (key){ //esc or space
              stop();
            }
          });
        },
        initMouseTracking: initMouseTracking,
        stopMouseTracking: stopMouseTracking,
        start: start
      };
    })();

    screensaver.init();
    screensaver.initMouseTracking();
    // screensaver.start();
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    return (
      <div className="postMain">
        <div id="screensaver" data-duration-start="3000" data-duration-scroll="4000">
            {fragments.map((d,i) =>  <ScreensaverItem key={i} paths={d.path}/>) }
        </div> 
        <div className="postBody" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
      }
    }
  }
`
