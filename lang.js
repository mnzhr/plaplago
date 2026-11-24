(function(){
  function pick(){
    var q=new URLSearchParams(location.search).get('lang');
    if(q==='en'||q==='uk')return q;
    try{var s=localStorage.getItem('lang');if(s==='en'||s==='uk')return s;}catch(e){}
    var n=(navigator.language||'en').toLowerCase();
    return n.indexOf('uk')===0?'uk':'en';
  }
  function apply(l){
    var r=document.documentElement;r.setAttribute('data-lang',l);r.setAttribute('lang',l);
    document.querySelectorAll('a[data-keep]').forEach(function(a){
      var h=a.getAttribute('href').split('?')[0];a.setAttribute('href',h+'?lang='+l);
    });
  }
  var lang=pick();
  document.documentElement.setAttribute('data-lang',lang);
  document.addEventListener('DOMContentLoaded',function(){
    apply(lang);
    document.querySelectorAll('[data-set]').forEach(function(b){
      b.addEventListener('click',function(){
        lang=b.getAttribute('data-set');
        try{localStorage.setItem('lang',lang);}catch(e){}
        var u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);
        apply(lang);
      });
    });
  });
})();
