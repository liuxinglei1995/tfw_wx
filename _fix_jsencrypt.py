# -*- coding: utf-8 -*-
import io
p = 'common/jsencrypt.min.js'
s = io.open(p, encoding='utf-8').read()

old1 = 'if(!c&&"undefined"!=typeof global&&global.crypto&&(c=global.crypto),!c&&"function"==typeof require)try{c=require("crypto")}catch(d){}'
n1 = s.count(old1)
print('old1 count =', n1)

old2 = 'return e=function(){if(c){if("function"==typeof c.getRandomValues)try{return c.getRandomValues(new Uint32Array(1))[0]}catch(a){}if("function"==typeof c.randomBytes)try{return c.randomBytes(4).readInt32LE()}catch(a){}}throw new Error("Native crypto module could not be used to get secure random number.")}'
n2 = s.count(old2)
print('old2 count =', n2)

new2 = 'return e=function(){return Math.floor(Math.random()*4294967296)}'

s = s.replace(old1, '').replace(old2, new2)
io.open(p, 'w', encoding='utf-8').write(s)
print('saved. replaced old1=%d old2=%d' % (n1, n2))
