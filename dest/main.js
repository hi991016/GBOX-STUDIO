/* ---------------------- SHOW MENU HEADER WHEN SCROLL ---------------------- */

window.addEventListener("scroll", () => {
  //   Get the position when I scroll to
  let scrollPos = document.querySelector("html").scrollTop;
  //   console.log('scrollPos', scrollPos)
  //   querySelector
  let menuFBIcon = document.querySelector("header .icon-fb");
  let menuHeader = document.querySelector("header .menu");
  let menuLogo = document.querySelector("header .logo");
  let menuLogoSub = document.querySelector(".menu__list .logo");
  let navMenu = document.querySelector(".nav");
  //   When the scroll is greater than 90 viewport height, add the enable class to the header tag
  if (scrollPos > 90) {
    menuHeader.classList.add("enable");
    menuFBIcon.style.display = "none";
    menuLogoSub.classList.add("rotate");
    menuLogo.style.display = "none";
    navMenu.style.display = "none";
  } else {
    menuFBIcon.style.display = "block";
    menuHeader.classList.remove("enable");
    menuLogoSub.classList.remove("rotate");
    menuLogo.style.display = "block";
    navMenu.style.display = "flex";
  }
});

/* ---------------------------- MENU SHOW/HIDDEN ---------------------------- */

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.querySelector(".btn-menu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navMenu.classList.toggle("active");
});
//  catch case open menu in mobile, and resize window > desktop
window.addEventListener("resize", function (e) {
  if (window.innerWidth < 768) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("open");
  }
});

/* ----------------------------- HOVER MENU LINK ---------------------------- */

$(".nav a").hover(
  function () {
    //  mouseenter
    $(this).siblings().addClass("is-not-hover");
    $(".nav__list a").addClass("is-not-hover");
  },
  function () {
    //  mouseleave
    $(this).siblings().removeClass("is-not-hover");
    $(".nav__list a").removeClass("is-not-hover");
  }
);
$(".nav a").hover(
  function () {
    $(".nav a").addClass("is-not-hover");
    $(this).removeClass("is-not-hover");
  },
  function () {
    $(".nav a").removeClass("is-not-hover");
  }
);

/* ------------------------------- ACTIVE TAB ------------------------------- */

$(".project__tab a").on("click", function (e) {
  e.preventDefault();
  $(this).addClass("active").siblings().removeClass("active");

  let current_tab = $(this).attr("data-list");
  $(".project .grid").hide();
  $("." + current_tab).show();
});

/* ------------------------------- BACK TO TOP ------------------------------ */

let backTop = document.querySelector(".back-to-top");
backTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ---------------------------- CUSTOM SCROLLBAR ---------------------------- */

window.addEventListener("load", () => {
  const scrollBar = document.querySelector(".scrollbar");
  window.addEventListener("scroll", function () {
    let scrollY = window.pageYOffset;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    scrollBar.style.width = (scrollY / height) * 100 + "%";
  });
});

/* ------------------------------ PHOTOSWIPE JS ----------------------------- */

var initPhotoSwipeFromDOM = function (gallerySelector) {
  var parseThumbnailElements = function (el) {
    var thumbElements = el.childNodes,
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;
    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i]; // <figure> element
      if (figureEl.nodeType !== 1) {
        continue;
      }
      linkEl = figureEl.children[0]; // <a> element
      size = linkEl.getAttribute("data-size").split("x");
      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10),
      };
      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }
      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute("src");
      }
      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }
    return items;
  };
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };
  var onThumbnailsClick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    var eTarget = e.target || e.srcElement;
    var clickedListItem = closest(eTarget, function (el) {
      return el.tagName && el.tagName.toUpperCase() === "FIGURE";
    });
    if (!clickedListItem) {
      return;
    }
    var clickedGallery = clickedListItem.parentNode,
      childNodes = clickedListItem.parentNode.childNodes,
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;
    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }
      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }
    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };
  var photoswipeParseHash = function () {
    var hash = window.location.hash.substring(1),
      params = {};
    if (hash.length < 5) {
      return params;
    }
    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }
    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }
    return params;
  };
  var openPhotoSwipe = function (
    index,
    galleryElement,
    disableAnimation,
    fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
      gallery,
      options,
      items;
    items = parseThumbnailElements(galleryElement);
    options = {
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),
      getThumbBoundsFn: function (index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
          pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      },
      showAnimationDuration: 0,
      hideAnimationDuration: 0,
    };
    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }
    if (isNaN(options.index)) {
      return;
    }
    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };
  var galleryElements = document.querySelectorAll(gallerySelector);
  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

/* ----------------------------- OPEN FULLSCREEN ---------------------------- */

var openPhotoSwipe = function () {
  var pswpElement = document.querySelectorAll(".pswp")[0];
  //  build items array
  var items = [
    {
      src: "img/project-details.jpg",
      w: 1000,
      h: 556,
    },
    {
      src: "img/std-detail-2.jpg",
      w: 982,
      h: 480,
    },
    {
      src: "img/std-detail-4.jpg",
      w: 982,
      h: 480,
    },
  ];
  //  define options (if needed)
  var options = {
    //  history & focus options are disabled on CodePen
    history: false,
    focus: false,

    showAnimationDuration: 0,
    hideAnimationDuration: 0,
  };
  var gallery = new PhotoSwipe(
    pswpElement,
    PhotoSwipeUI_Default,
    items,
    options
  );
  gallery.init();
};

$(window).on("load", function () {
  initPhotoSwipeFromDOM(".workdetails__img");
  document.querySelector(".btn-fullscreen").onclick = openPhotoSwipe;
});

// flicky work details
let $carosuel = $(".workdetails__img").flickity({
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: true,
  pageDots: true,
  fullscreen: true,
});
let backToAll = $(".btn-back");
backToAll.click(function () {
  $(".workdetails__img").flickity("select", 0);
});
