$(function() {

  describe('RSS Feeds', function() {
    it('are defined', function() {

      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Check that the URL is defined and that the URL is not empty */

    it('Url is defined and not empty', function() {
      allFeeds.forEach(function (feed, i) {
        var UrlR = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

        var UrlFeed = feed.url;

        // we want the Url to consist of something
        expect(UrlFeed.length).not.toBe(0);
        expect(UrlFeed).toBeDefined();

        // match the Url to the characters above
        expect(allFeeds[i].url).toMatch(UrlR);
      });
    });

    /* Check that the allFeeds object has a name defined and that the name is not empty */

     it('Names are defined', function() {
       allFeeds.forEach(function(feed) {

         // var declared in app.js
         feedName = feed.name;

         // anything more than nothing is nice/necessary :)
         expect(feedName.length).not.toBe(0);
         expect(feedName).toBeDefined();
       });
     });
   });

   /* Test suite for 'The menu' */

   describe('The menu', function() {

      /* Check that the menu is hidden by default */

     it('Menu is hidden', function() {

       // checks the class to make sure the menu is hidden
       expect($(document.body).hasClass('menu-hidden')).toBe(true);
     });

     /* Check if menu is properly toggleable */

      it('Menu is toggleable', function() {

        $('a.menu-icon-link').click();
        expect(document.body.className).not.toContain('menu-hidden');

        $('a.menu-icon-link').click();
        expect(document.body.className).toContain('menu-hidden');
      });
    });

    /* Test suite for 'Initial Entries' */

    describe('Initial Entries', function() {
      beforeEach(function(done){
        loadFeed(0, function(){

          //signals 'beforeEach' has finished all its asynchronous tasks
          done();
        });
      });

      /* Check that the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container */

      it('At least 1 new feed entry', function() {
        var entryList= document.querySelectorAll('.feed .entry');
        expect(entryList.length).toBeGreaterThan(0);
      });
    });

    /* New test suite for 'New Feed Selection' */

    describe('New Feed Selection', function() {
      var previousContent;

      beforeEach(function(done) {
        window.loadFeed(0, function() {
          previousContent = $('.feed').html();
          done();
        });
      });

      /* Check that the content actually changes (asynchronous) */

      it('changing content', function(done) {
        window.loadFeed(1, function() {

          expect($('.feed').html()).not.toEqual(previousContent);  // Thank you Udacity reviewer :)
          done();
        });
      });
    });

}());
