import Vue from "vue";
import Moment from "moment";

Vue.filter("humanDate", function(value) {
  if (value) {
    Moment.locale("en");
    return Moment(value).format("MMMM Do YYYY");
  }
});

Vue.filter("humanHour", function(value) {
  if (value) {
    Moment.locale("en");
    return Moment(value).format("HH:mm");
  }
});
