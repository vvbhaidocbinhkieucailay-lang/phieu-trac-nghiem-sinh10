(function () {
  'use strict';
  const exam = window.EXAM, engine = window.PHIEU;
  const $ = id => document.getElementById(id);
  const STORAGE = 'sinh10-101-128-v1';
  const blank = () => ({ mc:Array(12).fill(''), tf:[Array(4).fill(''),Array(4).fill('')], short:Array.from({length:8},()=>Array(4).fill('')), essay:Array(3).fill(''), name:'', className:'', studentId:'', prompts:true, submitted:false, submittedAt:'' });
  const clean = raw => {
    const s = blank();
    if (!raw || typeof raw !== 'object') return s;
    for (let i=0;i<12;i++) if (['A','B','C','D'].includes(raw.mc?.[i])) s.mc[i]=raw.mc[i];
    for (let i=0;i<2;i++) for(let j=0;j<4;j++) if(['D','S'].includes(raw.tf?.[i]?.[j])) s.tf[i][j]=raw.tf[i][j];
    for(let i=0;i<8;i++) for(let j=0;j<4;j++) { const v=raw.short?.[i]?.[j]; if(typeof v==='string' && /^(?:[0-9,.\-]|)$/.test(v)) s.short[i][j]=v==='.'?',':v; }
    ['name','className','studentId'].forEach(k=>s[k]=typeof raw[k]==='string'?raw[k].slice(0,k==='name'?80:20):'');
    for(let i=0;i<3;i++) s.essay[i]=typeof raw.essay?.[i]==='string'?raw.essay[i].slice(0,6000):'';
    s.prompts=raw.prompts!==false;
    s.submitted=raw.submitted===true;
    s.submittedAt=typeof raw.submittedAt==='string' && !isNaN(Date.parse(raw.submittedAt))?raw.submittedAt:'';
    return s;
  };
  let state=blank(), storageWorks=true;
  try {state=clean(JSON.parse(localStorage.getItem(STORAGE)));} catch {storageWorks=false;}
  function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));storageWorks=true;}catch{storageWorks=false;}$('save-status').textContent=storageWorks?'Đã lưu trên thiết bị này':'Không tự lưu được; hãy giữ trang mở';}
  function node(tag,text,cls){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;}
  function choice(name,value,checked,labelText,spoken,handler,showLetter=true){
    const label=node('label',undefined,'choice');const input=node('input');input.type='radio';input.name=name;input.value=value;input.checked=checked;input.setAttribute('aria-label',spoken);
    const bubble=node('span',showLetter?value:'','bubble');bubble.setAttribute('aria-hidden','true');label.append(input,bubble);
    if(labelText)label.append(node('span',labelText,'choice-text'));
    input.addEventListener('change',()=>{if(state.submitted)return;handler(value);updateProgress();save();});
    return label;
  }
  function render(){
    $('mc-questions').replaceChildren();$('tf-questions').replaceChildren();$('short-questions').replaceChildren();$('essay-questions').replaceChildren();
    exam.mc.forEach((q,i)=>{
      const fs=node('fieldset',undefined,'question');fs.append(node('legend',`Câu ${i+1}`),node('p',q.stem,'prompt'));
      const opts=node('div',undefined,'options');
      q.options.forEach((text,j)=>{const v='ABCD'[j];opts.append(choice(`mc-${i}`,v,state.mc[i]===v,text,`Phần A câu ${i+1}, đáp án ${v}`,v=>state.mc[i]=v));});
      fs.append(opts);$('mc-questions').append(fs);
    });
    exam.tf.forEach((q,i)=>{
      const card=node('div',undefined,'question');card.append(node('h3',`Câu ${i+1}`,'tf-title'),node('p',q.stem,'prompt'));
      const header=node('div',undefined,'tf-header');header.append(node('span','Nhận định'),node('span','Đúng'),node('span','Sai'));card.append(header);
      q.items.forEach((item,j)=>{
        const row=node('div',undefined,'tf-row');row.setAttribute('role','group');row.setAttribute('aria-label',`Phần B câu ${i+1}, ý ${'abcd'[j]}`);
        const text=node('div');text.append(node('b',`${'abcd'[j]}) `),node('span',item.text,'statement-text'));row.append(text);
        ['D','S'].forEach(v=>row.append(choice(`tf-${i}-${j}`,v,state.tf[i][j]===v,'',`Phần B câu ${i+1} ý ${'abcd'[j]}, ${v==='D'?'Đúng':'Sai'}`,v=>state.tf[i][j]=v,false)));
        card.append(row);
      });$('tf-questions').append(card);
    });
    exam.short.forEach((q,i)=>{
      const card=node('article',undefined,'question short-card');card.id=`short-card-${i}`;
      const title=node('div',undefined,'short-title');title.append(node('h3',`Câu ${i+1}`));
      const input=node('input',undefined,'short-answer');input.type='text';input.id=`short-${i}`;input.maxLength=4;input.inputMode='decimal';input.autocomplete='off';input.placeholder='…';input.setAttribute('aria-label',`Phần C câu ${i+1}, kết quả`);input.setAttribute('aria-describedby',`short-error-${i}`);
      input.addEventListener('input',()=>{
        if(state.submitted)return;
        const text=input.value.replace(/\./g,',');input.value=text;state.short[i]=Array.from({length:4},(_,j)=>text[j]||'');syncDigits(i,false);updateProgress();save();
      });title.append(input);card.append(title,node('p',q.stem,'prompt'));
      const error=node('p','','answer-error');error.id=`short-error-${i}`;error.setAttribute('aria-live','polite');card.append(error);
      const details=node('details');details.append(node('summary','Tô từng chữ số'));
      const grid=node('div',undefined,'digit-grid');grid.append(node('span',''));
      for(let j=0;j<4;j++){const value=node('span','','digit-value');value.id=`digit-value-${i}-${j}`;value.setAttribute('aria-label',`Cột ${j+1}`);grid.append(value);}
      ['-',',',...'0123456789'].forEach(ch=>{
        grid.append(node('span',ch==='-'?'−':ch,'row-name'));
        for(let j=0;j<4;j++){
          if((ch==='-' && j!==0)||(ch===',' && j===0)){grid.append(node('span',''));continue;}
          const b=node('button',undefined,'digit-btn');b.type='button';b.dataset.question=i;b.dataset.column=j;b.dataset.char=ch;
          b.setAttribute('aria-label',`Câu ngắn ${i+1}, cột ${j+1}, ${ch==='-'?'dấu âm':ch===','?'dấu phẩy':ch}`);b.setAttribute('aria-pressed','false');
          const dot=node('span',undefined,'digit-circle');dot.setAttribute('aria-hidden','true');b.append(dot);
          b.addEventListener('click',()=>{if(state.submitted)return;state.short[i][j]=state.short[i][j]===ch?'':ch;syncDigits(i,true);updateProgress();save();});grid.append(b);
        }
      });details.append(grid,node('p','Chạm lại vào ô đã tô để bỏ chọn.','digits-note'));card.append(details);$('short-questions').append(card);
    });
    exam.essay.forEach((text,i)=>{
      const d=node('details');d.append(node('summary',`Câu ${i+1} · 1 điểm`),node('p',text,'prompt'));
      const area=node('textarea');area.maxLength=6000;area.value=state.essay[i];area.placeholder='Gõ câu trả lời để lưu cùng bài làm…';area.setAttribute('aria-label',`Tự luận câu ${i+1}`);area.addEventListener('input',()=>{if(!state.submitted){state.essay[i]=area.value;save();}});d.append(area);$('essay-questions').append(d);
    });
    $('student-name').value=state.name;$('student-class').value=state.className;$('student-id').value=state.studentId;$('show-prompts').checked=state.prompts;
    togglePrompts();for(let i=0;i<8;i++)syncDigits(i,true);updateProgress();lock(state.submitted);
  }
  function syncDigits(i,writeInput){
    const cols=state.short[i], parsed=engine.readColumns(cols);
    if(writeInput)$(`short-${i}`).value=cols.join('');
    for(let j=0;j<4;j++)$(`digit-value-${i}-${j}`).textContent=cols[j];
    $(`short-card-${i}`).querySelectorAll('.digit-btn').forEach(b=>b.setAttribute('aria-pressed',String(cols[Number(b.dataset.column)]===b.dataset.char)));
    $(`short-${i}`).setAttribute('aria-invalid',String(!parsed.empty&&!parsed.valid));
    $(`short-error-${i}`).textContent=parsed.empty||parsed.valid?'':parsed.gap?'Có cột trống ở giữa. Hãy tô liền từ cột đầu.':'Số chưa hợp lệ. Ví dụ: 3, 12, −2 hoặc 1,5.';
  }
  function updateProgress(){
    const a=state.mc.filter(Boolean).length,b=state.tf.flat().filter(Boolean).length,c=state.short.filter(x=>engine.readColumns(x).valid).length;
    $('count-a').textContent=`${a}/12`;$('count-b').textContent=`${b}/8 ý`;$('count-c').textContent=`${c}/8`;
    $('progress').value=a+b+c;$('progress-label').textContent=`Đã trả lời ${a+b+c}/28 câu và ý`;
    $('submit-status').textContent=state.submitted?'Bài làm đã được chấm':a+b+c===28?'Đã hoàn thành phần trắc nghiệm':`Còn ${28-a-b-c} câu / ý chưa trả lời`;
    return a+b+c;
  }
  function togglePrompts(){document.body.classList.toggle('no-prompts',!state.prompts);}
  function lock(locked){
    $('answer-form').querySelectorAll('input:not(#show-prompts),textarea,.digit-btn').forEach(el=>el.disabled=locked);
    $('submit').disabled=locked;$('submit').textContent=locked?'Đã chấm bài':'Nộp bài và xem điểm →';
  }
  function confirmAction(title,message,label){
    return new Promise(resolve=>{
      const dialog=$('confirm-dialog');$('dialog-title').textContent=title;$('dialog-message').textContent=message;$('dialog-confirm').textContent=label;
      dialog.returnValue='cancel';dialog.addEventListener('close',()=>resolve(dialog.returnValue==='confirm'),{once:true});dialog.showModal();
    });
  }
  const format=n=>new Intl.NumberFormat('vi-VN',{maximumFractionDigits:2}).format(n);
  function displayValue(v){return v==='D'?'Đúng':v==='S'?'Sai':v||'Bỏ trống';}
  function showResult(scroll){
    const r=engine.grade(exam,state);$('result').hidden=false;document.body.classList.add('has-result');
    $('total-score').textContent=format(r.total);
    const who=[state.name||'Bài luyện tập',state.className?`Lớp ${state.className}`:'',state.studentId?`SBD ${state.studentId}`:'','Mã 101'].filter(Boolean).join(' · ');
    $('result-person').textContent=who;$('result-summary').textContent=`Đúng ${r.correct}/28 câu và ý. ${28-Object.values(r.answered).reduce((a,b)=>a+b,0)} câu / ý bỏ trống.`;
    $('score-parts').replaceChildren();[['mc','A. Nhiều lựa chọn',12,3],['tf','B. Đúng–sai',8,2],['short','C. Trả lời ngắn',8,2]].forEach(([key,label,max,total])=>{
      const p=node('div');p.append(node('span',label),node('b',`${format(r.points[key])} / ${total}`),node('small',`${r.counts[key]}/${max} ${key==='tf'?'ý':'câu'} đúng`));$('score-parts').append(p);
    });
    $('review-content').replaceChildren();
    [['mc','Phần A · Nhiều lựa chọn'],['tf','Phần B · Đúng–sai'],['short','Phần C · Trả lời ngắn']].forEach(([section,label])=>{
      $('review-content').append(node('h3',label,'review-head'));
      r.rows.filter(x=>x.section===section).forEach(x=>{
        const row=node('div',undefined,`review-row ${x.correct?'good':'bad'}`);const id=node('span',x.id);id.append(node('span',x.correct?'ĐÚNG':x.value?'CHƯA ĐÚNG':'BỎ TRỐNG','badge'));
        const value=node('span');value.append(node('small','Bài làm'),node('span',displayValue(x.value)));
        const key=node('span');key.append(node('small','Đáp án'),node('span',displayValue(x.key)));
        row.append(id,value,key,node('span',x.explanation));$('review-content').append(row);
      });
    });
    const hasEssay=state.essay.some(x=>x.trim());
    if(hasEssay){$('review-content').append(node('h3','Tự luận · Chưa chấm','review-head'));state.essay.forEach((x,i)=>{if(x.trim()){$('review-content').append(node('h4',`Câu ${i+1}`),node('p',x,'prompt'));}});}
    if(scroll)$('result').scrollIntoView({behavior:'smooth',block:'start'});
    return r;
  }
  $('answer-form').addEventListener('submit',async e=>{
    e.preventDefault();if(state.submitted)return;
    const invalid=state.short.map((x,i)=>({i,p:engine.readColumns(x)})).filter(x=>!x.p.empty&&!x.p.valid);
    if(invalid.length){$('form-error').hidden=false;$('form-error').textContent=`Kiểm tra câu trả lời ngắn ${invalid.map(x=>x.i+1).join(', ')}: cần nhập số hợp lệ, không có cột trống ở giữa.`;$(`short-${invalid[0].i}`).focus();return;}
    $('form-error').hidden=true;const count=updateProgress();
    if(count<28 && !(await confirmAction('Nộp bài còn thiếu?',`Còn ${28-count} câu / ý chưa trả lời. Những câu này sẽ được 0 điểm.`, 'Vẫn nộp bài')))return;
    state.submitted=true;state.submittedAt=new Date().toISOString();save();lock(true);updateProgress();showResult(true);
  });
  async function reset(){
    const touched=state.submitted||state.mc.some(Boolean)||state.tf.flat().some(Boolean)||state.short.flat().some(Boolean)||state.essay.some(Boolean);
    if(touched && !(await confirmAction('Bắt đầu lượt mới?','Đáp án và nội dung tự luận của lượt hiện tại sẽ được xóa. Có thể tải kết quả trước khi làm lại.','Làm lại')))return;
    const next=blank();next.name=state.name;next.className=state.className;next.studentId=state.studentId;next.prompts=state.prompts;state=next;
    $('result').hidden=true;$('review-content').hidden=true;$('review').textContent='Xem đáp án và giải thích';$('form-error').hidden=true;document.body.classList.remove('has-result');render();save();$('part-a').scrollIntoView({behavior:'smooth'});
  }
  $('retry').addEventListener('click',reset);$('reset-top').addEventListener('click',reset);
  $('show-prompts').addEventListener('change',()=>{state.prompts=$('show-prompts').checked;togglePrompts();save();});
  [['student-name','name'],['student-class','className'],['student-id','studentId']].forEach(([id,key])=>$(id).addEventListener('input',()=>{if(!state.submitted){state[key]=$(id).value;save();}}));
  $('review').addEventListener('click',()=>{const c=$('review-content');c.hidden=!c.hidden;$('review').textContent=c.hidden?'Xem đáp án và giải thích':'Thu gọn lời giải';});
  $('print').addEventListener('click',()=>window.print());
  $('download').addEventListener('click',()=>{
    const r=engine.grade(exam,state);const text=[`KẾT QUẢ ÔN TẬP SINH HỌC 10 — MÃ 101`, `Họ tên: ${state.name||'(chưa nhập)'}`,`Lớp: ${state.className||''} — SBD: ${state.studentId||''}`,`Thời điểm nộp: ${state.submittedAt?new Date(state.submittedAt).toLocaleString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'}):''}`,`Điểm trắc nghiệm: ${format(r.total)}/7`, `A: ${format(r.points.mc)}/3; B: ${format(r.points.tf)}/2; C: ${format(r.points.short)}/2.`,`Tự luận chưa chấm. Không phải tổng điểm trên 10.`,``,...r.rows.map(x=>`${x.id}: ${displayValue(x.value)} | Đáp án: ${displayValue(x.key)} | ${x.correct?'Đúng':'Chưa đúng'}`),``,...state.essay.map((x,i)=>`Tự luận ${i+1}:\n${x||'(chưa làm)'}`)].join('\n');
    const blob=new Blob(['\uFEFF',text],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='Ket_qua_Sinh_hoc_10_Ma_101.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  render();if(state.submitted)showResult(false);if(!storageWorks)$('save-status').textContent='Không tự lưu được; hãy giữ trang mở';
})();
