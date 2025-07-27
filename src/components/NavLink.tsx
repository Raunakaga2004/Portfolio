import Link from "next/link"

export default function NavLink(props : {
  name : string,
  href : string
}){
  return <div>
    <Link href={props.href}>{props.name}</Link>
  </div>
}