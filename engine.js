var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();
/* 游龙广告拦截引擎 - 规则查询核心 */
(function(){
  'use strict';
  var rules = window.__YL_RULES__ || [];
  var store = { index: {} }; // domain -> rule[]，用对象包裹避免引用失效

  function extractDomain(rule) {
    // 去除注释和修饰符
    var r = rule.split('$')[0].split('#')[0].split('##')[0].trim();
    if (!r || r.charAt(0) === '!') return null;
    // 去除前缀
    r = r.replace(/^\|\|/, '').replace(/^\|/, '').replace(/^\*/g, '');
    // 提取域名部分
    var slash = r.indexOf('/');
    if (slash > 0) r = r.slice(0, slash);
    var colon = r.indexOf(':');
    if (colon > 0) r = r.slice(0, colon);
    // 去除查询串与参数
    var q = r.indexOf('?');
    if (q > 0) r = r.slice(0, q);
    var eq = r.indexOf('=');
    if (eq > 0) r = r.slice(0, eq);
    // 去除通配符及非法字符
    r = r.replace(/\*/g, '').replace(/[^a-zA-Z0-9.\-\_]/g, '');
    return r || null;
  }

  function matchPattern(pattern, domain) {
    if (!pattern) return false;
    // 转换通配符为正则
    var re = pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*');
    return new RegExp('^' + re + '$').test(domain);
  }

  function query(domain) {
    if (!domain) return { matched: false, rule: null };
    // 标准化
    domain = domain.replace(/^\*\./, '').replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase();
    var colon = domain.indexOf(':');
    if (colon > 0) domain = domain.slice(0, colon);
    var slash = domain.indexOf('/');
    if (slash > 0) domain = domain.slice(0, slash);

    // 1. 精确匹配
    if (store.index[domain]) {
      return { matched: true, rule: store.index[domain][0] };
    }
    // 2. 父域匹配
    var parts = domain.split('.');
    for (var i = 1; i < parts.length - 1; i++) {
      var parent = parts.slice(i).join('.');
      if (store.index[parent]) {
        return { matched: true, rule: store.index[parent][0] };
      }
    }
    // 3. 通配匹配
    var keys = Object.keys(store.index);
    for (var j = 0; j < keys.length; j++) {
      if (keys[j].indexOf('*') >= 0 && matchPattern(keys[j], domain)) {
        return { matched: true, rule: store.index[keys[j]][0] };
      }
    }
    return { matched: false, rule: null };
  }

  function getRuleCount() { return rules.length; }
  function getIndexSize() { return Object.keys(store.index).length; }

  var _building = false;
  function buildIndex() {
    var idx = {};
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      var domain = extractDomain(r);
      if (domain) {
        if (!idx[domain]) idx[domain] = [];
        idx[domain].push(r);
      }
    }
    store.index = idx;
  }
  function safeBuild() {
    if (_building) return;
    _building = true;
    try {
      rules = (window.__YL_RULES__ && window.__YL_RULES__.length) ? window.__YL_RULES__ : [];
      var el = document.getElementById('statRules');
      if (el) el.textContent = '索引构建中…';
      var total = rules.length;
      var done = 0;
      var BATCH = 40000;
      var idx = {};
      function step() {
        var end = done + BATCH;
        if (end > total) end = total;
        for (var i = done; i < end; i++) {
          var r = rules[i];
          var domain = extractDomain(r);
          if (domain) {
            if (!idx[domain]) idx[domain] = [];
            idx[domain].push(r);
          }
        }
        done = end;
        if (done < total) {
          if (el) el.textContent = '索引构建中 ' + Math.round(done/total*100) + '%';
          setTimeout(step, 0);
        } else {
          store.index = idx;
          _building = false;
          if (el) el.textContent = total ? total.toLocaleString() : 0;
          console.log('[游龙引擎] 索引构建完成: ' + total.toLocaleString() + ' 条规则 / ' + Object.keys(store.index).length + ' 个域名');
          if (typeof window.__YL_RULES_READY__ === 'function') { try { window.__YL_RULES_READY__(); } catch(e) {} }
        }
      }
      step();
    } catch(e) {
      _building = false;
      console.error('[游龙引擎] 索引构建失败:', e);
    }
  }

  // rules.js 可能是同步(同标签)或异步(动态插入)加载，统一处理
  if (window.__YL_RULES__ && window.__YL_RULES__.length) {
    safeBuild();
  } else {
    window.__YL_RULES_READY__ = function() { safeBuild(); };
    var _tries = 0;
    var _done = false;
    (function _poll() {
      if (_done) return;
      _tries++;
      if (window.__YL_RULES__ && window.__YL_RULES__.length) {
        _done = true;
        safeBuild();
      } else if (_tries <= 100) {
        setTimeout(_poll, 100);
      } else {
        console.warn('[游龙引擎] 规则库加载超时，广告规则查询功能不可用');
      }
    })();
  }

  window.BLOCKER = {
    query: query,
    getRuleCount: getRuleCount,
    getIndexSize: getIndexSize,
    rules: rules,
    reload: function() {
      rules = (window.__YL_RULES__ && window.__YL_RULES__.length) ? window.__YL_RULES__ : [];
      store.index = {};
      safeBuild();
    }
  };
})();


/* 游龙工具集 - 主交互逻辑 */
var UI = {}; // 工具面板渲染器，键=工具id，值=返回HTML字符串的函数
var HANDLER = {}; // 工具面板内按钮的点击处理函数

// 通用工具函数
function el(id) { return document.getElementById(id); }
function val(id) { var e = el(id); return e ? e.value : ''; }
function setHTML(id, html) { var e = el(id); if (e) e.innerHTML = html; }
function setVal(id, v) { var e = el(id); if (e) e.value = v; }
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function(){ toast('已复制到剪贴板'); }, function(){ fallbackCopy(text); });
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); toast('已复制到剪贴板'); }
  catch(e) { toast('复制失败，请手动选择'); }
  document.body.removeChild(ta);
}
function toast(msg) {
  var t = el('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer); t._timer = setTimeout(function(){ t.classList.remove('show'); }, 2200);
}

// ============ 工具1：计算器 ============
UI.calc = function(){ return '\
<div class="tool-header"><div class="tool-icon">🧮</div><div><h3>计算器</h3><p>支持四则运算、括号、幂运算</p></div></div>\
<div class="calc-wrap">\
<input type="text" id="calcInput" class="calc-display" placeholder="输入算式，如 1+2*(3-1)^2" />\
<div class="calc-result" id="calcResult">等待输入</div>\
<div class="btn-group">\
<button class="btn btn-primary" onclick="calcEval()">计算</button>\
<button class="btn" onclick="setVal(\'calcInput\',\'\');setHTML(\'calcResult\',\'等待输入\')">清空</button>\
</div></div>'; };
HANDLER.calcEval = calcEval;
function calcEval() {
  var expr = val('calcInput').trim();
  if (!expr) { setHTML('calcResult','等待输入'); return; }
  try {
    // 安全校验：仅允许数字、运算符、括号、点、空格
    if (!/^[\d+\-*/().\s^%]+$/.test(expr)) { setHTML('calcResult','<span class="err">表达式含非法字符</span>'); return; }
    // 替换 ^ 为 ** （幂运算）
    var safe = expr.replace(/\^/g, '**');
    // 使用 Function 构造避免直接 eval 的全局访问
    var result = Function('"use strict";return (' + safe + ')')();
    if (typeof result !== 'number' || !isFinite(result)) { setHTML('calcResult','<span class="err">计算结果无效</span>'); return; }
    setHTML('calcResult', '<span class="ok">= ' + formatNumber(result) + '</span>');
  } catch(e) { setHTML('calcResult','<span class="err">算式有误：' + escapeHtml(e.message) + '</span>'); }
}
function formatNumber(n) {
  // 处理浮点精度
  if (Math.abs(n) > 1e15 || (Math.abs(n) < 1e-10 && n !== 0)) return n.toExponential(6);
  var s = parseFloat(n.toPrecision(12)).toString();
  return s;
}

// ============ 工具2：单位换算 ============
var UNITS = {
  length: { name: '长度', base: '米', map: { '纳米':1e-9,'微米':1e-6,'毫米':1e-3,'厘米':1e-2,'分米':1e-1,'米':1,'千米':1e3,'英寸':0.0254,'英尺':0.3048,'码':0.9144,'英里':1609.344 } },
  weight: { name: '重量', base: '千克', map: { '毫克':1e-6,'克':1e-3,'千克':1,'吨':1e3,'磅':0.453592,'盎司':0.0283495 } },
  area: { name: '面积', base: '平方米', map: { '平方毫米':1e-6,'平方厘米':1e-4,'平方分米':1e-2,'平方米':1,'公顷':1e4,'平方公里':1e6,'亩':666.667,'英亩':4046.86,'平方英尺':0.092903 } },
  volume: { name: '体积', base: '升', map: { '毫升':1e-3,'升':1,'立方米':1e3,'加仑(美)':3.78541,'加仑(英)':4.54609,'品脱':0.568261 } },
  temp: { name: '温度', base: '摄氏度', isTemp: true },
  speed: { name: '速度', base: '米/秒', map: { '米/秒':1,'千米/时':0.277778,'英里/时':0.44704,'节':0.514444,'光速':299792458 } },
  time: { name: '时间', base: '秒', map: { '毫秒':1e-3,'秒':1,'分钟':60,'小时':3600,'天':86400,'周':604800 } },
  data: { name: '数据', base: '字节', map: { 'B':1,'KB':1024,'MB':1048576,'GB':1073741824,'TB':1099511627776,'PB':1125899906842624 } }
};
UI.unit = function(){ return renderUnitUI(); };
function renderUnitUI() {
  var cats = Object.keys(UNITS);
  var tabs = cats.map(function(c,i){ return '<button class="tab'+(i===0?' active':'')+'" data-cat="'+c+'" onclick="switchUnitCat(\''+c+'\')">'+UNITS[c].name+'</button>'; }).join('');
  return '\
<div class="tool-header"><div class="tool-icon">🔄</div><div><h3>单位换算</h3><p>长度、重量、面积、体积、温度、速度等</p></div></div>\
<div class="tabs">'+tabs+'</div>\
<div id="unitBody"></div>';
}
function switchUnitCat(cat) {
  var btns = document.querySelectorAll('#panelUnit .tab');
  btns.forEach(function(b){ b.classList.toggle('active', b.dataset.cat === cat); });
  renderUnitBody(cat);
}
function renderUnitBody(cat) {
  var u = UNITS[cat];
  var opts = '';
  if (u.isTemp) {
    var temps = ['摄氏度','华氏度','开尔文'];
    opts = temps.map(function(t){ return '<option value="'+t+'">'+t+'</option>'; }).join('');
  } else {
    opts = Object.keys(u.map).map(function(k){ return '<option value="'+k+'">'+k+'</option>'; }).join('');
  }
  setHTML('unitBody', '\
<div class="form-row"><label>从</label>\
<input type="number" id="uFromVal" placeholder="输入数值" value="1" step="any" oninput="doUnitConv()" />\
<select id="uFromUnit" onchange="doUnitConv()">'+opts+'</select></div>\
<div class="form-row"><label>到</label>\
<span class="arrow">=</span>\
<input type="number" id="uToVal" placeholder="结果" readonly />\
<select id="uToUnit" onchange="doUnitConv()">'+opts+'</select></div>\
<div class="hint" id="uHint"></div>');
  // 默认：第一个作为从，第二个作为到
  var sel = document.querySelector('#uToUnit');
  if (sel && sel.options.length > 1) sel.selectedIndex = 1;
  doUnitConv();
}
function doUnitConv() {
  var cat = (document.querySelector('#panelUnit .tab.active')||{}).dataset;
  if (!cat) return;
  cat = cat.cat || Object.keys(UNITS)[0];
  var u = UNITS[cat];
  var fromV = parseFloat(val('uFromVal'));
  var fromU = val('uFromUnit');
  var toU = val('uToUnit');
  var resEl = el('uToVal');
  var hintEl = el('uHint');
  if (isNaN(fromV)) { if(resEl) resEl.value=''; if(hintEl) hintEl.textContent=''; return; }
  var result;
  if (u.isTemp) {
    // 先转成摄氏度
    var c;
    if (fromU==='摄氏度') c = fromV;
    else if (fromU==='华氏度') c = (fromV-32)*5/9;
    else if (fromU==='开尔文') c = fromV-273.15;
    if (toU==='摄氏度') result = c;
    else if (toU==='华氏度') result = c*9/5+32;
    else if (toU==='开尔文') result = c+273.15;
  } else {
    var inBase = fromV * u.map[fromU];
    result = inBase / u.map[toU];
  }
  if (resEl) resEl.value = formatNumber(result);
  if (hintEl) hintEl.textContent = '1 '+fromU+' = '+formatNumber(result/fromV)+' '+toU;
}
HANDLER.switchUnitCat = switchUnitCat;
HANDLER.doUnitConv = doUnitConv;

// ============ 工具3：进制转换 ============
UI.baseconv = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔢</div><div><h3>进制转换</h3><p>2/8/10/16 进制互转，支持浮点</p></div></div>\
<div class="form-row"><label>进制</label>\
<select id="bcFromBase"><option>2</option><option>8</option><option selected>10</option><option>16</option></select>\
<input type="text" id="bcInput" placeholder="输入数值" value="255" oninput="doBaseConv()" />\
</div>\
<div class="result-grid">\
<div class="result-item"><label>二进制</label><code id="bc2">-</code></div>\
<div class="result-item"><label>八进制</label><code id="bc8">-</code></div>\
<div class="result-item"><label>十进制</label><code id="bc10">-</code></div>\
<div class="result-item"><label>十六进制</label><code id="bc16">-</code></div>\
</div>'; };
function doBaseConv() {
  var b = parseInt(val('bcFromBase'))||10;
  var s = val('bcInput').trim();
  if (!s) { ['bc2','bc8','bc10','bc16'].forEach(function(i){setHTML(i,'-');}); return; }
  // 处理负数
  var neg = false;
  if (s.charAt(0)==='-') { neg=true; s=s.slice(1); }
  var num;
  try { num = parseInt(s, b); }
  catch(e){ num = NaN; }
  if (isNaN(num)) { ['bc2','bc8','bc10','bc16'].forEach(function(i){setHTML(i,'<span class="err">无效输入</span>');}); return; }
  var sign = neg ? '-' : '';
  setHTML('bc2', sign+num.toString(2));
  setHTML('bc8', sign+num.toString(8));
  setHTML('bc10', sign+num.toString(10));
  setHTML('bc16', (sign+num.toString(16)).toUpperCase());
}
HANDLER.doBaseConv = doBaseConv;

// ============ 工具4：文本处理 ============
UI.text = function(){ return '\
<div class="tool-header"><div class="tool-icon">📝</div><div><h3>文本处理</h3><p>字数统计、大小写转换、去重、排序、反转</p></div></div>\
<textarea id="txtInput" class="txt-area" placeholder="粘贴文本..."></textarea>\
<div class="stat-bar" id="txtStat">字符：0　行：0</div>\
<div class="toolbar">\
<button class="btn" onclick="txtOp(\'upper\')">大写</button>\
<button class="btn" onclick="txtOp(\'lower\')">小写</button>\
<button class="btn" onclick="txtOp(\'reverse\')">反转</button>\
<button class="btn" onclick="txtOp(\'nodup\')">去重行</button>\
<button class="btn" onclick="txtOp(\'sort\')">行排序</button>\
<button class="btn" onclick="txtOp(\'trim\')">去空行</button>\
<button class="btn" onclick="txtOp(\'clear\')">清空</button>\
<button class="btn btn-primary" onclick="copyText(val(\'txtInput\'))">复制</button>\
</div>'; };
function txtStat() {
  var t = val('txtInput');
  var lines = t.length===0 ? 0 : t.split('\n').length;
  setHTML('txtStat', '字符：'+t.length+'　行：'+lines);
}
function txtOp(op) {
  var t = el('txtInput');
  if (!t) return;
  var v = t.value;
  switch(op){
    case 'upper': t.value = v.toUpperCase(); break;
    case 'lower': t.value = v.toLowerCase(); break;
    case 'reverse': t.value = v.split('').reverse().join(''); break;
    case 'nodup': t.value = v.split('\n').filter(function(l,i,a){return a.indexOf(l)===i;}).join('\n'); break;
    case 'sort': t.value = v.split('\n').sort().join('\n'); break;
    case 'trim': t.value = v.split('\n').map(function(l){return l.trim();}).filter(function(l){return l.length>0;}).join('\n'); break;
    case 'clear': t.value = ''; break;
  }
  txtStat();
}
HANDLER.txtStat = txtStat;
HANDLER.txtOp = txtOp;

// ============ 工具5：JSON 美化 ============
UI.json = function(){ return '\
<div class="tool-header"><div class="tool-icon">🧬</div><div><h3>JSON 美化/压缩</h3><p>格式化校验、压缩、转义</p></div></div>\
<div class="layout-2col">\
<textarea id="jTxt" class="txt-area" placeholder="粘贴 JSON..."></textarea>\
<div class="layout-right">\
<div class="toolbar">\
<button class="btn btn-primary" onclick="jOp(\'format\')">格式化</button>\
<button class="btn" onclick="jOp(\'minify\')">压缩</button>\
<button class="btn" onclick="jOp(\'escape\')">转义</button>\
<button class="btn" onclick="jOp(\'unescape\')">反转义</button>\
<button class="btn" onclick="jOp(\'clear\')">清空</button>\
<button class="btn btn-primary" onclick="copyText(val(\'jOut\'))">复制</button>\
</div>\
<pre id="jOut" class="txt-out"></pre>\
</div></div>'; };
function jOp(op) {
  var v = val('jTxt');
  var out = el('jOut');
  if (!out) return;
  try {
    if (op==='format'){ var p=JSON.parse(v); out.textContent=JSON.stringify(p,null,2); out.className='txt-out ok'; }
    else if (op==='minify'){ var p=JSON.parse(v); out.textContent=JSON.stringify(p); out.className='txt-out ok'; }
    else if (op==='escape'){ out.textContent=JSON.stringify(v); out.className='txt-out'; }
    else if (op==='unescape'){ out.textContent=JSON.parse('"'+v.replace(/"/g,'\\"')+'"'); out.className='txt-out'; }
    else if (op==='clear'){ out.textContent=''; }
  } catch(e) { out.textContent='错误：'+e.message; out.className='txt-out err'; }
}
HANDLER.jOp = jOp;

// ============ 工具6：正则测试 ============
UI.regex = function(){ return '\
<div class="tool-header"><div class="tool-icon">🧲</div><div><h3>正则表达式测试</h3><p>实时匹配高亮，支持全局/忽略大小写</p></div></div>\
<div class="form-row"><label>正则</label><input type="text" id="rePat" placeholder="例如：\\d+" oninput="doRegex()" />\
<select id="reFlags" onchange="doRegex()"><option value="g">全局(g)</option><option value="gi">全局忽略大小写(gi)</option><option value="i">忽略大小写(i)</option><option value="">无</option></select></div>\
<textarea id="reTxt" class="txt-area" placeholder="测试文本..." oninput="doRegex()"></textarea>\
<div class="stat-bar" id="reStat">匹配：0 处</div>\
<pre id="reOut" class="txt-out"></pre>'; };
function doRegex() {
  var pat = val('rePat');
  var flags = val('reFlags');
  var txt = val('reTxt');
  var out = el('reOut');
  var stat = el('reStat');
  if (!pat || !out) { if(out) out.textContent=''; if(stat) stat.textContent='匹配：0 处'; return; }
  try {
    var re = new RegExp(pat, flags);
    var matches = txt.match(re) || [];
    var count = matches.length;
    // 高亮
    var escaped = txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    var hl = escaped.replace(new RegExp(pat.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), flags==='g'||flags==='gi'?'g':(flags==='i'?'gi':'g')), function(m){return '<mark>'+m+'</mark>';});
    out.innerHTML = hl || '<span class="muted">无匹配</span>';
    if (stat) stat.textContent = '匹配：'+count+' 处';
  } catch(e) { out.textContent='正则错误：'+e.message; out.className='txt-out err'; }
}
HANDLER.doRegex = doRegex;

// ============ 工具7：随机数/抽签/密码 ============
UI.random = function(){ return '\
<div class="tool-header"><div class="tool-icon">🎲</div><div><h3>随机生成器</h3><p>随机数、整数、抽签、强密码</p></div></div>\
<div class="card-group">\
<div class="card-mini"><h4>随机整数</h4>\
<div class="form-row-inline"><label>范围</label>\
<input type="number" id="rMin" value="1" style="width:80px" />\
<span>~</span>\
<input type="number" id="rMax" value="100" style="width:80px" />\
<button class="btn btn-primary" onclick="rndInt()">生成</button></div>\
<div class="result-display" id="rOut">-</div></div>\
<div class="card-mini"><h4>随机抽签</h4>\
<textarea id="rList" class="txt-area-sm" placeholder="选项，每行一个">苹果\n香蕉\n橙子\n葡萄\n西瓜</textarea>\
<button class="btn btn-primary" onclick="rndPick()">抽一个</button>\
<div class="result-display" id="rPick">-</div></div>\
<div class="card-mini"><h4>强密码生成</h4>\
<div class="form-row-inline"><label>长度</label>\
<input type="number" id="rLen" value="16" min="4" max="64" style="width:70px" />\
<label class="cb"><input type="checkbox" id="rUpper" checked /> 大写</label>\
<label class="cb"><input type="checkbox" id="rLower" checked /> 小写</label>\
<label class="cb"><input type="checkbox" id="rNum" checked /> 数字</label>\
<label class="cb"><input type="checkbox" id="rSym" checked /> 符号</label></div>\
<button class="btn btn-primary" onclick="rndPwd()">生成</button>\
<div class="result-display" id="rPwd">-</div></div>\
</div>'; };
function rndInt(){ var a=parseFloat(val('rMin'))||0,b=parseFloat(val('rMax'))||0; if(a>b){var t=a;a=b;b=t;} var n=Math.floor(Math.random()*(b-a+1))+a; setHTML('rOut',n); }
function rndPick(){ var list=val('rList').split('\n').map(function(s){return s.trim();}).filter(function(s){return s.length>0;}); if(!list.length){setHTML('rPick','<span class="err">请填写选项</span>');return;} setHTML('rPick',list[Math.floor(Math.random()*list.length)]); }
function rndPwd(){
  var len=parseInt(val('rLen'))||16; len=Math.max(4,Math.min(64,len));
  var sets='';
  if(el('rUpper').checked)sets+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if(el('rLower').checked)sets+='abcdefghijklmnopqrstuvwxyz';
  if(el('rNum').checked)sets+='0123456789';
  if(el('rSym').checked)sets+='!@#$%^&*()_+-=[]{}|;:,.<>?';
  if(!sets){setHTML('rPwd','<span class="err">请至少选一种字符</span>');return;}
  var pwd='';
  for(var i=0;i<len;i++)pwd+=sets.charAt(Math.floor(Math.random()*sets.length));
  setHTML('rPwd',pwd);
  // 强度评估
  var score=0;
  if(/[a-z]/.test(pwd))score++; if(/[A-Z]/.test(pwd))score++;
  if(/\d/.test(pwd))score++; if(/[^A-Za-z0-9]/.test(pwd))score++;
  if(pwd.length>=12)score++; if(pwd.length>=20)score++;
  var lv=['弱','中','强','很强'][Math.min(3,Math.floor(score/1.5))];
  setHTML('rPwd',pwd+' <span class="badge '+(score>=4?'good':score>=2?'mid':'bad')+'">'+lv+'</span>');
}
HANDLER.rndInt = rndInt; HANDLER.rndPick = rndPick; HANDLER.rndPwd = rndPwd;

// ============ 工具8：UUID 生成 ============
UI.uuid = function(){ return '\
<div class="tool-header"><div class="tool-icon">🆔</div><div><h3>UUID 生成器</h3><p>批量生成 UUID v4</p></div></div>\
<div class="form-row-inline"><label>数量</label>\
<input type="number" id="uCount" value="5" min="1" max="100" style="width:80px" />\
<label class="cb"><input type="checkbox" id="uUpper" /> 大写</label>\
<label class="cb"><input type="checkbox" id="uNoDash" /> 去横杠</label>\
<button class="btn btn-primary" onclick="genUUID()">生成</button>\
<button class="btn" onclick="copyText(val(\'uOut\'))">复制</button></div>\
<pre id="uOut" class="txt-out">点击生成</pre>'; };
function genUUID(){
  var n=parseInt(val('uCount'))||1; n=Math.max(1,Math.min(100,n));
  var upper=el('uUpper').checked, nodash=el('uNoDash').checked;
  var arr=[];
  for(var i=0;i<n;i++){
    // RFC4122 v4
    var b=new Uint8Array(16); crypto.getRandomValues(b);
    b[6]=(b[6]&0x0f)|0x40; b[8]=(b[8]&0x3f)|0x80;
    var hex=Array.from(b,function(x){return x.toString(16).padStart(2,'0');}).join('');
    var s=nodash?hex:(hex.slice(0,8)+'-'+hex.slice(8,12)+'-'+hex.slice(12,16)+'-'+hex.slice(16,20)+'-'+hex.slice(20));
    arr.push(upper?s.toUpperCase():s);
  }
  setHTML('uOut',arr.join('\n'));
}
HANDLER.genUUID = genUUID;

// ============ 工具9：URL 编解码 ============
UI.url = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔗</div><div><h3>URL 编解码 / 参数解析</h3><p>encodeURI / encodeURIComponent / 解析查询参数</p></div></div>\
<textarea id="urlIn" class="txt-area" placeholder="输入 URL 或文本..."></textarea>\
<div class="toolbar">\
<button class="btn btn-primary" onclick="urlOp(\'encComp\')">编码(Component)</button>\
<button class="btn" onclick="urlOp(\'decComp\')">解码(Component)</button>\
<button class="btn" onclick="urlOp(\'encURI\')">编码(URI)</button>\
<button class="btn" onclick="urlOp(\'decURI\')">解码(URI)</button>\
<button class="btn" onclick="urlOp(\'parse\')">解析参数</button>\
<button class="btn" onclick="urlOp(\'clear\')">清空</button>\
</div>\
<pre id="urlOut" class="txt-out"></pre>'; };
function urlOp(op){
  var v=val('urlIn'); var out=el('urlOut'); if(!out)return;
  try{
    if(op==='encComp')out.textContent=encodeURIComponent(v);
    else if(op==='decComp')out.textContent=decodeURIComponent(v);
    else if(op==='encURI')out.textContent=encodeURI(v);
    else if(op==='decURI')out.textContent=decodeURI(v);
    else if(op==='parse'){
      var u=new URL(v); var params=Array.from(u.searchParams.entries());
      var obj={protocol:u.protocol,host:u.host,pathname:u.pathname,hash:u.hash,params:params};
      out.textContent=JSON.stringify(obj,null,2);
    }
    else if(op==='clear')out.textContent='';
  }catch(e){out.textContent='错误：'+e.message;out.className='txt-out err';}
}
HANDLER.urlOp = urlOp;

// ============ 工具10：Base64 编解码 ============
UI.base64 = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔐</div><div><h3>Base64 编解码</h3><p>文本与 Base64 互转</p></div></div>\
<textarea id="b64In" class="txt-area" placeholder="输入文本..."></textarea>\
<div class="toolbar">\
<button class="btn btn-primary" onclick="b64Op(\'encode\')">编码</button>\
<button class="btn" onclick="b64Op(\'decode\')">解码</button>\
<button class="btn" onclick="b64Op(\'clear\')">清空</button>\
</div>\
<pre id="b64Out" class="txt-out"></pre>'; };
function b64Op(op){
  var v=val('b64In'); var out=el('b64Out'); if(!out)return;
  try{
    if(op==='encode')out.textContent=btoa(unescape(encodeURIComponent(v)));
    else if(op==='decode')out.textContent=decodeURIComponent(escape(atob(v)));
    else if(op==='clear')out.textContent='';
  }catch(e){out.textContent='错误：'+e.message;out.className='txt-out err';}
}
HANDLER.b64Op = b64Op;

// ============ 工具11：哈希计算 ============
UI.hash = function(){ return '\
<div class="tool-header"><div class="tool-icon">#️⃣</div><div><h3>哈希计算</h3><p>MD5 / SHA-1 / SHA-256 / SHA-512（Web Crypto）</p></div></div>\
<input type="text" id="hIn" class="input-full" placeholder="输入文本..." value="hello world" />\
<div class="toolbar">\
<button class="btn" onclick="hashOp(\'MD5\')">MD5</button>\
<button class="btn btn-primary" onclick="hashOp(\'SHA-256\')">SHA-256</button>\
<button class="btn" onclick="hashOp(\'SHA-1\')">SHA-1</button>\
<button class="btn" onclick="hashOp(\'SHA-512\')">SHA-512</button>\
</div>\
<div class="result-grid">\
<div class="result-item"><label>MD5</label><code id="hMD5">-</code></div>\
<div class="result-item"><label>SHA-1</label><code id="hSHA-1">-</code></div>\
<div class="result-item"><label>SHA-256</label><code id="hSHA-256">-</code></div>\
<div class="result-item"><label>SHA-512</label><code id="hSHA-512">-</code></div>\
</div>'; };
async function hashOp(algo){
  var v=val('hIn');
  if(!v){toast('请输入文本');return;}
  var enc=new TextEncoder().encode(v);
  var ids={'MD5':'MD5','SHA-1':'SHA-1','SHA-256':'SHA-256','SHA-512':'SHA-512'};
  var buf=await crypto.subtle.digest(algo,enc);
  var hex=Array.from(new Uint8Array(buf)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
  var id=ids[algo]; if(id)setHTML(id,hex);
  // MD5 需要外部库
  if(algo==='MD5'){
    if(window.CryptoJS&&CryptoJS.MD5)setHTML('hMD5',CryptoJS.MD5(v).toString());
    else setHTML('hMD5','需引入 CryptoJS');
  }
}
HANDLER.hashOp = hashOp;

// ============ 工具12：时间戳转换 ============
UI.timestamp = function(){ return '\
<div class="tool-header"><div class="tool-icon">⏱️</div><div><h3>时间戳转换</h3><p>Unix 时间戳 ↔ 日期时间，支持毫秒/秒</p></div></div>\
<div class="form-row"><label>当前</label>\
<span id="tsNow" class="mono"></span>\
<button class="btn" onclick="tsRefresh()">刷新</button></div>\
<div class="form-row"><label>时间戳</label>\
<input type="number" id="tsIn" placeholder="秒或毫秒" oninput="tsFromStamp()" />\
<select id="tsUnit" onchange="tsFromStamp()"><option value="s">秒</option><option value="ms">毫秒</option></select>\
<button class="btn" onclick="setVal(\'tsIn\',Math.floor(Date.now()/1000))">现在</button></div>\
<div class="form-row"><label>日期</label>\
<input type="datetime-local" id="tsDate" onchange="tsFromDate()" />\
<button class="btn" onclick="tsSetNowDate()">现在</button></div>\
<div class="result-grid">\
<div class="result-item"><label>本地时间</label><code id="tsLocal">-</code></div>\
<div class="result-item"><label>UTC 时间</label><code id="tsUTC">-</code></div>\
<div class="result-item"><label>ISO 格式</label><code id="tsISO">-</code></div>\
</div>'; };
function tsRefresh(){ setHTML('tsNow',Math.floor(Date.now()/1000)+' (秒) / '+Date.now()+' (毫秒)'); }
function pad(n){ return n<10?'0'+n:''+n; }
function fmtDate(d){
  return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
}
function tsFromStamp(){
  var s=parseFloat(val('tsIn')); var u=val('tsUnit');
  if(isNaN(s)){setHTML('tsLocal','-');setHTML('tsUTC','-');setHTML('tsISO','-');return;}
  var ms = u==='ms'?s:s*1000;
  var d=new Date(ms);
  setHTML('tsLocal',fmtDate(d));
  setHTML('tsUTC',d.toUTCString());
  setHTML('tsISO',d.toISOString());
  // 更新日期选择器
  var local=new Date(ms-6*3600*1000); // 修正时区偏移
  var tzOffset=d.getTimezoneOffset()*60000;
  var localISO=new Date(ms-tzOffset).toISOString().slice(0,16);
  setVal('tsDate',localISO);
}
function tsFromDate(){
  var v=val('tsDate'); if(!v)return;
  var d=new Date(v); var ms=d.getTime();
  setVal('tsIn',Math.floor(ms/1000));
  setHTML('tsLocal',fmtDate(d));
  setHTML('tsUTC',d.toUTCString());
  setHTML('tsISO',d.toISOString());
}
function tsSetNowDate(){
  var d=new Date();
  var tzOffset=d.getTimezoneOffset()*60000;
  setVal('tsDate',new Date(d.getTime()-tzOffset).toISOString().slice(0,16));
  tsFromDate();
}
HANDLER.tsRefresh = tsRefresh; HANDLER.tsFromStamp = tsFromStamp; HANDLER.tsFromDate = tsFromDate; HANDLER.tsSetNowDate = tsSetNowDate;

// ============ 工具13：颜色工具 ============
UI.color = function(){ return '\
<div class="tool-header"><div class="tool-icon">🎨</div><div><h3>颜色工具</h3><p>HEX / RGB / HSL 互转，调色板</p></div></div>\
<div class="form-row-inline"><label>颜色</label>\
<input type="color" id="cPicker" value="#00f0ff" oninput="cFromPicker()" />\
<input type="text" id="cHex" class="input-mid" value="#00f0ff" oninput="cFromHex()" />\
<button class="btn" onclick="copyText(val(\'cHex\'))">复制</button></div>\
<div class="color-preview" id="cPreview" style="background:#00f0ff"></div>\
<div class="result-grid">\
<div class="result-item"><label>HEX</label><code id="cOutHex">#00F0FF</code></div>\
<div class="result-item"><label>RGB</label><code id="cOutRGB">rgb(0,240,255)</code></div>\
<div class="result-item"><label>HSL</label><code id="cOutHSL">hsl(183,100%,50%)</code></div>\
</div>\
<div class="palette" id="cPalette"></div>'; };
function hexToRgb(h){
  var s=h.replace('#','');
  if(s.length===3)s=s.split('').map(function(c){return c+c;}).join('');
  return {r:parseInt(s.substr(0,2),16),g:parseInt(s.substr(2,2),16),b:parseInt(s.substr(4,2),16)};
}
function rgbToHsl(r,g,b){
  r/=255;g/=255;b/=255;
  var max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2;
  if(max===min){h=s=0;}
  else{var d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}
    h/=6;}
  return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
}
function cFromPicker(){ var h=val('cPicker'); setVal('cHex',h); cUpdate(h); }
function cFromHex(){ cUpdate(val('cHex')); }
function cUpdate(h){
  if(!/^#?[0-9a-fA-F]{6}$/.test(h)&&!/^#?[0-9a-fA-F]{3}$/.test(h))return;
  var hex=h.charAt(0)==='#'?h:'#'+h;
  var rgb=hexToRgb(hex);
  var hsl=rgbToHsl(rgb.r,rgb.g,rgb.b);
  setHTML('cOutHex',hex.toUpperCase());
  setHTML('cOutRGB','rgb('+rgb.r+','+rgb.g+','+rgb.b+')');
  setHTML('cOutHSL','hsl('+hsl.h+','+hsl.s+'%,'+hsl.l+'%)');
  el('cPreview').style.background=hex;
  // 调色板：5 阶明度
  var pal=[];
  for(var i=0;i<=4;i++){ var L=Math.max(10,Math.min(90,hsl.l+(i-2)*15)); pal.push('hsl('+hsl.h+','+hsl.s+'%,'+L+'%)'); }
  setHTML('cPalette',pal.map(function(c,i){return '<div class="palette-item" style="background:'+c+'" title="'+c+'">L'+(i*25)+'</div>';}).join(''));
}
HANDLER.cFromPicker = cFromPicker; HANDLER.cFromHex = cFromHex;

// ============ 工具14：二维码生成 ============
UI.qrcode = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔲</div><div><h3>二维码生成</h3><p>文本、网址、联系方式转二维码</p></div></div>\
<textarea id="qrIn" class="txt-area" placeholder="输入文本或网址...">https://example.com</textarea>\
<div class="form-row-inline"><label>尺寸</label>\
<input type="number" id="qrSize" value="200" min="100" max="400" style="width:80px" />\
<label class="cb"><input type="checkbox" id="qrLogo" /> 中心Logo</label>\
<button class="btn btn-primary" onclick="genQR()">生成</button>\
<button class="btn" onclick="copyText(val(\'qrIn\'))">复制内容</button></div>\
<div class="qr-wrap" id="qrWrap"></div>'; };
function genQR(){
  var text=val('qrIn'); var size=parseInt(val('qrSize'))||200; var wrap=el('qrWrap');
  if(!text){toast('请输入内容');return;}
  if(text.length>1500){toast('内容过长（>1500字符），可能无法生成');}
  wrap.innerHTML='';
  try{
    if(window.QRCode){
      new QRCode(wrap,{text:text,width:size,height:size,correctLevel:QRCode.CorrectLevel.M});
      if(el('qrLogo').checked){
        var logo=document.createElement('div');
        logo.className='qr-logo'; logo.textContent='🐉';
        wrap.appendChild(logo);
      }
    } else {
      // 简易降级：用 Google Chart API 不行（离线），改为提示
      wrap.innerHTML='<div class="err">二维码库未加载，请联网刷新后重试</div>';
    }
  }catch(e){wrap.innerHTML='<div class="err">生成失败：'+escapeHtml(e.message)+'</div>';}
}
HANDLER.genQR = genQR;

// ============ 工具15：广告拦截规则查询（游龙广告拦截核心） ============
UI.blocker = function(){ return '\
<div class="tool-header"><div class="tool-icon">🛡️</div><div><h3>广告规则查询</h3><p>基于游龙广告拦截引擎，查询域名是否被拦截</p></div></div>\
<div class="stat-bar">规则库：<span id="blCount">加载中...</span></div>\
<input type="text" id="blIn" class="input-full" placeholder="输入域名，如 ad.doubleclick.net" oninput="blQuery()" />\
<div class="toolbar">\
<button class="btn" onclick="blQuick(\'ad.doubleclick.net\')">测试1</button>\
<button class="btn" onclick="blQuick(\'www.google.com\')">测试2</button>\
<button class="btn" onclick="blQuick(\'baidu.com\')">测试3</button>\
<button class="btn" onclick="blQuick(\'qq.com\')">测试4</button>\
<button class="btn" onclick="blBench()">性能测试</button>\
</div>\
<div class="result-display" id="blResult">等待输入</div>\
<pre id="blOut" class="txt-out"></pre>'; };
function blInit(){
  var c = BLOCKER && BLOCKER.getRuleCount ? BLOCKER.getRuleCount() : 0;
  setHTML('blCount', c>0 ? c.toLocaleString()+' 条规则' : (window.__YL_RULES__ ? window.__YL_RULES__.length.toLocaleString()+' 条规则' : '引擎未加载'));
}
function blQuick(d){ setVal('blIn',d); blQuery(); }
function blQuery(){
  var d=val('blIn').trim(); var r=el('blResult'); var o=el('blOut');
  if(!d){r.textContent='等待输入'; if(o)o.textContent=''; return;}
  if(!window.BLOCKER){r.innerHTML='<span class="err">拦截引擎未加载</span>';return;}
  var t0=performance.now();
  var res=BLOCKER.query(d);
  var t1=performance.now();
  if(res.matched){
    r.innerHTML='<span class="badge bad">🚫 拦截</span> 命中规则：<code>'+escapeHtml(res.rule)+'</code> <span class="muted">('+(t1-t0).toFixed(3)+'ms)</span>';
  } else {
    r.innerHTML='<span class="badge good">✅ 放行</span> <span class="muted">('+(t1-t0).toFixed(3)+'ms)</span>';
  }
  if(o)o.textContent='查询域名：'+d+'\n结果：'+(res.matched?'拦截':'放行')+(res.rule?'\n规则：'+res.rule:'');
}
function blBench(){
  if(!window.BLOCKER){toast('引擎未加载');return;}
  var tests=['ad.doubleclick.net','www.google.com','baidu.com','qq.com','sina.com.cn','taobao.com','adservice.google.com','analytics.tiktok.com'];
  var t0=performance.now();
  var hits=0;
  for(var i=0;i<100000;i++){ var r=BLOCKER.query(tests[i%tests.length]); if(r.matched)hits++; }
  var t1=performance.now();
  setHTML('blOut','10万次查询耗时：'+(t1-t0).toFixed(1)+'ms\n平均单次：'+((t1-t0)/100000).toFixed(4)+'ms\nQPS：'+Math.round(100000/((t1-t0)/1000)).toLocaleString()+'\n命中：'+hits+'/100000');
}
HANDLER.blQuick = blQuick; HANDLER.blQuery = blQuery; HANDLER.blBench = blBench;

// ============ 工具16：权限检测（游龙安全护盾核心） ============
UI.shield = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔒</div><div><h3>设备安全体检</h3><p>模拟游龙安全护盾的权限与风险检测</p></div></div>\
<div class="toolbar"><button class="btn btn-primary" onclick="shieldScan()">开始扫描</button>\
<button class="btn" onclick="shieldDump()">导出日志</button></div>\
<div class="risk-bar"><div class="risk-fill" id="shieldBar" style="width:0%"></div></div>\
<div class="stat-bar" id="shieldStat">尚未扫描</div>\
<div class="risk-list" id="shieldList"></div>'; };
var SHIELD_ITEMS = [
  {id:'root', name:'Root 权限', desc:'设备是否已获取 Root 权限', risk:'high', check:function(){return /root/i.test(navigator.userAgent);}},
  {id:'debug', name:'USB 调试', desc:'开发者调试模式是否开启', risk:'mid', check:function(){return false;}},
  {id:'unknown_src', name:'未知来源安装', desc:'允许安装非商店应用', risk:'mid', check:function(){return true;}},
  {id:'overlay', name:'悬浮窗权限', desc:'应用可绘制在其他窗口之上', risk:'high', check:function(){return 'Notification' in window;}},
  {id:'accessibility', name:'无障碍服务', desc:'可监听和操控界面', risk:'high', check:function(){return 'speechSynthesis' in window;}},
  {id:'clipboard', name:'剪贴板读取', desc:'后台读取剪贴板内容', risk:'mid', check:function(){return 'clipboard' in navigator;}},
  {id:'geo', name:'精确位置', desc:'持续获取 GPS 位置', risk:'mid', check:function(){return 'geolocation' in navigator;}},
  {id:'camera', name:'摄像头常驻', desc:'后台调用摄像头', risk:'high', check:function(){return !/Mobile/.test(navigator.userAgent);}},
  {id:'sms', name:'短信读取', desc:'读取短信内容', risk:'high', check:function(){return false;}},
  {id:'contact', name:'通讯录访问', desc:'上传联系人列表', risk:'high', check:function(){return false;}},
  {id:'storage', name:'存储全局访问', desc:'读取所有文件', risk:'mid', check:function(){return true;}},
  {id:'vpn', name:'VPN/代理', desc:'流量被转发', risk:'high', check:function(){return false;}}
];
function shieldScan(){
  var list=el('shieldList'); var bar=el('shieldBar'); var stat=el('shieldStat');
  list.innerHTML='<div class="muted">扫描中...</div>';
  setTimeout(function(){
    var html=''; var score=0; var high=0,mid=0,low=0;
    SHIELD_ITEMS.forEach(function(it){
      // 浏览器环境无法真实检测，用模拟数据
      var risk = Math.random()>0.55 ? it.risk : 'low';
      var icon = risk==='high'?'🔴':risk==='mid'?'🟡':'🟢';
      var cls = risk==='high'?'risk-high':risk==='mid'?'risk-mid':'risk-low';
      if(risk==='high'){high++;score+=30;} else if(risk==='mid'){mid++;score+=15;}
      html+='<div class="risk-item '+cls+'"><span class="risk-dot">'+icon+'</span><div class="risk-info"><strong>'+it.name+'</strong><small>'+it.desc+'</small></div><span class="risk-tag">'+{high:'高风险',mid:'中风险',low:'安全'}[risk]+'</span></div>';
    });
    score=Math.min(100,score);
    list.innerHTML=html;
    bar.style.width=score+'%';
    bar.style.background=score>60?'#ff4757':score>30?'#ffa502':'#2ed573';
    stat.innerHTML='风险评分：'+score+'/100　🔴高风险 '+high+'　🟡中风险 '+mid;
  }, 600);
}
function shieldDump(){
  var lines=['=== 游龙安全护盾 检测日志 ===','时间：'+new Date().toISOString(),''];
  SHIELD_ITEMS.forEach(function(it){lines.push(it.name+'：'+it.desc);});
  lines.push('','=== END ===');
  copyText(lines.join('\n'));
}
HANDLER.shieldScan = shieldScan; HANDLER.shieldDump = shieldDump;

// ============ 工具17：容器沙箱模拟（游龙容器插件核心） ============
UI.container = function(){ return '\
<div class="tool-header"><div class="tool-icon">📦</div><div><h3>Linux 容器模拟终端</h3><p>模拟游龙容器插件的沙箱环境（演示用，非真实内核）</p></div></div>\
<div class="stat-bar">内核：<span id="ctKernel">Linux 5.15.0-container</span>　架构：<span id="ctArch">x86_64</span></div>\
<div class="terminal" id="ctTerm">欢迎使用游龙容器模拟终端\n输入 help 查看命令\n\n<span class="prompt">root@container:~# </span><span class="cursor">_</span></div>\
<div class="form-row-inline"><input type="text" id="ctIn" class="input-full" placeholder="输入命令..." onkeydown="if(event.key===\'Enter\')ctExec()" />\
<button class="btn btn-primary" onclick="ctExec()">执行</button>\
<button class="btn" onclick="ctClear()">清屏</button></div>'; };
var CT_FS = eval('({"\\/":{"type":"dir","children":{"etc":{"type":"dir","children":{"hostname":{"type":"file","content":"container\\n"},"os-release":{"type":"file","content":"NAME=\\"YouLong Container\\"\\nVERSION=\\"1.0\\"\\nID=youlong\\n"}}},"home":{"type":"dir","children":{"user":{"type":"dir","children":{"readme.txt":{"type":"file","content":"Welcome to YouLong Container!\\n"}}}}},"proc":{"type":"dir","children":{"meminfo":{"type":"file","content":"MemTotal: 8388608 kB\\nMemFree: 4194304 kB\\n"}}}}}})');
var CT_CWD='/home/user';
function ctResolve(path){
  if(!path.startsWith('/'))path=CT_CWD+'/'+path;
  var parts=path.split('/').filter(function(p){return p&&p!=='.';});
  var stack=[];
  parts.forEach(function(p){ if(p==='..')stack.pop(); else stack.push(p); });
  var node=CT_FS;
  for(var i=0;i<stack.length;i++){ if(!node||node.type!=='dir')return null; node=node.children[stack[i]]; }
  return node;
}
function ctExec(){
  var inp=el('ctIn'); var term=el('ctTerm'); if(!inp||!term)return;
  var cmd=inp.value.trim(); inp.value='';
  var lines=term.innerHTML.split('\n');
  // 移除光标行
  var last=lines[lines.length-1];
  lines[lines.length-1]=last.replace('<span class="cursor">_</span>','');
  term.innerHTML=lines.join('\n')+'\n<span class="prompt">root@container:~# </span>'+escapeHtml(cmd)+'\n';
  if(!cmd){term.innerHTML+='<span class="cursor">_</span>';ctScroll();return;}
  var out=runCmd(cmd);
  term.innerHTML+=(out||'')+'\n<span class="prompt">root@container:~# </span><span class="cursor">_</span>';
  ctScroll();
}
function runCmd(cmd){
  var args=cmd.split(/\s+/); var c=args[0];
  switch(c){
    case 'help': return '可用命令：ls, cd, pwd, cat, echo, whoami, uname, date, df, free, mkdir, touch, rm, clear, exit';
    case 'ls': var node=ctResolve(args[1]||CT_CWD); if(!node||node.type!=='dir')return 'ls: 无此目录'; return Object.keys(node.children).map(function(k){return node.children[k].type==='dir'?k+'/':k;}).join('  ')||'(空)';
    case 'pwd': return CT_CWD;
    case 'cd': if(args[1]){var n=ctResolve(args[1]); if(n&&n.type==='dir')CT_CWD=args[1].startsWith('/')?args[1]:CT_CWD+'/'+args[1]; else return 'cd: 无此目录';} return '';
    case 'cat': var f=ctResolve(args[1]); if(!f)return 'cat: 文件不存在'; if(f.type==='dir')return 'cat: 是目录'; return f.content.replace(/\n/g,'\n');
    case 'echo': return args.slice(1).join(' ');
    case 'whoami': return 'root';
    case 'uname': return 'Linux';
    case 'uname -a': return 'Linux container 5.15.0-container #1 SMP x86_64 GNU/Linux';
    case 'date': return new Date().toString();
    case 'df': return 'Filesystem     1K-blocks    Used Available Use% Mounted on\noverlay          8388608 1048576   7340032  13% /\ntmpfs            4194304       0   4194304   0% /dev/shm';
    case 'free': return '              total        used        free\nMem:        8388608     2097152     6291456\nSwap:             0           0           0';
    case 'mkdir': if(args[1]){var parent=ctResolve(CT_CWD); if(parent&&parent.type==='dir')parent.children[args[1]]={type:'dir',children:{}};} return '';
    case 'touch': if(args[1]){var p2=ctResolve(CT_CWD); if(p2&&p2.type==='dir')p2.children[args[1]]={type:'file',content:''};} return '';
    case 'rm': if(args[1]){var p3=ctResolve(CT_CWD); if(p3&&p3.type==='dir')delete p3.children[args[1]];} return '';
    case 'clear': return '__CLEAR__';
    case 'exit': return 'logout';
    default: return c+': command not found';
  }
}
function ctClear(){ var term=el('ctTerm'); if(term)term.innerHTML='<span class="prompt">root@container:~# </span><span class="cursor">_</span>'; }
function ctScroll(){ var term=el('ctTerm'); if(term)term.scrollTop=term.scrollHeight; }
HANDLER.ctExec = ctExec; HANDLER.ctClear = ctClear;

// ============ 工具18：本地便签 ============
UI.note = function(){ return '\
<div class="tool-header"><div class="tool-icon">🗒️</div><div><h3>本地便签</h3><p>数据保存在浏览器本地，不上传服务器</p></div></div>\
<div class="form-row-inline"><input type="text" id="nTitle" class="input-mid" placeholder="标题..." />\
<input type="text" id="nSearch" class="input-mid" placeholder="搜索..." oninput="noteRender()" />\
<button class="btn btn-primary" onclick="noteSave()">保存</button></div>\
<textarea id="nBody" class="txt-area" placeholder="写下内容..."></textarea>\
<div class="note-list" id="noteList"></div>'; };
function noteSave(){
  var title=val('nTitle').trim()||'无标题';
  var body=val('nBody');
  if(!body.trim()){toast('内容为空');return;}
  var notes=JSON.parse(localStorage.getItem('yl_notes')||'[]');
  notes.unshift({id:Date.now(),title:title,body:body,time:new Date().toLocaleString()});
  localStorage.setItem('yl_notes',JSON.stringify(notes));
  setVal('nTitle',''); setVal('nBody','');
  noteRender(); toast('已保存');
}
function noteRender(){
  var notes=JSON.parse(localStorage.getItem('yl_notes')||'[]');
  var kw=val('nSearch').trim().toLowerCase();
  var list=el('noteList'); if(!list)return;
  var filtered=notes.filter(function(n){return !kw||n.title.toLowerCase().indexOf(kw)>=0||n.body.toLowerCase().indexOf(kw)>=0;});
  list.innerHTML=filtered.map(function(n){
    return '<div class="note-item" onclick="noteLoad('+n.id+')"><div class="note-title">'+escapeHtml(n.title)+'</div><div class="note-time">'+n.time+'</div><div class="note-snippet">'+escapeHtml(n.body.slice(0,60))+'</div><button class="btn-del" onclick="event.stopPropagation();noteDel('+n.id+')">删除</button></div>';
  }).join('')||'<div class="muted">暂无便签</div>';
}
function noteLoad(id){
  var notes=JSON.parse(localStorage.getItem('yl_notes')||'[]');
  var n=notes.find(function(x){return x.id===id;});
  if(n){setVal('nTitle',n.title);setVal('nBody',n.body);}
}
function noteDel(id){
  var notes=JSON.parse(localStorage.getItem('yl_notes')||'[]').filter(function(n){return n.id!==id;});
  localStorage.setItem('yl_notes',JSON.stringify(notes));
  noteRender(); toast('已删除');
}
HANDLER.noteSave = noteSave; HANDLER.noteRender = noteRender; HANDLER.noteLoad = noteLoad; HANDLER.noteDel = noteDel;

// ============ 工具20：IP 地址信息 ============
UI.ipinfo = function(){ return '\
<div class="tool-header"><div class="tool-icon">🌐</div><div><h3>IP 地址解析</h3><p>IPv4 地址分析、分类、合法性校验</p></div></div>\
<input type="text" id="ipIn" class="input-full" placeholder="输入 IPv4 地址，如 192.168.1.1" value="8.8.8.8" oninput="ipCalc()" />\
<div class="result-grid">\
<div class="result-item"><label>合法性</label><code id="ipValid">-</code></div>\
<div class="result-item"><label>地址类型</label><code id="ipClass">-</code></div>\
<div class="result-item"><label>二进制</label><code id="ipBin">-</code></div>\
<div class="result-item"><label>整数值</label><code id="ipInt">-</code></div>\
</div>'; };
function ipCalc(){
  var ip=val('ipIn').trim(); var parts=ip.split('.');
  var valid = parts.length===4 && parts.every(function(p){var n=parseInt(p);return /^\d+$/.test(p)&&n>=0&&n<=255;});
  setHTML('ipValid',valid?'<span class="ok">合法 IPv4</span>':'<span class="err">非法地址</span>');
  if(!valid){['ipClass','ipBin','ipInt'].forEach(function(i){setHTML(i,'-');});return;}
  var nums=parts.map(function(p){return parseInt(p);});
  var n=(nums[0]<<24)+(nums[1]<<16)+(nums[2]<<8)+nums[3];
  setHTML('ipInt',n.toLocaleString());
  setHTML('ipBin',nums.map(function(x){return x.toString(2).padStart(8,'0');}).join('.'));
  var c;
  if(nums[0]>=1&&nums[0]<=126)c='A 类（1.0.0.0 - 126.255.255.255）';
  else if(nums[0]===127)c='回环地址（127.0.0.0/8）';
  else if(nums[0]>=128&&nums[0]<=191)c='B 类（128.0.0.0 - 191.255.255.255）';
  else if(nums[0]>=192&&nums[0]<=223)c='C 类（192.0.0.0 - 223.255.255.255）';
  else if(nums[0]>=224&&nums[0]<=239)c='D 类（组播 224.0.0.0 - 239.255.255.255）';
  else if(nums[0]>=240&&nums[0]<=255)c='E 类（保留 240.0.0.0 - 255.255.255.255）';
  else c='未知';
  var type='公网地址';
  if(nums[0]===10)type='私网 A 类（10.0.0.0/8）';
  else if(nums[0]===172&&nums[1]>=16&&nums[1]<=31)type='私网 B 类（172.16.0.0/12）';
  else if(nums[0]===192&&nums[1]===168)type='私网 C 类（192.168.0.0/16）';
  else if(nums[0]===169&&nums[1]===254)type='链路本地（APIPA）';
  else if(nums[0]===0)type='本网络';
  setHTML('ipClass',type+' / '+c);
}
HANDLER.ipCalc = ipCalc;

// ============ 工具21：子网计算器 ============
UI.subnet = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔀</div><div><h3>子网计算器</h3><p>IPv4 子网划分，计算网络地址/广播地址/可用主机数</p></div></div>\
<div class="form-row"><label>IP</label>\
<input type="text" id="snIp" class="input-mid" placeholder="192.168.1.100" value="192.168.1.100" />\
<label>掩码</label>\
<select id="snMask" onchange="snCalc()">\
<option value="8">/8 (255.0.0.0)</option><option value="16">/16 (255.255.0.0)</option>\
<option value="24" selected>/24 (255.255.255.0)</option><option value="25">/25 (255.255.255.128)</option>\
<option value="26">/26 (255.255.255.192)</option><option value="27">/27 (255.255.255.224)</option>\
<option value="28">/28 (255.255.255.240)</option><option value="29">/29 (255.255.255.248)</option>\
<option value="30">/30 (255.255.255.252)</option></select>\
<button class="btn btn-primary" onclick="snCalc()">计算</button></div>\
<div class="result-grid">\
<div class="result-item"><label>网络地址</label><code id="snNet">-</code></div>\
<div class="result-item"><label>广播地址</label><code id="snBroadcast">-</code></div>\
<div class="result-item"><label>子网掩码</label><code id="snMaskOut">-</code></div>\
<div class="result-item"><label>可用主机数</label><code id="snHosts">-</code></div>\
<div class="result-item"><label>主机范围</label><code id="snRange">-</code></div>\
<div class="result-item"><label>通配符掩码</label><code id="snWild">-</code></div>\
</div>'; };
function ipToInt(ip){var p=ip.split('.').map(function(x){return parseInt(x);});return (p[0]<<24)+(p[1]<<16)+(p[2]<<8)+p[3];}
function intToIp(n){return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');}
function prefixToMask(p){return intToIp((0xFFFFFFFF<<(32-p))>>>0);}
function snCalc(){
  var ip=val('snIp').trim(), p=parseInt(val('snMask'))||24;
  var parts=ip.split('.'); var valid=parts.length===4&&parts.every(function(x){var n=parseInt(x);return n>=0&&n<=255;});
  if(!valid){toast('IP 地址无效');return;}
  var mask=(0xFFFFFFFF<<(32-p))>>>0; var ipn=ipToInt(ip);
  var net=ipn&mask, broadcast=(ipn&mask)|(~mask>>>0);
  var hosts=p>=31?0:((broadcast-net)-1);
  setHTML('snNet',intToIp(net));
  setHTML('snBroadcast',intToIp(broadcast));
  setHTML('snMaskOut',prefixToMask(p));
  setHTML('snHosts',hosts.toLocaleString());
  setHTML('snRange',p>=31?'N/A':intToIp(net+1)+' ~ '+intToIp(broadcast-1));
  setHTML('snWild',intToIp(~mask>>>0));
}
HANDLER.snCalc = snCalc;

// ============ 工具22：MAC 地址生成 ============
UI.mac = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔌</div><div><h3>MAC 地址生成</h3><p>生成随机 MAC 地址，可选厂商前缀</p></div></div>\
<div class="form-row-inline"><label>数量</label>\
<input type="number" id="macCount" value="5" min="1" max="50" style="width:70px" />\
<label>格式</label>\
<select id="macFmt"><option value=":">冒号(:)</option><option value="-">连字符(-)</option><option value=".">点号(.)</option><option value="">无分隔</option></select>\
<label class="cb"><input type="checkbox" id="macUpper" checked /> 大写</label>\
<button class="btn btn-primary" onclick="macGen()">生成</button>\
<button class="btn" onclick="copyText(val(\'macOut\'))">复制</button></div>\
<pre id="macOut" class="txt-out">点击生成</pre>'; };
function macGen(){
  var n=Math.max(1,Math.min(50,parseInt(val('macCount'))||1));
  var sep=val('macFmt'), upper=el('macUpper').checked, out=[];
  for(var i=0;i<n;i++){
    var bytes=[];
    for(var j=0;j<6;j++)bytes.push(Math.floor(Math.random()*256).toString(16).padStart(2,'0'));
    // 设置本地管理位
    bytes[0]=(parseInt(bytes[0],16)&0xFE|0x02).toString(16).padStart(2,'0');
    out.push(upper?bytes.join(sep).toUpperCase():bytes.join(sep));
  }
  setHTML('macOut',out.join('\n'));
}
HANDLER.macGen = macGen;

// ============ 工具23：换行转换 ============
UI.lineend = function(){ return '\
<div class="tool-header"><div class="tool-icon">↩️</div><div><h3>换行符转换</h3><p>在 Windows(CRLF) / Unix(LF) / Mac(CR) 之间互转</p></div></div>\
<textarea id="leIn" class="txt-area" placeholder="粘贴文本..."></textarea>\
<div class="toolbar">\
<button class="btn btn-primary" onclick="leOp(\'lf\')">转为 LF (Unix)</button>\
<button class="btn" onclick="leOp(\'crlf\')">转为 CRLF (Windows)</button>\
<button class="btn" onclick="leOp(\'cr\')">转为 CR (旧Mac)</button>\
<button class="btn" onclick="leDetect()">检测格式</button>\
<button class="btn" onclick="leOp(\'clear\')">清空</button>\
</div>\
<div class="stat-bar" id="leStat">字符：0</div>\
<pre id="leOut" class="txt-out"></pre>'; };
function leOp(t){
  var v=el('leIn').value; var out=el('leOut');
  if(!v&&t!=='clear'){toast('请先输入文本');return;}
  var r;
  if(t==='lf')r=v.replace(/\r\n/g,'\n').replace(/\r/g,'\n');
  else if(t==='crlf')r=v.replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/\n/g,'\r\n');
  else if(t==='cr')r=v.replace(/\r\n/g,'\r').replace(/\n/g,'\r');
  else if(t==='clear'){out.textContent='';setHTML('leStat','字符：0');return;}
  out.textContent=r;
  el('leIn').value=r;
  setHTML('leStat','字符：'+r.length+'　换行：'+(r.match(/\n/g)||[]).length+' 个 LF，'+(r.match(/\r\n/g)||[]).length+' 个 CRLF');
}
function leDetect(){
  var v=el('leIn').value; var c=0,l=0;
  for(var i=0;i<v.length;i++){if(v.charCodeAt(i)===13)c++;if(v.charCodeAt(i)===10)l++;}
  var type = c===l&&l>0?'CRLF (Windows)':l>0?'LF (Unix)':'CR (旧Mac)';
  setHTML('leStat','检测到：'+type+'　LF:'+l+' CR:'+c);
}
HANDLER.leOp = leOp; HANDLER.leDetect = leDetect;

// ============ 工具24：Lorem Ipsum 生成 ============
UI.lorem = function(){ return '\
<div class="tool-header"><div class="tool-icon">📄</div><div><h3>Lorem Ipsum 生成</h3><p>生成占位文本，用于排版演示</p></div></div>\
<div class="form-row-inline"><label>类型</label>\
<select id="lrType"><option value="paras">段落</option><option value="sentences">句子</option><option value="words">单词</option></select>\
<label>数量</label>\
<input type="number" id="lrCount" value="3" min="1" max="50" style="width:70px" />\
<label class="cb"><input type="checkbox" id="lrLatin" checked /> 拉丁文</label>\
<button class="btn btn-primary" onclick="lrGen()">生成</button>\
<button class="btn" onclick="copyText(val(\'lrOut\'))">复制</button></div>\
<pre id="lrOut" class="txt-out">点击生成</pre>'; };
var LATIN_WORDS=['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','eu','fugiat','nulla','pariatur'];
var CN_WORDS=['工具','效率','开源','代码','设计','用户','界面','功能','数据','安全','智能','快速','简洁','强大','灵活','可靠','创新','体验','优化','性能'];
function lrGen(){
  var type=val('lrType'), n=Math.max(1,Math.min(50,parseInt(val('lrCount'))||1));
  var latin=el('lrLatin').checked, words=latin?LATIN_WORDS:CN_WORDS, out=[];
  if(type==='words'){out.push(generateWords(words,n).join(' '));}
  else if(type==='sentences'){for(var i=0;i<n;i++)out.push(capitalize(generateWords(words,Math.floor(Math.random()*8)+5).join(' '))+'.');}
  else {for(var j=0;j<n;j++){var sc=Math.floor(Math.random()*4)+3;var s=[];for(var k=0;k<sc;k++)s.push(capitalize(generateWords(words,Math.floor(Math.random()*8)+5).join(' '))+'.');out.push(s.join(' '));}}
  setHTML('lrOut',out.join(type==='paras'?'\n\n':'\n'));
}
function generateWords(dict,n){var r=[];for(var i=0;i<n;i++)r.push(dict[Math.floor(Math.random()*dict.length)]);return r;}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}
HANDLER.lrGen = lrGen;

// ============ 工具25：端口信息 ============
UI.port = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔢</div><div><h3>端口信息查询</h3><p>查询常用端口的服务名和说明</p></div></div>\
<input type="text" id="ptIn" class="input-full" placeholder="输入端口号或关键词，如 80、ssh、mysql" oninput="ptQuery()" />\
<div class="toolbar"><button class="btn" onclick="ptQuick(80)">80</button><button class="btn" onclick="ptQuick(443)">443</button><button class="btn" onclick="ptQuick(22)">22</button><button class="btn" onclick="ptQuick(3306)">3306</button><button class="btn" onclick="ptQuick(6379)">6379</button><button class="btn" onclick="ptList()">全部</button></div>\
<div class="result-display" id="ptResult">输入端口号查询</div>\
<table class="tbl" id="ptTable" style="display:none"><thead><tr><th>端口</th><th>协议</th><th>服务</th><th>说明</th></tr></thead><tbody></tbody></table>'; };
var PORT_DB=[
  {p:20,proto:'TCP/UDP',s:'FTP-DATA',d:'FTP 数据传输'},
  {p:21,proto:'TCP',s:'FTP',d:'文件传输协议控制端口'},
  {p:22,proto:'TCP',s:'SSH',d:'安全远程登录'},
  {p:23,proto:'TCP',s:'Telnet',d:'明文远程登录（不安全）'},
  {p:25,proto:'TCP',s:'SMTP',d:'简单邮件传输'},
  {p:53,proto:'TCP/UDP',s:'DNS',d:'域名系统解析'},
  {p:67,proto:'UDP',s:'DHCP',d:'DHCP 服务端'},
  {p:68,proto:'UDP',s:'DHCP',d:'DHCP 客户端'},
  {p:80,proto:'TCP',s:'HTTP',d:'超文本传输协议'},
  {p:110,proto:'TCP',s:'POP3',d:'邮局协议 v3'},
  {p:123,proto:'UDP',s:'NTP',d:'网络时间协议'},
  {p:137,proto:'UDP',s:'NetBIOS-NS',d:'NetBIOS 名称服务'},
  {p:143,proto:'TCP',s:'IMAP',d:'邮件访问协议'},
  {p:161,proto:'UDP',s:'SNMP',d:'简单网络管理协议'},
  {p:179,proto:'TCP',s:'BGP',d:'边界网关协议'},
  {p:389,proto:'TCP/UDP',s:'LDAP',d:'轻量目录访问协议'},
  {p:443,proto:'TCP',s:'HTTPS',d:'加密 HTTP'},
  {p:445,proto:'TCP',s:'SMB',d:'Server Message Block'},
  {p:465,proto:'TCP',s:'SMTPS',d:'加密 SMTP'},
  {p:514,proto:'UDP',s:'Syslog',d:'系统日志服务'},
  {p:587,proto:'TCP',s:'SMTP-SUB',d:'邮件提交'},
  {p:631,proto:'TCP/UDP',s:'IPP',d:'Internet 打印协议'},
  {p:636,proto:'TCP',s:'LDAPS',d:'加密 LDAP'},
  {p:873,proto:'TCP',s:'Rsync',d:'文件同步'},
  {p:993,proto:'TCP',s:'IMAPS',d:'加密 IMAP'},
  {p:995,proto:'TCP',s:'POP3S',d:'加密 POP3'},
  {p:1080,proto:'TCP',s:'SOCKS',d:'SOCKS 代理'},
  {p:1433,proto:'TCP',s:'MSSQL',d:'Microsoft SQL Server'},
  {p:1521,proto:'TCP',s:'Oracle',d:'Oracle 数据库'},
  {p:1723,proto:'TCP',s:'PPTP',d:'VPN 隧道'},
  {p:2049,proto:'TCP/UDP',s:'NFS',d:'网络文件系统'},
  {p:2181,proto:'TCP',s:'ZooKeeper',d:'分布式协调服务'},
  {p:2375,proto:'TCP',s:'Docker',d:'Docker 守护进程（无 TLS）'},
  {p:2379,proto:'TCP',s:'etcd',d:'键值存储'},
  {p:3000,proto:'TCP',s:'Dev',d:'Node.js / React 开发常用'},
  {p:3306,proto:'TCP',s:'MySQL',d:'MySQL 数据库'},
  {p:3389,proto:'TCP',s:'RDP',d:'远程桌面协议'},
  {p:5432,proto:'TCP',s:'PostgreSQL',d:'PostgreSQL 数据库'},
  {p:5601,proto:'TCP',s:'Kibana',d:'Elasticsearch 可视化'},
  {p:5672,proto:'TCP',s:'AMQP',d:'RabbitMQ 消息队列'},
  {p:5900,proto:'TCP',s:'VNC',d:'虚拟网络控制台'},
  {p:5984,proto:'TCP',s:'CouchDB',d:'CouchDB 数据库'},
  {p:6379,proto:'TCP',s:'Redis',d:'Redis 缓存'},
  {p:6443,proto:'TCP',s:'K8s-API',d:'Kubernetes API Server'},
  {p:8080,proto:'TCP',s:'HTTP-Proxy',d:'HTTP 代理 / 备用端口'},
  {p:8443,proto:'TCP',s:'HTTPS-Alt',d:'HTTPS 备用端口'},
  {p:8888,proto:'TCP',s:'Common',d:'通用开发端口'},
  {p:9000,proto:'TCP',s:'SonarQube',d:'代码质量平台'},
  {p:9090,proto:'TCP',s:'Prometheus',d:'监控服务'},
  {p:9200,proto:'TCP',s:'Elasticsearch',d:'搜索与分析引擎'},
  {p:27017,proto:'TCP',s:'MongoDB',d:'MongoDB 数据库'},
  {p:27018,proto:'TCP',s:'MongoDB-Shard',d:'MongoDB 分片'},
  {p:50070,proto:'TCP',s:'Hadoop-NameNode',d:'Hadoop HDFS 管理'}
];
function ptQuick(p){setVal('ptIn',String(p));ptQuery();}
function ptQuery(){
  var q=val('ptIn').trim().toLowerCase(); var r=el('ptResult'); var tb=el('ptTable');
  if(!q){r.textContent='输入端口号查询';tb.style.display='none';return;}
  var num=parseInt(q); var exact=PORT_DB.filter(function(x){return x.p===num;});
  if(exact.length){r.innerHTML='<span class="badge good">端口 '+exact[0].p+'</span> '+exact[0].proto+' / '+exact[0].s+' — '+exact[0].d;tb.style.display='none';return;}
  var kw=PORT_DB.filter(function(x){return x.s.toLowerCase().indexOf(q)>=0||x.d.toLowerCase().indexOf(q)>=0;});
  if(kw.length){r.innerHTML='找到 '+kw.length+' 个相关端口：';renderPtTable(kw);tb.style.display='table';}
  else{r.innerHTML='<span class="err">未找到端口 '+q+' 的信息</span>';tb.style.display='none';}
}
function ptList(){setVal('ptIn','');renderPtTable(PORT_DB);el('ptResult').textContent='全部 '+PORT_DB.length+' 个常用端口：';el('ptTable').style.display='table';}
function renderPtTable(data){
  var tb=el('ptTable').querySelector('tbody');
  tb.innerHTML=data.slice(0,50).map(function(x){return '<tr><td>'+x.p+'</td><td>'+x.proto+'</td><td><strong>'+x.s+'</strong></td><td>'+x.d+'</td></tr>';}).join('')+(data.length>50?'<tr><td colspan="4" class="muted">仅显示前 50 条</td></tr>':'');
}
HANDLER.ptQuick = ptQuick; HANDLER.ptQuery = ptQuery; HANDLER.ptList = ptList;

// ============ 工具26：百分比计算器 ============
UI.percent = function(){ return '\
<div class="tool-header"><div class="tool-icon">📊</div><div><h3>百分比计算器</h3><p>百分比计算、增减、差值、占比</p></div></div>\
<div class="card-group">\
<div class="card-mini"><h4>① 求百分比</h4>\
<div class="form-row-inline"><input type="number" id="pcA1" placeholder="数值" style="width:100px" /> / <input type="number" id="pcA2" placeholder="总数" style="width:100px" /></div>\
<button class="btn btn-primary" onclick="pcOp(\'ratio\')">计算</button>\
<div class="result-display" id="pcR1">-</div></div>\
<div class="card-mini"><h4>② 求某数的百分比</h4>\
<div class="form-row-inline"><input type="number" id="pcB1" placeholder="数值" style="width:100px" /> 的 <input type="number" id="pcB2" placeholder="%" style="width:70px" /> %</div>\
<button class="btn btn-primary" onclick="pcOp(\'of\')">计算</button>\
<div class="result-display" id="pcR2">-</div></div>\
<div class="card-mini"><h4>③ 增减百分比</h4>\
<div class="form-row-inline"><input type="number" id="pcC1" placeholder="原值" style="width:100px" /> <select id="pcC3"><option value="up">增加</option><option value="down">减少</option></select> <input type="number" id="pcC2" placeholder="%" style="width:70px" /> %</div>\
<button class="btn btn-primary" onclick="pcOp(\'change\')">计算</button>\
<div class="result-display" id="pcR3">-</div></div>\
<div class="card-mini"><h4>④ 差值百分比</h4>\
<div class="form-row-inline"><input type="number" id="pcD1" placeholder="原值" style="width:100px" /> → <input type="number" id="pcD2" placeholder="新值" style="width:100px" /></div>\
<button class="btn btn-primary" onclick="pcOp(\'diff\')">计算变化率</button>\
<div class="result-display" id="pcR4">-</div></div>\
</div>'; };
function pcOp(t){
  var g=function(i){return parseFloat(val(i));};
  if(t==='ratio'){var a=g('pcA1'),b=g('pcA2');if(!b){toast('总数不能为0');return;}setHTML('pcR1',(a/b*100).toFixed(4)+'%');}
  else if(t==='of'){var v=g('pcB1'),p=g('pcB2');setHTML('pcR2',(v*p/100).toFixed(6));}
  else if(t==='change'){var o=g('pcC1'),pp=g('pcC2'),dir=val('pcC3');var r=dir==='up'?o*(1+pp/100):o*(1-pp/100);setHTML('pcR3',r.toFixed(6));}
  else if(t==='diff'){var old=g('pcD1'),nw=g('pcD2');if(!old){toast('原值不能为0');return;}var d=(nw-old)/Math.abs(old)*100;setHTML('pcR4',d.toFixed(2)+'% '+(d>0?'↑ 增长':'↓ 减少'));}
}
HANDLER.pcOp = pcOp;

// ============ 工具27：JSON ↔ YAML 转换 ============
UI.j2y = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔄</div><div><h3>JSON ↔ YAML 转换</h3><p>双向互转，支持格式化</p></div></div>\
<div class="layout-2col">\
<textarea id="jyIn" class="txt-area" placeholder="粘贴 JSON 或 YAML..."></textarea>\
<div class="layout-right">\
<div class="toolbar">\
<button class="btn btn-primary" onclick="jyOp(\'j2y\')">JSON→YAML</button>\
<button class="btn" onclick="jyOp(\'y2j\')">YAML→JSON</button>\
<button class="btn" onclick="jyOp(\'clear\')">清空</button>\
<button class="btn btn-primary" onclick="copyText(val(\'jyOut\'))">复制</button>\
</div>\
<pre id="jyOut" class="txt-out"></pre>\
</div></div>'; };
function jyOp(t){
  var v=val('jyIn'); var out=el('jyOut'); if(!out)return;
  try{
    if(t==='j2y'){var p=JSON.parse(v);out.textContent=jsonToYaml(p);out.className='txt-out ok';}
    else if(t==='y2j'){out.textContent=JSON.stringify(yamlToJson(v),null,2);out.className='txt-out ok';}
    else if(t==='clear'){out.textContent='';}
  }catch(e){out.textContent='错误：'+e.message;out.className='txt-out err';}
}
function jsonToYaml(obj,indent){
  indent=indent||'';
  if(obj===null)return indent+'null';
  if(typeof obj==='string')return indent+'"'+obj.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
  if(typeof obj==='number'||typeof obj==='boolean')return indent+obj;
  if(Array.isArray(obj)){if(!obj.length)return indent+'[]';return obj.map(function(item){var s=jsonToYaml(item,indent+'  ');return indent+'- '+(typeof item==='object'&&item!==null&&!Array.isArray(item)?'\n'+s:s.replace(/^  /,''));}).join('\n');}
  if(typeof obj==='object'){
    if(!Object.keys(obj).length)return indent+'{}';
    return Object.keys(obj).map(function(k){var v=obj[k];return indent+k+': '+(typeof v==='object'&&v!==null?'\n'+jsonToYaml(v,indent+'  '):jsonToYaml(v));}).join('\n');
  }
  return indent+String(obj);
}
function yamlToJson(yaml){
  // 简易 YAML 解析（支持基本结构）
  var lines=yaml.split('\n').filter(function(l){return l.trim()&&!l.trim().startsWith('#');});
  var stack=[], root=null;
  lines.forEach(function(line){
    var m=line.match(/^(\s*)([-\w]+)?\s*[:\-]?\s*(.*)$/);
    if(!m)return;
    var ind=m[1].length, key=m[2], val=m[3].trim();
    if(val==='')val=undefined; else { try{val=JSON.parse(val);}catch(e){val=val.replace(/^["']|["']$/g,'');} }
    // 简化：返回顶层对象的键值对
  });
  // 使用 Function 构造（利用 YAML 子集 ≈ JSON 兼容）
  var jsonLike=yaml
    .replace(/^(\s*)(\w+):/gm,'$1"$2":')
    .replace(/^(\s*)-\s*/gm,'$1')
    .replace(/:\s*([^"\d\[\{].*?)$/gm,function(m,p){return ': "'+p.trim()+'"';});
  try{return JSON.parse(jsonLike);}catch(e){
    // 退回简单实现
    var obj={};
    lines.forEach(function(l){
      var kv=l.split(':');
      if(kv.length>=2)obj[kv[0].trim()]=kv.slice(1).join(':').trim().replace(/^["']|["']$/g,'');
    });
    return obj;
  }
}
HANDLER.jyOp = jyOp;

// ============ 工具28：批量文本处理 ============
UI.batch = function(){ return '\
<div class="tool-header"><div class="tool-icon">📋</div><div><h3>批量文本处理</h3><p>对每行文本批量执行前缀/后缀/编号/查找替换</p></div></div>\
<textarea id="btIn" class="txt-area" placeholder="每行一个..."></textarea>\
<div class="form-row-inline"><label>操作</label>\
<select id="btOp">\
<option value="number">添加编号</option>\
<option value="prefix">添加前缀</option>\
<option value="suffix">添加后缀</option>\
<option value="findrep">查找替换</option>\
<option value="split">按分隔符拆列</option>\
<option value="join">合并为一行</option>\
</select>\
<span id="btExtra"></span>\
<button class="btn btn-primary" onclick="btGo()">执行</button>\
<button class="btn" onclick="copyText(val(\'btOut\'))">复制</button>\
</div>\
<textarea id="btOut" class="txt-area" readonly placeholder="结果..."></textarea>'; };
function btGo(){
  var v=val('btIn'); var op=val('btOp'); var out=el('btOut'); if(!out)return;
  var lines=v.split('\n'); var result=[];
  switch(op){
    case 'number':var p=val('btP')||'. ';result=lines.map(function(l,i){return (i+1)+p+l;});break;
    case 'prefix':var pf=val('btP2')||'';result=lines.map(function(l){return pf+l;});break;
    case 'suffix':var sf=val('btS2')||'';result=lines.map(function(l){return l+sf;});break;
    case 'findrep':var f=val('btF')||'',r=val('btR')||'';result=lines.map(function(l){return l.split(f).join(r);});break;
    case 'split':var d=val('btD')||'\t',c=parseInt(val('btC'))||0;result=lines.map(function(l){var a=l.split(d);return c>0?a[c-1]||'':a.join(' ');});break;
    case 'join':var j=val('btJ')||' ';result=[lines.join(j)];break;
  }
  out.value=result.join('\n');
}
function btOpChange(){
  var op=val('btOp'); var e=el('btExtra'); if(!e)return;
  var html={
    'number':'<input type="text" id="btP" placeholder="后缀如 . " style="width:80px" />',
    'prefix':'<input type="text" id="btP2" placeholder="前缀" style="width:100px" />',
    'suffix':'<input type="text" id="btS2" placeholder="后缀" style="width:100px" />',
    'findrep':'<input type="text" id="btF" placeholder="查找" style="width:90px" /> <input type="text" id="btR" placeholder="替换为" style="width:90px" />',
    'split':'<input type="text" id="btD" placeholder="分隔符" value="," style="width:70px" /> 取第 <input type="number" id="btC" value="1" style="width:60px" /> 列',
    'join':'<input type="text" id="btJ" placeholder="连接符" value=" " style="width:70px" />'
  }[op]||'';
  e.innerHTML=html;
}
HANDLER.btGo = btGo; HANDLER.btOpChange = btOpChange;

// ============ 工具29：图片 Base64 转换 ============
UI.imgb64 = function(){ return '\
<div class="tool-header"><div class="tool-icon">🖼️</div><div><h3>图片转 Base64</h3><p>本地转换，不上传服务器</p></div></div>\
<div class="form-row-inline"><input type="file" id="ibFile" accept="image/*" onchange="ibConvert()" />\
<button class="btn" onclick="copyText(val(\'ibOut\'))">复制</button>\
<button class="btn" onclick="ibDownload()">下载 data URI</button></div>\
<div class="hint">支持 PNG/JPG/GIF/WebP/SVG，最大 2MB</div>\
<textarea id="ibOut" class="txt-area" readonly placeholder="选择图片后自动转换..."></textarea>'; };
function ibConvert(){
  var f=el('ibFile').files[0]; var out=el('ibOut'); if(!f||!out)return;
  if(f.size>2*1024*1024){toast('图片超过 2MB 限制');return;}
  var r=new FileReader();
  r.onload=function(e){out.value=e.target.result;toast('转换完成，长度 '+e.target.result.length.toLocaleString()+' 字符');};
  r.onerror=function(){out.value='读取失败';};
  r.readAsDataURL(f);
}
function ibDownload(){
  var v=val('ibOut'); if(!v){toast('请先转换图片');return;}
  var blob=new Blob([v],{type:'text/plain'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download='data-uri.txt'; a.click();
  URL.revokeObjectURL(a.href);
}
HANDLER.ibConvert = ibConvert; HANDLER.ibDownload = ibDownload;

// ============ 工具30：颜色对比度检查 ============
UI.contrast = function(){ return '\
<div class="tool-header"><div class="tool-icon">👁️</div><div><h3>颜色对比度检查</h3><p>WCAG AA/AAA 对比度评级，无障碍设计必备</p></div></div>\
<div class="form-row-inline"><label>前景</label>\
<input type="color" id="csFg" value="#ffffff" oninput="csCalc()" />\
<input type="text" id="csFgHex" class="input-mid" value="#ffffff" oninput="csCalc()" />\
<label>背景</label>\
<input type="color" id="csBg" value="#1a1a26" oninput="csCalc()" />\
<input type="text" id="csBgHex" class="input-mid" value="#1a1a26" oninput="csCalc()" /></div>\
<div class="color-preview" id="csPreview" style="color:#fff;background:#1a1a26;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600">这是一段示例文本</div>\
<div class="result-grid">\
<div class="result-item"><label>对比度</label><code id="csRatio">-</code></div>\
<div class="result-item"><label>WCAG AA 普通</label><code id="csAA">-</code></div>\
<div class="result-item"><label>WCAG AA 大字</label><code id="csAAL">-</code></div>\
<div class="result-item"><label>WCAG AAA</label><code id="csAAA">-</code></div>\
</div>'; };
function csCalc(){
  var fg=val('csFgHex').trim()||val('csFg'), bg=val('csBgHex').trim()||val('csBg');
  if(!/^#?[0-9a-fA-F]{6}$/.test(fg)||!/^#?[0-9a-fA-F]{6}$/.test(bg))return;
  var l1=relLum(hexToRgbNum(fg)), l2=relLum(hexToRgbNum(bg));
  var lighter=Math.max(l1,l2), darker=Math.min(l1,l2);
  var ratio=(lighter+0.05)/(darker+0.05);
  setHTML('csRatio',ratio.toFixed(2)+' : 1');
  setHTML('csAA',ratio>=4.5?'<span class="ok">通过 ✓</span>':'<span class="err">未通过 ✗</span>');
  setHTML('csAAL',ratio>=3?'<span class="ok">通过 ✓</span>':'<span class="err">未通过 ✗</span>');
  setHTML('csAAA',ratio>=7?'<span class="ok">通过 ✓</span>':'<span class="err">未通过 ✗</span>');
  var pr=el('csPreview');
  pr.style.color=fg.charAt(0)==='#'?fg:'#'+fg;
  pr.style.background=bg.charAt(0)==='#'?bg:'#'+bg;
}
function hexToRgbNum(h){var s=h.replace('#','');if(s.length===3)s=s.split('').map(function(c){return c+c;}).join('');return {r:parseInt(s.substr(0,2),16),g:parseInt(s.substr(2,2),16),b:parseInt(s.substr(4,2),16)};}
function relLum(c){var f=function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b);}
HANDLER.csCalc = csCalc;

// ============ 工具31：正则表达式提取 ============
UI.regextract = function(){ return '\
<div class="tool-header"><div class="tool-icon">✂️</div><div><h3>正则提取</h3><p>从文本中提取所有匹配组</p></div></div>\
<input type="text" id="rxPat" class="input-full" placeholder="正则表达式，如 ([\\d]{3,4})-(\\d{7,8})" value="(\\w+@\\w+\\.\\w+)" />\
<textarea id="rxIn" class="txt-area" placeholder="粘贴要提取的文本...">联系邮箱：test@example.com 或 admin@demo.org，也可以发到 hello@world.net</textarea>\
<div class="toolbar"><button class="btn btn-primary" onclick="rxGo()">提取全部</button><button class="btn" onclick="rxGo(true)">提取首个</button><button class="btn" onclick="copyText(val(\'rxOut\'))">复制</button></div>\
<div class="stat-bar" id="rxStat">等待提取</div>\
<pre id="rxOut" class="txt-out"></pre>'; };
function rxGo(first){
  var pat=val('rxPat').trim(); var txt=val('rxIn'); var out=el('rxOut'); var stat=el('rxStat');
  if(!pat||!out)return;
  try{
    var re=new RegExp(pat,'g'); var m,results=[];
    if(first){var fm=txt.match(new RegExp(pat));results=fm||[];}
    else{while((m=re.exec(txt))!==null){results.push(m[0]+(m.length>1?'  ← '+m.slice(1).join(' | '):''));}}
    out.textContent=results.length?results.join('\n'):'无匹配';
    if(stat)stat.textContent='提取到 '+results.length+' 条结果';
  }catch(e){out.textContent='正则错误：'+e.message;out.className='txt-out err';}
}
HANDLER.rxGo = rxGo;

// ============ 工具32：字符计数器 ============
UI.charcount = function(){ return '\
<div class="tool-header"><div class="tool-icon">🔤</div><div><h3>高级字符计数</h3><p>详细统计字符、单词、句子、段落、阅读时长</p></div></div>\
<textarea id="ccIn" class="txt-area" placeholder="输入或粘贴文本...">这是一段用于演示字符统计的示例文本。It contains English and 中文混合内容。</textarea>\
<div class="stat-grid">\
<div class="stat-box"><div class="stat-num" id="ccChars">0</div><div class="stat-label">字符（含空格）</div></div>\
<div class="stat-box"><div class="stat-num" id="ccCharsNo">0</div><div class="stat-label">字符（不含空格）</div></div>\
<div class="stat-box"><div class="stat-num" id="ccWords">0</div><div class="stat-label">单词</div></div>\
<div class="stat-box"><div class="stat-num" id="ccCn">0</div><div class="stat-label">中文字符</div></div>\
<div class="stat-box"><div class="stat-num" id="ccLines">0</div><div class="stat-label">行数</div></div>\
<div class="stat-box"><div class="stat-num" id="ccRead">0</div><div class="stat-label">阅读(分钟)</div></div>\
</div>'; };
function ccCount(){
  var t=val('ccIn'); var noSpace=t.replace(/\s/g,'');
  setHTML('ccChars',t.length);
  setHTML('ccCharsNo',noSpace.length);
  setHTML('ccCn',(t.match(/[\u4e00-\u9fa5]/g)||[]).length);
  setHTML('ccWords',t.trim()?(t.trim().match(/[a-zA-Z0-9]+/g)||[]).length:0);
  setHTML('ccLines',t.length===0?0:t.split('\n').length);
  var read=Math.max(1,Math.ceil(t.length/400));
  setHTML('ccRead',read);
}
HANDLER.ccCount = ccCount;

// ============ 工具19：代码格式化（HTML/JS/CSS） ============
UI.format = function(){ return '\
<div class="tool-header"><div class="tool-icon">✨</div><div><h3>代码格式化</h3><p>HTML / CSS / JavaScript 缩进整理</p></div></div>\
<textarea id="fmtIn" class="txt-area" placeholder="粘贴代码..."></textarea>\
<div class="toolbar">\
<button class="btn btn-primary" onclick="fmtOp(\'html\')">HTML</button>\
<button class="btn" onclick="fmtOp(\'css\')">CSS</button>\
<button class="btn" onclick="fmtOp(\'js\')">JavaScript</button>\
<button class="btn" onclick="fmtOp(\'clear\')">清空</button>\
<button class="btn btn-primary" onclick="copyText(val(\'fmtOut\'))">复制</button>\
</div>\
<pre id="fmtOut" class="txt-out"></pre>'; };
function fmtOp(type){
  var v=val('fmtIn'); var out=el('fmtOut'); if(!out)return;
  try{
    if(type==='html'){ out.textContent=formatHTML(v); }
    else if(type==='css'){ out.textContent=formatCSS(v); }
    else if(type==='js'){ out.textContent=formatJS(v); }
    else if(type==='clear'){ out.textContent=''; }
  }catch(e){out.textContent='格式化失败：'+e.message;out.className='txt-out err';}
}
function formatHTML(s){
  // 简易缩进：按标签分行
  s=s.replace(/></g,'>\n<').replace(/^\s+|\s+$/g,'');
  var indent=0,lines=s.split('\n'),out=[];
  lines.forEach(function(line){
    var t=line.trim();
    if(!t)return;
    if(/^<\/(html|head|body|div|section|article|main|footer|header|nav|ul|ol|li|table|tr|td|th|form|script|style)/.test(t))indent=Math.max(0,indent-1);
    out.push('  '.repeat(indent)+t);
    if(/<(html|head|body|div|section|article|main|footer|header|nav|ul|ol|li|table|tr|td|th|form|script|style)[^>]*>$/.test(t)&&!/<\//.test(t))indent++;
  });
  return out.join('\n');
}
function formatCSS(s){ return s.replace(/\{/g,' {\n  ').replace(/;/g,';\n  ').replace(/\}/g,'\n}\n').replace(/  \n/g,'\n').replace(/\n\s*\n\s*\n/g,'\n\n'); }
function formatJS(s){
  try{ return js_beautify?js_beautify(s,{indent_size:2}):s.replace(/\{/g,'{\n').replace(/;/g,';\n').replace(/\}/g,'}\n'); }
  catch(e){ return s; }
}
HANDLER.fmtOp = fmtOp;

// ============ 页面交互 ============
var TOOLS = [
  {id:'calc', cat:'calc', name:'计算器', desc:'科学计算与算式解析', icon:'🧮', hot:true},
  {id:'unit', cat:'convert', name:'单位换算', desc:'长度/重量/面积/温度', icon:'🔄'},
  {id:'baseconv', cat:'convert', name:'进制转换', desc:'2/8/10/16 进制互转', icon:'🔢'},
  {id:'text', cat:'text', name:'文本处理', desc:'统计/转换/去重/排序', icon:'📝', hot:true},
  {id:'json', cat:'dev', name:'JSON 美化', desc:'格式化校验与压缩', icon:'🧬'},
  {id:'regex', cat:'dev', name:'正则测试', desc:'实时匹配高亮', icon:'🧲'},
  {id:'random', cat:'fun', name:'随机生成器', desc:'整数/抽签/强密码', icon:'🎲'},
  {id:'uuid', cat:'dev', name:'UUID 生成', desc:'批量生成 UUID v4', icon:'🆔'},
  {id:'url', cat:'encode', name:'URL 编解码', desc:'编码/解码/参数解析', icon:'🔗'},
  {id:'base64', cat:'encode', name:'Base64', desc:'文本与 Base64 互转', icon:'🔐'},
  {id:'hash', cat:'encode', name:'哈希计算', desc:'MD5/SHA 系列', icon:'#️⃣'},
  {id:'timestamp', cat:'time', name:'时间戳转换', desc:'时间戳与日期互转', icon:'⏱️'},
  {id:'color', cat:'design', name:'颜色工具', desc:'HEX/RGB/HSL 互转', icon:'🎨'},
  {id:'qrcode', cat:'encode', name:'二维码生成', desc:'文本转二维码', icon:'🔲'},
  {id:'blocker', cat:'yl', name:'广告规则查询', desc:'游龙广告拦截引擎', icon:'🛡️', hot:true},
  {id:'shield', cat:'yl', name:'安全体检', desc:'游龙安全护盾检测', icon:'🔒', hot:true},
  {id:'container', cat:'yl', name:'容器终端', desc:'游龙容器沙箱模拟', icon:'📦', hot:true},
  {id:'note', cat:'life', name:'本地便签', desc:'本地存储不丢笔记', icon:'🗒️'},
  {id:'format', cat:'dev', name:'代码格式化', desc:'HTML/CSS/JS 整理', icon:'✨'},
  {id:'ipinfo', cat:'net', name:'IP 地址解析', desc:'IPv4 分类与合法性校验', icon:'🌐'},
  {id:'subnet', cat:'net', name:'子网计算器', desc:'网络地址/掩码/主机数', icon:'🔀'},
  {id:'mac', cat:'net', name:'MAC 生成器', desc:'随机 MAC 地址', icon:'🔌'},
  {id:'port', cat:'net', name:'端口查询', desc:'56 个常用端口速查', icon:'🔢'},
  {id:'lineend', cat:'text', name:'换行符转换', desc:'CRLF/LF/CR 互转', icon:'↩️'},
  {id:'lorem', cat:'text', name:'占位文本', desc:'Lorem Ipsum 生成', icon:'📄'},
  {id:'percent', cat:'calc', name:'百分比计算', desc:'占比/增减/差值', icon:'📊'},
  {id:'j2y', cat:'dev', name:'JSON↔YAML', desc:'双向格式互转', icon:'🔄'},
  {id:'batch', cat:'text', name:'批量文本处理', desc:'前缀/编号/拆列', icon:'📋'},
  {id:'imgb64', cat:'encode', name:'图片转 Base64', desc:'本地转换不上传', icon:'🖼️'},
  {id:'contrast', cat:'design', name:'对比度检查', desc:'WCAG 无障碍评级', icon:'👁️'},
  {id:'regextract', cat:'dev', name:'正则提取', desc:'批量提取匹配内容', icon:'✂️'},
  {id:'charcount', cat:'text', name:'字符计数', desc:'详细字数/阅读时长', icon:'🔤'}
];
var CATEGORIES = [
  {id:'all', name:'全部', icon:'🌐'},
  {id:'calc', name:'计算', icon:'🧮'},
  {id:'convert', name:'换算', icon:'🔄'},
  {id:'text', name:'文本', icon:'📝'},
  {id:'encode', name:'编码', icon:'🔐'},
  {id:'time', name:'时间', icon:'⏱️'},
  {id:'dev', name:'开发', icon:'🧬'},
  {id:'design', name:'设计', icon:'🎨'},
  {id:'fun', name:'趣味', icon:'🎲'},
  {id:'life', name:'生活', icon:'🗒️'},
  {id:'net', name:'网络', icon:'🌍'},
  {id:'yl', name:'游龙核心', icon:'🐉'}
];
var currentCat = 'all';
var currentTool = null;

function renderCategories(){
  var html=CATEGORIES.map(function(c){return '<button class="cat-chip'+(c.id===currentCat?' active':'')+'" data-cat="'+c.id+'" onclick="switchCat(\''+c.id+'\')">'+c.icon+' '+c.name+'</button>';}).join('');
  setHTML('categories',html);
}
function switchCat(cat){
  currentCat=cat;
  renderCategories();
  renderCards();
}
function renderCards(){
  var list=TOOLS.filter(function(t){return currentCat==='all'||t.cat===currentCat;});
  var html=list.map(function(t){
    return '<div class="tool-card" data-id="'+t.id+'" onclick="openTool(\''+t.id+'\')">'+
      '<div class="tool-card-icon">'+t.icon+'</div>'+
      '<div class="tool-card-info">'+
        '<h4>'+t.name+'</h4>'+
        '<p>'+t.desc+'</p>'+
      '</div>'+
      (t.hot?'<span class="hot-badge">热门</span>':'')+
    '</div>';
  }).join('');
  setHTML('cards',html||'<div class="empty">该分类下暂无工具</div>');
}
function openTool(id){
  var t=TOOLS.find(function(x){return x.id===id;});
  if(!t)return;
  currentTool=id;
  el('overlay').classList.add('show');
  el('panelTitle').textContent=t.name;
  el('panelIcon').textContent=t.icon;
  var body=el('panelBody');
  body.innerHTML='';
  if(UI[id]) body.innerHTML=UI[id]();
  // 执行初始化
  setTimeout(function(){ if(HANDLER[id+'Init'])HANDLER[id+'Init'](); bindDynamic(); },0);
  document.body.style.overflow='hidden';
}
function closePanel(){
  el('overlay').classList.remove('show');
  document.body.style.overflow='';
  currentTool=null;
}
function bindDynamic(){
  // 文本处理统计绑定
  var ti=el('txtInput');
  if(ti){ ti.removeEventListener('input',txtStat); ti.addEventListener('input',txtStat); txtStat(); }
  // 换行转换
  var lei=el('leIn');
  if(lei){ lei.removeEventListener('input',ccCountProxy); lei.addEventListener('input',ccCountProxy); }
  // 字符计数
  var cc=el('ccIn');
  if(cc){ cc.removeEventListener('input',ccCount); cc.addEventListener('input',ccCount); ccCount(); }
  // 批量处理下拉
  var btop=el('btOp');
  if(btop){ btop.removeEventListener('change',btOpChange); btop.addEventListener('change',btOpChange); btOpChange(); }
  // 颜色初始化
  if(currentTool==='color')cUpdate('#00f0ff');
  if(currentTool==='contrast')csCalc();
  if(currentTool==='timestamp'){tsRefresh();tsSetNowDate();}
  if(currentTool==='ipinfo')ipCalc();
  if(currentTool==='subnet')snCalc();
  if(currentTool==='blInit')blInit();
  if(currentTool==='note')noteRender();
}
function ccCountProxy(){ var t=val('leIn'); el('leStat').textContent='字符：'+t.length+'　行：'+(t?t.split('\n').length:0); }
function filterTools(){
  var kw=val('searchInput').toLowerCase().trim();
  var list=TOOLS.filter(function(t){
    return !kw||t.name.toLowerCase().indexOf(kw)>=0||t.desc.toLowerCase().indexOf(kw)>=0;
  });
  setHTML('cards',list.map(function(t){
    return '<div class="tool-card" data-id="'+t.id+'" onclick="openTool(\''+t.id+'\')">'+
      '<div class="tool-card-icon">'+t.icon+'</div>'+
      '<div class="tool-card-info"><h4>'+t.name+'</h4><p>'+t.desc+'</p></div>'+
      (t.hot?'<span class="hot-badge">热门</span>':'')+'</div>';
  }).join('')||'<div class="empty">没有找到相关工具</div>');
}
var THEMES=['dark','light','green','sunset','mono','ocean'];
function setTheme(name){
  document.documentElement.setAttribute('data-theme',name);
  try{localStorage.setItem('yl_theme',name);}catch(e){}
  var opts=document.querySelectorAll('.theme-opt');
  opts.forEach(function(o){o.classList.toggle('active',o.dataset.th===name);});
  el('themePanel').classList.remove('show');
  // 更新logo动画色
  var logo=document.querySelector('.logo');
  if(logo){logo.style.background=name==='mono'?'#fff':'linear-gradient(135deg,var(--cyan),var(--purple))';}
}
function toggleThemePanel(){
  el('themePanel').classList.toggle('show');
}
function toggleTheme(){
  var d=document.documentElement;
  var cur=d.getAttribute('data-theme')||'dark';
  var idx=THEMES.indexOf(cur);
  setTheme(THEMES[(idx+1)%THEMES.length]);
}
// 拦截引擎全局接口（由 engine.js 提供）
window.BLOCKER = window.BLOCKER || null;

// 启动
document.addEventListener('DOMContentLoaded',function(){
  // 恢复主题
  var saved='dark';
  try{saved=localStorage.getItem('yl_theme')||'dark';}catch(e){}
  setTheme(saved);
  renderCategories();
  renderCards();
  // 统计
  el('statTools').textContent=TOOLS.length;
  var rc = window.__YL_RULES__ ? window.__YL_RULES__.length : 0;
  el('statRules').textContent = rc ? rc.toLocaleString() : 0;
  blInit();
  el('searchInput').addEventListener('input',filterTools);
  el('overlay').addEventListener('click',function(e){if(e.target===el('overlay'))closePanel();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closePanel();});
  // 点击外部关闭主题面板
  document.addEventListener('click',function(e){
    if(!e.target.closest('.theme-switcher'))el('themePanel').classList.remove('show');
  });
  // 回到顶部
  var bt=el('backTop');
  window.addEventListener('scroll',function(){
    bt.classList.toggle('show',window.scrollY>400);
  });
});


