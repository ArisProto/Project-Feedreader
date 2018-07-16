$(function() {

  describe('RSS Feeds', function() {
    it('are defined', function() {

      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */

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

    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

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

   /* TODO: Write a new test suite named "The menu" */

   describe('The menu', function() {

      /* TODO: Write a test that ensures the menu element is
      * hidden by default. You'll have to analyze the HTML and
      * the CSS to determine how we're performing the
      * hiding/showing of the menu element.
      */

     it('Menu is hidden', function() {

       // checks the class to make sure the menu is hidden
       expect($(document.body).hasClass('menu-hidden')).toBe(true);
     });

     /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */

      it('Menu is toggleable', function() {

        $('a.menu-icon-link').click();
        expect(document.body.className).not.toContain('menu-hidden');

        $('a.menu-icon-link').click();
        expect(document.body.className).toContain('menu-hidden');
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {
      beforeEach(function (done) {
        loadFeed(0, done);
      });

      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */

      it('At least 1 new feed entry', function(done) {

        // yet again anything more than nothing is nice/necessary :)
        expect($('.entry h2').length).not.toBe([0]);
        done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
      var previousContent;

      beforeEach(function(done) {
        window.loadFeed(0, function() {
          previousContent = $('.feed').html();
          done();
        });
      });

      /* TODO: Write a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */

      it('changing content', function(done) {
        window.loadFeed(1, function() {

          expect($('.feed').html() !== previousContent).toBeTruthy();
          done();
        });
      });
    });

}());
