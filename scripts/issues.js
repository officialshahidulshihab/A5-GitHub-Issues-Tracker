const issuesContainer=document.getElementById('issues-container')
const counterContainer=document.getElementById('issues-counter-container')
const allBtn=document.getElementById('allBtn')
const openBtn=document.getElementById('openBtn')
const closeBtn=document.getElementById('closeBtn')

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
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayAllIssues(data.data))
    
}

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

      

       
        
        const div=document.createElement('div')
        div.className='bg-base-100 shadow-sm p-4 rounded-lg w-full h-full'
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
        
    });

}

loadAllIssues()
tapBtn('allBtn')



