import deta from '../db';
import str from '../str';
import {transaction} from '../type';
import Head from 'next/head';

const db = deta.Base("transactions")

export default function Transactions({acData}) {
  return (
    <div className="top">
    <Head><title>Transactions — 🎈</title></Head>
    <h1>Transactions 🎈</h1>
    <hr />
    <ul className="tr">
    {acData.map((v: transaction) => <li key={v.key}>{str(v)}</li>)}
    </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await db.fetch()
  const acData = data.items.sort((a, b) => new Date(b.time as number).valueOf() - new Date(a.time as number).valueOf())
  return {props: {acData}};
}
