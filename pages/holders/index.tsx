import deta from '../../db';
import Link from 'next/link';
import {transaction} from '../../type';
import Head from 'next/head';

const db = deta.Base("amounts")

export default function Balance({data}) {
  return (
    <div className="top">
    <Head><title>Holders — 🎈</title></Head>
    <h1>Balloons 🎈</h1>
    <hr />
    <ul className="tr">
    {data.map((v: transaction) => <li className="gr" key={v.key}><Link href={'/holders/'+v.key}>{v.key}</Link><span>{v.amount} balloons</span></li>)}
    </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await db.fetch()
  return {props: {data: data.items.sort((b,c) => (c.amount as number) - (b.amount as number))}};
};
