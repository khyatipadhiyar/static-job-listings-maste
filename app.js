const mainContainer = document.querySelector('.container');
const jobListSection = document.querySelector('.jobListing'); 
const filterModal = document.querySelector('.filterModal');
const filterModalDetail = document.querySelector('.filterModalDetail');
const filterModalclearData = document.querySelector('.clearData');



let filterArr = [];
let filtermodalArr = [];

//Get API Data
async function jobListing() {
  // read our JSON
  let response = await fetch('data.json');
  let user = await response.json();
  return user;
}
//Creat Cards
jobListing().then(jobData =>{
      jobData.forEach(jobCradsEl => {
        //Create Element
        let jobCards = document.createElement('DIV');
        let jobCardTextLeft = document.createElement('DIV');
        let jobCardTextRight = document.createElement('DIV');
        let jobProfile = document.createElement('DIV');
        let profileImg = document.createElement('IMG');
        let jobDetails = document.createElement('DIV');
        let companytDetail = document.createElement('DIV');
        let companyLb = document.createElement('LABEL');
        let newLb = document.createElement('LABEL');
        let featuredLb = document.createElement('LABEL');
        let position = document.createElement('DIV');
        let jobWorkDetail = document.createElement('DIV');

        let postedLab = document.createElement('LABEL');
        let contractLab = document.createElement('LABEL');
        let locationLab = document.createElement('LABEL');
        
        let jobFilter = document.createElement('DIV');
      

        //Add Element Class Name
        jobDetails.classList.add('jobDetails');
        jobCards.classList.add('jobCards');
        jobCards.classList.add('flex');
        jobCardTextLeft.classList.add('jobCardTextLeft');
        jobCardTextLeft.classList.add('flex');
        jobCardTextRight.classList.add('jobCardTextRight');
        jobProfile.classList.add('jobProfile');
        profileImg.classList.add('profileImg');
        companytDetail.classList.add('companytDetail');
        position.classList.add('position');
        jobWorkDetail.classList.add('jobWorkDetail');
        jobFilter.classList.add('jobFilter');

        //Get Data
        profileImg.src=jobCradsEl.logo;
        companyLb.innerHTML = jobCradsEl.company;

        if(jobCradsEl.new == true){
          newLb.innerHTML= 'new !';
          newLb.classList.add('newPost');
         }
        if(jobCradsEl.featured == true){
          featuredLb.innerHTML='featured';
          featuredLb.classList.add('featuredPost');
          jobCards.style.borderLeft= '4px solid hsl(180, 29%, 50%)';

        }
        position.innerHTML=jobCradsEl.position;
        postedLab.innerHTML=jobCradsEl.postedAt;
        contractLab.innerHTML=jobCradsEl.contract;
        locationLab.innerHTML=jobCradsEl.location;
        let languagesData =jobCradsEl.languages;
        let toolData=jobCradsEl.tools;
        let combinData=languagesData.concat(toolData);

        combinData.forEach(combinDataEl=>{
          let filterLab = document.createElement('LABEL');
          filterLab.classList.add('filterLable');
          filterLab.innerHTML=combinDataEl;
      
          //add eventlisner

          filterLab.addEventListener('click',(e)=>{
            filterModal.classList.add('flex');
            filterModal.style.display = 'flex';
        
            if(filtermodalArr.indexOf(e.target.firstChild.data)==-1){
              let filterModalLab =document.createElement('LABAL'); 
              let filterModalIcon =document.createElement('SPAN'); 
              filterModalIcon.innerHTML=`<i class="fas fa-window-close"></i>`;
              filtermodalArr.push(e.target.firstChild.data);
              filterModalLab.innerHTML=e.target.firstChild.data;
              filterModalLab.appendChild(filterModalIcon);
              filterModalLab.classList.add('filterLableModal');
              filterModalDetail.append(filterModalLab);
              filterData();
              filterModalIcon.addEventListener('click',(e)=>{
                e.target.parentElement.parentElement.remove();
                removText = e.target.parentElement.previousSibling.data;
                //console.log(filtermodalArr.indexOf(removText));
                filtermodalArr.splice(filtermodalArr.indexOf(removText),1);
                filterData();
              })
            }    //close main if        
          }) //close filterLab
          jobFilter.append( filterLab);
        })
       
        //Append
        jobCards.appendChild(jobCardTextLeft);
        jobCardTextLeft.appendChild(jobProfile);
        jobProfile.appendChild(profileImg);
        jobDetails.appendChild(companytDetail);
        companytDetail.appendChild(companyLb);
        companytDetail.appendChild(newLb);
        companytDetail.appendChild(featuredLb);
        jobDetails.appendChild(position);
        jobDetails.appendChild(jobWorkDetail);
        jobWorkDetail.appendChild(postedLab);
        jobWorkDetail.appendChild(contractLab);
        jobWorkDetail.appendChild(locationLab);
        jobCardTextLeft.appendChild(jobDetails);
        jobCards.appendChild(jobCardTextRight);
        jobCardTextRight.appendChild(jobFilter);
        jobListSection.appendChild(jobCards);
      });
   }) 
 function filterData(){
//filter Data
      let allJobCards = document.querySelectorAll('.jobCards');
      allJobCards.forEach(itemEl=>{
            let labelArr= [];
            itemEl.childNodes[1].childNodes[0].childNodes.forEach(sinaglItem =>{
            labelArr.push(sinaglItem.childNodes[0].data);
            });
            let flag=0;
          filtermodalArr.forEach(modalarrEL=>{
            if(flag==0){
                if(labelArr.indexOf(modalarrEL)==-1){
                  //itemEl.style.display='none';
                  flag=1;
                }
              }
          });
          if(flag==1){
            itemEl.style.display='none';
          }else{
            itemEl.style.display='flex';
          }
      });//close itemEl;
}
 //Clear filtermodal box
 filterModalclearData.addEventListener('click',()=>{
  filtermodalArr = [];
  filterModalDetail.innerHTML='';
  filterData();
  // let allJobCards = document.querySelectorAll('.jobCards');
  // allJobCards.forEach(itemEl=>{
  //   itemEl.style.display='flex';
  // })
})


