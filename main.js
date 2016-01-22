/*
Scenario: we want to assign some values to the browser's cookies.
Deal: if the value passed by the user isn't already a cookie value, we add it to cookies. Otherwise, remove.
*/
var cookies = {

  // Holds a ninja passed by the browser.
  selected: '',

  // Values for existing cookies in the browser.
  cookieState: [],

  // It will be called by a html anchor to add or remove a ninja to browser's cookies.
  ninja: function(ninjaSelected) {
    this.get();
    this.selected = ninjaSelected;

    // If cookies aren't set we can include a new value directly.
    if(this.cookieState.length === 0) {
      return this.update(this.selected);
    }

    // Otherwise we have to search it in the existing values.
    this.search(ninjaSelected);

    // If this new value isn't an existing value in cookies,
    // we update cookies to include this new value.
    if (this.search() !== -1) {
      this.remove();
    } else { // Else, we remove it from cookies.
      this.cookieState.push(this.selected);
    };
    // and update to the browser.
    return this.update(this.cookieState);
  },

  // Gets cookies values from ninjas in the browser and attribute these values to cookieState.
  get: function() {
    var re = new RegExp('ninjas' + "=([^;]+)");
    var value = re.exec(document.cookie);
    if(value != null) {
      return this.cookieState = unescape(value[1]).split(',');
    }
  },

  // Return indexOf for selected in cookieState.
  // -1 means that the new ninja to be included to cookies
  // isn't there so we can add it to cookies.
  search: function() {
    return $.inArray(this.selected, this.cookieState);
  },

  update: function(value) {
    document.cookie = 'ninjas=' + value;
  },

  remove: function() {
    var i = this.cookieState.indexOf(this.selected);
    if(i != -1) {
	    this.cookieState.splice(i, 1);
    }
  },
}
