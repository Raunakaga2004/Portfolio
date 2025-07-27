export default function Content(props : {
  name : string,

}){
  return <div>
    <div>{props.name}</div>

    <textarea/>
  </div>
}