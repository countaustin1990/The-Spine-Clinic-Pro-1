import{f as s,g as o,h as i,s as u,i as l,k as a,l as n,q as h,w as d,o as m,n as g}from"./index-c0a0ba9d.js";const w=async(r,t)=>{try{const e=s(o,"appointments",r);await i(e,{...t,updatedAt:u()})}catch(e){throw console.error("Error updating appointment:",e),e}},f=async r=>{try{const t=s(o,"appointments",r);await l(t)}catch(t){throw console.error("Error deleting appointment:",t),t}},E=async r=>{try{const t=h(n(o,"appointments"),d("userId","==",r),m("date","asc")),e=await a(t),c=[];return e.forEach(p=>{c.push({id:p.id,...p.data()})}),c}catch(t){throw console.error("Error getting user appointments:",t),t}},A=async()=>{try{const r=await a(n(o,"appointments")),t=[];return r.forEach(e=>{t.push({id:e.id,...e.data()})}),t}catch(r){throw console.error("Error getting all appointments:",r),r}},q=async r=>{try{const t=await g(s(o,"users",r));return t.exists()?t.data():null}catch(t){throw console.error("Error getting user profile:",t),t}},D=async()=>{try{const r=await a(n(o,"users")),t=[];return r.forEach(e=>{t.push(e.data())}),t}catch(r){throw console.error("Error getting all users:",r),r}};export{q as a,A as b,D as c,f as d,E as g,w as u};
