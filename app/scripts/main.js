/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var curlconverter = require('curlconverter');


document.addEventListener('DOMContentLoaded', function() {
  var hash = window.location.hash.replace('#', '');
  if ('node' === hash) {
    changeLanguage('node');
  }

  var convertButton = document.getElementById('convert-button');
  convertButton.addEventListener('click', function() {


    var curlCode = document.getElementById('curl-code').value;
    var generatedCode;
    if (curlCode.indexOf('curl') === -1) {
      generatedCode = 'Could not parse curl command.';
    } else {
      try {
        var language = getLanguage();
        if (language === 'node') {
          generatedCode = curlconverter.toNode(curlCode);
        } else {
          generatedCode = curlconverter.toPython(curlCode);
        }
      } catch(e) {
        console.log(e);
        generatedCode = 'Error parsing curl command.';
      }
    }
    document.getElementById('generated-code').value = generatedCode;
  });

  // listen for change in select
  languageSelect.addEventListener('change', function() {
    var language = document.getElementById('language').value;
    changeLanguage(language);
  });
});


/*
single point of truth in the dom, YEEEE HAWWWW
 */
var changeLanguage = function(language) {
  var generatedCodeTitle = document.getElementById('generated-code-title');
  if (language === 'node') {
    generatedCodeTitle.innerHTML = 'Node.js';
  } else {
    generatedCodeTitle.innerHTML = 'Python requests';
  }
  window.location.hash = '#' + language;
  var languageSelect = document.getElementById('language');
  languageSelect.value = language;

  return language;
};

var getLanguage = function() {
  var languageSelect = document.getElementById('language');
  return languageSelect.value;
};
