'use server'

import ClientWrapper from './ClientWrapper'

// async function extractSkills(){
//   try{
//     const res = await axios.get(`${baseUrl}/api/skill/all`);
//     return res.data
//   }catch(e){
//     console.log(e);
//   }
// }

// async function extractProjects(){
//   await axios.get(`${baseUrl}/api/project/all`).then((res)=>{
//     console.log(res.data)

//     return res.data
//   }).catch((e)=>{
//     console.log(e)
//   })

//   return {}
// }

// async function extractContacts(){
//   await axios.get(`${baseUrl}/api/contact/all`,).then((res)=>{
//     console.log(res.data)

//     return res.data
//   }).catch((e)=>{
//     console.log(e)
//   })
// }


// export interface skillsType{
//   id : string,
//   name : string,
//   description? : string,
//   status : string,
//   show : boolean,
//   iconURL? : string,
//   category : string[]
// }

export default async function ServerComponent(){

//   const allSkills = await extractSkills();

//   const categories = new Map<string, skillsType[]>();
//     allSkills.data?.forEach((skill : skillsType) => {
//       if(skill.show) 
//         skill.category.forEach((cat : string) => {
//           const temp = categories.get(cat) ?? [];
//           temp.push(skill);
//           categories.set(cat, temp);
//         })
//     });

    // console.log(categories);

  // console.log(allSkills.data)
  // const allProjects = await extractProjects();
  // const allContacts = await extractContacts();

  return <>
    {/* <ClientWrapper allSkills={categories}/> */}
    <ClientWrapper/>
  </>
}