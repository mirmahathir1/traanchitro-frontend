(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b6a0f79"],{"210b":function(e,t,n){},"47a2":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-card",{staticClass:"mx-auto white text-center",attrs:{"max-width":"344",outlined:"",elevation:12}},[n("v-list-item",{attrs:{"three-line":""}},[n("v-list-item-content",[n("v-list-item-title",{staticClass:"headline mb-1"},[e._v("Organizations")]),n("v-divider"),n("v-autocomplete",{attrs:{loading:e.organizationLoaderFlag,items:e.organizations,"search-input":e.select,"cache-items":"",disabled:e.organizationLoaderFlag,flat:"","hide-no-data":"","hide-details":"",label:e.organizationLoaderFlag?"Loading Names of organizations...":"Type name of organization:"},on:{"update:searchInput":function(t){e.select=t},"update:search-input":function(t){e.select=t}},model:{value:e.selectedOrganization,callback:function(t){e.selectedOrganization=t},expression:"selectedOrganization"}}),n("v-btn",{staticClass:"primary mx-auto mt-3",attrs:{text:"",dark:"",rounded:"",loading:e.searchLoaderFlag,disabled:e.organizationLoaderFlag},on:{click:e.searchClicked}},[e._v("Search ")])],1)],1)],1),e.detailsLoadedFlag?n("v-card",{staticClass:"mx-auto white pa-4 mt-5",staticStyle:{width:"90vw"},attrs:{outlined:"",elevation:2}},[n("v-list-item",{staticClass:"text-center",attrs:{"three-line":""}},[n("v-list-item-content",[n("v-list-item-title",{staticClass:"headline mb-1"},[e._v(e._s(e.organization.orgName))])],1)],1),n("v-card-text",[e._v(" "+e._s(e.organization.description)+" ")]),n("v-card-actions",[n("v-btn",{staticClass:"blue-grey",attrs:{dark:""}},[e._v("Donate")]),n("v-btn",{staticClass:"blue-grey",attrs:{dark:""}},[e._v("Website")]),n("v-btn",{staticClass:"blue-grey",attrs:{dark:""}},[e._v("Facebook")])],1),n("v-card-text",[e._v(" Phone: "+e._s(e.organization.contact.phone)+" ")]),n("v-card-text",[e._v(" Email: "+e._s(e.organization.contact.email)+" ")]),n("v-card-text",[e._v(" Website: "+e._s(e.organization.contact.website)+" ")]),n("v-card-text",[e._v(" Facebook: "+e._s(e.organization.contact.facebook)+" ")]),e.$store.getters.getLoggedIn?[n("v-card-title",[e._v("Relief Records:")]),n("v-expansion-panels",{attrs:{accordion:!1,popout:!0,inset:!1,multiple:!1,focusable:!0,disabled:!1,readonly:!1,flat:!1,hover:!1,tile:!1}},e._l(e.activities,(function(t,a){return n("v-expansion-panel",{key:a},[n("v-expansion-panel-header",[n("p",[e._v("Relief Type: "),e._l(t.typeOfRelief,(function(t,a){return n("span",{key:a},[e._v(e._s(t)+" ")])}))],2)]),n("v-expansion-panel-content",{staticClass:"pt-3"},[n("p",[n("b",[e._v("Supply Date:")])]),n("p",[e._v(" "+e._s(new Date(t.supplyDate).toDateString()))]),n("p",[n("b",[e._v("Contents:")])]),n("p",[e._v(e._s(t.contents))])])],1)})),1)]:e._e()],2):e._e()],1)},i=[],s=(n("d3b7"),n("bc3a")),o=n.n(s),l={name:"Organization",data:function(){return{detailsLoadedFlag:!1,searchLoaderFlag:!1,organizationLoaderFlag:!1,organizations:[],selectedOrganization:null,select:"",reliefs:[],organization:null,activities:[]}},components:{},created:function(){var e=this;if(this.organizations=this.$store.getters.getOrganizations,0===this.organizations.length){var t={},n={"x-auth":localStorage.getItem("x-auth")};console.log("PARAMS: ",t),n["x-auth"]?console.log("USER IS AUTHORIZED"):console.log("USER IS NOT AUTHORIZED"),this.organizationLoaderFlag=!0,o.a.get("/api/orgs",{headers:n,params:t}).then((function(t){console.log("RESPONSE: ",t),e.$store.commit("setOrganizations",t.data.orgNames),e.organizations=e.$store.getters.getOrganizations})).catch((function(e){console.log("ERROR: ",e.response)})).finally((function(){console.log("FINISH"),e.organizationLoaderFlag=!1}))}},methods:{searchClicked:function(){var e=this;console.log("selected organization: ",this.selectedOrganization),this.searchLoaderFlag=!0,this.detailsLoadedFlag=!1;var t={orgName:this.selectedOrganization},n={"x-auth":localStorage.getItem("x-auth")};console.log("PARAMS: ",t),n["x-auth"]?console.log("USER IS AUTHORIZED"):console.log("USER IS NOT AUTHORIZED"),o.a.get("/api/orgdetails",{headers:n,params:t}).then((function(t){console.log("RESPONSE: ",t),e.organization=t.data.organization,e.activities=t.data.activities})).catch((function(e){console.log("ERROR: ",e.response)})).finally((function(){console.log("FINISH"),e.searchLoaderFlag=!1,e.detailsLoadedFlag=!0}))}}},r=l,c=n("2877"),d=n("6544"),p=n.n(d),h=n("c6a6"),u=n("8336"),v=n("b0af"),g=n("99d9"),x=n("ce7e"),f=n("5530"),b=n("4e82"),m=n("3206"),O=n("80d2"),_=n("58df"),z=Object(_["a"])(Object(b["a"])("expansionPanels","v-expansion-panel","v-expansion-panels"),Object(m["b"])("expansionPanel",!0)).extend({name:"v-expansion-panel",props:{disabled:Boolean,readonly:Boolean},data:function(){return{content:null,header:null,nextIsActive:!1}},computed:{classes:function(){return Object(f["a"])({"v-expansion-panel--active":this.isActive,"v-expansion-panel--next-active":this.nextIsActive,"v-expansion-panel--disabled":this.isDisabled},this.groupClasses)},isDisabled:function(){return this.expansionPanels.disabled||this.disabled},isReadonly:function(){return this.expansionPanels.readonly||this.readonly}},methods:{registerContent:function(e){this.content=e},unregisterContent:function(){this.content=null},registerHeader:function(e){this.header=e,e.$on("click",this.onClick)},unregisterHeader:function(){this.header=null},onClick:function(e){e.detail&&this.header.$el.blur(),this.$emit("click",e),this.isReadonly||this.isDisabled||this.toggle()},toggle:function(){var e=this;this.content&&(this.content.isBooted=!0),this.$nextTick((function(){return e.$emit("change")}))}},render:function(e){return e("div",{staticClass:"v-expansion-panel",class:this.classes,attrs:{"aria-expanded":String(this.isActive)}},Object(O["n"])(this))}}),C=n("0789"),y=n("9d65"),I=n("a9ad"),R=Object(_["a"])(y["a"],I["a"],Object(m["a"])("expansionPanel","v-expansion-panel-content","v-expansion-panel")),k=R.extend().extend({name:"v-expansion-panel-content",computed:{isActive:function(){return this.expansionPanel.isActive}},created:function(){this.expansionPanel.registerContent(this)},beforeDestroy:function(){this.expansionPanel.unregisterContent()},render:function(e){var t=this;return e(C["a"],this.showLazyContent((function(){return[e("div",t.setBackgroundColor(t.color,{staticClass:"v-expansion-panel-content",directives:[{name:"show",value:t.isActive}]}),[e("div",{class:"v-expansion-panel-content__wrap"},Object(O["n"])(t))])]})))}}),A=n("9d26"),P=n("5607"),w=Object(_["a"])(I["a"],Object(m["a"])("expansionPanel","v-expansion-panel-header","v-expansion-panel")),S=w.extend().extend({name:"v-expansion-panel-header",directives:{ripple:P["a"]},props:{disableIconRotate:Boolean,expandIcon:{type:String,default:"$expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{hasMousedown:!1}},computed:{classes:function(){return{"v-expansion-panel-header--active":this.isActive,"v-expansion-panel-header--mousedown":this.hasMousedown}},isActive:function(){return this.expansionPanel.isActive},isDisabled:function(){return this.expansionPanel.isDisabled},isReadonly:function(){return this.expansionPanel.isReadonly}},created:function(){this.expansionPanel.registerHeader(this)},beforeDestroy:function(){this.expansionPanel.unregisterHeader()},methods:{onClick:function(e){this.$emit("click",e)},genIcon:function(){var e=Object(O["n"])(this,"actions")||[this.$createElement(A["a"],this.expandIcon)];return this.$createElement(C["c"],[this.$createElement("div",{staticClass:"v-expansion-panel-header__icon",class:{"v-expansion-panel-header__icon--disable-rotate":this.disableIconRotate},directives:[{name:"show",value:!this.isDisabled}]},e)])}},render:function(e){var t=this;return e("button",this.setBackgroundColor(this.color,{staticClass:"v-expansion-panel-header",class:this.classes,attrs:{tabindex:this.isDisabled?-1:null,type:"button"},directives:[{name:"ripple",value:this.ripple}],on:Object(f["a"])({},this.$listeners,{click:this.onClick,mousedown:function(){return t.hasMousedown=!0},mouseup:function(){return t.hasMousedown=!1}})}),[Object(O["n"])(this,"default",{open:this.isActive},!0),this.hideActions||this.genIcon()])}}),E=(n("0481"),n("4069"),n("210b"),n("604c")),L=n("d9bd"),D=E["a"].extend({name:"v-expansion-panels",provide:function(){return{expansionPanels:this}},props:{accordion:Boolean,disabled:Boolean,flat:Boolean,hover:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,readonly:Boolean,tile:Boolean},computed:{classes:function(){return Object(f["a"])({},E["a"].options.computed.classes.call(this),{"v-expansion-panels":!0,"v-expansion-panels--accordion":this.accordion,"v-expansion-panels--flat":this.flat,"v-expansion-panels--hover":this.hover,"v-expansion-panels--focusable":this.focusable,"v-expansion-panels--inset":this.inset,"v-expansion-panels--popout":this.popout,"v-expansion-panels--tile":this.tile})}},created:function(){this.$attrs.hasOwnProperty("expand")&&Object(L["a"])("expand","multiple",this),Array.isArray(this.value)&&this.value.length>0&&"boolean"===typeof this.value[0]&&Object(L["a"])(':value="[true, false, true]"',':value="[0, 2]"',this)},methods:{updateItem:function(e,t){var n=this.getValue(e,t),a=this.getValue(e,t+1);e.isActive=this.toggleMethod(n),e.nextIsActive=this.toggleMethod(a)}}}),F=n("da13"),j=n("5d23"),B=Object(c["a"])(r,a,i,!1,null,"7f92e777",null);t["default"]=B.exports;p()(B,{VAutocomplete:h["a"],VBtn:u["a"],VCard:v["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VDivider:x["a"],VExpansionPanel:z,VExpansionPanelContent:k,VExpansionPanelHeader:S,VExpansionPanels:D,VListItem:F["a"],VListItemContent:j["a"],VListItemTitle:j["b"]})}}]);
//# sourceMappingURL=chunk-3b6a0f79.cb2be474.js.map