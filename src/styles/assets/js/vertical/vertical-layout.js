"use strict!"
$(document).ready(function() {
    // variable

    var Navbarbg = "themelight1"; // navbar color themelight1 / theme1
    var headerbg = "theme1"; //  navbar color theme1 / theme2 / theme3 / theme4 / theme5 / theme6
    var menucaption = "theme1"; //  menu caption color theme1 / theme2 / theme3 / theme4 / theme5 / theme6 / theme7 / theme8 / theme9
    var bgpattern = "theme1"; //  background pattern theme1 / theme2 / theme3 / theme4 / theme5 / theme6
    var activeitemtheme = "theme1"; //  menu active color theme1 / theme2 / theme3 / theme4 / theme5 / theme6 / theme7 / theme8 / theme9 / theme10 / theme11 / theme12
    var frametype = "theme1"; //  preset frame color theme1 / theme2 / theme3 / theme4 / theme5 / theme6
    var layout_type = "light"; //  theme layout dark / light
    var nav_image = "false"; //  navbar image bg false / true
    var active_image = "img1"; //  avtive navbar image layout img1 / img2 / img3 / img4 / img5 / img6
    var layout_width = "wide"; //  theme layout wide / box
    var menu_effect_desktop = "shrink"; //  navbar effect in desktop  shrink / overlay / push
    var menu_effect_tablet = "overlay"; //  navbar effect in tablet  shrink / overlay / push
    var menu_effect_phone = "overlay"; //  navbar effect in phone  shrink / overlay / push

    $("#pcoded").pcodedmenu({
        themelayout: 'vertical',
        verticalMenuplacement: 'left', // value should be left/right
        verticalMenulayout: layout_width, // value should be wide/box
        MenuTrigger: 'click', // click / hover
        SubMenuTrigger: 'click', // click / hover
        activeMenuClass: 'active',
        ThemeBackgroundPattern: bgpattern, // pattern1, pattern2, pattern3, pattern4, pattern5, pattern6
        HeaderBackground: headerbg, // theme1, theme2, theme3, theme4, theme5  header color
        LHeaderBackground: menucaption, // theme1, theme2, theme3, theme4, theme5, theme6   brand color
        NavbarBackground: Navbarbg, // themelight1, theme1  // light  and dark sidebar
        ActiveItemBackground: activeitemtheme, // theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8, theme9, theme10, theme11, theme12  mennu active item color
        SubItemBackground: 'theme2',
        ActiveItemStyle: 'style0',
        ItemBorder: true,
        ItemBorderStyle: 'none',
        NavbarImage: nav_image,
        ActiveNavbarImage: active_image,
        freamtype: frametype,
        SubItemBorder: true,
        DropDownIconStyle: 'style3', // Value should be style1,style2,style3
        menutype: 'st2', // Value should be st1, st2, st3, st4, st5 menu icon style
        layouttype: layout_type, // Value should be light / dark
        FixedNavbarPosition: true, // Value should be true / false  header postion
        FixedHeaderPosition: true, // Value should be true / false  sidebar menu postion
        collapseVerticalLeftHeader: true,
        VerticalSubMenuItemIconStyle: 'style7', // value should be style1, style2, style3, style4, style5, style6
        VerticalNavigationView: 'view1',
        verticalMenueffect: {
            desktop: menu_effect_desktop,
            tablet: menu_effect_tablet,
            phone: menu_effect_phone,
        },
        defaultVerticalMenu: {
            desktop: "expanded", // value should be offcanvas/collapsed/expanded/compact/compact-acc/fullpage/ex-popover/sub-expanded
            tablet: "offcanvas", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
            phone: "offcanvas", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
        },
        onToggleVerticalMenu: {
            desktop: "offcanvas", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
            tablet: "expanded", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
            phone: "expanded", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
        },

    });

    function handlenavimg() {
        $('.theme-color > a.navbg-pattern').on("click", function() {
            var value = $(this).attr("navbg-pattern");
            $('.pcoded').attr('sidebar-img-type', value);
        });
    };
    handlenavimg();
    /* layout type Change function Start */
    function handlelayouttheme() {
        $('.theme-color > a.Layout-type').on("click", function() {
            var layout = $(this).attr("layout-type");
            $('.pcoded').attr("layout-type", layout);
            if (layout == 'dark') {
                $('.pcoded-header').attr("header-theme", "theme6");
                $('.pcoded-navbar').attr("navbar-theme", "theme1");
                $('.pcoded').attr("sidebar-img", "false");
                $('body').addClass('dark');
                $('body').attr("themebg-pattern", "theme6");
                $('.pcoded-navigation-label').attr("menu-title-theme", "theme9");
            }
            if (layout == 'light') {
                $('.pcoded-header').attr("header-theme", "theme1");
                $('.pcoded-navbar').attr("navbar-theme", "themelight1");
                $('.pcoded').attr("sidebar-img", "false");
                $('.pcoded-navigation-label').attr("menu-title-theme", "theme1");
                $('body').removeClass('dark');
                $('body').attr("themebg-pattern", "theme1");
            }
            if (layout == 'img') {
                $('.pcoded-header').attr("header-theme", "theme1");
                $('.pcoded-navbar').attr("navbar-theme", "themelight1");
                $('.pcoded-navbar').attr("navbar-theme", "themelight1");
                $('.pcoded').attr("sidebar-img", "true");
                $('.pcoded').attr("frame-type", "theme1");
                $('.pcoded-navigation-label').attr("menu-title-theme", "theme1");
            }
        });
    };
    handlelayouttheme();

    /* Left header Theme Change function Start */
    function handleleftheadertheme() {
        $('.theme-color > a.leftheader-theme').on("click", function() {
            var lheadertheme = $(this).attr("lheader-theme");
            $('.pcoded-navigation-label').attr("menu-title-theme", lheadertheme);
        });
    };
    handleleftheadertheme();
    /* Left header Theme Change function Close */
    /* header Theme Change function Start */
    function handleheadertheme() {
        $('.theme-color > a.header-theme').on("click", function() {
            var headertheme = $(this).attr("header-theme");
            var activeitem = $(this).attr("active-item-color");
            $('.pcoded-header').attr("header-theme", headertheme);
            $('.pcoded-navbar').attr("active-item-theme", activeitem);
            $('.pcoded').attr("fream-type", headertheme);
            $('.pcoded-navigation-label').attr("menu-title-theme", headertheme);
            $('body').attr("themebg-pattern", headertheme);
        });
    };
    handleheadertheme();
    /* header Theme Change function Close */
    /* Navbar Theme Change function Start */
    function handlenavbartheme() {
        $('.theme-color > a.navbar-theme').on("click", function() {
            var navbartheme = $(this).attr("navbar-theme");
            $('.pcoded-navbar').attr("navbar-theme", navbartheme);
            $('.pcoded').attr("sidebar-img", "false");
            if (navbartheme == 'themelight1') {
                $('.pcoded-navigation-label').attr("menu-title-theme", "theme1");
            }
            if (navbartheme == 'theme1') {
                $('.pcoded-navigation-label').attr("menu-title-theme", "theme9");
            }
        });
    };

    handlenavbartheme();
    /* Navbar Theme Change function Close */
    /* Active Item Theme Change function Start */
    function handleactiveitemtheme() {
        $('.theme-color > a.active-item-theme').on("click", function() {
            var activeitemtheme = $(this).attr("active-item-theme");
            $('.pcoded-navbar').attr("active-item-theme", activeitemtheme);
        });
    };

    handleactiveitemtheme();
    /* Active Item Theme Change function Close */

    /* Theme background pattren Change function Start */
    function handlethemebgpattern() {
        $('.theme-color > a.themebg-pattern').on("click", function() {
            var themebgpattern = $(this).attr("themebg-pattern");
            $('body').attr("themebg-pattern", themebgpattern);
        });
    };

    handlethemebgpattern();
    /* Theme background pattren Change function Close */

    /* Theme Layout Change function start*/
    function handlethemeverticallayout() {
        $('#theme-layout').change(function() {
            if ($(this).is(":checked")) {
                $('.pcoded').attr('vertical-layout', "box");
                $('#bg-pattern-visiblity').removeClass('d-none');

            } else {
                $('.pcoded').attr('vertical-layout', "wide");
                $('#bg-pattern-visiblity').addClass('d-none');
            }
        });
    };
    handlethemeverticallayout();
    /* Theme Layout Change function Close*/
    /* Menu effect change function start*/
    function handleverticalMenueffect() {
        $('#vertical-menu-effect').val('shrink').on('change', function(get_value) {
            get_value = $(this).val();
            $('.pcoded').attr('vertical-effect', get_value);
        });
    };

    handleverticalMenueffect();
    /* Menu effect change function Close*/

    /* Vertical Item border Style change function Start*/
    function handleverticalboderstyle() {
        $('#vertical-border-style').val('solid').on('change', function(get_value) {
            get_value = $(this).val();
            $('.pcoded-navbar .pcoded-item').attr('item-border-style', get_value);
        });
    };

    handleverticalboderstyle();
    /* Vertical Item border Style change function Close*/

    /* Vertical Dropdown Icon change function Start*/
    function handleVerticalDropDownIconStyle() {
        $('#vertical-dropdown-icon').val('style1').on('change', function(get_value) {
            get_value = $(this).val();
            $('.pcoded-navbar .pcoded-hasmenu').attr('dropdown-icon', get_value);
        });
    };

    handleVerticalDropDownIconStyle();
    /* Vertical Dropdown Icon change function Close*/
    /* Vertical SubItem Icon change function Start*/

    function handleVerticalSubMenuItemIconStyle() {
        $('#vertical-subitem-icon').val('style5').on('change', function(get_value) {
            get_value = $(this).val();
            $('.pcoded-navbar .pcoded-hasmenu').attr('subitem-icon', get_value);
        });
    };

    handleVerticalSubMenuItemIconStyle();
    /* Vertical SubItem Icon change function Close*/
    /* Vertical Navbar Position change function Start*/
    function handlesidebarposition() {
        $('#sidebar-position').change(function() {
            if ($(this).is(":checked")) {
                $('.pcoded-navbar').attr("pcoded-navbar-position", 'fixed');
                $('.pcoded-header .pcoded-left-header').attr("pcoded-lheader-position", 'fixed');
            } else {
                $('.pcoded-navbar').attr("pcoded-navbar-position", 'absolute');
                $('.pcoded-header .pcoded-left-header').attr("pcoded-lheader-position", 'relative');
            }
        });
    };

    handlesidebarposition();
    /* Vertical Navbar Position change function Close*/
    /* Vertical Header Position change function Start*/
    function handleheaderposition() {
        $('#header-position').change(function() {
            if ($(this).is(":checked")) {
                $('.pcoded-header').attr("pcoded-header-position", 'fixed');
                $('.pcoded-navbar').attr("pcoded-header-position", 'fixed');
                $('.pcoded-main-container').css('margin-top', $(".pcoded-header").outerHeight());
            } else {
                $('.pcoded-header').attr("pcoded-header-position", 'relative');
                $('.pcoded-navbar').attr("pcoded-header-position", 'relative');
                $('.pcoded-main-container').css('margin-top', '0px');
            }
        });
    };
    handleheaderposition();
    /* Vertical Header Position change function Close*/
    /*  collapseable Left Header Change Function Start here*/
    function handlecollapseLeftHeader() {
        $('#collapse-left-header').change(function() {
            if ($(this).is(":checked")) {
                $('.pcoded-header, .pcoded ').removeClass('iscollapsed');
                $('.pcoded-header, .pcoded').addClass('nocollapsed');
            } else {
                $('.pcoded-header, .pcoded').addClass('iscollapsed');
                $('.pcoded-header, .pcoded').removeClass('nocollapsed');
            }
        });
    };
    handlecollapseLeftHeader();
    /*  collapseable Left Header Change Function Close here*/
});

function handlemenutype(get_value) {
    $('.pcoded').attr('nav-type', get_value);
};

handlemenutype("st2");
