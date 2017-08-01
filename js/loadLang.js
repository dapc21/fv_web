//get query string
var qs = document.getElementById("identificador_lang").src.match(/\w+=[A-Za-z0-9_-]+/);
 
//array to store variables
var _GET= {};
 
var t,i = qs.length;
while (i--) {
 
     //t[0] param name and t[1] value
     t = qs[i].split("=");
     //opc 1: like PHP
     _GET[t[0]] = t[1];
 
    //opc: vars with same name using eval
    eval('var '+t[0]+'="'+t[1]+'";');
}
var userLang = navigator.language || navigator.userLanguage;
userLang = (loadLang!='none')?loadLang:userLang;
var filejs = document.createElement('script')
filejs.setAttribute("type", "text/javascript")
filejs.setAttribute("src", 'app/lang/' + userLang + '.js')
if (typeof filejs != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(filejs)
}