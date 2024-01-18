// Import necessary modules for testing
const { expect } = require('chai');
const { JSDOM } = require('jsdom');

// Load the HTML file using JSDOM
const { window } = new JSDOM('<html><body><p>JavaScript is so cool. It lets me add text to my page programmatically.</p></body></html>');

// Set the global window and document objects
global.window = window;
global.document = window.document;

// Include your index.js file (assuming it contains the code to be tested)
require('../path/to/index');

// Mocha test suite for index.js
describe('index.js', () => {
  it('should change the text on the page when DOM content has loaded', function (done) {
    // Initial text content check
    const initialText = document.querySelector('p').textContent;
    
    // Create and dispatch the 'DOMContentLoaded' event
    const event = document.createEvent('Event');
    event.initEvent('DOMContentLoaded', true, true);
    window.document.dispatchEvent(event);

    // Wait for a short time to allow the DOMContentLoaded event to be processed
    setTimeout(() => {
      // Check if the text content has been updated
      const updatedText = document.querySelector('p').textContent;
      expect(updatedText).to.not.equal(initialText);

      // Notify Mocha that the asynchronous test has completed
      done();
    }, 100);
  });
});
