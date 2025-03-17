import Script from 'next/script';

export default function Analytics() {
    const id = 'KkyniOB9QGsjnaGb';
    const string = `!function(p){"use strict";!function(t){var s=window,e=document,i=p,c="".concat("https:"===e.location.protocol?"https://":"http://","sdk.51.la/js-sdk-pro.min.js"),n=e.createElement("script"),r=e.getElementsByTagName("script")[0];n.type="text/javascript",n.setAttribute("charset","UTF-8"),n.async=!0,n.src=c,n.id="LA_COLLECT",i.d=n;var o=function(){s.LA.ids.push(i)};s.LA?s.LA.ids&&o():(s.LA=p,s.LA.ids=[],o()),r.parentNode.insertBefore(n,r)}()}({id:"${id}",ck:"${id}",hashMode:true});`;
    return <Script id="51la" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: string }} />;
}
