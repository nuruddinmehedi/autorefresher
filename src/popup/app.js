

const listarea= document.getElementById('listarea')
let editBtn= document.getElementsByClassName('btn-edit');
//onload ...
const onloadHandeler= ()=>{
    chrome.storage.local.get((res)=>{
        for(key in res){
            const getTitle= ()=> {
                if(res[key].title.length>10){
                    return res[key].title.substr(0,10)
                }else{
                    return res[key].title
                }
            }
          const div= document.createElement('div')
          div.className="item"
          div.id=key
          div.innerHTML= `<div class="affbutton">
          <label class="switch">
              <input class="checkboxclass" id="${key}" ${res[key].isOn?'checked':''} type="checkbox">
              <span class="slider"></span>
          </label>
      </div>
      <div class="title">
          <h5 id="${key}title">${getTitle()}</h5><span id="${key}batch" class="batch">${res[key].sec}s</span>
      </div>
      <button id="${key}" class="btn-edit">Edit</button>
      <button id="${key}" class="btn-delete">X</button>`
            listarea.appendChild(div)
        }

    })
    setTimeout(()=>{editBtn= document.querySelectorAll('.btn-edit');
    const deleteButton= document.querySelectorAll('.btn-delete')
    addDeleteButtonListener(deleteButton)
    addEditButtonListener(editBtn)
    const inputBox= document.querySelectorAll('.checkboxclass')
    upadtCheckStatus(inputBox)


},1000)
}
window.addEventListener('load',onloadHandeler,()=>{
    
})

// time section 
const h= document.getElementById('h')
const mm= document.getElementById('mm')
const sc= document.getElementById('sc')
const title= document.getElementById('title')
const exact= document.getElementById('exact')
const url = document.getElementById('url')
const hHandeler= (e)=>{
    if(e.target.value>24){
        e.target.value=24
    }else{
        e.target.value= parseInt(e.target.value) 
    }
    }
h.addEventListener('change',hHandeler)
const mmHandeler= (e)=>{
   if(e.target.value>60){
       intValuofmm= parseInt(e.target.value)
       const hValue= parseInt(intValuofmm / 60)
       const mValue= intValuofmm % 60
    h.value= parseInt(h.value?h.value:0)+hValue;
    mm.value= mValue
     if(h.value>24){
         h.value=24
     }
   }else{
    mm.value= parseInt(e.target.value)
   }
}
mm.addEventListener('change',mmHandeler)
const scHandeler= (e)=>{
    const scvalue= parseInt(e.target.value)
    if(e.target.value>60){
    const mValue= parseInt(scvalue/ 60)
    const hValue= parseInt(mValue / 60)
    const sValue= parseInt(scvalue % 60)
    const hhValue= parseInt(h.value)
    h.value= parseInt(hhValue?hhValue:0)+hValue;
    let mmsValue= parseInt(mm.value)
    mm.value= parseInt(mmsValue?mmsValue:0) + mValue
    mmsValue= parseInt(mm.value)

    if(mmsValue>60){
        mm.value= parseInt(mmsValue % 60)
        h.value= parseInt(h.value?h.value:0)+ parseInt( mmsValue / 60)
    }else{
        mm.value= parseInt(mmsValue?mmsValue:0)
    }
    sc.value= sValue
    
    }else{
  e.target.value= scvalue
    }
    if(h.value>24){
        h.value=24
    }

}
sc.addEventListener('change',scHandeler)

// set a item 

const addButton= document.getElementById('addbutton')

const addButtonHandeler= (elm)=>{
    const titleLabel= document.getElementById('titlelabel')
    const urlLabel= document.getElementById('urllabel')
    titleLabel.innerHTML="Title of URL"
    urlLabel.innerHTML="URL or Link of website"
    if(!title.value){
 titleLabel.innerHTML="Title of URL <span style='color:red'>(required)*<span>"
 return false
    }else if(!url.value){
urlLabel.innerHTML="URL or Link of website <span style='color:red'>(required)*<span>"
return false
    }

const dataid= elm.target.getAttribute('dataid')
const box= JSON.parse(elm.target.getAttribute('box'))
    const objH= h.value
    const  objM=mm.value
    let objS=sc.value
    if(!(objH || objM || objS)){
       objS= 25
    }
    const gets= parseInt(objH?objH:0)*60*60+ parseInt(objM?objM:0)*60+parseInt(objS?objS:0)
    const data={
        title: title.value,
        url: url.value,
        exact:exact.checked,
        time: {
            h:objH,
            m:objM,
            s:objS
        },
        isOn:box?box:true,
        sec:gets

    }
    const getTitle= ()=> {
        if(title.value.length>10){
            return title.value.substr(0,10)
        }else{
            return title.value
        }
    }


    if(dataid){
    const titleById= document.getElementById(dataid+'title')
    titleById.innerHTML= getTitle()
    const batchById= document.getElementById(dataid+'batch')
    batchById.innerHTML=`${gets}s`
    chrome.storage.local.set({[dataid]:data})
    elm.target.innerHTML="Add to List"
    elm.target.removeAttribute('dataid')
    elm.target.removeAttribute('box')
    }else{
        const generateUniqueId = () => 'id_' + Date.now() + String(Math.random()).substr(2);
    const key= generateUniqueId()
          const div= document.createElement('div')
          div.className="item"
          div.id=key
          div.innerHTML= `<div class="affbutton">
          <label class="switch">
              <input class="checkboxclass" id="${key}" checked type="checkbox">
              <span class="slider"></span>
          </label>
      </div>
      <div class="title">
          <h5 id="${key}title">${getTitle()}</h5><span id="${key}batch" class="batch">${gets}s</span>
      </div>
      <button id="${key}" class="btn-edit">Edit</button>
      <button id="${key}" class="btn-delete">X</button>`
            listarea.appendChild(div)
   
    editBtn= document.querySelectorAll('.btn-edit');
    addEditButtonListener(editBtn)
    const deleteButton= document.querySelectorAll('.btn-delete')
    addDeleteButtonListener(deleteButton)
    const inputBox= document.querySelectorAll('.checkboxclass')
    upadtCheckStatus(inputBox)
    chrome.storage.local.set({[key]:data})
    }
    title.value=""
    url.value=""
    h.value=""
    mm.value=""
    sc.value=""
    exact.checked= false;
}
addButton.addEventListener('click',addButtonHandeler)

// edit button


function addEditButtonListener(element){
    element.forEach(i => {
      i.addEventListener('click',function(e){
          addButton.style="margin-left: 17px;"
        addButton.innerHTML='Update Data'
         chrome.storage.local.get(e.target.id,(res)=>{
            addButton.setAttribute('box',res[e.target.id].isOn)
            addButton.setAttribute('dataid',e.target.id)
             title.value= res[e.target.id].title
             exact.checked= res[e.target.id].exact
             url.value= res[e.target.id].url
             h.value= res[e.target.id].time.h
             mm.value= res[e.target.id].time.m
             sc.value= res[e.target.id].time.s
         })
        })  
    }); 
    
}

// delete button
function addDeleteButtonListener(element){
element.forEach((i)=>{
    i.addEventListener('click',(e)=>{
      const removeElement= document.getElementById(e.target.id)
      removeElement.remove()
      chrome.storage.local.remove(e.target.id)
    })
})
}
// check box 
function upadtCheckStatus(element){
element.forEach((i)=>{
    i.addEventListener('change',(e)=>{
        const id= e.target.id
        chrome.storage.local.get(id,(res)=>{
            const data= res[id]
            data.isOn=!data.isOn
            chrome.storage.local.set({[id]:data})

        })
    })
})
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "reload") {
            const data= request.data
            const  decrementnumbertag= document.getElementById(`${data.key}batch`)
            decrementnumbertag.innerHTML=`${data.sec}s`
        //   setTimeout(()=>{
        //   if(data.sec!=0){
        //     decrementnumbertag.innerHTML=`${data.sec-1}s`
        //   }
          
        //   },1000)
        }
    }
);
function getHtmldatabyid(id){
    if(!id){
        return false;
    }else{
        return document.getElementById(id);
    }
}
const shareButton= getHtmldatabyid('btnsid');
shareButton.addEventListener("click",shareButtonclickhandelar)

function shareButtonclickhandelar(e){
    window.open("https://chrome.google.com/webstore/detail/auto-refresher/ohaddebmmlbbjnpobfgmlkelfoiokojh");
}
