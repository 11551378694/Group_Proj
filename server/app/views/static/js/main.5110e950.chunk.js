(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{102:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),c=n(44),r=n.n(c),i=n(6),o=n(2),l=n(3),j=n(9),d=n(5),u=n(4),h=n(7),b=(n(51),n(52),n(15)),m=n.n(b),O="http://localhost:8080/api/auth/",p=new(function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,[{key:"login",value:function(e,t){return m.a.post(O+"signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))}},{key:"logout",value:function(){localStorage.removeItem("user")}},{key:"register",value:function(e,t){return m.a.post(O+"signup",{username:e,password:t})}},{key:"getCurrentUser",value:function(){return JSON.parse(localStorage.getItem("user"))}}]),e}()),x=n(21),g=n.n(x),v=n(17),f=n.n(v),k=n(22),y=n.n(k),N=n(0),C=function(e){if(!e)return Object(N.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},w=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleLogin=a.handleLogin.bind(Object(j.a)(a)),a.onChangeUsername=a.onChangeUsername.bind(Object(j.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(j.a)(a)),a.state={username:"",password:"",loading:!1,message:""},a}return Object(l.a)(n,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleLogin",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",loading:!0}),this.form.validateAll(),0===this.checkBtn.context._errors.length?p.login(this.state.username,this.state.password).then((function(){t.props.history.push("/profile"),window.location.reload()}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({loading:!1,message:n})})):this.setState({loading:!1})}},{key:"render",value:function(){var e=this;return Object(N.jsx)("div",{className:"col-md-12",children:Object(N.jsxs)("div",{className:"card card-container",children:[Object(N.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(N.jsxs)(g.a,{onSubmit:this.handleLogin,ref:function(t){e.form=t},children:[Object(N.jsxs)("div",{className:"form-group",children:[Object(N.jsx)("label",{htmlFor:"username",children:"Username"}),Object(N.jsx)(f.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[C]})]}),Object(N.jsxs)("div",{className:"form-group",children:[Object(N.jsx)("label",{htmlFor:"password",children:"Password"}),Object(N.jsx)(f.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[C]})]}),Object(N.jsx)("div",{className:"form-group",children:Object(N.jsxs)("button",{className:"btn btn-primary btn-block",disabled:this.state.loading,children:[this.state.loading&&Object(N.jsx)("span",{className:"spinner-border spinner-border-sm"}),Object(N.jsx)("span",{children:"Login"})]})}),this.state.message&&Object(N.jsx)("div",{className:"form-group",children:Object(N.jsx)("div",{className:"alert alert-danger",role:"alert",children:this.state.message})}),Object(N.jsx)(y.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})]})})}}]),n}(a.Component),S=function(e){if(!e)return Object(N.jsx)("div",{className:"alert alert-danger",role:"alert",children:"This field is required!"})},I=function(e){if(e.length<3||e.length>20)return Object(N.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The username must be between 3 and 20 characters."})},U=function(e){if(e.length<6||e.length>40)return Object(N.jsx)("div",{className:"alert alert-danger",role:"alert",children:"The password must be between 6 and 40 characters."})},D=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).handleRegister=a.handleRegister.bind(Object(j.a)(a)),a.onChangeUsername=a.onChangeUsername.bind(Object(j.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(j.a)(a)),a.state={username:"",password:"",successful:!1,message:""},a}return Object(l.a)(n,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"handleRegister",value:function(e){var t=this;e.preventDefault(),this.setState({message:"",successful:!1}),this.form.validateAll(),0===this.checkBtn.context._errors.length&&p.register(this.state.username,this.state.password).then((function(e){t.setState({message:e.data.message,successful:!0})}),(function(e){var n=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();t.setState({successful:!1,message:n})}))}},{key:"render",value:function(){var e=this;return Object(N.jsx)("div",{className:"col-md-12",children:Object(N.jsxs)("div",{className:"card card-container",children:[Object(N.jsx)("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),Object(N.jsxs)(g.a,{onSubmit:this.handleRegister,ref:function(t){e.form=t},children:[!this.state.successful&&Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{className:"form-group",children:[Object(N.jsx)("label",{htmlFor:"username",children:"Username"}),Object(N.jsx)(f.a,{type:"text",className:"form-control",name:"username",value:this.state.username,onChange:this.onChangeUsername,validations:[S,I]})]}),Object(N.jsxs)("div",{className:"form-group",children:[Object(N.jsx)("label",{htmlFor:"password",children:"Password"}),Object(N.jsx)(f.a,{type:"password",className:"form-control",name:"password",value:this.state.password,onChange:this.onChangePassword,validations:[S,U]})]}),Object(N.jsx)("div",{className:"form-group",children:Object(N.jsx)("button",{className:"btn btn-primary btn-block",children:"Sign Up"})})]}),this.state.message&&Object(N.jsx)("div",{className:"form-group",children:Object(N.jsx)("div",{className:this.state.successful?"alert alert-success":"alert alert-danger",role:"alert",children:this.state.message})}),Object(N.jsx)(y.a,{style:{display:"none"},ref:function(t){e.checkBtn=t}})]})]})})}}]),n}(a.Component);function P(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}var T="http://localhost:8080/api/test/",B=new(function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,[{key:"getPublicContent",value:function(){return m.a.get(T+"all")}},{key:"getUserBoard",value:function(){return m.a.get(T+"user",{headers:P()})}},{key:"getAdminBoard",value:function(){return m.a.get(T+"admin",{headers:P()})}}]),e}()),R=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={content:""},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;B.getPublicContent().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("header",{className:"jumbotron",children:[Object(N.jsx)("h3",{children:this.state.content}),Object(N.jsx)("h4",{children:"Journey time indicators"})]})})}}]),n}(a.Component),J=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={currentUser:p.getCurrentUser()},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state.currentUser;return Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)("header",{className:"jumbotron",children:Object(N.jsxs)("h3",{children:[Object(N.jsx)("strong",{children:e.username})," Profile"]})}),Object(N.jsxs)("p",{children:[Object(N.jsx)("strong",{children:"Token:"})," ",e.accessToken.substring(0,20)," ..."," ",e.accessToken.substr(e.accessToken.length-20)]}),Object(N.jsxs)("p",{children:[Object(N.jsx)("strong",{children:"Id:"})," ",e.id]}),Object(N.jsx)("strong",{children:"Authorities:"}),Object(N.jsx)("ul",{children:e.roles&&e.roles.map((function(e,t){return Object(N.jsx)("li",{children:e},t)}))})]})}}]),n}(a.Component),L=n(45);n.n(L).a.accessToken="pk.eyJ1IjoibGV1bmczMDEiLCJhIjoiY2tvNnl2dHppMHJxbDJxcXdteTRvNnU3ZyJ9.HVslWQ3-PqqIw-ReK2hUsQ";var A=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={places:[],sortkey:"locationId",order:"1",lng:114.172101664,lat:22.279311622,location:"JTI at Gloucester Road eastbound near the Revenue Tower"},a.handleOrderChange=a.handleOrderChange.bind(Object(j.a)(a)),a.handleFieldChange=a.handleFieldChange.bind(Object(j.a)(a)),a.handleClick=a.handleClick.bind(Object(j.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+this.state.sortkey+"/"+this.state.order).then((function(e){return e.json()})).then((function(t){e.setState({places:t})}))}},{key:"handleSubmit",value:function(e){e.preventDefault()}},{key:"handleFieldChange",value:function(e){var t=this;this.setState({sortkey:e.target.value}),fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+e.target.value+"/"+this.state.order).then((function(e){return e.json()})).then((function(e){t.setState({places:e})}))}},{key:"handleOrderChange",value:function(e){var t=this;this.setState({order:e.target.value}),fetch("http://csci2720-g74.cse.cuhk.edu.hk/getplaces/"+this.state.sortkey+"/"+e.target.value).then((function(e){return e.json()})).then((function(e){t.setState({places:e})}))}},{key:"handleClick",value:function(e,t,n){console.log(n),this.setState({lng:e,lat:t,location:n})}},{key:"render",value:function(){var e=this;return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsx)("p",{children:"This is a table"}),Object(N.jsxs)("label",{children:["Sort the places according to:",Object(N.jsxs)("select",{value:this.state.sortkey,onChange:this.handleFieldChange,children:[Object(N.jsx)("option",{value:"locationId",children:"Location ID"}),Object(N.jsx)("option",{value:"name",children:"Name"}),Object(N.jsx)("option",{value:"latitude",children:"Latitude"}),Object(N.jsx)("option",{value:"longitude",children:"Longitude"})]})]}),Object(N.jsxs)("label",{children:["in",Object(N.jsxs)("select",{value:this.state.order,onChange:this.handleOrderChange,children:[Object(N.jsx)("option",{value:"1",children:"ascending"}),Object(N.jsx)("option",{value:"-1",children:"descending"})]}),"order"]}),Object(N.jsxs)("table",{children:[Object(N.jsxs)("tr",{children:[Object(N.jsx)("th",{children:"sort"}),Object(N.jsx)("th",{children:"locationID"}),Object(N.jsx)("th",{children:"name"}),Object(N.jsx)("th",{children:"latitude"}),Object(N.jsx)("th",{children:"longitude"})]}),this.state.places.map((function(t,n){return Object(N.jsxs)("tr",{children:[Object(N.jsx)("th",{children:n}),Object(N.jsx)("td",{children:t.locationId}),Object(N.jsx)("td",{children:Object(N.jsx)("a",{href:"#",onClick:function(){return e.handleClick(t.longitude,t.latitude,t.name)},children:t.name})}),Object(N.jsx)("td",{children:t.latitude}),Object(N.jsx)("td",{children:t.longitude})]},n)}))]}),Object(N.jsx)("div",{children:Object(N.jsx)(F,{lng:this.state.lng,lat:this.state.lat,name:this.state.location})},this.state.location)]})}}]),n}(s.a.Component),F=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)(N.Fragment,{})}}]),n}(s.a.Component),M=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={content:""},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;B.getUserBoard().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("header",{className:"jumbotron",children:[Object(N.jsx)("h3",{children:this.state.content}),Object(N.jsx)(A,{})]})})}}]),n}(a.Component),_=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={content:""},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;B.getAdminBoard().then((function(t){e.setState({content:t.data})}),(function(t){e.setState({content:t.response&&t.response.data&&t.response.data.message||t.message||t.toString()})}))}},{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("header",{className:"jumbotron",children:[Object(N.jsx)("p",{children:"User CRUD"}),Object(N.jsxs)("ul",{children:[Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/register",children:"Create User"})}),Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/admin/user/retrieve",children:"Retrieve username"})}),Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/admin/user/update",children:"Update user"})}),Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/admin/user/delete",children:"Delete user"})})]}),Object(N.jsx)("p",{children:"Place CRUD"}),Object(N.jsxs)("ul",{children:[Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/admin/location/create",children:"Create Place"})}),Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/admin/location/retrieve",children:"Retrieve place"})}),Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/admin/location/update",children:"Update place"})}),Object(N.jsx)("li",{children:Object(N.jsx)(i.b,{to:"/admin/location/delete",children:"Delete place"})})]})]})})}}]),n}(a.Component),q=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("form",{action:"http://csci2720-g23.cse.cuhk.edu.hk/admin/user/update",method:"post",children:[Object(N.jsx)("label",{for:"userId",children:"userId: "}),Object(N.jsx)("input",{name:"userId"}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit"})]})})}}]),n}(a.Component),H=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("form",{action:"http://csci2720-g23.cse.cuhk.edu.hk/admin/user/update",method:"post",children:[Object(N.jsx)("label",{for:"userId",children:"userId: "}),Object(N.jsx)("input",{name:"userId"}),Object(N.jsx)("br",{}),Object(N.jsx)("label",{for:"username",children:"username: "}),Object(N.jsx)("input",{name:"username"}),Object(N.jsx)("br",{}),Object(N.jsx)("label",{for:"password",children:"password: "}),Object(N.jsx)("input",{name:"password"}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit"})]})})}}]),n}(a.Component),E=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("form",{action:"http://csci2720-g23.cse.cuhk.edu.hk/admin/user/delete",method:"post",children:[Object(N.jsx)("label",{for:"userId",children:"userId: "}),Object(N.jsx)("input",{name:"userId"}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit"})]})})}}]),n}(a.Component),G=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("form",{action:"http://csci2720-g23.cse.cuhk.edu.hk/admin/location/create",method:"post",children:[Object(N.jsx)("label",{for:"latitude",children:"latitude: "}),Object(N.jsx)("input",{name:"latitude"}),Object(N.jsx)("br",{}),Object(N.jsx)("label",{for:"longitude",children:"longitude: "}),Object(N.jsx)("input",{name:"longitude"}),Object(N.jsx)("br",{}),Object(N.jsx)("label",{for:"name",children:"name: "}),Object(N.jsx)("input",{name:"name"}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit"})]})})}}]),n}(a.Component),W=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("form",{action:"http://csci2720-g23.cse.cuhk.edu.hk/admin/location/",method:"post",children:[Object(N.jsx)("label",{for:"locationId",children:"locationId: "}),Object(N.jsx)("input",{name:"locationId"}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit"})]})})}}]),n}(a.Component),Q=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("form",{action:"http://csci2720-g23.cse.cuhk.edu.hk/admin/location/update",method:"post",children:[Object(N.jsx)("label",{for:"locationId",children:"locationId: "}),Object(N.jsx)("input",{name:"locationId"}),Object(N.jsx)("br",{}),Object(N.jsx)("label",{for:"latitude",children:"latitude: "}),Object(N.jsx)("input",{name:"latitude"}),Object(N.jsx)("br",{}),Object(N.jsx)("label",{for:"longitude",children:"longitude: "}),Object(N.jsx)("input",{name:"longitude"}),Object(N.jsx)("br",{}),Object(N.jsx)("label",{for:"name",children:"name: "}),Object(N.jsx)("input",{name:"name"}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit"})]})})}}]),n}(a.Component),V=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(N.jsx)("div",{className:"container",children:Object(N.jsxs)("form",{action:"http://csci2720-g23.cse.cuhk.edu.hk/admin/location/delete",method:"post",children:[Object(N.jsx)("label",{for:"locationId",children:"locationId: "}),Object(N.jsx)("input",{name:"locationId"}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit"})]})})}}]),n}(a.Component),z=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).logOut=a.logOut.bind(Object(j.a)(a)),a.state={showAdminBoard:!1,currentUser:void 0},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=p.getCurrentUser();e&&this.setState({currentUser:e,showAdminBoard:e.roles.includes("ROLE_ADMIN")})}},{key:"logOut",value:function(){p.logout()}},{key:"render",value:function(){var e=this.state,t=e.currentUser,n=e.showAdminBoard;return Object(N.jsxs)("div",{children:[Object(N.jsxs)("nav",{className:"navbar navbar-expand navbar-dark bg-dark",children:[Object(N.jsx)(i.b,{to:"/",className:"navbar-brand",children:"CSCI2720 Group 5"}),Object(N.jsxs)("div",{className:"navbar-nav mr-auto",children:[Object(N.jsx)("li",{className:"nav-item",children:Object(N.jsx)(i.b,{to:"/home",className:"nav-link",children:"Home"})}),n&&Object(N.jsx)("li",{className:"nav-item",children:Object(N.jsx)(i.b,{to:"/admin",className:"nav-link",children:"Admin Board"})}),t&&Object(N.jsx)("li",{className:"nav-item",children:Object(N.jsx)(i.b,{to:"/user",className:"nav-link",children:"User"})})]}),t?Object(N.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(N.jsx)("li",{className:"nav-item",children:Object(N.jsx)(i.b,{to:"/profile",className:"nav-link",children:t.username})}),Object(N.jsx)("li",{className:"nav-item",children:Object(N.jsx)("a",{href:"/",className:"nav-link",onClick:this.logOut,children:"LogOut"})})]}):Object(N.jsxs)("div",{className:"navbar-nav ml-auto",children:[Object(N.jsx)("li",{className:"nav-item",children:Object(N.jsx)(i.b,{to:"/login",className:"nav-link",children:"Login"})}),Object(N.jsx)("li",{className:"nav-item",children:Object(N.jsx)(i.b,{to:"/register",className:"nav-link",children:"Sign Up"})})]})]}),Object(N.jsx)("div",{className:"container mt-3",children:Object(N.jsxs)(h.c,{children:[Object(N.jsx)(h.a,{exact:!0,path:["/","/home"],component:R}),Object(N.jsx)(h.a,{exact:!0,path:"/login",component:w}),Object(N.jsx)(h.a,{exact:!0,path:"/register",component:D}),Object(N.jsx)(h.a,{exact:!0,path:"/profile",component:J}),Object(N.jsx)(h.a,{path:"/user",component:M}),Object(N.jsx)(h.a,{exact:!0,path:"/admin",component:_}),Object(N.jsx)(h.a,{exact:!0,path:"/admin/user/retrieve",component:q}),Object(N.jsx)(h.a,{exact:!0,path:"/admin/user/update",component:H}),Object(N.jsx)(h.a,{exact:!0,path:"/admin/user/delete",component:E}),Object(N.jsx)(h.a,{exact:!0,path:"/admin/location/create",component:G}),Object(N.jsx)(h.a,{exact:!0,path:"/admin/location/retrieve",component:W}),Object(N.jsx)(h.a,{exact:!0,path:"/admin/location/update",component:Q}),Object(N.jsx)(h.a,{exact:!0,path:"/admin/location/delete",component:V})]})})]})}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(Object(N.jsx)(i.a,{children:Object(N.jsx)(z,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},52:function(e,t,n){}},[[102,1,2]]]);
//# sourceMappingURL=main.5110e950.chunk.js.map