/* CoPAIR project page — vanilla JS, no dependencies */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.addEventListener("click", function (e) {
      if (e.target.classList.contains("navlink")) links.classList.remove("open");
    });
  }

  /* ---- Active nav link via IntersectionObserver ---- */
  var navlinks = Array.prototype.slice.call(document.querySelectorAll(".navlink"));
  var byId = {};
  navlinks.forEach(function (a) {
    var id = a.getAttribute("href").replace("#", "");
    if (id) byId[id] = a;
  });
  var sections = Object.keys(byId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navlinks.forEach(function (a) { a.classList.remove("active"); });
          var link = byId[en.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

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

  /* ---- Copy BibTeX ---- */
  var copyBtn = document.querySelector(".copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var pre = document.querySelector("pre.bibtex");
      if (!pre) return;
      var text = pre.innerText;
      var done = function () {
        var old = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(function () { copyBtn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }
})();
