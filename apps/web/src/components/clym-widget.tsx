import type { FC } from 'react';
import { useEffect } from 'react';

export const ClymWidget: FC = () => {
  useEffect(() => {
    // Script function
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      (function(d,id,s,i,w,o){
      var js,cjs=d.getElementsByTagName(s)[0],cs=d.getElementById(id);
      if(cs){if(window.Clym) return Clym.load(i,w,o);var c=window._clymInit||[];c.push([i,w,o]);window._clymInit=c;return;}
      js=d.createElement('script');
      js.id=i;
      js.src='https://widget.clym-sdk.net/clym.js';
      js.onload=function(){Clym&&Clym.load(i,w,o);};
      cjs.parentNode.insertBefore(js, cjs);
      }(document,'clym-privacy','script','clym-privacy','6edb1fee8e9b44728d618eb4bmy8jxnv',{}));
    `;

    document.body.appendChild(inlineScript);

    return () => {
      document.body.removeChild(inlineScript);
    };
  }, []);

  return null;
};
