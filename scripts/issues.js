const issuesContainer=document.getElementById('issues-container')
const counterContainer=document.getElementById('issues-counter-container')
const allBtn=document.getElementById('allBtn')
const openBtn=document.getElementById('openBtn')
const closeBtn=document.getElementById('closeBtn')
const spinerContainer=document.getElementById('spiner-container')

const openModal=(issue)=>{

     let priorityClass = '';

if (issue.priority === 'high') {
    priorityClass = 'bg-[#FEECEC] text-[#EF4444]';
} 
else if (issue.priority === 'medium') {
    priorityClass = 'bg-[#FFF6D1] text-[F59E0B]';
} 
else {
    priorityClass = 'bg-[#EFEFEF] text-[#9CA3AF]';
}

   const borderColor=issue.status==='open'? ' bg-[#00A96E]' : 'bg-[#A855F7]'
    document.getElementById('modal-container').innerHTML=`

     <h3 class="text-lg font-bold">${issue.title}</h3>
                <div class="mt-2.5">
                    <span class="text-[12px] text-white rounded-2xl font-medium ${borderColor} p-2">${issue.status}</span> <span class="text-[12px] text-[#64748B]"><i class="fa-solid fa-circle"></i>Open by ${issue.author}</span> <span class="text-[12px] text-[#64748B]"><i class="fa-solid fa-circle"></i>${issue.createdAt}</span>
                </div>
                <div class="mt-3 flex gap-3">
                 ${createElements(issue.labels)}
                

                </div>

                <p class="py-4 mt-3">${issue.description}</p>

                <div class="mt-4 bg-base-200 grid grid-cols-2 grid-rows-2 p-4">
                    <div>Assignee:</div>
                    <div>Priority:</div>
                    <div>${issue.assignee}</div>
                    <div class="${priorityClass} w-[80px] text-center rounded-2xl">${issue.priority}</div>



                </div>

                <div class="modal-action">
                    <form method="dialog">
                        
                        <button class="btn btn-primary">Close</button>
                    </form>
                </div>
    
    
    `
    document.getElementById('issue-modal').showModal()

}

const spierManagement=(status)=>{
    if(status===true){
        spinerContainer.classList.remove('hidden')
        issuesContainer.classList.add('hidden')
    }else if(status===false){
        spinerContainer.classList.add('hidden')
        issuesContainer.classList.remove('hidden')

    }
}



const tapBtn=(id)=>{

    allBtn.classList.remove('btn-primary')
    openBtn.classList.remove('btn-primary')
    closeBtn.classList.remove('btn-primary')
    
    if(id==='allBtn'){
        
        allBtn.classList.add('btn-primary')
        return;
    }
    else if(id==='openBtn'){
        openBtn.classList.add('btn-primary')
        return;
        
    }
    else if(id==='closeBtn'){
        closeBtn.classList.add('btn-primary')
        return;

    }


}




const createElements = (arr) => {
  const htmlElements = arr.map((el) => `
    <div class="bg-[#FFF8DB] flex justify-center items-center text-center rounded-2xl px-2 py-1">
        <p class="font-medium text-[#D97706] text-[12px]">
             ${el}
        </p>
    </div>
  `)

  return htmlElements.join(" ");
}


const loadAllIssues=(id)=>{
    spierManagement(true)
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayAllIssues(data.data))
    
}

allBtn.addEventListener('click', ()=>{
    tapBtn('allBtn')
    loadAllIssues()
})

const displayAllIssues=(issues)=>{

    counterContainer.innerText=`${issues.length} Issues`
    
    issuesContainer.innerHTML='';
    issues.forEach(issue => {

        const statusImg = issue.status === "open"
      ? "./assets/Open-Status.png"
      : "./assets/Closed- Status .png";


      let priorityClass = '';

if (issue.priority === 'high') {
    priorityClass = 'bg-[#FEECEC] text-[#EF4444]';
} 
else if (issue.priority === 'medium') {
    priorityClass = 'bg-[#FFF6D1] text-[F59E0B]';
} 
else {
    priorityClass = 'bg-[#EFEFEF] text-[#9CA3AF]';
}


const borderColor=issue.status==='open'? 'border-t-4 border-t-[#00A96E]' : 'border-t-4 border-t-[#A855F7]'

      

       
        
        const div=document.createElement('div')
        div.className=`bg-base-100 shadow-sm p-4 rounded-lg w-full h-full ${borderColor} `
        div.innerHTML=`
    
        <div class="flex justify-between ">
                    <div class="w-[30px] h-[30px]  flex items-center justify-center rounded-full">
                       <img src='${statusImg}'>
    
                    </div>
                    <div class="${priorityClass} w-[70px] flex justify-center items-center text-center rounded-2xl p-1">
                        <p class="font-medium ">${issue.priority}</p>
    
                    </div>
                </div>
    
                <div class="mt-3 space-y-2 mb-3">
                    <p class="font-semibold text-[14px]">${issue.title}</p>
                    <p class="line-clamp-2 text-[12px] text-[#64748B]">${issue.description}</p>
                </div>
    
                <div class="flex gap-3 ">
                    ${createElements(issue.labels)}
                </div>
    
                

                <div class="flex justify-between mt-4">
                <div class="">
                    <p class="text-[12px] text-[#64748B]">#1
                        by ${issue.author}</p> 
                        <p class="text-[12px] text-[#64748B]">${issue.assignee}</p>

                </div>

                <div >


                    <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                    <p class="text-[12px] text-[#64748B]">${issue.updatedAt}</p>
                </div>
            </div>
    
                
    
        
        `
        issuesContainer.appendChild(div)
div.addEventListener('click', () => openModal(issue))


        
    });
    spierManagement(false)

}















const loadCloseIssues=()=>{
    spierManagement(true)
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCloseIssues(data.data))
}

closeBtn.addEventListener('click', ()=>{
    tapBtn('closeBtn')
    loadCloseIssues()
})

const displayCloseIssues=(issues)=>{
    issuesContainer.innerHTML='';
    const closeIssues =issues.filter(issue=>issue.status==='closed')
    counterContainer.innerText=`${closeIssues.length} Issues`
    closeIssues.forEach(issue => {

        let priorityClass = '';

if (issue.priority === 'high') {
    priorityClass = 'bg-[#FEECEC] text-[#EF4444]';
} 
else if (issue.priority === 'medium') {
    priorityClass = 'bg-[#FFF6D1] text-[F59E0B]';
} 
else {
    priorityClass = 'bg-[#EFEFEF] text-[#9CA3AF]';
}

 


const div=document.createElement('div')
        div.className=`bg-base-100 shadow-sm p-4 rounded-lg w-full h-full border-t-4 border-t-[#A855F7]`
        div.innerHTML=`
    
        <div class="flex justify-between ">
                    <div class="w-[30px] h-[30px]  flex items-center justify-center rounded-full">
                       <img src="./assets/Closed- Status .png" alt="">
    
                    </div>
                    <div class="${priorityClass} w-[70px] flex justify-center items-center text-center rounded-2xl p-1">
                        <p class="font-medium ">${issue.priority}</p>
    
                    </div>
                </div>
    
                <div class="mt-3 space-y-2 mb-3">
                    <p class="font-semibold text-[14px]">${issue.title}</p>
                    <p class="line-clamp-2 text-[12px] text-[#64748B]">${issue.description}</p>
                </div>
    
                <div class="flex gap-3 ">
                    ${createElements(issue.labels)}
                </div>
    
                

                <div class="flex justify-between mt-4">
                <div class="">
                    <p class="text-[12px] text-[#64748B]">#1
                        by ${issue.author}</p> 
                        <p class="text-[12px] text-[#64748B]">${issue.assignee}</p>

                </div>

                <div >


                    <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                    <p class="text-[12px] text-[#64748B]">${issue.updatedAt}</p>
                </div>
            </div>
    
                
    
        
        `
        issuesContainer.appendChild(div)


        
    });
    spierManagement(false)

}



const loadOpenIssues =() =>{
    spierManagement(true)
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayOpenIssues(data.data))

}

openBtn.addEventListener('click', ()=>{
    tapBtn('openBtn')
    loadOpenIssues()
})

const displayOpenIssues=(issues)=>{
    issuesContainer.innerHTML='';
    const openIssues =issues.filter(issue=>issue.status==='open')
    counterContainer.innerText=`${openIssues.length} Issues`
    openIssues.forEach(issue => {

        let priorityClass = '';

if (issue.priority === 'high') {
    priorityClass = 'bg-[#FEECEC] text-[#EF4444]';
} 
else if (issue.priority === 'medium') {
    priorityClass = 'bg-[#FFF6D1] text-[F59E0B]';
} 
else {
    priorityClass = 'bg-[#EFEFEF] text-[#9CA3AF]';
}

 


const div=document.createElement('div')
        div.className='bg-base-100 shadow-sm p-4 rounded-lg w-full h-full border-t-4 border-t-[#00A96E]'
        div.innerHTML=`
    
        <div class="flex justify-between ">
                    <div class="w-[30px] h-[30px]  flex items-center justify-center rounded-full">
                       <img src='./assets/Open-Status.png'>
    
                    </div>
                    <div class="${priorityClass} w-[70px] flex justify-center items-center text-center rounded-2xl p-1">
                        <p class="font-medium ">${issue.priority}</p>
    
                    </div>
                </div>
    
                <div class="mt-3 space-y-2 mb-3">
                    <p class="font-semibold text-[14px]">${issue.title}</p>
                    <p class="line-clamp-2 text-[12px] text-[#64748B]">${issue.description}</p>
                </div>
    
                <div class="flex gap-3 ">
                    ${createElements(issue.labels)}
                </div>
    
                

                <div class="flex justify-between mt-4">
                <div class="">
                    <p class="text-[12px] text-[#64748B]">#1
                        by ${issue.author}</p> 
                        <p class="text-[12px] text-[#64748B]">${issue.assignee}</p>

                </div>

                <div >


                    <p class="text-[12px] text-[#64748B]">${issue.createdAt}</p>
                    <p class="text-[12px] text-[#64748B]">${issue.updatedAt}</p>
                </div>
            </div>
    
                
    
        
        `
        
        issuesContainer.appendChild(div)


        
    });
    spierManagement(false)
}

loadAllIssues()
tapBtn('allBtn')





