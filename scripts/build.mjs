import './generate-fixtures.mjs';
import {mkdirSync,cpSync,writeFileSync,readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);mkdirSync(new URL('dist/',root),{recursive:true});
for(const f of ['index.html','app.js','domain.js','hash.js','drawing-viewer.js','style.css']){cpSync(new URL('src/'+f,root),new URL(f,root));cpSync(new URL('src/'+f,root),new URL('dist/'+f,root));}
cpSync(new URL('src/drawing-core/',root),new URL('drawing-core/',root),{recursive:true});
cpSync(new URL('src/drawing-core/',root),new URL('dist/drawing-core/',root),{recursive:true});
mkdirSync(new URL('drawing-library/',root),{recursive:true});const library=[];
for(const file of readdirSync(new URL('fixtures/source-drawings/',root)).filter(x=>x.endsWith('.svg')).sort()){const content=readFileSync(new URL('fixtures/source-drawings/'+file,root),'utf8');writeFileSync(new URL('drawing-library/'+file,root),content);writeFileSync(new URL('drawing-library/'+file+'.source.txt',root),content);library.push({file,path:'drawing-library/'+file+'.source.txt',sha256:createHash('sha256').update(content).digest('hex')});}
writeFileSync(new URL('drawing-library/manifest.json',root),JSON.stringify(library,null,2)+'\n');cpSync(new URL('drawing-library/',root),new URL('dist/drawing-library/',root),{recursive:true});
for(const f of ['catalog.json','files'])cpSync(new URL(f,root),new URL('dist/'+f,root),{recursive:true});
writeFileSync(new URL('.nojekyll',root),'');writeFileSync(new URL('dist/.nojekyll',root),'');
console.log('Prepared main / (root) publication and dist preview.');
