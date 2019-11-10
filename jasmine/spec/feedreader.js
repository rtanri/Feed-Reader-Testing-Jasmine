/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. 
    
    This suite is all about the RSS feeds definitions, 
    the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        // 1. Check the allFeeds
        it('allFeeds is defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        //1.1 Check the url within the allFeeds with traditional for loops
         it('URL is defined and not empty', function(){
            for (var i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        //1.2 Check the url within the allFeeds with arrow function
        it('name is defined and not empty', function(){
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function(){

        /* TODO: Write a test that MENU is default hidden. 
                check in HTML and CSS how we're performing the
                * hiding/showing of the menu element.
                */
        it('MENU is hidden by default', function(){
            expect ($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('menu is hidden and displayed as per click', function(){
            //This sets the class menu-icon-link to be triggered on click
            /*When is clicked the class menu-hidden will change visibility*/
            $(".menu-icon-link").trigger('click'); 
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $(".menu-icon-link").trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('initialEntries', function(){
        /* TODO: Write a test that ensures when the 
                function is called and completes its work, 
        
                At least a single '.entry' element within the '.feed' container.
         
            Remember, loadFeed() is asynchronous so this test willGG need
            Jasmine's "beforeEach" and asynchronous "done()" function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it("should be at least one entry", function(){
            console.log($('.feed .entry')) //[optional] to check how many & what is within the .feed.entry
            expect('.feed.entry').not.toBe(0); 
        });

    });
    /* TODO: Write a new test suite named "New Feed Selection" */
     /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function() {

        var feedListBefore;
        var feedListAfter;

        beforeEach(function(done) {

            //collecting title of the feed with specifying h2
            loadFeed(0, function() {
                feedListBefore = $('.feed').find('h2').text();
                console.log(feedListBefore); //id:#0 - in this case, Udacity blog feed
                done();
            });
        });
        it('changes the content when new feed will be loaded', function(done) {
            // Using done() as this is same feed and it is asynchronous
            loadFeed(1, function() {
                feedListAfter = $('.feed').find("h2").text(); 
                expect(feedListBefore).not.toEqual(feedListAfter);

                console.log(feedListAfter);//id:#1 - in this case, CSS Trick feed
                done();
            });
        });
    });
       
}());
