/* app.js
 Frontend-only demo: data persisted to localStorage.
 Features:
 - client navigation (single page)
 - admin modal (fake login) to add news & teachers
 - applicants stored in localStorage
 - simple gallery & fake download
*/

const pages = ["home","about","departments","teachers","news","gallery","admissions","contact"];
const navBtns = document.querySelectorAll(".nav-btn");
const showPage = id => {
  pages.forEach(p => document.getElementById(p).classList.remove("active"));
  const el = document.getElementById(id);
  if(el) el.classList.add("active");
  navBtns.forEach(b => b.classList.toggle("active", b.dataset.target === id));
  window.scrollTo({top:0,behavior:'smooth'});
};
/* init nav clicks */
navBtns.forEach(b => {
  b.addEventListener("click", e => {
    const t = e.currentTarget.dataset.target;
    if(t) showPage(t);
  });
});
/* initial */
showPage("home");

/* --- sample data / persistence --- */
const DB = {
  news: JSON.parse(localStorage.getItem("smp_news")|| "[]"),
  teachers: JSON.parse(localStorage.getItem("smp_teachers")|| "[]"),
  applicants: JSON.parse(localStorage.getItem("smp_applicants")|| "[]"),
  gallery: JSON.parse(localStorage.getItem("smp_gallery")|| "[]"),
};

function saveDB(){
  localStorage.setItem("smp_news", JSON.stringify(DB.news));
  localStorage.setItem("smp_teachers", JSON.stringify(DB.teachers));
  localStorage.setItem("smp_applicants", JSON.stringify(DB.applicants));
  localStorage.setItem("smp_gallery", JSON.stringify(DB.gallery));
}

/* --- admin modal logic --- */
const adminModal = document.getElementById("adminModal");
const adminClose = document.getElementById("adminClose");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => adminModal.classList.remove("hidden"));
adminClose.addEventListener("click", ()=> adminModal.classList.add("hidden"));

adminLoginBtn.addEventListener("click", ()=> {
  const user = document.getElementById("adminUser").value || "";
  const pass = document.getElementById("adminPass").value || "";
  // demo credentials: admin / 1234
  if(user === "admin" && pass === "1234"){
    document.getElementById("adminArea").classList.remove("hidden");
    document.getElementById("adminLoginBtn").classList.add("hidden");
  } else {
    alert("Login gagal — gunakan username: admin , password: 1234 (demo)");
  }
});

/* add news */
document.getElementById("addNewsBtn").addEventListener("click", ()=> {
  const t = document.getElementById("newsTitle").value.trim();
  const b = document.getElementById("newsBody").value.trim();
  if(!t||!b){ alert("Lengkapi judul & isi"); return; }
  const item = {id:Date.now(),title:t,body:b, time: new Date().toISOString()};
  DB.news.unshift(item);
  saveDB();
  renderNews();
  document.getElementById("newsTitle").value = "";
  document.getElementById("newsBody").value = "";
});

/* add teacher */
document.getElementById("addTeacherBtn").addEventListener("click", ()=> {
  const n = document.getElementById("teacherName").value.trim();
  const s = document.getElementById("teacherSubject").value.trim();
  if(!n||!s){ alert("Lengkapi nama & mapel"); return; }
  const t = {id:Date.now(),name:n,subject:s,img:"https://via.placeholder.com/96"};
  DB.teachers.push(t);
  saveDB();
  renderTeachers();
  document.getElementById("teacherName").value="";
  document.getElementById("teacherSubject").value="";
});

/* render teachers */
function renderTeachers(){
  const list = document.getElementById("teachersList");
  list.innerHTML = "";
  if(DB.teachers.length===0){
    // seed few
    DB.teachers.push({id:1,name:"Ibu Sari",subject:"Matematika",img:"https://via.placeholder.com/96"});
    DB.teachers.push({id:2,name:"Bapak Joko",subject:"IPA",img:"https://via.placeholder.com/96"});
    DB.teachers.push({id:3,name:"Ibu Ani",subject:"Bahasa",img:"https://via.placeholder.com/96"});
    saveDB();
  }
  DB.teachers.forEach(t => {
    const c = document.createElement("div"); c.className="card";
    c.innerHTML = `<img src="${t.img}" alt=""><div><h4>${t.name}</h4><p>${t.subject}</p></div>`;
    list.appendChild(c);
  });
}

/* render news */
function renderNews(){
  const nlist = document.getElementById("newsList");
  nlist.innerHTML = "";
  if(DB.news.length===0){
    DB.news.push({id:1,title:"Penerimaan Siswa Baru Dibuka",body:"Pendaftaran dibuka mulai 1 Juli.",time:new Date().toISOString()});
    saveDB();
  }
  DB.news.forEach(it=>{
    const n = document.createElement("div"); n.className="news-item";
    n.innerHTML = `<h3>${it.title}</h3><small>${new Date(it.time).toLocaleString()}</small><p>${it.body}</p>`;
    nlist.appendChild(n);
  });
}

/* gallery render (seed some images) */
function renderGallery(){
  const g = document.getElementById("galleryGrid");
  g.innerHTML = "";
  if(DB.gallery.length===0){
    DB.gallery = [
      "https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower-4.jpg",
      "https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower-2.jpg",
      "https://interactive-examples.mdn.mozilla.net/media/cc0-images/flower-1.jpg"
    ];
    saveDB();
  }
  DB.gallery.forEach(src=>{
    const img = document.createElement("img"); img.src = src;
    g.appendChild(img);
  });
}

/* admissions */
document.getElementById("admissionForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const f = e.target;
  const obj = {id:Date.now(),name:f.name.value,age:f.age.value,address:f.address.value,grade:f.grade.value,time:new Date().toISOString()};
  DB.applicants.unshift(obj);
  saveDB();
  renderApplicants();
  f.reset();
  alert("Pendaftaran terkirim! (disimpan lokal demo)");
});
function renderApplicants(){
  const box = document.getElementById("applicants");
  box.innerHTML = "";
  DB.applicants.forEach(a=>{
    const c = document.createElement("div"); c.className="card";
    c.innerHTML = `<h4>${a.name} (Kls ${a.grade})</h4><p>${a.address} — ${a.age} th</p><small>${new Date(a.time).toLocaleString()}</small>`;
    box.appendChild(c);
  });
}

/* contact map placeholder */
document.getElementById("map").addEventListener("click", ()=> alert("Integrasi peta bisa ditambahkan (Google Maps API)."));

/* init renders */
renderTeachers();
renderNews();
renderGallery();
renderApplicants();

/* download brosur (simulate) */
document.getElementById("downloadBrochure").addEventListener("click",(e)=>{
  e.preventDefault();
  alert("Download brosur: file disimpan di server (simulasi). Kamu dapat mengganti link brosur di HTML.");
});

/* convenience: enable quick nav for hero apply now */
document.getElementById("applyNow").addEventListener("click",(e)=>{
  e.preventDefault();
  showPage("admissions");
});