(function(e){function t(t){for(var n,o,s=t[0],l=t[1],c=t[2],d=0,u=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&u.push(i[o][0]),i[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);g&&g(t);while(u.length)u.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],n=!0,o=1;o<a.length;o++){var s=a[o];0!==i[s]&&(n=!1)}n&&(r.splice(t--,1),e=l(l.s=a[0]))}return e}var n={},o={app:0},i={app:0},r=[];function s(e){return l.p+"js/"+({about:"about"}[e]||e)+"."+{about:"66a7c48e","chunk-09e47fc6":"a3232f79","chunk-2d0bd977":"2b77d392","chunk-2d215fa4":"aedb79b3","chunk-2d2183fc":"8546f674","chunk-3799f0b5":"af4dffcb","chunk-3b6a0f79":"e3d969bd","chunk-4eb7363c":"f00a005e","chunk-51cc9a6b":"b542d1c1","chunk-ef75f2a8":"6bf4f7ae"}[e]+".js"}function l(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(e){var t=[],a={"chunk-09e47fc6":1,"chunk-3799f0b5":1,"chunk-3b6a0f79":1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=new Promise((function(t,a){for(var n="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-09e47fc6":"9d21c0d7","chunk-2d0bd977":"31d6cfe0","chunk-2d215fa4":"31d6cfe0","chunk-2d2183fc":"31d6cfe0","chunk-3799f0b5":"4ac1e4af","chunk-3b6a0f79":"572b7a25","chunk-4eb7363c":"31d6cfe0","chunk-51cc9a6b":"31d6cfe0","chunk-ef75f2a8":"31d6cfe0"}[e]+".css",i=l.p+n,r=document.getElementsByTagName("link"),s=0;s<r.length;s++){var c=r[s],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===n||d===i))return t()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){c=u[s],d=c.getAttribute("data-href");if(d===n||d===i)return t()}var g=document.createElement("link");g.rel="stylesheet",g.type="text/css",g.onload=t,g.onerror=function(t){var n=t&&t.target&&t.target.src||i,r=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=n,delete o[e],g.parentNode.removeChild(g),a(r)},g.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(g)})).then((function(){o[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,a){n=i[e]=[t,a]}));t.push(n[2]=r);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=s(e);var u=new Error;c=function(t){d.onerror=d.onload=null,clearTimeout(g);var a=i[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",u.name="ChunkLoadError",u.type=n,u.request=o,a[1](u)}i[e]=void 0}};var g=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(t)},l.m=e,l.c=n,l.d=function(e,t,a){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)l.d(a,n,function(t){return e[t]}.bind(null,n));return a},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var g=d;r.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("8a23"),o=a.n(n);o.a},"1b7c":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-center"},[a("v-bottom-sheet",{attrs:{inset:"","hide-overlay":""},model:{value:e.sheet,callback:function(t){e.sheet=t},expression:"sheet"}},[a("v-sheet",{staticStyle:{height:"fit-content"}},[e.bottomPopupLoadingFlag?a("v-card",{staticClass:"mx-auto",attrs:{outlined:""}},[a("div",{staticClass:"text-center ma-5"},[a("v-progress-circular",{attrs:{size:70,width:7,color:"light-blue",indeterminate:""}})],1)]):a("v-card",{staticClass:"mx-auto",attrs:{outlined:""}},[a("div",{staticClass:"text-right"},[a("v-btn",{staticClass:"ma-2",attrs:{text:"",color:"error"},on:{click:e.closeClicked}},[e._v("close ")])],1),e.activitySelectedFlag?[a("v-btn",{staticClass:"light-blue lighten-4 ml-5",attrs:{icon:""},on:{click:e.backButtonClicked}},[e._v("<")]),a("SelectedActivity",{attrs:{activity:e.selectedActivity}})]:a("v-card-text",[a("v-card-text",{staticClass:"text-center"},[a("b",[e._v("List of Relief Activities in this Location")]),a("p",[e._v("(click on any for details)")])]),a("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[a("tbody",[a("tr",[a("th",[e._v("Acitivities")]),a("th",[e._v("Type of Relief")])]),e._l(e.activities,(function(t,n){return a("tr",{key:n,on:{click:function(t){return e.selectActivity(n)}}},[a("td",[e._v("Activity "+e._s(n))]),a("td",e._l(t.typeOfRelief,(function(t,n){return a("span",{key:n},[e._v(e._s(t)+", ")])})),0)])}))],2)]},proxy:!0}],null,!1,438112766)})],1)],2)],1)],1)],1)},o=[],i=(a("d3b7"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-list-item-title",{staticClass:"text-center"},[e._v("Organization: "+e._s(e.activity.orgName))]),a("v-card-text",[a("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[a("tbody",[a("tr",[a("td",[e._v("Location:")]),a("td",[e._v(e._s(e.formattedAddress))])]),a("tr",[a("td",[e._v("Relief Type:")]),a("td",e._l(e.activity.typeOfRelief,(function(t,n){return a("span",{key:n},[e._v(e._s(t)+", ")])})),0)])])]},proxy:!0}])})],1),e.activity.supplyDate?a("div",{staticClass:"text-center pb-2"},[a("v-btn",{staticClass:"yellow darken-1",attrs:{rounded:"",small:"",light:"",loading:e.seeMoreLoadingFlag},on:{click:e.seeMoreClicked}},[e.seeMoreFlag?[e._v(" See Less ")]:[e._v(" See More ")]],2)],1):e._e(),e.seeMoreFlag?a("v-card",{staticClass:"ma-2"},[a("v-card-text",{staticClass:"title"},[e._v("Supplied: ")]),a("v-card-text",{staticClass:"subtitle-2"},[e._v(" "+e._s(e.date)+" ")]),a("v-card-text",{staticClass:"title"},[e._v("Description: ")]),a("v-card-text",{staticClass:"subtitle-2"},[e._v(" "+e._s(e.activity.contents)+" ")])],1):e._e()],1)}),r=[],s=a("bc3a"),l=a.n(s),c={name:"SelectedActivity",props:["activity"],data:function(){return{seeMoreFlag:!1,seeMoreLoadingFlag:!1,reliefs:[],formattedAddress:null,date:null}},mounted:function(){var e=this;console.log("Activity loaded in SelectedActivity component, ",this.activity);var t=this.activity.location.coordinates[1],a=this.activity.location.coordinates[0];l.a.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+t+","+a+"&key=AIzaSyBdudQyn0ECon1ggxM-i3t4xhbQTVYAgLA").then((function(t){console.log("Received formatted address: ",t.data.results[0].formatted_address),e.formattedAddress=t.data.results[0].formatted_address})).catch((function(e){console.log("error")})).finally((function(){console.log("request finished")}))},methods:{seeMoreClicked:function(){this.seeMoreFlag?this.seeMoreFlag=!1:(this.seeMoreFlag=!1,this.date=new Date(this.activity.supplyDate).toDateString(),this.seeMoreFlag=!0)}}},d=c,u=a("2877"),g=a("6544"),h=a.n(g),p=a("8336"),f=a("b0af"),m=a("99d9"),v=a("5d23"),b=a("1f4f"),k=Object(u["a"])(d,i,r,!1,null,"27dd4c5e",null),y=k.exports;h()(k,{VBtn:p["a"],VCard:f["a"],VCardText:m["b"],VListItemTitle:v["b"],VSimpleTable:b["a"]});var w={name:"BottomPopup",components:{SelectedActivity:y},data:function(){return{sheet:!0,seeMoreFlag:!1,seeMoreLoadingFlag:!1,bottomPopupLoadingFlag:!0,activitySelectedFlag:!1,lat:"null",lng:"null",activities:[],selectedActivity:null,reliefs:[]}},watch:{sheet:function(e,t){var a=this;setTimeout((function(){a.$router.push("/search")}),200)},$route:function(e,t){this.openBottomDrawer(e.params.position)}},mounted:function(){this.openBottomDrawer(this.$route.params.position)},methods:{backButtonClicked:function(){this.activitySelectedFlag=!1},selectActivity:function(e){this.selectedActivity=this.activities[e],console.log("Selected Activity in BottomPopup component",this.selectedActivity),this.activitySelectedFlag=!0},openBottomDrawer:function(e){var t,a=this;this.activitySelectedFlag=!1;try{t=JSON.parse(e)}catch(i){return console.log("Invalid co-ordinates"),void this.$router.push({name:"NotFound"})}var n={filter:this.$store.getters.getFilters,location:{lat:t.lat,lng:t.lng}},o={"x-auth":localStorage.getItem("x-auth")};console.log("params: ",n),o["x-auth"]?console.log("USER IS AUTHORIZED"):console.log("USER IS NOT AUTHORIZED"),this.bottomPopupLoadingFlag=!0,l.a.get("/api/activities",{headers:o,params:n}).then((function(e){console.log("received activities: ",e.data),a.activities=e.data.activities})).catch((function(e){console.log(e.response)})).finally((function(){console.log("finished"),a.bottomPopupLoadingFlag=!1})),this.activities=[{orgName:"Biddhanondo",typeOfRelief:"Food",location:{lat:23.5,lng:90.1}},{orgName:"Badhan",typeOfRelief:"PPE",location:{lat:25,lng:29}},{orgName:"WHO",typeOfRelief:"Sanitizer",location:{lat:30,lng:29}}]},closeClicked:function(){console.log("close clicked"),this.sheet=!this.sheet}}},x=w,S=a("288c"),_=a("490a"),L=a("8dd9"),C=Object(u["a"])(x,n,o,!1,null,"cd897548",null);t["a"]=C.exports;h()(C,{VBottomSheet:S["a"],VBtn:p["a"],VCard:f["a"],VCardText:m["b"],VProgressCircular:_["a"],VSheet:L["a"],VSimpleTable:b["a"]})},"4f45":function(e,t,a){e.exports=a.p+"img/Logo-White.65c77d53.png"},"56d7":function(e,t,a){"use strict";a.r(t),a.d(t,"eventBus",(function(){return ae}));a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"inspire"}},[a("SideDrawer"),a("TopBar"),a("v-content",{staticClass:"backimage",attrs:{app:""}},[a("router-view")],1)],1)},i=[],r=a("a0be"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app-bar",{attrs:{app:"","clipped-left":"",color:"primary",dark:""}},[n("v-img",{staticClass:"mr-2",attrs:{src:a("4f45"),"max-width":"30","max-height":"30"}}),e.isMobile()&&e.$route.path.startsWith("/search")?e._e():n("v-toolbar-title",{staticClass:"align-center"},[n("span",{staticClass:"title"},[e._v("ত্রাণচিত্র")])]),n("v-spacer"),e.$route.path.startsWith("/search")?[n("v-row",{staticClass:"mr-1 ml-2",staticStyle:{"max-width":"650px"},attrs:{align:"center"}},[n("v-text-field",{attrs:{"append-icon-cb":function(){},label:"Search",flat:"","single-line":"","solo-inverted":"","hide-details":""},model:{value:e.searchAddress,callback:function(t){e.searchAddress=t},expression:"searchAddress"}})],1),n("v-btn",{staticClass:"primary darken-2 mr-1 ml-1",attrs:{large:"",dark:"",icon:"",loading:e.searchLoaderFlag},on:{click:e.searchClicked}},[n("v-icon",[e._v("mdi-magnify")])],1)]:e._e(),n("v-app-bar-nav-icon",{on:{click:e.toggleDrawer}})],2)},l=[],c=(a("b0c0"),a("d3b7"),a("ac1f"),a("5319"),a("bc3a")),d=a.n(c),u={name:"TopBar",data:function(){return{searchAddress:null,searchLoaderFlag:!1}},components:{},methods:{isMobile:function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||window.opera),e},toggleDrawer:function(){ae.$emit("toggleDrawer")},searchClicked:function(){var e=this;if("Search"!==this.$route.name&&this.$router.push({name:"Search"}),console.log("Search clicked. Search address: ",this.searchAddress),null!==this.searchAddress){this.searchAddress;this.searchLoaderFlag=!0;var t=this.searchAddress+", Bangladesh",a="AIzaSyBdudQyn0ECon1ggxM-i3t4xhbQTVYAgLA",n="https://maps.googleapis.com/maps/api/geocode/json?address="+t+"&key="+a,o=n.replace(/ /g,"%20");console.log("Send data: ",o),d.a.get(o).then((function(e){console.log("The Full search result is ",e.data.results[0]),console.log(e.data.results[0].geometry.location);var t={focusLocation:e.data.results[0].geometry.location,bounds:e.data.results[0].geometry.bounds};ae.$emit("resetAndShow",t)})).finally((function(){e.searchLoaderFlag=!1}))}else console.log("Search address is null")}}},g=u,h=a("2877"),p=a("6544"),f=a.n(p),m=a("40dc"),v=a("5bc1"),b=a("8336"),k=a("132d"),y=a("adda"),w=a("0fd9"),x=a("2fa4"),S=a("8654"),_=a("2a7f"),L=Object(h["a"])(g,s,l,!1,null,"1de8d11c",null),C=L.exports;f()(L,{VAppBar:m["a"],VAppBarNavIcon:v["a"],VBtn:b["a"],VIcon:k["a"],VImg:y["a"],VRow:w["a"],VSpacer:x["a"],VTextField:S["a"],VToolbarTitle:_["a"]});var A=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-navigation-drawer",{staticClass:"white",attrs:{clipped:e.$vuetify.breakpoint.lgAndUp,app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",[e._l(e.items,(function(t){return[a("v-list-item",{key:t.text,attrs:{link:"",to:t.to}},[a("v-list-item-action",[a("v-icon",[e._v(e._s(t.icon))])],1),a("v-list-item-content",[a("v-list-item-title",[e._v(" "+e._s(t.text)+" ")])],1)],1)]})),e.$store.getters.getLoggedIn?a("v-list-item",{attrs:{to:"/logout"},on:{click:e.signOut}},[a("v-list-item-action",[a("v-icon",[e._v("mdi-logout")])],1),a("v-list-item-content",[a("v-list-item-title",[e._v(" Sign Out ")])],1)],1):a("v-list-item",{attrs:{link:"",to:"/login"}},[a("v-list-item-action",[a("v-icon",[e._v("mdi-login")])],1),a("v-list-item-content",[a("v-list-item-title",[e._v(" Sign In ")])],1)],1)],2)],1)},T=[],O={name:"SideDrawer",data:function(){return{drawer:!1,items:[{icon:"mdi-home",text:"Home",to:"/"},{icon:"mdi-magnify",text:"Search Relief",to:"/search"},{icon:"mdi-plus",text:"Add Relief",to:"/add"},{icon:"mdi-contacts",text:"Organizations",to:"/orgs"},{icon:"mdi-pencil",text:"Register",to:"/reg"},{icon:"mdi-information",text:"About us",to:"/about"},{icon:"mdi-help-circle",text:"How to use this site",to:"/howto"}]}},mounted:function(){var e=this;localStorage.getItem("x-auth")?this.$store.commit("login"):(console.log("Token not found"),this.$store.commit("logout")),ae.$on("toggleDrawer",(function(){e.drawer=!e.drawer}))},methods:{signOut:function(){console.log("Sign Out"),localStorage.removeItem("x-auth"),this.$store.commit("logout")}}},F=O,z=a("8860"),V=a("da13"),R=a("1800"),I=a("5d23"),M=a("f774"),B=Object(h["a"])(F,A,T,!1,null,"39f7367c",null),E=B.exports;f()(B,{VIcon:k["a"],VList:z["a"],VListItem:V["a"],VListItemAction:R["a"],VListItemContent:I["a"],VListItemTitle:I["b"],VNavigationDrawer:M["a"]});var D={props:{source:String},components:{Map:r["a"],SideDrawer:E,TopBar:C},data:function(){return{}},mounted:function(){},methods:{}},$=D,N=(a("034f"),a("7496")),j=a("a75b"),P=Object(h["a"])($,o,i,!1,null,null,null),U=P.exports;f()(P,{VApp:N["a"],VContent:j["a"]});var Z=a("f309"),H=a("fcf4");n["a"].use(Z["a"]);var q=new Z["a"]({theme:{themes:{light:{primary:H["a"].green.darken3,secondary:H["a"].lightGreen.lighten2,accent:H["a"].yellow,error:"#b71c1c"}}}}),Y=a("8c4f"),Q=a("1b7c");n["a"].use(Y["a"]);var K=[{path:"/",name:"Home",component:function(){return a.e("chunk-4eb7363c").then(a.bind(null,"bb51"))}},{path:"/search",name:"Search",component:function(){return a.e("chunk-2d0bd977").then(a.bind(null,"2d3b"))},children:[{path:"details/:position",name:"Details",component:Q["a"]}]},{path:"/add",name:"Add",component:function(){return a.e("chunk-3799f0b5").then(a.bind(null,"7e55"))}},{path:"/orgs",name:"Organizations",component:function(){return a.e("chunk-3b6a0f79").then(a.bind(null,"47a2"))}},{path:"/login",name:"LogIn",component:function(){return a.e("chunk-ef75f2a8").then(a.bind(null,"a55b"))}},{path:"/reg",name:"Register",component:function(){return a.e("chunk-09e47fc6").then(a.bind(null,"73cf"))}},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))}},{path:"/howto",name:"HowTo",component:function(){return a.e("chunk-51cc9a6b").then(a.bind(null,"5515"))}},{path:"*",name:"NotFound",props:{text:"Page Not found"},component:function(){return a.e("chunk-2d2183fc").then(a.bind(null,"c9d4"))}},{path:"/logout",name:"LogOut",component:function(){return a.e("chunk-2d215fa4").then(a.bind(null,"c100"))}},{path:"/notice",name:"Notice",props:!0,component:function(){return a.e("chunk-2d2183fc").then(a.bind(null,"c9d4"))}}],G=new Y["a"]({mode:"history",base:"/",routes:K}),J=G,W=a("2f62");n["a"].use(W["a"]);var X=new W["a"].Store({state:{dragZoomNotifier:!0,token:null,loggedIn:!1,filters:{typeOfRelief:[],schedule:null,orgName:null},organizations:[],newReliefLocation:null},mutations:{stopDragZoomNotifier:function(e){e.dragZoomNotifier=!1},setToken:function(e,t){e.token=t},setFilters:function(e,t){e.filters=t},setOrganizations:function(e,t){e.organizations=t},setNewReliefLocation:function(e,t){e.newReliefLocation=t},logout:function(e){e.loggedIn=!1},login:function(e){e.loggedIn=!0}},actions:{},modules:{},getters:{getLoggedIn:function(e){return e.loggedIn},getDragZoomNotifier:function(e){return e.dragZoomNotifier},getToken:function(e){return e.token},getFilters:function(e){return e.filters},getOrganizations:function(e){return e.organizations},getNewReliefLocation:function(e){return e.newReliefLocation}}}),ee=a("1dce"),te=a.n(ee);n["a"].use(te.a),d.a.defaults.baseURL="https://protean-smile-275412.el.r.appspot.com",n["a"].config.productionTip=!1;var ae=new n["a"];new n["a"]({vuetify:q,router:J,store:X,render:function(e){return e(U)}}).$mount("#app")},"8a23":function(e,t,a){},a0be:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{ref:"googleMap",staticClass:"google-map",attrs:{id:"map"}}),Boolean(this.google)&&Boolean(this.map)?[e._t("default",null,{google:e.google,map:e.map})]:e._e(),a("v-btn",{staticStyle:{top:"70vh",right:"5vw"},attrs:{absolute:"",dark:"",fab:"",top:"",right:"",color:"light-blue"}},[a("v-icon",{on:{click:function(t){return e.addButtonClicked()}}},[e._v("mdi-plus")])],1),a("v-btn",{staticStyle:{top:"80vh",right:"5vw"},attrs:{absolute:"",dark:"",fab:"",top:"",right:"",color:"light-blue",loading:e.reloadLoaderFlag}},[a("v-icon",{on:{click:function(t){return e.refreshClicked()}}},[e._v("mdi-reload")])],1),a("RightFilter")],2)},o=[],i=(a("4160"),a("d81d"),a("d3b7"),a("159b"),a("96cf"),a("1da1")),r=a("f464"),s=a.n(r),l=a("56d7"),c=a("bc3a"),d=a.n(c),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticStyle:{position:"fixed",top:"20vh",right:"0px"},attrs:{"max-width":"400"}},[e.enabled?[a("v-card-title",[a("v-btn",{attrs:{icon:""},on:{click:function(t){e.enabled=!1}}},[a("v-icon",[e._v("mdi-chevron-right")])],1),e._v(" Filter Search ")],1),a("v-divider"),a("v-container",[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:4}},[a("p",[e._v("Type of Relief:")]),a("v-checkbox",{attrs:{"hide-details":"",dense:"",label:"Food",value:"FOOD"},model:{value:e.selectedTypes,callback:function(t){e.selectedTypes=t},expression:"selectedTypes"}}),a("v-checkbox",{attrs:{"hide-details":"",dense:"",label:"PPE",value:"PPE"},model:{value:e.selectedTypes,callback:function(t){e.selectedTypes=t},expression:"selectedTypes"}}),a("v-checkbox",{attrs:{"hide-details":"",dense:"",label:"Sanitizer",value:"SANITIZER"},model:{value:e.selectedTypes,callback:function(t){e.selectedTypes=t},expression:"selectedTypes"}}),a("v-checkbox",{attrs:{"hide-details":"",dense:"",label:"Mask",value:"MASK"},model:{value:e.selectedTypes,callback:function(t){e.selectedTypes=t},expression:"selectedTypes"}}),a("v-checkbox",{attrs:{"hide-details":"",dense:"",label:"Glove",value:"GLOVE"},model:{value:e.selectedTypes,callback:function(t){e.selectedTypes=t},expression:"selectedTypes"}})],1),a("v-col",{attrs:{cols:8}},[a("p",[e._v("Filter by Organization:")]),a("v-autocomplete",{staticClass:"mb-3",attrs:{items:e.organizations,"search-input":e.select,loading:e.organizationLoaderFlag,disabled:e.organizationLoaderFlag,"cache-items":"",flat:"","hide-no-data":"","hide-details":"",label:e.organizationLoaderFlag?"Loading Names of organizations...":"Type name of organization:"},on:{"update:searchInput":function(t){e.select=t},"update:search-input":function(t){e.select=t}},model:{value:e.selectedOrganization,callback:function(t){e.selectedOrganization=t},expression:"selectedOrganization"}}),a("p",[e._v("Schedule:")]),e.$store.getters.getLoggedIn?[a("v-radio-group",{model:{value:e.schedule,callback:function(t){e.schedule=t},expression:"schedule"}},[a("v-radio",{attrs:{label:"Past Delivery",value:"PAST"}}),a("v-radio",{attrs:{label:"Scheduled Delivery",value:"FUTURE"}})],1)]:e._e()],2)],1)],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"primary",text:""},on:{click:function(t){return e.resetFilter()}}},[e._v("Reset Filter")]),a("v-btn",{attrs:{color:"primary",text:""},on:{click:e.filterSearch}},[e._v("Search")])],1)]:a("v-btn",{attrs:{icon:""},on:{click:function(t){e.enabled=!0}}},[a("v-icon",[e._v("mdi-chevron-left")])],1)],2)},g=[],h={name:"RightFilter",data:function(){return{enabled:!1,menu:!1,selectedTypes:[],selectedOrganization:null,select:null,schedule:null,organizations:[],filterSearchLoadingFlag:!1,organizationLoaderFlag:!1}},created:function(){var e=this;if(this.organizations=this.$store.getters.getOrganizations,0===this.organizations.length){var t={},a={"x-auth":localStorage.getItem("x-auth")};a["x-auth"]?console.log("USER IS AUTHORIZED"):console.log("USER IS NOT AUTHORIZED"),this.organizationLoaderFlag=!0,d.a.get("/api/orgs",{headers:a,params:t}).then((function(t){console.log("received organization names: ",t),e.$store.commit("setOrganizations",t.data.orgNames),e.organizations=e.$store.getters.getOrganizations})).catch((function(e){console.log("error")})).finally((function(){console.log("Organizations loaded finished"),e.organizationLoaderFlag=!1}))}},methods:{resetFilter:function(){this.selectedTypes=[],this.selectedOrganization=null,this.schedule=null,this.commitFiltersToStore()},commitFiltersToStore:function(){var e={typeOfRelief:this.selectedTypes,schedule:this.schedule,orgName:this.selectedOrganization};this.$store.commit("setFilters",e)},filterSearch:function(){this.commitFiltersToStore(),this.enabled=!1,l["eventBus"].$emit("reloadMap")}}},p=h,f=a("2877"),m=a("6544"),v=a.n(m),b=a("c6a6"),k=a("8336"),y=a("b0af"),w=a("99d9"),x=a("ac7c"),S=a("62ad"),_=a("a523"),L=a("ce7e"),C=a("132d"),A=a("67b6"),T=a("43a6"),O=a("0fd9"),F=a("2fa4"),z=Object(f["a"])(p,u,g,!1,null,"050f463e",null),V=z.exports;v()(z,{VAutocomplete:b["a"],VBtn:k["a"],VCard:y["a"],VCardActions:w["a"],VCardTitle:w["c"],VCheckbox:x["a"],VCol:S["a"],VContainer:_["a"],VDivider:L["a"],VIcon:C["a"],VRadio:A["a"],VRadioGroup:T["a"],VRow:O["a"],VSpacer:F["a"]});var R={components:{RightFilter:V},data:function(){return{reloadLoaderFlag:!1,sheet:!1,snackbar:!0,snackbarText:"Please press reload to show pins",google:null,map:null,markers:[],mapConfig:{center:{lat:23.685,lng:90.3563},zoom:9,options:{gestureHandling:"greedy"},disableDefaultUI:!0},currentPosition:null,apiKey:"AIzaSyBdudQyn0ECon1ggxM-i3t4xhbQTVYAgLA"}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s()({apiKey:e.apiKey});case 2:a=t.sent,e.google=a,e.initializeMap(),l["eventBus"].$on("resetAndShow",(function(t){e.mapListener(t)})),l["eventBus"].$on("reloadMap",(function(){e.refreshClicked()}));case 7:case"end":return t.stop()}}),t)})))()},methods:{addButtonClicked:function(){var e=this.map.getBounds(),t={focusLocation:{lat:this.map.getCenter().lat(),lng:this.map.getCenter().lng()},northeast:{lat:e.Ya.j,lng:e.Ua.j},southwest:{lat:e.Ya.i,lng:e.Ua.i}};this.$store.commit("setNewReliefLocation",t),this.$router.push({name:"Add"})},stopDragZoomNotifier:function(){this.$store.commit("stopDragZoomNotifier"),this.snackbar=!1,localStorage.setItem("stopDragZoomNotifier","false")},refreshClicked:function(){var e=this,t=this.map.getBounds(),a={bounds:{northeast:{lat:t.Ya.j,lng:t.Ua.j},southwest:{lat:t.Ya.i,lng:t.Ua.i}},filter:this.$store.getters.getFilters},n={"x-auth":localStorage.getItem("x-auth")};console.log("params: ",a),n["x-auth"]?console.log("USER IS AUTHORIZED"):console.log("USER IS NOT AUTHORIZED"),this.reloadLoaderFlag=!0,d.a.get("/api/pins",{headers:n,params:a}).then((function(t){var a={locations:t.data.locations};console.log(a),e.putMarkersOnBound(a)})).catch((function(e){console.log("error"),console.log(e.response)})).finally((function(){console.log("finished"),e.reloadLoaderFlag=!1}))},putMarkersOnBound:function(e){console.log("array of markers: ",e.locations),this.clearAllMarkers(),this.addNewMarkers(e.locations)},mapListener:function(e){if(console.log("focusPosition: ",e.focusLocation),this.map.setCenter(e.focusLocation),void 0!=e.bounds){var t=new this.google.maps.LatLng(e.bounds.northeast.lat,e.bounds.northeast.lng),a=new this.google.maps.LatLng(e.bounds.southwest.lat,e.bounds.southwest.lng),n=new this.google.maps.LatLngBounds;n.extend(t),n.extend(a),this.map.fitBounds(n)}else this.map.setZoom(17);this.refreshClicked()},clearAllMarkers:function(){this.markers.forEach((function(e){e.setMap(null)})),this.markers=[]},addNewMarkers:function(e){var t=this;e.forEach((function(e){var a=new t.google.maps.Marker({position:{lat:e.lat,lng:e.lng},map:t.map,animation:t.google.maps.Animation.DROP});t.markers.push(a),a.addListener("click",t.seeMarkerDetails),console.log(e)}))},seeMarkerDetails:function(e){console.log(e.latLng.lat(),e.latLng.lng());var t={lat:e.latLng.lat(),lng:e.latLng.lng()};this.map.setCenter(t);var a="/search/details/"+JSON.stringify(t);this.$route.path!==a&&this.$router.push(a)},mapClicked:function(e){var t={lat:e.latLng.lat(),lng:e.latLng.lng()};console.log(t)},mapDragEnded:function(){this.snackbar=!0},mapZoomChanged:function(){this.snackbar=!0},initializeMap:function(){var e=this.$refs.googleMap;this.map=new this.google.maps.Map(e,this.mapConfig),this.map.addListener("dragend",this.mapDragEnded),this.map.addListener("zoom_changed",this.mapZoomChanged)}}},I=R,M=(a("bbda"),Object(f["a"])(I,n,o,!1,null,"7fd94fb6",null));t["a"]=M.exports;v()(M,{VBtn:k["a"],VIcon:C["a"]})},bbda:function(e,t,a){"use strict";var n=a("de4c"),o=a.n(n);o.a},de4c:function(e,t,a){}});
//# sourceMappingURL=app.917a3dfe.js.map