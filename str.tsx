import Link from 'next/link'
import {transaction} from './type';

export default function str(v: transaction) {
  if(v.type === 'pay') return <><Link href={'/holders/'+v.from}>{v.from}</Link> paid <Link href={'/holders/'+v.to}>{v.to}</Link> {v.amount} balloons on {new Date(v.time).toString()}</>
}
