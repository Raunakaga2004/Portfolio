export default function NavLink(props : {
  name : string,
  href : string
}){
  return <div>
    <link href={props.href}>{props.name}</link>
  </div>
}