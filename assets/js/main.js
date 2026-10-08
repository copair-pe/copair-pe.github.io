/* CoPAIR project page — vanilla JS, no dependencies */
(function () {
  "use strict";

  /* ---- Lazy play/pause inline clips when on screen ---- */
  var clips = Array.prototype.slice.call(document.querySelectorAll("video[data-lazy]"));
  if ("IntersectionObserver" in window && clips.length) {
    var vidObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    clips.forEach(function (v) { vidObs.observe(v); });
  } else {
    clips.forEach(function (v) { var p = v.play(); if (p && p.catch) p.catch(function(){}); });
  }

  /* ---- Video carousel: only the active slide loads and plays ---- */
  var car = document.querySelector(".vcarousel");
  if (car) {
    var slides = Array.prototype.slice.call(car.querySelectorAll(".vc-slide"));
    var tabs = Array.prototype.slice.call(car.querySelectorAll(".vc-tab"));
    var cur = 0, onScreen = false;
    var vids = function (i) { return Array.prototype.slice.call(slides[i].querySelectorAll("video")); };
    var run = function () {
      slides.forEach(function (sl, i) {
        vids(i).forEach(function (v) {
          if (i === cur && onScreen) {
            if (!v.getAttribute("src")) { v.src = v.dataset.src; v.preload = "auto"; }
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            v.pause();
          }
        });
      });
    };
    var show = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (sl, j) { sl.classList.toggle("active", j === cur); });
      tabs.forEach(function (t, j) {
        t.classList.toggle("active", j === cur);
        t.setAttribute("aria-selected", j === cur ? "true" : "false");
      });
      vids(cur).forEach(function (v) { if (v.getAttribute("src")) v.currentTime = 0; });
      run();
    };
    tabs.forEach(function (t, i) { t.addEventListener("click", function () { show(i); }); });
    car.querySelector(".vc-arrow.prev").addEventListener("click", function () { show(cur - 1); });
    car.querySelector(".vc-arrow.next").addEventListener("click", function () { show(cur + 1); });
    car.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting; run();
      }, { threshold: 0.2 }).observe(car);
    } else { onScreen = true; run(); }
  }
})();
