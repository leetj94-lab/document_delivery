import './generate-fixtures.mjs';
import {mkdirSync,cpSync,writeFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);mkdirSync(new URL('dist/',root),{recursive:true});
for(const f of ['index.html','app.js','domain.js','hash.js','style.css']){cpSync(new URL('src/'+f,root),new URL(f,root));cpSync(new URL('src/'+f,root),new URL('dist/'+f,root));}
for(const f of ['catalog.json','files'])cpSync(new URL(f,root),new URL('dist/'+f,root),{recursive:true});
writeFileSync(new URL('.nojekyll',root),'');writeFileSync(new URL('dist/.nojekyll',root),'');
console.log('Prepared main / (root) publication and dist preview.');
